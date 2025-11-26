import { readFile } from "fs/promises";
import path from "path";
import Link from "next/link";

export default async function KnowledgeIndex() {
  const dataPath = path.join(process.cwd(), "data", "plants.json");
  let plants: { name: string }[] = [];
  try {
    const raw = await readFile(dataPath, "utf-8");
    plants = JSON.parse(raw);
  } catch (error) {
    console.error("Error reading plants data:", error);
  }

  return (
    <div className="min-h-screen w-full">
      <div className="w-full max-w-full px-4 py-8">
        {/* Back Button */}
        <Link href="/ana" className="inline-flex items-center text-zinc-500 hover:text-primary mb-8 transition-colors group">
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Panele Dön
        </Link>

        <h1 className="text-3xl font-bold text-primary mb-2">Bitki Bilgi Rehberi</h1>
        <p className="text-zinc-500 mb-8">Türkiye'de yetişen önemli ticari bitkiler hakkında detaylı bilgiler.</p>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plants.map((p) => (
            <li key={p.name} className="group bg-white border border-zinc-100 rounded-xl p-6 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <span className="font-medium text-zinc-800 group-hover:text-primary transition-colors">{p.name}</span>
                <Link
                  className="text-sm font-medium text-green-700 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors shadow-sm"
                  href={`/bilgi/${encodeURIComponent(p.name)}`}
                >
                  Detay
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
