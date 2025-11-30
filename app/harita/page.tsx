"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const TurkeyMap = dynamic(() => import("../components/TurkeyMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[85vh] bg-zinc-100 animate-pulse rounded-xl flex items-center justify-center text-zinc-400">
      Harita yükleniyor...
    </div>
  ),
});

export default function HaritaPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-[1800px] mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Link href="/ana" className="hover:text-primary">Ana Sayfa</Link>
            <span>/</span>
            <span>Ticari Harita</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-200">
          <TurkeyMap />
        </div>
      </div>
    </div>
  );
}
