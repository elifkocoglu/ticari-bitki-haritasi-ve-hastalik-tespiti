const fs = require('fs');

// 1. Get all province names from GeoJSON
const geojson = JSON.parse(fs.readFileSync('public/tr-provinces.geojson', 'utf8'));
const allProvinces = geojson.features.map(f => f.properties.name).sort();

// 2. Get existing provinces from data/provinces-agri.ts
// We'll read the file content and use regex to find keys or names because it's a TS file
const tsContent = fs.readFileSync('data/provinces-agri.ts', 'utf8');
// Look for name: "X" pattern
const nameMatches = tsContent.match(/name:\s*"([^"]+)"/g);
const existingNames = nameMatches ? nameMatches.map(m => m.match(/"([^"]+)"/)[1]) : [];

// 3. Find missing
const missing = allProvinces.filter(p => !existingNames.includes(p));

console.log(`Total Provinces in GeoJSON: ${allProvinces.length}`);
console.log(`Existing in Static Data: ${existingNames.length}`);
console.log(`Missing: ${missing.length}`);
console.log("\nMissing Provinces:");
console.log(missing.join('\n'));
