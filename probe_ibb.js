const https = require('https');

const url = 'https://hal.ibb.istanbul/online-islemler/gunluk-fiyat-bulteni';

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('HTML Preview:', data.substring(0, 500));
        // basic check for table availability
        if (data.includes('<table')) console.log('Table found!');
        else console.log('No table found in initial response.');
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
});
