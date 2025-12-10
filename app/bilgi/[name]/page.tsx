import { readFile } from "fs/promises";
import path from "path";
import Link from 'next/link';

type Plant = {
  name: string;
  regions: string[];
  soil: string;
  fertilizer: string;
  watering: string;
  sun: string;
  description?: string;
  harvest?: string;
  pests?: string;
};

// Profit logic replicated for server-side rendering
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

const getProfit = (name: string): 'Yüksek' | 'Orta' | 'Düşük' => {
  if (PROFIT_MAP[name]) return PROFIT_MAP[name];
  for (const key of Object.keys(PROFIT_MAP)) {
    if (name.includes(key)) return PROFIT_MAP[key];
  }
  return 'Orta';
};

export default async function PlantDetail(props: { params: Promise<{ name: string }> }) {
  const params = await props.params;
  const dataPath = path.join(process.cwd(), "data", "plants.json");
  const plants = JSON.parse(await readFile(dataPath, "utf-8")) as Plant[];

  const normalize = (str: string) => {
    return str
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/İ/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]/g, "")
      .trim();
  };

  const decoded = decodeURIComponent(params.name);
  const normalizedParam = normalize(decoded);

  const plant = plants.find((p) => {
    if (p.name.toLowerCase() === decoded.toLowerCase()) return true;
    if (normalize(p.name) === normalizedParam) return true;
    return false;
  });

  if (!plant) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="text-center bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-xl">
          <h1 className="text-2xl font-bold text-zinc-400 mb-2">Bitki Bulunamadı</h1>
          <p className="text-zinc-500 mb-4">Aranan: "{decoded}"</p>
          <Link href="/bilgi" className="text-primary hover:underline mt-4">Kütüphaneye Dön</Link>
        </div>
      </div>
    );
  }

  const profit = getProfit(plant.name);

  return (
    <div className="min-h-screen pb-20 relative">
      {/* Background is global, so we just use z-index to sit on top */}

      <div className="max-w-5xl mx-auto px-4 pt-10 sm:pt-20 relative z-10">
        <Link href="/bilgi" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors bg-black/20 hover:bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
          ← Bitki Kütüphanesi
        </Link>

        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/20 to-transparent p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 sm:p-12 opacity-10 text-9xl">🌿</div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-zinc-900 tracking-tight mb-2 drop-shadow-sm">{plant.name}</h1>
                <p className="text-zinc-700 text-lg font-medium">{plant.description || 'Yetiştiricilik Rehberi'}</p>
              </div>

              <div className={`px-6 py-4 rounded-2xl text-center shadow-lg backdrop-blur-md border border-white/50
                        ${profit === 'Yüksek' ? 'bg-emerald-500 text-white' :
                  profit === 'Orta' ? 'bg-blue-500 text-white' :
                    'bg-zinc-500 text-white'}`}>
                <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-90">Tahmini Getiri</div>
                <div className="text-3xl font-black">{profit}</div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="p-8 sm:p-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {/* Harvest Time (New) */}
            <div className="bg-red-50/60 rounded-2xl p-6 border border-red-100 hover:bg-red-50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🧺</span>
                <h3 className="font-bold text-zinc-800">Hasat Zamanı</h3>
              </div>
              <p className="text-zinc-700 pl-10 font-medium">
                {plant.harvest || "Bölgeye göre değişir"}
              </p>
            </div>

            {/* Pests (New) */}
            <div className="bg-gray-50/60 rounded-2xl p-6 border border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🐛</span>
                <h3 className="font-bold text-zinc-800">Hastalık & Zararlılar</h3>
              </div>
              <p className="text-zinc-700 pl-10 font-medium">
                {plant.pests || "Standart koruma gerektirir"}
              </p>
            </div>

            {/* Regions */}
            <div className="bg-orange-50/60 rounded-2xl p-6 border border-orange-100 hover:bg-orange-50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🗺️</span>
                <h3 className="font-bold text-zinc-800">Yetiştiği Bölgeler</h3>
              </div>
              <p className="text-zinc-700 pl-10">
                {plant.regions.join(", ")}
              </p>
            </div>

            {/* Sun / Climate */}
            <div className="bg-yellow-50/60 rounded-2xl p-6 border border-yellow-100 hover:bg-yellow-50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">☀️</span>
                <h3 className="font-bold text-zinc-800">İklim ve Güneş</h3>
              </div>
              <p className="text-zinc-700 pl-10">
                {plant.sun}
              </p>
            </div>

            {/* Soil */}
            <div className="bg-stone-50/60 rounded-2xl p-6 border border-stone-100 hover:bg-stone-50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🟤</span>
                <h3 className="font-bold text-zinc-800">Toprak İsteği</h3>
              </div>
              <p className="text-zinc-700 pl-10">
                {plant.soil}
              </p>
            </div>

            {/* Watering */}
            <div className="bg-blue-50/60 rounded-2xl p-6 border border-blue-100 hover:bg-blue-50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">💧</span>
                <h3 className="font-bold text-zinc-800">Sulama</h3>
              </div>
              <p className="text-zinc-700 pl-10">
                {plant.watering}
              </p>
            </div>

            {/* Fertilizer (Full width) */}
            <div className="bg-green-50/60 rounded-2xl p-6 border border-green-100 sm:col-span-2 lg:col-span-3 hover:bg-green-50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🌱</span>
                <h3 className="font-bold text-zinc-800">Gübreleme Tavsiyesi</h3>
              </div>
              <p className="text-zinc-700 pl-10">
                {plant.fertilizer}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
