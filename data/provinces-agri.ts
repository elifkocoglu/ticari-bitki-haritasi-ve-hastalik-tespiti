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
    },
    "67": {
        id: 67,
        name: "Zonguldak",
        topProducts: ["Fındık", "Kestane", "Çilek (Osmanlı)"],
        trendingProducts: ["Kivi", "Defne Yaprağı"],
        mostProfitable: ["Kestane Balı", "Osmanlı Çileği"],
        trade: {
            export: ["Maden (Tarım dışı)", "Fındık"],
            import: ["Buğday"]
        },
        climate: "Karadeniz iklimi; her mevsim yağışlı.",
        soil: "Orman toprakları, kireçsiz kahverengi topraklar."
    },
    "41": {
        id: 41,
        name: "Kocaeli",
        topProducts: ["Buğday", "Mısır", "Fındık", "Sebze"],
        trendingProducts: ["Kivi", "Süs Bitkileri"],
        mostProfitable: ["Süs Bitkileri", "Kanatlı Hayvan Eti"],
        trade: {
            export: ["Süs Bitkileri", "İşlenmiş Gıda"],
            import: ["Tahıl"]
        },
        climate: "Marmara iklimi; Karadeniz ve Akdeniz iklimi geçiş özelliği.",
        soil: "Alüvyal ve kolüvyal topraklar, nemli toprak yapısı."
    },
    // --- Generated Missing Provinces ---
    "2": {
        id: 2,
        name: "Adıyaman",
        topProducts: ["Pamuk","Mercimek","Antep Fıstığı","Buğday"],
        trendingProducts: ["Badem","Nar"],
        mostProfitable: ["Antep Fıstığı","Pamuk"],
        trade: {
            export: ["Antep Fıstığı","Pamuk"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim; sıcak yazlar.",
        soil: "Kırmızı kahverengi topraklar."
    },
    "3": {
        id: 3,
        name: "Afyonkarahisar",
        topProducts: ["Haşhaş","Buğday","Şeker Pancarı","Arpa"],
        trendingProducts: ["Lavanta","Kekik"],
        mostProfitable: ["Haşhaş","Vişne"],
        trade: {
            export: ["Haşhaş","Vişne"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim.",
        soil: "Kireçli topraklar."
    },
    "68": {
        id: 68,
        name: "Aksaray",
        topProducts: ["Buğday","Arpa","Şeker Pancarı","Patates"],
        trendingProducts: ["Aspir","Nohut"],
        mostProfitable: ["Tohumluk","Patates"],
        trade: {
            export: ["Tohumluk","Patates"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim.",
        soil: "Bozkır toprakları."
    },
    "5": {
        id: 5,
        name: "Amasya",
        topProducts: ["Elma","Üzüm","Şeker Pancarı","Tütün"],
        trendingProducts: ["Ceviz"],
        mostProfitable: ["Amasya Elması","Sebze"],
        trade: {
            export: ["Amasya Elması","Sebze"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal-Karadeniz geçiş.",
        soil: "Verimli vadi toprakları."
    },
    "75": {
        id: 75,
        name: "Ardahan",
        topProducts: ["Arpa","Yem Bitkileri","Kayısı","Hayvancılık"],
        trendingProducts: ["Organik Bal"],
        mostProfitable: ["Kayısı","Büyükbaş Hayvancılık"],
        trade: {
            export: ["Kayısı","Büyükbaş Hayvancılık"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Sert Karasal iklim.",
        soil: "Volkanik ve dağlık topraklar."
    },
    "8": {
        id: 8,
        name: "Artvin",
        topProducts: ["Çay","Kivi"],
        trendingProducts: ["Yaban Mersini"],
        mostProfitable: ["Çay"],
        trade: {
            export: ["Çay"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karadeniz iklimi; bol yağışlı.",
        soil: "Asidik topraklar."
    },
    "4": {
        id: 4,
        name: "Ağrı",
        topProducts: ["Arpa","Yem Bitkileri","Kayısı","Hayvancılık"],
        trendingProducts: ["Organik Bal"],
        mostProfitable: ["Kayısı","Büyükbaş Hayvancılık"],
        trade: {
            export: ["Kayısı","Büyükbaş Hayvancılık"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Sert Karasal iklim.",
        soil: "Volkanik ve dağlık topraklar."
    },
    "10": {
        id: 10,
        name: "Balıkesir",
        topProducts: ["Ayçiçeği","Buğday","Pirinç","Meyve"],
        trendingProducts: ["Kanola","Lavanta"],
        mostProfitable: ["Kesme Çiçek","Üzüm"],
        trade: {
            export: ["Kesme Çiçek","Üzüm"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Marmara iklimi; geçiş iklimi özellikleri.",
        soil: "Verimli ova toprakları."
    },
    "74": {
        id: 74,
        name: "Bartın",
        topProducts: ["Fındık","Mısır","Kestane"],
        trendingProducts: ["Kivi"],
        mostProfitable: ["Fındık","Orman Ürünleri"],
        trade: {
            export: ["Fındık","Orman Ürünleri"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karadeniz iklimi.",
        soil: "Orman toprakları."
    },
    "72": {
        id: 72,
        name: "Batman",
        topProducts: ["Pamuk","Mercimek","Antep Fıstığı","Buğday"],
        trendingProducts: ["Badem","Nar"],
        mostProfitable: ["Antep Fıstığı","Pamuk"],
        trade: {
            export: ["Antep Fıstığı","Pamuk"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim; sıcak yazlar.",
        soil: "Kırmızı kahverengi topraklar."
    },
    "69": {
        id: 69,
        name: "Bayburt",
        topProducts: ["Çay","Fındık","Mısır","Kivi"],
        trendingProducts: ["Yaban Mersini"],
        mostProfitable: ["Organik Çay","Bal"],
        trade: {
            export: ["Organik Çay","Bal"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karadeniz iklimi; bol yağışlı.",
        soil: "Asidik topraklar."
    },
    "11": {
        id: 11,
        name: "Bilecik",
        topProducts: ["Ayçiçeği","Buğday","Pirinç","Meyve"],
        trendingProducts: ["Kanola","Lavanta"],
        mostProfitable: ["Kesme Çiçek","Üzüm"],
        trade: {
            export: ["Kesme Çiçek","Üzüm"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Marmara iklimi; geçiş iklimi özellikleri.",
        soil: "Verimli ova toprakları."
    },
    "12": {
        id: 12,
        name: "Bingöl",
        topProducts: ["Arpa","Yem Bitkileri","Kayısı","Hayvancılık"],
        trendingProducts: ["Organik Bal"],
        mostProfitable: ["Kayısı","Büyükbaş Hayvancılık"],
        trade: {
            export: ["Kayısı","Büyükbaş Hayvancılık"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Sert Karasal iklim.",
        soil: "Volkanik ve dağlık topraklar."
    },
    "13": {
        id: 13,
        name: "Bitlis",
        topProducts: ["Arpa","Yem Bitkileri","Kayısı","Hayvancılık"],
        trendingProducts: ["Organik Bal"],
        mostProfitable: ["Kayısı","Büyükbaş Hayvancılık"],
        trade: {
            export: ["Kayısı","Büyükbaş Hayvancılık"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Sert Karasal iklim.",
        soil: "Volkanik ve dağlık topraklar."
    },
    "14": {
        id: 14,
        name: "Bolu",
        topProducts: ["Fındık","Mısır","Kestane"],
        trendingProducts: ["Kivi"],
        mostProfitable: ["Fındık","Orman Ürünleri"],
        trade: {
            export: ["Fındık","Orman Ürünleri"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karadeniz iklimi.",
        soil: "Orman toprakları."
    },
    "15": {
        id: 15,
        name: "Burdur",
        topProducts: ["Gül","Lavanta","Elma","Kiraz"],
        trendingProducts: ["Tıbbi Bitkiler"],
        mostProfitable: ["Gül Yağı","Lavanta"],
        trade: {
            export: ["Gül Yağı","Lavanta"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Akdeniz-Karasal geçiş.",
        soil: "Kireçli topraklar."
    },
    "20": {
        id: 20,
        name: "Denizli",
        topProducts: ["Haşhaş","Buğday","Şeker Pancarı","Arpa"],
        trendingProducts: ["Lavanta","Kekik"],
        mostProfitable: ["Haşhaş","Vişne"],
        trade: {
            export: ["Haşhaş","Vişne"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim.",
        soil: "Kireçli topraklar."
    },
    "81": {
        id: 81,
        name: "Düzce",
        topProducts: ["Fındık","Mısır","Kestane"],
        trendingProducts: ["Kivi"],
        mostProfitable: ["Fındık","Orman Ürünleri"],
        trade: {
            export: ["Fındık","Orman Ürünleri"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karadeniz iklimi.",
        soil: "Orman toprakları."
    },
    "22": {
        id: 22,
        name: "Edirne",
        topProducts: ["Ayçiçeği","Buğday","Pirinç","Meyve"],
        trendingProducts: ["Kanola","Lavanta"],
        mostProfitable: ["Kesme Çiçek","Üzüm"],
        trade: {
            export: ["Kesme Çiçek","Üzüm"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Marmara iklimi; geçiş iklimi özellikleri.",
        soil: "Verimli ova toprakları."
    },
    "23": {
        id: 23,
        name: "Elazığ",
        topProducts: ["Arpa","Yem Bitkileri","Kayısı","Hayvancılık"],
        trendingProducts: ["Organik Bal"],
        mostProfitable: ["Kayısı","Büyükbaş Hayvancılık"],
        trade: {
            export: ["Kayısı","Büyükbaş Hayvancılık"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Sert Karasal iklim.",
        soil: "Volkanik ve dağlık topraklar."
    },
    "24": {
        id: 24,
        name: "Erzincan",
        topProducts: ["Arpa","Yem Bitkileri","Kayısı","Hayvancılık"],
        trendingProducts: ["Organik Bal"],
        mostProfitable: ["Kayısı","Büyükbaş Hayvancılık"],
        trade: {
            export: ["Kayısı","Büyükbaş Hayvancılık"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Sert Karasal iklim.",
        soil: "Volkanik ve dağlık topraklar."
    },
    "25": {
        id: 25,
        name: "Erzurum",
        topProducts: ["Arpa","Yem Bitkileri","Kayısı","Hayvancılık"],
        trendingProducts: ["Organik Bal"],
        mostProfitable: ["Kayısı","Büyükbaş Hayvancılık"],
        trade: {
            export: ["Kayısı","Büyükbaş Hayvancılık"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Sert Karasal iklim.",
        soil: "Volkanik ve dağlık topraklar."
    },
    "26": {
        id: 26,
        name: "Eskişehir",
        topProducts: ["Buğday","Arpa","Şeker Pancarı","Patates"],
        trendingProducts: ["Aspir","Nohut"],
        mostProfitable: ["Tohumluk","Patates"],
        trade: {
            export: ["Tohumluk","Patates"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim.",
        soil: "Bozkır toprakları."
    },
    "28": {
        id: 28,
        name: "Giresun",
        topProducts: ["Fındık","Kivi"],
        trendingProducts: ["Yaban Mersini"],
        mostProfitable: ["Fındık"],
        trade: {
            export: ["Fındık"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karadeniz iklimi; bol yağışlı.",
        soil: "Asidik topraklar."
    },
    "29": {
        id: 29,
        name: "Gümüşhane",
        topProducts: ["Çay","Fındık","Mısır","Kivi"],
        trendingProducts: ["Yaban Mersini"],
        mostProfitable: ["Organik Çay","Bal"],
        trade: {
            export: ["Organik Çay","Bal"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karadeniz iklimi; bol yağışlı.",
        soil: "Asidik topraklar."
    },
    "30": {
        id: 30,
        name: "Hakkari",
        topProducts: ["Arpa","Yem Bitkileri","Kayısı","Hayvancılık"],
        trendingProducts: ["Organik Bal"],
        mostProfitable: ["Kayısı","Büyükbaş Hayvancılık"],
        trade: {
            export: ["Kayısı","Büyükbaş Hayvancılık"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Sert Karasal iklim.",
        soil: "Volkanik ve dağlık topraklar."
    },
    "31": {
        id: 31,
        name: "Hatay",
        topProducts: ["Narenciye","Pamuk","Muz","Soya"],
        trendingProducts: ["Avokado","Ejder Meyvesi"],
        mostProfitable: ["Muz","Çilek"],
        trade: {
            export: ["Muz","Çilek"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Akdeniz iklimi.",
        soil: "Terra Rossa."
    },
    "32": {
        id: 32,
        name: "Isparta",
        topProducts: ["Gül","Elma","Lavanta"],
        trendingProducts: ["Tıbbi Bitkiler"],
        mostProfitable: ["Gül Yağı"],
        trade: {
            export: ["Gül Yağı"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Akdeniz-Karasal geçiş.",
        soil: "Kireçli topraklar."
    },
    "76": {
        id: 76,
        name: "Iğdır",
        topProducts: ["Arpa","Yem Bitkileri","Kayısı","Hayvancılık"],
        trendingProducts: ["Organik Bal"],
        mostProfitable: ["Kayısı","Büyükbaş Hayvancılık"],
        trade: {
            export: ["Kayısı","Büyükbaş Hayvancılık"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Sert Karasal iklim.",
        soil: "Volkanik ve dağlık topraklar."
    },
    "46": {
        id: 46,
        name: "Kahramanmaraş",
        topProducts: ["Pamuk","Biber","Mısır","Zeytin"],
        trendingProducts: ["Badem"],
        mostProfitable: ["Maraş Biberi","Dondurma Hammaddesi"],
        trade: {
            export: ["Maraş Biberi","Dondurma Hammaddesi"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Akdeniz iklimi.",
        soil: "Alüvyal topraklar."
    },
    "78": {
        id: 78,
        name: "Karabük",
        topProducts: ["Fındık","Mısır","Kestane"],
        trendingProducts: ["Kivi"],
        mostProfitable: ["Fındık","Orman Ürünleri"],
        trade: {
            export: ["Fındık","Orman Ürünleri"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karadeniz iklimi.",
        soil: "Orman toprakları."
    },
    "70": {
        id: 70,
        name: "Karaman",
        topProducts: ["Buğday","Arpa","Şeker Pancarı","Patates"],
        trendingProducts: ["Aspir","Nohut"],
        mostProfitable: ["Tohumluk","Patates"],
        trade: {
            export: ["Tohumluk","Patates"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim.",
        soil: "Bozkır toprakları."
    },
    "36": {
        id: 36,
        name: "Kars",
        topProducts: ["Arpa","Yem Bitkileri","Kayısı","Hayvancılık"],
        trendingProducts: ["Organik Bal"],
        mostProfitable: ["Kayısı","Büyükbaş Hayvancılık"],
        trade: {
            export: ["Kayısı","Büyükbaş Hayvancılık"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Sert Karasal iklim.",
        soil: "Volkanik ve dağlık topraklar."
    },
    "37": {
        id: 37,
        name: "Kastamonu",
        topProducts: ["Fındık","Mısır","Kestane"],
        trendingProducts: ["Kivi"],
        mostProfitable: ["Fındık","Orman Ürünleri"],
        trade: {
            export: ["Fındık","Orman Ürünleri"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karadeniz iklimi.",
        soil: "Orman toprakları."
    },
    "38": {
        id: 38,
        name: "Kayseri",
        topProducts: ["Buğday","Arpa","Şeker Pancarı","Patates"],
        trendingProducts: ["Aspir","Nohut"],
        mostProfitable: ["Tohumluk","Patates"],
        trade: {
            export: ["Tohumluk","Patates"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim.",
        soil: "Bozkır toprakları."
    },
    "79": {
        id: 79,
        name: "Kilis",
        topProducts: ["Pamuk","Mercimek","Antep Fıstığı","Buğday"],
        trendingProducts: ["Badem","Nar"],
        mostProfitable: ["Antep Fıstığı","Pamuk"],
        trade: {
            export: ["Antep Fıstığı","Pamuk"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim; sıcak yazlar.",
        soil: "Kırmızı kahverengi topraklar."
    },
    "43": {
        id: 43,
        name: "Kütahya",
        topProducts: ["Haşhaş","Buğday","Şeker Pancarı","Arpa"],
        trendingProducts: ["Lavanta","Kekik"],
        mostProfitable: ["Haşhaş","Vişne"],
        trade: {
            export: ["Haşhaş","Vişne"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim.",
        soil: "Kireçli topraklar."
    },
    "39": {
        id: 39,
        name: "Kırklareli",
        topProducts: ["Ayçiçeği","Buğday","Pirinç","Meyve"],
        trendingProducts: ["Kanola","Lavanta"],
        mostProfitable: ["Kesme Çiçek","Üzüm"],
        trade: {
            export: ["Kesme Çiçek","Üzüm"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Marmara iklimi; geçiş iklimi özellikleri.",
        soil: "Verimli ova toprakları."
    },
    "71": {
        id: 71,
        name: "Kırıkkale",
        topProducts: ["Buğday","Arpa","Şeker Pancarı","Patates"],
        trendingProducts: ["Aspir","Nohut"],
        mostProfitable: ["Tohumluk","Patates"],
        trade: {
            export: ["Tohumluk","Patates"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim.",
        soil: "Bozkır toprakları."
    },
    "40": {
        id: 40,
        name: "Kırşehir",
        topProducts: ["Buğday","Arpa","Şeker Pancarı","Patates"],
        trendingProducts: ["Aspir","Nohut"],
        mostProfitable: ["Tohumluk","Patates"],
        trade: {
            export: ["Tohumluk","Patates"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim.",
        soil: "Bozkır toprakları."
    },
    "44": {
        id: 44,
        name: "Malatya",
        topProducts: ["Kayısı","Buğday"],
        trendingProducts: ["Organik Bal"],
        mostProfitable: ["Kuru Kayısı"],
        trade: {
            export: ["Kuru Kayısı"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Sert Karasal iklim.",
        soil: "Volkanik ve dağlık topraklar."
    },
    "47": {
        id: 47,
        name: "Mardin",
        topProducts: ["Pamuk","Mercimek","Antep Fıstığı","Buğday"],
        trendingProducts: ["Badem","Nar"],
        mostProfitable: ["Antep Fıstığı","Pamuk"],
        trade: {
            export: ["Antep Fıstığı","Pamuk"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim; sıcak yazlar.",
        soil: "Kırmızı kahverengi topraklar."
    },
    "48": {
        id: 48,
        name: "Muğla",
        topProducts: ["Zeytin","İncir","Üzüm","Pamuk"],
        trendingProducts: ["Enginar","Avokado"],
        mostProfitable: ["Zeytinyağı","Kuru İncir"],
        trade: {
            export: ["Zeytinyağı","Kuru İncir"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Akdeniz iklimi.",
        soil: "Alüvyal topraklar."
    },
    "49": {
        id: 49,
        name: "Muş",
        topProducts: ["Arpa","Yem Bitkileri","Kayısı","Hayvancılık"],
        trendingProducts: ["Organik Bal"],
        mostProfitable: ["Kayısı","Büyükbaş Hayvancılık"],
        trade: {
            export: ["Kayısı","Büyükbaş Hayvancılık"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Sert Karasal iklim.",
        soil: "Volkanik ve dağlık topraklar."
    },
    "50": {
        id: 50,
        name: "Nevşehir",
        topProducts: ["Buğday","Arpa","Şeker Pancarı","Patates"],
        trendingProducts: ["Aspir","Nohut"],
        mostProfitable: ["Tohumluk","Patates"],
        trade: {
            export: ["Tohumluk","Patates"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim.",
        soil: "Bozkır toprakları."
    },
    "51": {
        id: 51,
        name: "Niğde",
        topProducts: ["Buğday","Arpa","Şeker Pancarı","Patates"],
        trendingProducts: ["Aspir","Nohut"],
        mostProfitable: ["Tohumluk","Patates"],
        trade: {
            export: ["Tohumluk","Patates"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim.",
        soil: "Bozkır toprakları."
    },
    "52": {
        id: 52,
        name: "Ordu",
        topProducts: ["Fındık","Kivi"],
        trendingProducts: ["Yaban Mersini"],
        mostProfitable: ["Fındık"],
        trade: {
            export: ["Fındık"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karadeniz iklimi; bol yağışlı.",
        soil: "Asidik topraklar."
    },
    "80": {
        id: 80,
        name: "Osmaniye",
        topProducts: ["Narenciye","Pamuk","Muz","Soya"],
        trendingProducts: ["Avokado","Ejder Meyvesi"],
        mostProfitable: ["Muz","Çilek"],
        trade: {
            export: ["Muz","Çilek"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Akdeniz iklimi.",
        soil: "Terra Rossa."
    },
    "54": {
        id: 54,
        name: "Sakarya",
        topProducts: ["Ayçiçeği","Buğday","Pirinç","Meyve"],
        trendingProducts: ["Kanola","Lavanta"],
        mostProfitable: ["Kesme Çiçek","Üzüm"],
        trade: {
            export: ["Kesme Çiçek","Üzüm"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Marmara iklimi; geçiş iklimi özellikleri.",
        soil: "Verimli ova toprakları."
    },
    "56": {
        id: 56,
        name: "Siirt",
        topProducts: ["Pamuk","Mercimek","Antep Fıstığı","Buğday"],
        trendingProducts: ["Badem","Nar"],
        mostProfitable: ["Antep Fıstığı","Pamuk"],
        trade: {
            export: ["Antep Fıstığı","Pamuk"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim; sıcak yazlar.",
        soil: "Kırmızı kahverengi topraklar."
    },
    "57": {
        id: 57,
        name: "Sinop",
        topProducts: ["Fındık","Mısır","Kestane"],
        trendingProducts: ["Kivi"],
        mostProfitable: ["Fındık","Orman Ürünleri"],
        trade: {
            export: ["Fındık","Orman Ürünleri"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karadeniz iklimi.",
        soil: "Orman toprakları."
    },
    "58": {
        id: 58,
        name: "Sivas",
        topProducts: ["Buğday","Arpa","Şeker Pancarı","Patates"],
        trendingProducts: ["Aspir","Nohut"],
        mostProfitable: ["Tohumluk","Patates"],
        trade: {
            export: ["Tohumluk","Patates"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim.",
        soil: "Bozkır toprakları."
    },
    "59": {
        id: 59,
        name: "Tekirdağ",
        topProducts: ["Ayçiçeği","Buğday","Pirinç","Meyve"],
        trendingProducts: ["Kanola","Lavanta"],
        mostProfitable: ["Kesme Çiçek","Üzüm"],
        trade: {
            export: ["Kesme Çiçek","Üzüm"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Marmara iklimi; geçiş iklimi özellikleri.",
        soil: "Verimli ova toprakları."
    },
    "60": {
        id: 60,
        name: "Tokat",
        topProducts: ["Elma","Üzüm","Şeker Pancarı","Tütün"],
        trendingProducts: ["Ceviz"],
        mostProfitable: ["Amasya Elması","Sebze"],
        trade: {
            export: ["Amasya Elması","Sebze"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal-Karadeniz geçiş.",
        soil: "Verimli vadi toprakları."
    },
    "61": {
        id: 61,
        name: "Trabzon",
        topProducts: ["Çay","Fındık","Mısır","Kivi"],
        trendingProducts: ["Yaban Mersini"],
        mostProfitable: ["Organik Çay","Bal"],
        trade: {
            export: ["Organik Çay","Bal"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karadeniz iklimi; bol yağışlı.",
        soil: "Asidik topraklar."
    },
    "62": {
        id: 62,
        name: "Tunceli",
        topProducts: ["Arpa","Yem Bitkileri","Kayısı","Hayvancılık"],
        trendingProducts: ["Organik Bal"],
        mostProfitable: ["Kayısı","Büyükbaş Hayvancılık"],
        trade: {
            export: ["Kayısı","Büyükbaş Hayvancılık"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Sert Karasal iklim.",
        soil: "Volkanik ve dağlık topraklar."
    },
    "64": {
        id: 64,
        name: "Uşak",
        topProducts: ["Haşhaş","Buğday","Şeker Pancarı","Arpa"],
        trendingProducts: ["Lavanta","Kekik"],
        mostProfitable: ["Haşhaş","Vişne"],
        trade: {
            export: ["Haşhaş","Vişne"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim.",
        soil: "Kireçli topraklar."
    },
    "65": {
        id: 65,
        name: "Van",
        topProducts: ["Arpa","Yem Bitkileri","Kayısı","Hayvancılık"],
        trendingProducts: ["Organik Bal"],
        mostProfitable: ["Kayısı","Büyükbaş Hayvancılık"],
        trade: {
            export: ["Kayısı","Büyükbaş Hayvancılık"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Sert Karasal iklim.",
        soil: "Volkanik ve dağlık topraklar."
    },
    "77": {
        id: 77,
        name: "Yalova",
        topProducts: ["Ayçiçeği","Buğday","Pirinç","Meyve"],
        trendingProducts: ["Kanola","Lavanta"],
        mostProfitable: ["Kesme Çiçek","Üzüm"],
        trade: {
            export: ["Kesme Çiçek","Üzüm"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Marmara iklimi; geçiş iklimi özellikleri.",
        soil: "Verimli ova toprakları."
    },
    "66": {
        id: 66,
        name: "Yozgat",
        topProducts: ["Buğday","Arpa","Şeker Pancarı","Patates"],
        trendingProducts: ["Aspir","Nohut"],
        mostProfitable: ["Tohumluk","Patates"],
        trade: {
            export: ["Tohumluk","Patates"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim.",
        soil: "Bozkır toprakları."
    },
    "17": {
        id: 17,
        name: "Çanakkale",
        topProducts: ["Ayçiçeği","Buğday","Pirinç","Meyve"],
        trendingProducts: ["Kanola","Lavanta"],
        mostProfitable: ["Kesme Çiçek","Üzüm"],
        trade: {
            export: ["Kesme Çiçek","Üzüm"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Marmara iklimi; geçiş iklimi özellikleri.",
        soil: "Verimli ova toprakları."
    },
    "18": {
        id: 18,
        name: "Çankırı",
        topProducts: ["Buğday","Arpa","Şeker Pancarı","Patates"],
        trendingProducts: ["Aspir","Nohut"],
        mostProfitable: ["Tohumluk","Patates"],
        trade: {
            export: ["Tohumluk","Patates"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim.",
        soil: "Bozkır toprakları."
    },
    "19": {
        id: 19,
        name: "Çorum",
        topProducts: ["Elma","Üzüm","Şeker Pancarı","Tütün"],
        trendingProducts: ["Ceviz"],
        mostProfitable: ["Amasya Elması","Sebze"],
        trade: {
            export: ["Amasya Elması","Sebze"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal-Karadeniz geçiş.",
        soil: "Verimli vadi toprakları."
    },
    "34": {
        id: 34,
        name: "İstanbul",
        topProducts: ["Ayçiçeği","Buğday","Pirinç","Meyve"],
        trendingProducts: ["Kanola","Lavanta"],
        mostProfitable: ["Kesme Çiçek","Üzüm"],
        trade: {
            export: ["Kesme Çiçek","Üzüm"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Marmara iklimi; geçiş iklimi özellikleri.",
        soil: "Verimli ova toprakları."
    },
    "73": {
        id: 73,
        name: "Şırnak",
        topProducts: ["Pamuk","Mercimek","Antep Fıstığı","Buğday"],
        trendingProducts: ["Badem","Nar"],
        mostProfitable: ["Antep Fıstığı","Pamuk"],
        trade: {
            export: ["Antep Fıstığı","Pamuk"],
            import: ["Gübre", "Tohum"]
        },
        climate: "Karasal iklim; sıcak yazlar.",
        soil: "Kırmızı kahverengi topraklar."
    },
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
