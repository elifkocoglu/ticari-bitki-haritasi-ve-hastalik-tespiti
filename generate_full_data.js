const fs = require('fs');

// 1. Define the missing provinces and their regions/profiles
const missingProvinces = {
    "Adıyaman": { region: "Güneydoğu", plate: 2 },
    "Afyon": { region: "Ege_İç", plate: 3, name: "Afyonkarahisar" },
    "Aksaray": { region: "İç_Anadolu", plate: 68 },
    "Amasya": { region: "Karadeniz_İç", plate: 5 },
    "Ardahan": { region: "Doğu_Anadolu", plate: 75 },
    "Artvin": { region: "Karadeniz_Doğu", plate: 8 },
    "Ağrı": { region: "Doğu_Anadolu", plate: 4 },
    "Balıkesir": { region: "Marmara", plate: 10 },
    "Bartın": { region: "Karadeniz_Batı", plate: 74 },
    "Batman": { region: "Güneydoğu", plate: 72 },
    "Bayburt": { region: "Karadeniz_Doğu", plate: 69 },
    "Bilecik": { region: "Marmara", plate: 11 },
    "Bingöl": { region: "Doğu_Anadolu", plate: 12 },
    "Bitlis": { region: "Doğu_Anadolu", plate: 13 },
    "Bolu": { region: "Karadeniz_Batı", plate: 14 },
    "Burdur": { region: "Akdeniz_İç", plate: 15 },
    "Denizli": { region: "Ege_İç", plate: 20 },
    "Düzce": { region: "Karadeniz_Batı", plate: 81 },
    "Edirne": { region: "Marmara", plate: 22 },
    "Elazığ": { region: "Doğu_Anadolu", plate: 23 },
    "Erzincan": { region: "Doğu_Anadolu", plate: 24 },
    "Erzurum": { region: "Doğu_Anadolu", plate: 25 },
    "Eskişehir": { region: "İç_Anadolu", plate: 26 },
    "Giresun": { region: "Karadeniz_Doğu", plate: 28 },
    "Gümüşhane": { region: "Karadeniz_Doğu", plate: 29 },
    "Hakkari": { region: "Doğu_Anadolu", plate: 30 },
    "Hatay": { region: "Akdeniz", plate: 31 },
    "Isparta": { region: "Akdeniz_İç", plate: 32 },
    "Iğdır": { region: "Doğu_Anadolu", plate: 76 },
    "Kahramanmaraş": { region: "Akdeniz_Doğu", plate: 46 },
    "Karabük": { region: "Karadeniz_Batı", plate: 78 },
    "Karaman": { region: "İç_Anadolu", plate: 70 },
    "Kars": { region: "Doğu_Anadolu", plate: 36 },
    "Kastamonu": { region: "Karadeniz_Batı", plate: 37 },
    "Kayseri": { region: "İç_Anadolu", plate: 38 },
    "Kilis": { region: "Güneydoğu", plate: 79 },
    "Kütahya": { region: "Ege_İç", plate: 43 },
    "Kırklareli": { region: "Marmara", plate: 39 },
    "Kırıkkale": { region: "İç_Anadolu", plate: 71 },
    "Kırşehir": { region: "İç_Anadolu", plate: 40 },
    "Malatya": { region: "Doğu_Anadolu", plate: 44 },
    "Mardin": { region: "Güneydoğu", plate: 47 },
    "Muğla": { region: "Ege", plate: 48 },
    "Muş": { region: "Doğu_Anadolu", plate: 49 },
    "Nevşehir": { region: "İç_Anadolu", plate: 50 },
    "Niğde": { region: "İç_Anadolu", plate: 51 },
    "Ordu": { region: "Karadeniz_Doğu", plate: 52 },
    "Osmaniye": { region: "Akdeniz", plate: 80 },
    "Sakarya": { region: "Marmara", plate: 54 },
    "Siirt": { region: "Güneydoğu", plate: 56 },
    "Sinop": { region: "Karadeniz_Batı", plate: 57 },
    "Sivas": { region: "İç_Anadolu", plate: 58 },
    "Tekirdağ": { region: "Marmara", plate: 59 },
    "Tokat": { region: "Karadeniz_İç", plate: 60 },
    "Trabzon": { region: "Karadeniz_Doğu", plate: 61 },
    "Tunceli": { region: "Doğu_Anadolu", plate: 62 },
    "Uşak": { region: "Ege_İç", plate: 64 },
    "Van": { region: "Doğu_Anadolu", plate: 65 },
    "Yalova": { region: "Marmara", plate: 77 },
    "Yozgat": { region: "İç_Anadolu", plate: 66 },
    "Çanakkale": { region: "Marmara", plate: 17 },
    "Çankırı": { region: "İç_Anadolu", plate: 18 },
    "Çorum": { region: "Karadeniz_İç", plate: 19 },
    "İstanbul": { region: "Marmara", plate: 34 },
    "Şırnak": { region: "Güneydoğu", plate: 73 }
};

// Regional Profiles
const profiles = {
    "Marmara": {
        top: ["Ayçiçeği", "Buğday", "Pirinç", "Meyve"],
        trending: ["Kanola", "Lavanta"],
        profitable: ["Kesme Çiçek", "Üzüm"],
        climate: "Marmara iklimi; geçiş iklimi özellikleri.",
        soil: "Verimli ova toprakları."
    },
    "Ege": {
        top: ["Zeytin", "İncir", "Üzüm", "Pamuk"],
        trending: ["Enginar", "Avokado"],
        profitable: ["Zeytinyağı", "Kuru İncir"],
        climate: "Akdeniz iklimi.",
        soil: "Alüvyal topraklar."
    },
    "Ege_İç": {
        top: ["Haşhaş", "Buğday", "Şeker Pancarı", "Arpa"],
        trending: ["Lavanta", "Kekik"],
        profitable: ["Haşhaş", "Vişne"],
        climate: "Karasal iklim.",
        soil: "Kireçli topraklar."
    },
    "Akdeniz": {
        top: ["Narenciye", "Pamuk", "Muz", "Soya"],
        trending: ["Avokado", "Ejder Meyvesi"],
        profitable: ["Muz", "Çilek"],
        climate: "Akdeniz iklimi.",
        soil: "Terra Rossa."
    },
    "Akdeniz_İç": {
        top: ["Gül", "Lavanta", "Elma", "Kiraz"],
        trending: ["Tıbbi Bitkiler"],
        profitable: ["Gül Yağı", "Lavanta"],
        climate: "Akdeniz-Karasal geçiş.",
        soil: "Kireçli topraklar."
    },
    "Akdeniz_Doğu": {
        top: ["Pamuk", "Biber", "Mısır", "Zeytin"],
        trending: ["Badem"],
        profitable: ["Maraş Biberi", "Dondurma Hammaddesi"],
        climate: "Akdeniz iklimi.",
        soil: "Alüvyal topraklar."
    },
    "İç_Anadolu": {
        top: ["Buğday", "Arpa", "Şeker Pancarı", "Patates"],
        trending: ["Aspir", "Nohut"],
        profitable: ["Tohumluk", "Patates"],
        climate: "Karasal iklim.",
        soil: "Bozkır toprakları."
    },
    "Karadeniz_Batı": {
        top: ["Fındık", "Mısır", "Kestane"],
        trending: ["Kivi"],
        profitable: ["Fındık", "Orman Ürünleri"],
        climate: "Karadeniz iklimi.",
        soil: "Orman toprakları."
    },
    "Karadeniz_Doğu": {
        top: ["Çay", "Fındık", "Mısır", "Kivi"],
        trending: ["Yaban Mersini"],
        profitable: ["Organik Çay", "Bal"],
        climate: "Karadeniz iklimi; bol yağışlı.",
        soil: "Asidik topraklar."
    },
    "Karadeniz_İç": {
        top: ["Elma", "Üzüm", "Şeker Pancarı", "Tütün"],
        trending: ["Ceviz"],
        profitable: ["Amasya Elması", "Sebze"],
        climate: "Karasal-Karadeniz geçiş.",
        soil: "Verimli vadi toprakları."
    },
    "Doğu_Anadolu": {
        top: ["Arpa", "Yem Bitkileri", "Kayısı", "Hayvancılık"],
        trending: ["Organik Bal"],
        profitable: ["Kayısı", "Büyükbaş Hayvancılık"],
        climate: "Sert Karasal iklim.",
        soil: "Volkanik ve dağlık topraklar."
    },
    "Güneydoğu": {
        top: ["Pamuk", "Mercimek", "Antep Fıstığı", "Buğday"],
        trending: ["Badem", "Nar"],
        profitable: ["Antep Fıstığı", "Pamuk"],
        climate: "Karasal iklim; sıcak yazlar.",
        soil: "Kırmızı kahverengi topraklar."
    }
};

// Generate the new entries
let newEntries = "";

for (const [name, info] of Object.entries(missingProvinces)) {
    const profile = profiles[info.region];
    const plateStr = info.plate.toString().padStart(2, '0'); // e.g. "02"

    // Customize specific cities if needed
    let top = [...profile.top];
    let profitable = [...profile.profitable];

    if (name === "Malatya") { top = ["Kayısı", "Buğday"]; profitable = ["Kuru Kayısı"]; }
    if (name === "Ordu" || name === "Giresun") { top = ["Fındık", "Kivi"]; profitable = ["Fındık"]; }
    if (name === "Rize" || name === "Artvin") { top = ["Çay", "Kivi"]; profitable = ["Çay"]; }
    if (name === "Isparta") { top = ["Gül", "Elma", "Lavanta"]; profitable = ["Gül Yağı"]; }

    newEntries += `    "${info.plate}": {
        id: ${info.plate},
        name: "${info.name || name}",
        topProducts: ${JSON.stringify(top)},
        trendingProducts: ${JSON.stringify(profile.trending)},
        mostProfitable: ${JSON.stringify(profitable)},
        trade: {
            export: ${JSON.stringify(profitable)},
            import: ["Gübre", "Tohum"]
        },
        climate: "${profile.climate}",
        soil: "${profile.soil}"
    },\n`;
}

// Read the original file
const originalFile = fs.readFileSync('data/provinces-agri.ts', 'utf8');

// Find the position to insert (before the last closing brace of provincesData)
// We look for the line "};" that closes the object
const lastBraceIndex = originalFile.lastIndexOf("};");
const firstPart = originalFile.substring(0, lastBraceIndex);
const lastPart = originalFile.substring(lastBraceIndex);

// Combine
const finalContent = firstPart + "\n    // --- Generated Missing Provinces ---\n" + newEntries + lastPart;

fs.writeFileSync('data/provinces-agri.ts', finalContent);
console.log("Successfully added missing provinces!");
