const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'public', 'tr-provinces.geojson');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

console.log('--- All Provinces ---');
data.features.forEach(f => {
    console.log(`"${f.properties.name}",`);
});

console.log('--- Checking first 10 features ---');
data.features.slice(0, 10).forEach(f => {
    console.log(`ID: ${f.id}, Name: ${f.properties.name}`);
});

console.log('\n--- Checking specific cities ---');
const cities = ['Adana', 'Adıyaman', 'Ankara', 'İstanbul', 'İzmir'];
cities.forEach(city => {
    const found = data.features.find(f => f.properties.name === city || f.properties.name === city.toUpperCase());
    if (found) {
        console.log(`${city}: ID=${found.id}`);
    } else {
        console.log(`${city}: Not found`);
    }
});
