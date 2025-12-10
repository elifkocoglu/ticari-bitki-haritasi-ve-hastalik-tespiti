const https = require('https');

const url = 'https://www.antalyakomisyonculardernegi.com/';

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        // Simple regex to find the first table
        const tableMatch = data.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
        if (tableMatch) {
            console.log('--- Table Found ---');
            // Print the first 500 chars of the table content to verify headers
            console.log(tableMatch[1].substring(0, 500));
            console.log('--- End Preview ---');
        } else {
            console.log('No table tag found with regex.');
        }
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
});
