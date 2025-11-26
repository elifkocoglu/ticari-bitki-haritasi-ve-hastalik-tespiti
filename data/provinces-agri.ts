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
        name: "Diğer İl (Veri Hazırlanıyor)",
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
