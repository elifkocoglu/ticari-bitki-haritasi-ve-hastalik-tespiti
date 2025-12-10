import { readFile } from "fs/promises";
import path from "path";
import Link from "next/link";
import BilgiDashboard from "../components/BilgiDashboard";

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
    <div className="min-h-screen w-full bg-zinc-50/50">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header & Back Button */}
        <div className="mb-8">
          <Link href="/ana" className="inline-flex items-center text-zinc-500 hover:text-primary mb-6 transition-colors group px-4 py-2 bg-white rounded-lg border border-zinc-100 shadow-sm hover:shadow">
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Panele Dön
          </Link>

          <h1 className="text-4xl font-bold text-zinc-800 mb-2 tracking-tight">Tarımsal <span className="text-primary">Bilgi Merkezi</span></h1>
          <p className="text-zinc-500 text-lg max-w-2xl">Türkiye'nin tarımsal üretim verileri, canlı hal fiyatları ve bitki yetiştiriciliği hakkında kapsamlı rehber.</p>
        </div>

        {/* Dashboard Component */}
        <BilgiDashboard initialPlants={plants} />
      </div>
    </div>
  );
}
