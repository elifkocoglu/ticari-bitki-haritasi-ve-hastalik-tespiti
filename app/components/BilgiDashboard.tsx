"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type Plant = { name: string };

type MarketItem = {
    name: string;
    unit: string;
    min: string;
    max: string;
    avg: string;
};

type ProductionItem = {
    name: string;
    amount: string;
    region: string;
    change: string;
    trend: 'up' | 'down' | 'stable';
};

const TUIK_DATA: ProductionItem[] = [
    // TAHILLAR (Cereals)
    { name: 'Buğday (Ekmeklik)', amount: '17.5 Milyon Ton', region: 'İç Anadolu', change: '%2.1 Artış', trend: 'up' },
    { name: 'Buğday (Makarnalık)', amount: '3.5 Milyon Ton', region: 'Güneydoğu Anadolu', change: '%5.0 Artış', trend: 'up' },
    { name: 'Arpa', amount: '8.5 Milyon Ton', region: 'İç Anadolu', change: '%2.4 Artış', trend: 'up' },
    { name: 'Mısır (Dane)', amount: '9.1 Milyon Ton', region: 'Akdeniz', change: '%7.0 Artış', trend: 'up' },
    { name: 'Mısır (Silajlık)', amount: '28 Milyon Ton', region: 'Ege', change: '%4.0 Artış', trend: 'up' },
    { name: 'Çeltik (Pirinç)', amount: '950 Bin Ton', region: 'Trakya', change: '%1.5 Artış', trend: 'up' },
    { name: 'Yulaf', amount: '280 Bin Ton', region: 'Marmara', change: '%1.0 Azalış', trend: 'down' },
    { name: 'Çavdar', amount: '290 Bin Ton', region: 'İç Anadolu', change: '%0.5 Artış', trend: 'stable' },
    { name: 'Tritikale', amount: '350 Bin Ton', region: 'İç Anadolu', change: '%3.0 Artış', trend: 'up' },
    { name: 'Darı', amount: '5 Bin Ton', region: 'Güneydoğu', change: '%2.0 Azalış', trend: 'down' },
    { name: 'Kuş Yemi', amount: '2 Bin Ton', region: 'İç Anadolu', change: '%1.0 Artış', trend: 'up' },

    // BAKLAGİLLER (Pulses)
    { name: 'Nohut', amount: '580 Bin Ton', region: 'İç Anadolu', change: '%6.0 Artış', trend: 'up' },
    { name: 'Kuru Fasulye', amount: '270 Bin Ton', region: 'İç Anadolu', change: '%2.1 Azalış', trend: 'down' },
    { name: 'Kırmızı Mercimek', amount: '380 Bin Ton', region: 'Güneydoğu Anadolu', change: '%5.5 Artış', trend: 'up' },
    { name: 'Yeşil Mercimek', amount: '45 Bin Ton', region: 'Yozgat', change: '%1.2 Artış', trend: 'up' },
    { name: 'Bakla (Yemeklik)', amount: '6 Bin Ton', region: 'Ege', change: '%3.0 Azalış', trend: 'down' },
    { name: 'Bezelye (Kuru)', amount: '3 Bin Ton', region: 'Burdur', change: '%0.5 Artış', trend: 'stable' },
    { name: 'Fiğ (Dane)', amount: '120 Bin Ton', region: 'Doğu Anadolu', change: '%2.0 Artış', trend: 'up' },

    // ENDÜSTRİ BİTKİLERİ (Industrial Crops)
    { name: 'Şeker Pancarı', amount: '19.2 Milyon Ton', region: 'İç Anadolu', change: '%3.8 Artış', trend: 'up' },
    { name: 'Pamuk (Kütlü)', amount: '2.5 Milyon Ton', region: 'Güneydoğu Anadolu', change: '%12 Artış', trend: 'up' },
    { name: 'Ayçiçeği (Yağlık)', amount: '2.4 Milyon Ton', region: 'Trakya', change: '%4.2 Azalış', trend: 'down' },
    { name: 'Ayçiçeği (Çerezlik)', amount: '150 Bin Ton', region: 'İç Anadolu', change: '%5.0 Artış', trend: 'up' },
    { name: 'Soya', amount: '150 Bin Ton', region: 'Adana', change: '%8.0 Artış', trend: 'up' },
    { name: 'Yer Fıstığı', amount: '190 Bin Ton', region: 'Akdeniz', change: '%3.5 Artış', trend: 'up' },
    { name: 'Susam', amount: '18 Bin Ton', region: 'Ege', change: '%1.0 Azalış', trend: 'down' },
    { name: 'Kanola', amount: '140 Bin Ton', region: 'Trakya', change: '%15 Artış', trend: 'up' },
    { name: 'Aspir', amount: '35 Bin Ton', region: 'İç Anadolu', change: '%10 Azalış', trend: 'down' },
    { name: 'Haşhaş (Tohum)', amount: '25 Bin Ton', region: 'Afyon', change: '%0.5 Artış', trend: 'stable' },
    { name: 'Tütün', amount: '80 Bin Ton', region: 'Ege', change: '%2.0 Artış', trend: 'up' },
    { name: 'Çay (Yaş)', amount: '1.4 Milyon Ton', region: 'Karadeniz', change: '%0.2 Artış', trend: 'stable' },
    { name: 'Anason', amount: '9 Bin Ton', region: 'Burdur', change: '%1.0 Azalış', trend: 'down' },
    { name: 'Kimyon', amount: '12 Bin Ton', region: 'Ankara', change: '%5.0 Artış', trend: 'up' },
    { name: 'Tıbbi Nane', amount: '4 Bin Ton', region: 'Gaziantep', change: '%3.0 Artış', trend: 'up' },
    { name: 'Lavanta', amount: '5 Bin Ton', region: 'Isparta', change: '%20 Artış', trend: 'up' },
    { name: 'Gül (Çiçeği)', amount: '14 Bin Ton', region: 'Isparta', change: '%1.5 Artış', trend: 'up' },

    // YUMRU BİTKİLER (Tubers)
    { name: 'Patates', amount: '5.4 Milyon Ton', region: 'İç Anadolu', change: '%1.2 Artış', trend: 'up' },
    { name: 'Kuru Soğan', amount: '2.3 Milyon Ton', region: 'Ankara', change: '%0.5 Azalış', trend: 'stable' },
    { name: 'Sarımsak', amount: '140 Bin Ton', region: 'Gaziantep/Kastamonu', change: '%8.0 Artış', trend: 'up' },
    { name: 'Yer Elması', amount: '3 Bin Ton', region: 'Çeşitli', change: '%0.0', trend: 'stable' },

    // SEBZELER (Vegetables)
    { name: 'Domates (Sofralık)', amount: '9.0 Milyon Ton', region: 'Akdeniz', change: '%2.0 Artış', trend: 'up' },
    { name: 'Domates (Salçalık)', amount: '4.5 Milyon Ton', region: 'Marmara/Ege', change: '%5.0 Artış', trend: 'up' },
    { name: 'Hıyar', amount: '1.9 Milyon Ton', region: 'Akdeniz', change: '%1.5 Artış', trend: 'up' },
    { name: 'Biber (Sivri)', amount: '1.2 Milyon Ton', region: 'Akdeniz', change: '%3.0 Artış', trend: 'up' },
    { name: 'Biber (Salçalık)', amount: '1.5 Milyon Ton', region: 'Güneydoğu', change: '%2.5 Artış', trend: 'up' },
    { name: 'Biber (Dolmalık)', amount: '400 Bin Ton', region: 'Marmara', change: '%1.0 Artış', trend: 'up' },
    { name: 'Patlıcan', amount: '780 Bin Ton', region: 'Akdeniz', change: '%2.0 Artış', trend: 'up' },
    { name: 'Kabak (Sakız)', amount: '450 Bin Ton', region: 'Akdeniz', change: '%3.0 Artış', trend: 'up' },
    { name: 'Taze Fasulye', amount: '550 Bin Ton', region: 'Karadeniz/Ege', change: '%1.0 Azalış', trend: 'down' },
    { name: 'Bakla (Taze)', amount: '35 Bin Ton', region: 'Ege', change: '%2.0 Azalış', trend: 'down' },
    { name: 'Bezelye (Taze)', amount: '110 Bin Ton', region: 'Marmara', change: '%0.5 Artış', trend: 'stable' },
    { name: 'Havuç', amount: '650 Bin Ton', region: 'Konya', change: '%7.0 Artış', trend: 'up' },
    { name: 'Ispanak', amount: '230 Bin Ton', region: 'Ege', change: '%2.0 Artış', trend: 'up' },
    { name: 'Pırasa', amount: '180 Bin Ton', region: 'Ege', change: '%1.0 Artış', trend: 'up' },
    { name: 'Lahana (Beyaz)', amount: '600 Bin Ton', region: 'Karadeniz', change: '%0.5 Artış', trend: 'stable' },
    { name: 'Lahana (Kırmızı)', amount: '200 Bin Ton', region: 'Bursa', change: '%3.0 Artış', trend: 'up' },
    { name: 'Marul (Kıvırcık)', amount: '550 Bin Ton', region: 'Akdeniz', change: '%4.0 Artış', trend: 'up' },
    { name: 'Karnabahar', amount: '240 Bin Ton', region: 'Samsun', change: '%6.0 Artış', trend: 'up' },
    { name: 'Brokoli', amount: '110 Bin Ton', region: 'Samsun/İzmir', change: '%12 Artış', trend: 'up' },
    { name: 'Enginar', amount: '40 Bin Ton', region: 'Ege', change: '%5.0 Artış', trend: 'up' },
    { name: 'Bamya', amount: '25 Bin Ton', region: 'Ege', change: '%2.0 Azalış', trend: 'down' },
    { name: 'Kereviz', amount: '30 Bin Ton', region: 'Sakarya', change: '%1.0 Artış', trend: 'stable' },
    { name: 'Kuşkonmaz', amount: '2 Bin Ton', region: 'Eskişehir', change: '%30 Artış', trend: 'up' },
    { name: 'Mantar (Kültür)', amount: '70 Bin Ton', region: 'Antalya', change: '%8.0 Artış', trend: 'up' },

    // MEYVELER (Fruits)
    { name: 'Üzüm (Sofralık)', amount: '1.9 Milyon Ton', region: 'Ege/Marmara', change: '%2.0 Azalış', trend: 'down' },
    { name: 'Üzüm (Kurutmalık)', amount: '1.2 Milyon Ton', region: 'Manisa', change: '%3.5 Azalış', trend: 'down' },
    { name: 'Elma', amount: '4.8 Milyon Ton', region: 'Isparta/Karaman', change: '%4.5 Artış', trend: 'up' },
    { name: 'Zeytin (Yağlık)', amount: '1.5 Milyon Ton', region: 'Ege', change: '%60 Artış', trend: 'up' },
    { name: 'Zeytin (Sofralık)', amount: '600 Bin Ton', region: 'Marmara', change: '%25 Artış', trend: 'up' },
    { name: 'Fındık', amount: '750 Bin Ton', region: 'Karadeniz', change: '%15 Artış', trend: 'up' },
    { name: 'Antep Fıstığı', amount: '240 Bin Ton', region: 'Güneydoğu', change: '%25 Azalış', trend: 'down' },
    { name: 'Portakal', amount: '1.9 Milyon Ton', region: 'Akdeniz', change: '%8.0 Artış', trend: 'up' },
    { name: 'Mandalina', amount: '1.8 Milyon Ton', region: 'Akdeniz/Ege', change: '%10 Artış', trend: 'up' },
    { name: 'Limon', amount: '1.5 Milyon Ton', region: 'Mersin', change: '%15 Artış', trend: 'up' },
    { name: 'Greyfurt', amount: '250 Bin Ton', region: 'Adana', change: '%2.0 Azalış', trend: 'down' },
    { name: 'Şeftali', amount: '1.0 Milyon Ton', region: 'Bursa/Çanakkale', change: '%5.0 Artış', trend: 'up' },
    { name: 'Nektarin', amount: '200 Bin Ton', region: 'Bursa', change: '%8.0 Artış', trend: 'up' },
    { name: 'Kiraz', amount: '720 Bin Ton', region: 'Ege/İç Anadolu', change: '%5.2 Artış', trend: 'up' },
    { name: 'Vişne', amount: '180 Bin Ton', region: 'Afyon/Kütahya', change: '%1.0 Azalış', trend: 'down' },
    { name: 'Kayısı', amount: '850 Bin Ton', region: 'Malatya', change: '%6.5 Artış', trend: 'up' },
    { name: 'İncir', amount: '350 Bin Ton', region: 'Aydın', change: '%3.0 Artış', trend: 'up' },
    { name: 'Armut', amount: '550 Bin Ton', region: 'Bursa', change: '%4.0 Artış', trend: 'up' },
    { name: 'Ayva', amount: '190 Bin Ton', region: 'Sakarya', change: '%2.0 Artış', trend: 'up' },
    { name: 'Erik', amount: '330 Bin Ton', region: 'Akdeniz/Ege', change: '%3.0 Artış', trend: 'up' },
    { name: 'Badem', amount: '180 Bin Ton', region: 'Adıyaman/Muğla', change: '%15 Artış', trend: 'up' },
    { name: 'Ceviz', amount: '360 Bin Ton', region: 'Denizli/Bursa', change: '%7.5 Artış', trend: 'up' },
    { name: 'Muz', amount: '950 Bin Ton', region: 'Mersin/Antalya', change: '%12 Artış', trend: 'up' },
    { name: 'Çilek', amount: '700 Bin Ton', region: 'Mersin/Aydın', change: '%10 Artış', trend: 'up' },
    { name: 'Kivi', amount: '100 Bin Ton', region: 'Yalova/Rize', change: '%18 Artış', trend: 'up' },
    { name: 'Avokado', amount: '15 Bin Ton', region: 'Antalya', change: '%40 Artış', trend: 'up' },
    { name: 'Nar', amount: '600 Bin Ton', region: 'Akdeniz', change: '%6.0 Artış', trend: 'up' },
    { name: 'Karpuz', amount: '3.4 Milyon Ton', region: 'Adana', change: '%1.8 Azalış', trend: 'down' },
    { name: 'Kavun', amount: '1.6 Milyon Ton', region: 'Ankara', change: '%2.0 Azalış', trend: 'down' },
    { name: 'Ahududu', amount: '8 Bin Ton', region: 'Bursa', change: '%5.0 Artış', trend: 'up' },
    { name: 'Böğürtlen', amount: '5 Bin Ton', region: 'Bursa', change: '%7.0 Artış', trend: 'up' },
    { name: 'Yaban Mersini', amount: '3 Bin Ton', region: 'Rize', change: '%50 Artış', trend: 'up' },
    { name: 'Trabzon Hurması', amount: '60 Bin Ton', region: 'Adana', change: '%20 Artış', trend: 'up' },
    { name: 'Dut', amount: '70 Bin Ton', region: 'Çeşitli', change: '%1.0 Artış', trend: 'stable' },
    { name: 'Keçiboynuzu', amount: '5 Bin Ton', region: 'Antalya', change: '%3.0 Artış', trend: 'up' },
    { name: 'Zerdeçal', amount: '10 Ton', region: 'Mersin', change: '%100 Artış', trend: 'up' }
];

const PROFIT_MAP: Record<string, 'Yüksek' | 'Orta' | 'Düşük'> = {
    // VERY HIGH (Niche, Exotic, Early Season)
    'Safran': 'Yüksek', 'Kuşkonmaz': 'Yüksek', 'Yaban Mersini': 'Yüksek', 'Avokado': 'Yüksek', 'Muz': 'Yüksek',
    'Zerdeçal': 'Yüksek', 'Zencefil': 'Yüksek', 'Pitaya (Ejder)': 'Yüksek', 'Trüf Mantarı': 'Yüksek',
    'Salep': 'Yüksek', 'Kivi': 'Yüksek', 'Ahududu': 'Yüksek', 'Böğürtlen': 'Yüksek',

    // HIGH (Nuts, Export Fruits, Greenhouse)
    'Antep Fıstığı': 'Yüksek', 'Fındık': 'Yüksek', 'Badem': 'Yüksek', 'Ceviz': 'Yüksek',
    'Kiraz': 'Yüksek', 'İncir': 'Yüksek', 'Kayısı': 'Yüksek', 'Şeftali': 'Yüksek', 'Nektarin': 'Yüksek',
    'Çilek': 'Yüksek', 'Sarımsak': 'Yüksek', 'Zeytin': 'Yüksek', 'Mandalina': 'Yüksek', 'Limon': 'Yüksek',
    'Lavanta': 'Yüksek', 'Gül': 'Yüksek', 'Mantar': 'Yüksek',

    // MEDIUM (Veg, Industrial)
    'Domates': 'Orta', 'Biber': 'Orta', 'Patlıcan': 'Orta', 'Salatalık': 'Orta', 'Kabak': 'Orta',
    'Fasulye': 'Orta', 'Nohut': 'Orta', 'Mercimek': 'Orta', 'Bakla': 'Orta', 'Bezelye': 'Orta',
    'Patates': 'Orta', 'Soğan': 'Orta', 'Havuç': 'Orta', 'Ispanak': 'Orta', 'Pırasa': 'Orta',
    'Lahana': 'Orta', 'Karnabahar': 'Orta', 'Brokoli': 'Orta', 'Enginar': 'Orta', 'Bamya': 'Orta',
    'Kavun': 'Orta', 'Karpuz': 'Orta', 'Yer Fıstığı': 'Orta', 'Soya': 'Orta', 'Şeker Pancarı': 'Orta',
    'Pamuk': 'Orta', 'Tütün': 'Orta', 'Çay': 'Orta', 'Portakal': 'Orta', 'Armut': 'Orta', 'Ayva': 'Orta',
    'Kanola': 'Orta', 'Susam': 'Orta', 'Anason': 'Orta', 'Haşhaş': 'Orta',

    // LOW (Cereals, Basic Field Crops)
    'Buğday': 'Düşük', 'Arpa': 'Düşük', 'Mısır': 'Düşük', 'Yulaf': 'Düşük', 'Çavdar': 'Düşük',
    'Tritikale': 'Düşük', 'Çeltik': 'Düşük', 'Ayçiçeği': 'Düşük', 'Fiğ': 'Düşük', 'Korunga': 'Düşük',
    'Yonca': 'Düşük', 'Silajlık Mısır': 'Düşük'
};

// Helper to reliably get profit even if name includes extra text (e.g. "Domates (Salkım)")
const getProfit = (name: string): 'Yüksek' | 'Orta' | 'Düşük' => {
    // 1. Direct match
    if (PROFIT_MAP[name]) return PROFIT_MAP[name];
    // 2. Partial match (e.g. "Domates" matches "Domates (Salkım)")
    for (const key of Object.keys(PROFIT_MAP)) {
        if (name.includes(key)) return PROFIT_MAP[key];
    }
    // 3. Fallback
    return 'Orta';
};

const PROFIT_ORDER = { 'Yüksek': 3, 'Orta': 2, 'Düşük': 1 };

export default function BilgiDashboard({ initialPlants }: { initialPlants: Plant[] }) {
    const [activeTab, setActiveTab] = useState<'market' | 'production' | 'library'>('market');
    const [marketData, setMarketData] = useState<MarketItem[]>([]);
    const [marketLoading, setMarketLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');

    // Enrich and sort plants
    const sortedPlants = [...initialPlants]
        .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(p => ({
            ...p,
            profit: getProfit(p.name)
        }))
        .sort((a, b) => {
            // Sort by Profit (High > Low)
            const scoreA = PROFIT_ORDER[a.profit as keyof typeof PROFIT_ORDER] || 2;
            const scoreB = PROFIT_ORDER[b.profit as keyof typeof PROFIT_ORDER] || 2;
            if (scoreB !== scoreA) return scoreB - scoreA;
            // Then by Name
            return a.name.localeCompare(b.name);
        });

    useEffect(() => {
        if (activeTab === 'market' && marketData.length === 0) {
            fetchMarketData();
        }
    }, [activeTab]);

    async function fetchMarketData() {
        setMarketLoading(true);
        try {
            const res = await fetch('/api/market-data');
            const json = await res.json();
            if (json.success) {
                // We keep the whole object now as it contains structure: { antalya: {...}, second: {...} }
                setMarketData(json as any);
                setLastUpdated(json.lastUpdated);
            }
        } catch (err) {
            console.error("Failed to fetch market data", err);
        } finally {
            setMarketLoading(false);
        }
    }

    return (
        <div className="w-full">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-zinc-200 pb-4">
                <button
                    onClick={() => setActiveTab('market')}
                    className={`px-6 py-2.5 rounded-full font-medium transition-all ${activeTab === 'market'
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : "bg-white text-zinc-600 hover:bg-zinc-50 border border-zinc-200"
                        }`}
                >
                    Güncel Hal Fiyatları 📈
                </button>
                <button
                    onClick={() => setActiveTab('production')}
                    className={`px-6 py-2.5 rounded-full font-medium transition-all ${activeTab === 'production'
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : "bg-white text-zinc-600 hover:bg-zinc-50 border border-zinc-200"
                        }`}
                >
                    En Çok Üretilenler (TÜİK 2025) 🚜
                </button>
                <button
                    onClick={() => setActiveTab('library')}
                    className={`px-6 py-2.5 rounded-full font-medium transition-all ${activeTab === 'library'
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : "bg-white text-zinc-600 hover:bg-zinc-50 border border-zinc-200"
                        }`}
                >
                    Bitki Kütüphanesi (Kâr Sıralı) 💰
                </button>
            </div>

            {/* Content */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* MARKET PRICES TAB */}
                {activeTab === 'market' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* LEFT COLUMN: ANTALYA */}
                        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col h-full">
                            <div className="p-5 border-b border-zinc-100 bg-orange-50/50">
                                <h2 className="text-xl font-bold text-zinc-800 flex items-center gap-2">
                                    <span className="text-2xl">🍊</span> Antalya Hal Fiyatları
                                </h2>
                                <p className="text-xs text-zinc-500 mt-1">Kaynak: {(marketData as any)?.antalya?.source || 'Yükleniyor...'}</p>
                            </div>

                            {marketLoading ? (
                                <div className="p-12 text-center flex-1 flex items-center justify-center">
                                    <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full"></div>
                                </div>
                            ) : (
                                <div className="overflow-x-auto flex-1">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-zinc-50 text-zinc-500 font-medium sticky top-0 z-10">
                                            <tr>
                                                <th className="px-4 py-3">Ürün</th>
                                                <th className="px-4 py-3">Min</th>
                                                <th className="px-4 py-3">Max</th>
                                                <th className="px-4 py-3">Ort</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-100">
                                            {((marketData as any)?.antalya?.data || []).map((item: any, idx: number) => (
                                                <tr key={idx} className="hover:bg-orange-50/30 transition-colors">
                                                    <td className="px-4 py-3 font-medium text-zinc-800">{item.name}</td>
                                                    <td className="px-4 py-3 text-zinc-600">{item.min}₺</td>
                                                    <td className="px-4 py-3 text-zinc-600">{item.max}₺</td>
                                                    <td className="px-4 py-3 font-bold text-orange-600 bg-orange-50/30">{item.avg}₺</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {/* RIGHT COLUMN: MERSIN / ISTANBUL */}
                        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col h-full">
                            <div className="p-5 border-b border-zinc-100 bg-blue-50/50">
                                <h2 className="text-xl font-bold text-zinc-800 flex items-center gap-2">
                                    <span className="text-2xl">🍋</span> {(marketData as any)?.second?.city || 'Diğer'} Hal Fiyatları
                                </h2>
                                <p className="text-xs text-zinc-500 mt-1">Kaynak: {(marketData as any)?.second?.source || 'Yükleniyor...'}</p>
                            </div>

                            {marketLoading ? (
                                <div className="p-12 text-center flex-1 flex items-center justify-center">
                                    <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                                </div>
                            ) : (
                                <div className="overflow-x-auto flex-1">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-zinc-50 text-zinc-500 font-medium sticky top-0 z-10">
                                            <tr>
                                                <th className="px-4 py-3">Ürün</th>
                                                <th className="px-4 py-3">Min</th>
                                                <th className="px-4 py-3">Max</th>
                                                <th className="px-4 py-3">Ort</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-100">
                                            {((marketData as any)?.second?.data || []).map((item: any, idx: number) => (
                                                <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                                                    <td className="px-4 py-3 font-medium text-zinc-800">{item.name}</td>
                                                    <td className="px-4 py-3 text-zinc-600">{item.min}₺</td>
                                                    <td className="px-4 py-3 text-zinc-600">{item.max}₺</td>
                                                    <td className="px-4 py-3 font-bold text-blue-600 bg-blue-50/30">{item.avg}₺</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* PRODUCTION TAB */}
                {activeTab === 'production' && (
                    <div>
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-zinc-800">Türkiye Tarımsal Üretim İstatistikleri (2025)</h2>
                            <p className="text-sm text-zinc-500">TÜİK ve Tarım Bakanlığı verilerine dayalı 2025 yılı üretim verileri.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {TUIK_DATA.map((item, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8 group-hover:bg-primary/10 transition-colors"></div>

                                    <div className="relative">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-lg font-bold text-zinc-800">{item.name}</h3>
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {item.change}
                                            </span>
                                        </div>

                                        <div className="space-y-2">
                                            <div>
                                                <p className="text-xs text-zinc-400 uppercase tracking-wider">Yıllık Üretim</p>
                                                <p className="text-2xl font-bold text-primary">{item.amount}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-zinc-400 uppercase tracking-wider">En Yoğun Bölge</p>
                                                <p className="text-zinc-600 font-medium flex items-center gap-1">
                                                    <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                    {item.region}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* LIBRARY TAB */}
                {activeTab === 'library' && (
                    <div>
                        <div className="mb-6 space-y-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h2 className="text-xl font-bold text-zinc-800">Bitki Rehberi ve Yetiştiricilik</h2>
                                    <p className="text-sm text-zinc-500">250+ bitki arasında arama yapın ve kâr marjlarını görün.</p>
                                </div>
                                <div className="flex gap-2 text-xs font-medium">
                                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">Yüksek Kâr ($$$)</span>
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Orta Kâr ($$)</span>
                                    <span className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full">Düşük Kâr ($)</span>
                                </div>
                            </div>

                            {/* Search Input */}
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Bitki ara... (Örn: 'Sarımsak', 'Kiraz', 'Yem')"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-zinc-800 placeholder-zinc-400"
                                />
                            </div>
                        </div>
                        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {sortedPlants.map((p) => (
                                <li key={p.name} className="group bg-white border border-zinc-100 rounded-xl p-6 hover:shadow-md transition-all relative overflow-hidden">
                                    {/* Profit Badge */}
                                    <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-bl-xl
                                        ${p.profit === 'Yüksek' ? 'bg-emerald-500 text-white' :
                                            p.profit === 'Orta' ? 'bg-blue-500 text-white' : 'bg-zinc-300 text-zinc-600'}`}>
                                        {p.profit} Getiri
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <span className="font-medium text-zinc-800 group-hover:text-primary transition-colors text-lg">{p.name}</span>
                                        <Link
                                            className="text-sm font-medium text-emerald-700 bg-emerald-50 px-4 py-2 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors shadow-sm"
                                            href={`/bilgi/${encodeURIComponent(p.name)}`}
                                        >
                                            Rehber
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
