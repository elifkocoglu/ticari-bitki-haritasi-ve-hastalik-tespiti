const https = require('https');

const provinces = [
    "Adana", "Adıyaman", "Afyon", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin", "Aydın",
    "Ağrı", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur",
    "Bursa", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir",
    "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Iğdır", "Kahramanmaraş", "Karabük",
    "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", "Kocaeli", "Konya", "Kütahya", "Kırklareli",
    "Kırıkkale", "Kırşehir", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde",
    "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
    "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak", "Çanakkale", "Çankırı", "Çorum",
    "İstanbul", "İzmir", "Şanlıurfa", "Şırnak"
];

const failed = [];
const success = [];

async function checkProvince(province) {
    return new Promise((resolve) => {
        const url = `https://elifkocoglu-bitki-harita.hf.space/sehir-bilgisi?il=${encodeURIComponent(province)}`;

        const req = https.get(url, (res) => {
            if (res.statusCode === 200) {
                let data = '';
                res.on('data', (chunk) => data += chunk);
                res.on('end', () => {
                    try {
                        const json = JSON.parse(data);
                        if (json.sehir) {
                            success.push(province);
                            process.stdout.write('.');
                        } else {
                            failed.push(`${province} (Invalid JSON)`);
                            process.stdout.write('x');
                        }
                    } catch (e) {
                        failed.push(`${province} (Parse Error)`);
                        process.stdout.write('x');
                    }
                    resolve();
                });
            } else {
                failed.push(`${province} (Status ${res.statusCode})`);
                process.stdout.write('x');
                resolve();
            }
        });

        req.on('error', (e) => {
            failed.push(`${province} (Network Error)`);
            process.stdout.write('x');
            resolve();
        });

        // Set a short timeout to fail fast
        req.setTimeout(5000, () => {
            req.destroy();
            failed.push(`${province} (Timeout)`);
            process.stdout.write('T');
            resolve();
        });
    });
}

async function run() {
    console.log(`Checking ${provinces.length} provinces...`);

    // Process in chunks to avoid overwhelming the server
    const chunkSize = 5;
    for (let i = 0; i < provinces.length; i += chunkSize) {
        const chunk = provinces.slice(i, i + chunkSize);
        await Promise.all(chunk.map(p => checkProvince(p)));
    }

    console.log("\n\n--- Results ---");
    console.log(`Success: ${success.length}`);
    console.log(`Failed: ${failed.length}`);

    if (failed.length > 0) {
        console.log("\nFailed Provinces:");
        failed.forEach(f => console.log(`- ${f}`));
    } else {
        console.log("\nAll provinces fetched successfully!");
    }
}

run();
