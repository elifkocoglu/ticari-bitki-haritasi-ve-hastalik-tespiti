const https = require('https');

const url = 'https://tarim.ibb.istanbul/hal-mudurlugu/';

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('HTML Preview:', data.substring(0, 500));
        if (data.includes('fiyat')) console.log('Keyword "fiyat" found!');
        if (data.includes('<table')) console.log('Table found!');
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
});
