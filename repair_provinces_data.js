const fs = require('fs');

const filePath = 'data/provinces-agri.ts';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Identify the misplaced block
const marker = '// --- Generated Missing Provinces ---';
const markerIndex = content.indexOf(marker);

if (markerIndex === -1) {
    console.log("Marker not found, maybe already fixed?");
    process.exit(1);
}

// The misplaced block is from markerIndex to the end (minus the last closing braces of the function/file if any)
// But wait, the script inserted it before the LAST `};`.
// In the bad file, `getProvinceData`'s return statement had `};`.
// So the file looks like:
// ...
// return {
//    ...
//    // --- Generated Missing Provinces ---
//    "2": { ... }
//    ...
// };
// }

// We need to extract everything from markerIndex up to the end of the inserted data.
// The inserted data ends before the `};` that was matched.
// So effectively, we can just take everything from markerIndex to the end, 
// BUT we need to be careful about the closing `};` of the return statement which is now likely after the inserted data.

// Let's try a different approach:
// We know `provincesData` ends at line 229 (approx).
// We look for `export const provincesData = {`.
// We find the matching closing brace for that object.
// Then we take the misplaced chunk and put it there.

// Regex to find the misplaced chunk:
// It starts with the marker.
// It ends... well, it's valid JSON-like structure (keys and objects).
// It ends before the `};` of the return statement.

// Let's just read the file lines.
const lines = content.split('\n');
const startLine = lines.findIndex(l => l.includes(marker)); // 0-indexed

if (startLine === -1) {
    console.log("Marker line not found");
    process.exit(1);
}

// Extract the generated lines
// They go until... the end of the insertion.
// The insertion was `\n // ... \n newEntries`.
// The `newEntries` string ends with a comma and newline.
// The last entry is "73": { ... },
// So we can look for the last line that looks like `    },` or `    }` belonging to the new data.
// Or we can just assume everything from startLine down to the line before `};` is the data.

// Let's find where `provincesData` closes.
// It closes before `export function getProvinceData`.
const functionDefLine = lines.findIndex(l => l.includes('export function getProvinceData'));
const provincesDataEndLine = functionDefLine - 2; // Roughly, assuming formatting.

// Wait, looking at the view:
// 229: };
// 230: 
// 231: // Helper...
// So provincesDataEndLine is 229 (1-indexed) -> index 228.

// The misplaced data starts at `startLine`.
// We need to move lines `startLine` through `endOfInsertedData` to `provincesDataEndLine`.

// Where does the inserted data end?
// The script inserted it before the *last* `};`.
// In the original file, the last `};` was the return statement of `getProvinceData`.
// So the inserted data is effectively inside the return object.
// It ends right before the `};` of the return statement.
// We can find that `};` by looking backwards from the end of the file, or looking for the `};` that closes the return.

// Let's grab all lines starting from `startLine`.
const misplacedLines = [];
let i = startLine;
while (i < lines.length) {
    const line = lines[i];
    // Stop if we hit the closing of the return statement.
    // The return statement closes with `    };` (indented).
    // The inserted data also has indentation.
    // The inserted data ends with `    },`.
    // The return statement closing `};` should be after the inserted data.
    if (line.trim() === '};' && i > startLine + 10) { // +10 to avoid false positives early on
        break;
    }
    misplacedLines.push(line);
    i++;
}

// Remove misplaced lines from original location
lines.splice(startLine, misplacedLines.length);

// Now insert them into `provincesData`.
// Find the closing `};` of `provincesData`.
// It is before `export function getProvinceData`.
const insertIndex = lines.findIndex(l => l.includes('export function getProvinceData')) - 1;
// Check if lines[insertIndex] is `};` or empty line.
// We want to insert BEFORE `};`.
let targetIndex = insertIndex;
while (targetIndex > 0 && !lines[targetIndex].trim().startsWith('};')) {
    targetIndex--;
}

// targetIndex is now the line with `};`.
// We need to ensure the line BEFORE it has a comma.
let previousDataLineIndex = targetIndex - 1;
while (previousDataLineIndex > 0 && lines[previousDataLineIndex].trim() === '') {
    previousDataLineIndex--;
}

// Add comma to the previous item
if (!lines[previousDataLineIndex].trim().endsWith(',')) {
    lines[previousDataLineIndex] += ',';
}

// Insert the misplaced lines at targetIndex
lines.splice(targetIndex, 0, ...misplacedLines);

// Write back
fs.writeFileSync(filePath, lines.join('\n'));
console.log("Fixed provinces-agri.ts");
