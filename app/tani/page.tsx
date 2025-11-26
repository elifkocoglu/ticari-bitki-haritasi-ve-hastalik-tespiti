"use client";
import { useState } from "react";
import Link from "next/link";

type Result = {
  name: string;
  disease?: string;
  treatment?: string;
  notes?: string;
};

export default function TaniPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function onUpload() {
    if (!file) return;
    setLoading(true);
    setResult(null);

    try {
      const body = new FormData();
      body.append("image", file);
      const res = await fetch("/api/identify", { method: "POST", body });
      const data = await res.json();
      setResult(data as Result);
    } catch (error) {
      console.error("Error identifying plant:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full">
      <div className="w-full max-w-full px-4 py-8">
        {/* Back Button */}
        <Link href="/ana" className="inline-flex items-center text-zinc-500 hover:text-primary mb-8 transition-colors group">
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Panele Dön
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-8">
          <h1 className="text-3xl font-bold text-zinc-800 mb-2">Bitki Tanı ve Analiz</h1>
          <p className="text-zinc-500 mb-8">Bitkinizin fotoğrafını yükleyerek yapay zeka destekli hastalık teşhisi ve bakım önerileri alın.</p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <label className="block w-full">
              <span className="sr-only">Fotoğraf seç</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-zinc-500
                  file:mr-4 file:py-2.5 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary/10 file:text-primary
                  hover:file:bg-primary/20
                  cursor-pointer"
              />
            </label>
            <button
              className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded-full font-medium hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap shadow-sm hover:shadow"
              onClick={onUpload}
              disabled={!file || loading}
            >
              {loading ? "Analiz ediliyor..." : "Yükle ve Tanı"}
            </button>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-zinc-500 animate-pulse">Yapay zeka bitkiyi inceliyor...</p>
            </div>
          )}

          {result && (
            <div className="mt-8 border border-zinc-100 rounded-xl p-6 bg-zinc-50/50">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                {result.name}
              </h2>

              <div className="space-y-4">
                {result.disease && (
                  <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                    <span className="font-bold text-red-700 block mb-1 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      Tespit Edilen Durum
                    </span>
                    <span className="text-red-900/80 leading-relaxed">{result.disease}</span>
                  </div>
                )}

                {result.treatment && (
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <span className="font-bold text-green-700 block mb-1 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Öneri ve Tedavi
                    </span>
                    <span className="text-green-900/80 leading-relaxed">{result.treatment}</span>
                  </div>
                )}

                {result.notes && (
                  <div className="p-4 bg-white rounded-xl border border-zinc-100">
                    <span className="font-bold text-zinc-800 block mb-1">Notlar</span>
                    <span className="text-zinc-600 leading-relaxed">{result.notes}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
