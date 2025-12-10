// Standalone script to simulate the API route logic
// Run with: node test_server_fetch.js

async function fetchLiveAntalyaData() {
    try {
        console.log("Fetching URL...");
        const response = await fetch('https://www.antalyakomisyonculardernegi.com/', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            // removing next: revalidate since this is standalone node
        });

        console.log(`Response Status: ${response.status}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        console.log(`HTML Length: ${html.length}`);

        // Extract table rows using regex
        // Looking for <tr>...</tr> content inside <tbody>
        const tbodyMatch = html.match(/<tbody>([\s\S]*?)<\/tbody>/i);
        if (!tbodyMatch) {
            console.log("Regex Error: <tbody> not found.");
            // Log a snippet to see what's there
            const tableLoc = html.indexOf('<table');
            if (tableLoc !== -1) {
                console.log("Snippet around <table>:", html.substring(tableLoc, tableLoc + 500));
            }
            throw new Error("Table body not found");
        }

        console.log("<tbody> found. analyzing rows...");

        const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
        const cellRegex = /<(?:td|th)[^>]*>([\s\S]*?)<\/(?:td|th)>/gi;

        const rows = [...tbodyMatch[1].matchAll(rowRegex)];
        console.log(`Found ${rows.length} rows.`);

        const parsedData = [];

        for (const rowMatch of rows) {
            const rowContent = rowMatch[1];
            // Clean tags from cells
            const cells = [...rowContent.matchAll(cellRegex)].map(m => m[1].replace(/<[^>]*>/g, '').trim());

            console.log(`Row cells:`, cells);

            // Expected columns based on probe: #, Name, PriceToday, PriceYesterday
            if (cells.length >= 3) {
                const name = cells[1];
                const priceStr = cells[2];
                const price = parseFloat(priceStr.replace(',', '.'));

                if (name && !isNaN(price)) {
                    parsedData.push({
                        name: name,
                        unit: 'Kg',
                        min: (price * 0.9).toFixed(2),
                        max: (price * 1.1).toFixed(2),
                        avg: price.toFixed(2)
                    });
                }
            }
        }

        if (parsedData.length === 0) throw new Error("No parsed data found");

        console.log("Success! Data preview:", parsedData.slice(0, 3));
        return parsedData;

    } catch (error) {
        console.error("Scraping error:", error);
        return null;
    }
}

fetchLiveAntalyaData();
