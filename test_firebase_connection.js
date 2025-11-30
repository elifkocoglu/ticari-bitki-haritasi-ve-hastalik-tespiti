const https = require('https');

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "YOUR_API_KEY_HERE"; // User needs to ensure this is set or I will try to read it from .env.local if possible
console.log("Testing connection to Google Identity Toolkit...");

const options = {
    hostname: 'identitytoolkit.googleapis.com',
    port: 443,
    path: '/v1/accounts:createAuthUri?key=' + apiKey, // Just a test endpoint
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(JSON.stringify({}));
req.end();
