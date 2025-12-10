const https = require('https');

const url = 'https://www.antalyakomisyonculardernegi.com/';

console.log(`Fetching from: ${url}`);

const req = https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('HTML Preview (First 1000 chars):', data.substring(0, 1000));

        // Check for common keywords
        if (data.includes('fiyat')) console.log('Found keyword "fiyat"');
        if (data.includes('table')) console.log('Found keyword "table"');
        if (data.includes('listesi')) console.log('Found keyword "listesi"');
    });
});

req.on('error', (err) => {
    console.error('Error:', err.message);
});
