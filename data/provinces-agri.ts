export interface ProvinceAgriData {
    id: number;
    name: string;
    topProducts: string[]; // En çok üretilen
    trendingProducts: string[]; // Rövanşta olan
    mostProfitable: string[]; // En karlı
    trade: {
        export: string[]; // İhracat ürünleri
        import: string[]; // İthalat (eksik olanlar)
    };
    climate: string;
    soil: string;
}

export const provincesData: Record<string, ProvinceAgriData> = {
    "01": {
        id: 1,
        name: "Adana",
        topProducts: ["Mısır", "Pamuk", "Narenciye"],
        trendingProducts: ["Soya", "Yer Fıstığı"],
        mostProfitable: ["Muz (Sera)", "Avokado"],
        trade: {
            export: ["Narenciye", "Pamuk"],
            import: ["Tropikal Meyveler"]
        },
        climate: "Akdeniz iklimi; yazlar sıcak ve kurak, kışlar ılık ve yağışlı.",
        soil: "Alüvyal, verimli Çukurova toprakları."
    },
    "06": {
        id: 6,
        name: "Ankara",
        topProducts: ["Buğday", "Arpa", "Şeker Pancarı"],
        trendingProducts: ["Aspir", "Kanola"],
        mostProfitable: ["Tıbbi Aromatik Bitkiler", "Kuru Soğan"],
        trade: {
            export: ["Un", "Makarna"],
            import: ["Pirinç"]
        },
        climate: "Karasal iklim; yazlar sıcak ve kurak, kışlar soğuk ve kar yağışlı.",
        soil: "Kireçli, tınlı bozkır toprakları."
    },
    "07": {
        id: 7,
        name: "Antalya",
        topProducts: ["Domates", "Salatalık", "Portakal"],
        trendingProducts: ["Ejder Meyvesi", "Mango"],
        mostProfitable: ["Tropikal Meyveler", "Kesme Çiçek"],
        trade: {
            export: ["Yaş Sebze Meyve", "Kesme Çiçek"],
            import: ["Tahıllar"]
        },
        climate: "Akdeniz iklimi; seracılık için çok uygun.",
        soil: "Terra Rossa ve alüvyal topraklar."
    },
    "42": {
        id: 42,
        name: "Konya",
        topProducts: ["Buğday", "Şeker Pancarı", "Mısır"],
        trendingProducts: ["Ayçiçeği", "Lale (Süs Bitkisi)"],
        mostProfitable: ["Tohumluk Üretimi", "Tıbbi Bitkiler"],
        trade: {
            export: ["Bisküvi", "Un"],
            import: ["Yağlı Tohumlar"]
        },
        climate: "Karasal iklim; düşük yağış.",
        soil: "Kireçli, tınlı, geniş ovalar."
    },
    "53": {
        id: 53,
        name: "Rize",
        topProducts: ["Çay", "Kivi"],
        trendingProducts: ["Yaban Mersini (Likapa)"],
        mostProfitable: ["Organik Çay", "Bal"],
        trade: {
            export: ["Çay"],
            import: ["Sebze", "Meyve"]
        },
        climate: "Karadeniz iklimi; her mevsim yağışlı.",
        soil: "Asidik, yıkanmış, kireçsiz kahverengi orman toprakları."
    },
    "63": {
        id: 63,
        name: "Şanlıurfa",
        topProducts: ["Pamuk", "Buğday", "Antep Fıstığı", "Kırmızı Mercimek"],
        trendingProducts: ["Badem", "Nar"],
        mostProfitable: ["İsot (Biber)", "Pamuk"],
        trade: {
            export: ["Pamuk", "Mercimek"],
            import: ["Gübre"]
        },
        climate: "Karasal iklim; yazlar çok sıcak ve kurak, kışlar ılık.",
        soil: "Kireçli, killi, verimli Harran ovası toprakları."
    },
    // Ege Bölgesi
    "İzmir": {
        id: 35,
        name: "İzmir",
        topProducts: ["Zeytin", "Üzüm", "İncir", "Pamuk"],
        trendingProducts: ["Enginar", "Süs Bitkileri"],
        mostProfitable: ["Organik Zeytinyağı", "Kuru İncir"],
        trade: {
            export: ["Kuru Meyve", "Zeytinyağı"],
            import: ["Yem Hammaddeleri"]
        },
        climate: "Akdeniz iklimi; yazlar sıcak, kışlar ılık.",
        soil: "Alüvyal, verimli Gediz ve Küçük Menderes havzaları."
    },
    "Manisa": {
        id: 45,
        name: "Manisa",
        topProducts: ["Üzüm (Sultaniye)", "Zeytin", "Kiraz"],
        trendingProducts: ["Badem", "Ceviz"],
        mostProfitable: ["Kuru Üzüm", "Kiraz"],
        trade: {
            export: ["Kuru Üzüm", "Kiraz"],
            import: ["Gübre"]
        },
        climate: "Akdeniz ve Karasal iklim geçişi.",
        soil: "Gediz ovasının verimli alüvyal toprakları."
    },
    "Aydın": {
        id: 9,
        name: "Aydın",
        topProducts: ["İncir", "Zeytin", "Pamuk", "Kestane"],
        trendingProducts: ["Çilek", "Enginar"],
        mostProfitable: ["Kuru İncir", "Zeytinyağı"],
        trade: {
            export: ["İncir", "Zeytin"],
            import: ["Tarım Makineleri"]
        },
        climate: "Akdeniz iklimi; çok sıcak yazlar.",
        soil: "Büyük Menderes ovası alüvyal toprakları."
    },
    // Marmara
    "Bursa": {
        id: 16,
        name: "Bursa",
        topProducts: ["Şeftali", "Zeytin", "Armut", "Domates"],
        trendingProducts: ["Yaban Mersini", "Ahududu"],
        mostProfitable: ["İpek Böcekçiliği", "Siyah İncir"],
        trade: {
            export: ["Meyve Suyu", "Dondurulmuş Gıda"],
            import: ["Tohum"]
        },
        climate: "Ilıman Marmara iklimi.",
        soil: "Verimli ova ve yamaç toprakları."
    },
    // Akdeniz
    "Mersin": {
        id: 33,
        name: "Mersin",
        topProducts: ["Muz", "Çilek", "Limon", "Narenciye"],
        trendingProducts: ["Avokado", "Ejder Meyvesi"],
        mostProfitable: ["Muz", "Çilek"],
        trade: {
            export: ["Narenciye", "Bakliyat"],
            import: ["Tropikal Meyveler"]
        },
        climate: "Akdeniz iklimi; mikroklima alanları.",
        soil: "Alüvyal kıyı ovaları."
    },
    // Güneydoğu
    "Gaziantep": {
        id: 27,
        name: "Gaziantep",
        topProducts: ["Antep Fıstığı", "Zeytin", "Üzüm"],
        trendingProducts: ["Sarımsak", "Badem"],
        mostProfitable: ["Antep Fıstığı", "Kırmızı Biber"],
        trade: {
            export: ["Antep Fıstığı", "Makarna"],
            import: ["Buğday"]
        },
        climate: "Akdeniz ve Karasal iklim geçişi.",
        soil: "Kireçli, kırmızı topraklar."
    },
    "Diyarbakır": {
        id: 21,
        name: "Diyarbakır",
        topProducts: ["Buğday", "Karpuz", "Pamuk"],
        trendingProducts: ["Mısır", "Mercimek"],
        mostProfitable: ["Karpuz", "Pamuk"],
        trade: {
            export: ["Mermer (Tarım dışı)", "Tahıl"],
            import: ["Tohum"]
        },
        climate: "Sert karasal iklim; yazlar çok sıcak.",
        soil: "Kırmızı kahverengi topraklar."
    },
    // Karadeniz
    "Samsun": {
        id: 55,
        name: "Samsun",
        topProducts: ["Fındık", "Çeltik (Pirinç)", "Mısır"],
        trendingProducts: ["Kivi", "Kenevir"],
        mostProfitable: ["Bafra Pirinci", "Fındık"],
        trade: {
            export: ["Fındık", "Un"],
            import: ["Buğday"]
        },
        climate: "Karadeniz iklimi.",
        soil: "Bafra ve Çarşamba ovaları alüvyal toprakları."
    }
};

// Helper to get data by plate number or name
export function getProvinceData(query: string): ProvinceAgriData {
    // Try by plate code first
    if (provincesData[query]) return provincesData[query];

    // Try by name (case insensitive)
    const lowerQuery = query.toLocaleLowerCase("tr");
    const found = Object.values(provincesData).find(p => p.name.toLocaleLowerCase("tr") === lowerQuery);
    if (found) return found;

    // Fallback for unknown provinces to prevent 404
    // We try to guess the name if the query is a plate number, otherwise use the query itself
    // Since we don't have a full list of names here, we'll just use a generic name
    return {
        id: parseInt(query) || 0,
        name: query.charAt(0).toUpperCase() + query.slice(1) + " (Veri Hazırlanıyor)",
        topProducts: ["-", "-", "-"],
        trendingProducts: ["-"],
        mostProfitable: ["-"],
        trade: {
            export: ["-"],
            import: ["-"]
        },
        climate: "Veri hazırlanıyor...",
        soil: "Veri hazırlanıyor..."
    };
}
