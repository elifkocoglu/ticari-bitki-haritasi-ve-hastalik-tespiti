const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');

// Simple .env.local parser
function loadEnv() {
    try {
        const envPath = path.join(__dirname, '.env.local');
        const content = fs.readFileSync(envPath, 'utf8');
        const env = {};
        content.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                let value = match[2].trim();
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.slice(1, -1);
                }
                env[key] = value;
            }
        });
        return env;
    } catch (e) {
        console.error("Could not read .env.local");
        return {};
    }
}

const env = loadEnv();

const firebaseConfig = {
    apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.NEXT_PUBLIC_FIREBASE_APP_ID
};

console.log("Checking Config from .env.local:");
console.log("API Key:", firebaseConfig.apiKey ? "Present" : "Missing");
console.log("Auth Domain:", firebaseConfig.authDomain ? "Present" : "Missing");

if (!firebaseConfig.apiKey) {
    console.error("ERROR: Config missing!");
    process.exit(1);
}

try {
    const app = initializeApp(firebaseConfig);
    console.log("Firebase App Initialized.");
    console.log("Configuration format indicates it IS readable.");
} catch (error) {
    console.error("Firebase Init Error:", error);
}
