const fs = require('fs');
const geojson = JSON.parse(fs.readFileSync('public/tr-provinces.geojson', 'utf8'));
const names = geojson.features.map(f => f.properties.name).sort();
console.log(names.join('\n'));
