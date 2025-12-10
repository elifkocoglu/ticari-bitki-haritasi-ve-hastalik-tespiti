const https = require('https');

// Trying a 2024 date to check if the API works for "real" past time
const targetDate = '2024-12-05';
const url = `https://openapi.izmir.bel.tr/api/ibb/halfiyatlari/sebzemeyve/${targetDate}`;

console.log(`Fetching from: ${url}`);

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        try {
            const json = JSON.parse(data);
            console.log('Data Length:', json.length);
            if (json.length > 0) {
                console.log('First Item Sample:', JSON.stringify(json[0], null, 2));
            } else {
                console.log('No data found for this date.');
            }
        } catch (e) {
            console.error('JSON Parse Error:', e.message);
            console.log('Raw Data:', data.substring(0, 500));
        }
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
});
