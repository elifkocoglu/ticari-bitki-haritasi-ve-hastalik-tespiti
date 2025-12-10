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
    <div className="min-h-screen bg-transparent">
      <div className="w-full h-full">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Link href="/ana" className="hover:text-primary">Ana Sayfa</Link>
            <span>/</span>
            <span>Ticari Harita</span>
          </div>
        </div>

        <div className="bg-transparent rounded-2xl overflow-hidden">
          {/* Increased height to 90vh and removed internal padding */}
          <TurkeyMap className="h-[94vh] w-full" />
        </div>
      </div>
    </div>
  );
}
