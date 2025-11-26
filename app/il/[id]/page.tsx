import { getProvinceData } from "@/data/provinces-agri";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProvincePage({ params }: PageProps) {
    const { id } = await params;
    const data = getProvinceData(id);

    if (!data) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-cream">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="mb-6 flex items-center gap-2 text-sm text-zinc-500">
                    <Link href="/" className="hover:text-primary">Ana Sayfa</Link>
                    <span>/</span>
                    <span>{data.name}</span>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Sol Panel: Genel Bilgi */}
                    <div className="w-full md:w-1/3 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-[var(--beige)]">
                            <h1 className="text-4xl font-bold text-primary mb-2">{data.name}</h1>
                            <p className="text-zinc-600 mb-4">Tarım Profili</p>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-zinc-800">İklim</h3>
                                    <p className="text-sm text-zinc-600">{data.climate}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-zinc-800">Toprak Yapısı</h3>
                                    <p className="text-sm text-zinc-600">{data.soil}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                            <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                                🌱 Fırsat Köşesi
                            </h3>
                            <p className="text-sm text-green-900 mb-2">
                                Bu bölgede en yüksek karlılık potansiyeline sahip ürünler:
                            </p>
                            <ul className="list-disc list-inside text-green-800 font-medium">
                                {data.mostProfitable.map(p => <li key={p}>{p}</li>)}
                            </ul>
                        </div>
                    </div>

                    {/* Sağ Panel: Detaylı Veriler */}
                    <div className="w-full md:w-2/3 grid gap-6">

                        {/* Üretim Liderleri */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-[var(--beige)]">
                            <h2 className="text-xl font-bold text-zinc-800 mb-4 border-b pb-2">En Çok Üretilenler</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {data.topProducts.map((p, i) => (
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
                                {data.trendingProducts.map((p, i) => (
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
                                    {data.trade.export.map((p, i) => (
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
                                    {data.trade.import.map((p, i) => (
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
