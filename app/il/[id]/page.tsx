import { getProvinceData } from "@/data/provinces-agri";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProvincePage({ params }: PageProps) {
    const { id } = await params;
    const decodedId = decodeURIComponent(id);

    // 1. Get static data for products (fallback/supplementary)
    const staticData = getProvinceData(decodedId);

    // 2. Fetch dynamic data from External API
    let apiData = null;
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout for page load

        const res = await fetch(`https://elifkocoglu-bitki-harita.hf.space/sehir-bilgisi?il=${encodeURIComponent(decodedId)}`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
            apiData = await res.json();
        } else {
            console.warn(`External API returned status: ${res.status}`);
        }
    } catch (error: any) {
        if (error.name === 'AbortError') {
            console.warn("External API timed out (5s limit). Using static data.");
        } else {
            console.error("External API Fetch Error:", error);
        }
        // Fallback to static data is handled below automatically
    }

    // Merge data: Use API data if available, otherwise fallback to static or generic text
    // Developer Note: API returns { sehir: string, analiz: string }
    const displayData = {
        name: apiData?.sehir || staticData?.name || decodedId,
        climate: apiData?.iklim || staticData?.climate || "Veri alınamadı.",
        soil: apiData?.toprak || apiData?.toprak_tipi || staticData?.soil || "Veri alınamadı.",
        comment: apiData?.analiz || "Bu şehir için henüz yapay zeka destekli tarım analizi oluşturulmamıştır.",
        // Keep static data for these visual parts, or try to map from API if possible
        mostProfitable: staticData?.mostProfitable || [],
        topProducts: apiData?.tum_urunler || staticData?.topProducts || [],
        trendingProducts: staticData?.trendingProducts || [],
        trade: staticData?.trade || { export: [], import: [] }
    };

    if (!staticData && !apiData) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-transparent">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="mb-6 flex items-center gap-2 text-sm text-zinc-500">
                    <Link href="/ana" className="hover:text-primary">Ana Sayfa</Link>
                    <span>/</span>
                    <span>{displayData.name}</span>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Sol Panel: Genel Bilgi */}
                    <div className="w-full md:w-1/3 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-[var(--beige)]">
                            <h1 className="text-4xl font-bold text-primary mb-2">{displayData.name}</h1>
                            <p className="text-zinc-600 mb-4">Tarım Profili</p>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-zinc-800 flex items-center gap-2">
                                        🌤️ İklim
                                    </h3>
                                    <p className="text-sm text-zinc-600 leading-relaxed">{displayData.climate}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-zinc-800 flex items-center gap-2">
                                        🪨 Toprak Yapısı
                                    </h3>
                                    <p className="text-sm text-zinc-600 leading-relaxed">{displayData.soil}</p>
                                </div>
                            </div>
                        </div>

                        {/* AI Yorumu - Yeni Özellik */}
                        <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                            <h3 className="font-bold text-indigo-800 mb-3 flex items-center gap-2">
                                🤖 Yapay Zeka Analizi
                            </h3>
                            <p className="text-sm text-indigo-900/80 leading-relaxed italic">
                                "{displayData.comment}"
                            </p>
                        </div>

                        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                            <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                                🌱 Fırsat Köşesi
                            </h3>
                            <p className="text-sm text-green-900 mb-2">
                                Bu bölgede en yüksek karlılık potansiyeline sahip ürünler:
                            </p>
                            <ul className="list-disc list-inside text-green-800 font-medium">
                                {displayData.mostProfitable.map(p => <li key={p}>{p}</li>)}
                            </ul>
                        </div>
                    </div>

                    {/* Sağ Panel: Detaylı Veriler */}
                    <div className="w-full md:w-2/3 grid gap-6">

                        {/* Üretim Liderleri */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-[var(--beige)]">
                            <h2 className="text-xl font-bold text-zinc-800 mb-4 border-b pb-2">En Çok Üretilenler</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {displayData.topProducts.map((p, i) => (
                                    <div key={i} className="bg-orange-50 p-3 rounded text-center border border-orange-100">
                                        <span className="font-semibold text-orange-800">{p}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Rövanşta Olanlar */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-[var(--beige)]">
                            <h2 className="text-xl font-bold text-zinc-800 mb-4 border-b pb-2">Yükselen Trendler (Rövanşta)</h2>
                            <div className="flex flex-wrap gap-3">
                                {displayData.trendingProducts.map((p, i) => (
                                    <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                                        📈 {p}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* İthalat / İhracat Dengesi */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-[var(--beige)]">
                                <h3 className="font-bold text-zinc-800 mb-3 flex items-center gap-2">
                                    🚢 İhracat (Dış Satım)
                                </h3>
                                <ul className="space-y-2">
                                    {displayData.trade.export.map((p, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-zinc-700">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-[var(--beige)]">
                                <h3 className="font-bold text-zinc-800 mb-3 flex items-center gap-2">
                                    📦 İthalat (Dış Alım)
                                </h3>
                                <ul className="space-y-2">
                                    {displayData.trade.import.map((p, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-zinc-700">
                                            <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
