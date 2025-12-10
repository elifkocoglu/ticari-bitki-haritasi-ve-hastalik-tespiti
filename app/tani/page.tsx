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
    <div className="min-h-screen w-full relative">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/ana" className="inline-flex items-center text-zinc-500 hover:text-primary transition-colors group px-4 py-2 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white border border-transparent hover:border-zinc-200">
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Panele Dön</span>
          </Link>
          <div className="text-right hidden sm:block">
            {/* <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Yapay Zeka Destekli</h2> */}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Card */}
          <div className="lg:col-span-12">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 overflow-hidden">
              <div className="p-8 sm:p-12 text-center border-b border-zinc-100">
                <h1 className="text-4xl sm:text-5xl font-bold text-zinc-800 mb-4 tracking-tight">
                  Bitki <span className="text-primary">Tanı & Analiz</span>
                </h1>
                <p className="text-zinc-600 text-lg max-w-2xl mx-auto leading-relaxed">
                  Bitkinizin fotoğrafını yükleyin, gelişmiş yapay zeka modelimiz hastalığı teşhis etsin ve size özel tedavi yöntemleri önersin.
                </p>
              </div>

              <div className="p-8 sm:p-12 bg-zinc-50/50">
                {/* Upload Section */}
                <div className="max-w-xl mx-auto">
                  <label className={`
                    relative group flex flex-col items-center justify-center w-full h-48 sm:h-64 
                    rounded-3xl border-3 border-dashed transition-all duration-300 cursor-pointer overflow-hidden
                    ${file ? 'border-primary bg-primary/5' : 'border-zinc-300 hover:border-primary/50 hover:bg-zinc-50'}
                  `}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />

                    {file ? (
                      <div className="text-center z-10">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <p className="text-lg font-semibold text-zinc-800">{file.name}</p>
                        <p className="text-sm text-zinc-500 mt-1">Fotoğraf seçildi, analize hazır</p>
                      </div>
                    ) : (
                      <div className="text-center z-10 p-6">
                        <div className="w-16 h-16 bg-zinc-100 text-zinc-400 group-hover:text-primary group-hover:bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                        </div>
                        <p className="text-lg font-semibold text-zinc-700 group-hover:text-zinc-900">Fotoğraf Yüklemek İçin Tıklayın</p>
                        <p className="text-sm text-zinc-500 mt-2">veya fotoğrafı sürükleyip bırakın</p>
                      </div>
                    )}
                  </label>

                  <div className="mt-8 flex justify-center">
                    <button
                      className={`
                        w-full sm:w-auto px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300
                        flex items-center justify-center gap-3
                        ${!file || loading
                          ? "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none"
                          : "bg-gradient-to-r from-primary to-green-600 text-white shadow-primary/30"
                        }
                      `}
                      onClick={onUpload}
                      disabled={!file || loading}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analiz Ediliyor...
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                          Analizi Başlat
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Result Section */}
          {result && (
            <div className="lg:col-span-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white overflow-hidden">
                {/* Result Header */}
                <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-8 sm:p-10 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-32 bg-primary blur-[100px] opacity-20 rounded-full"></div>
                  <div className="relative z-10">
                    <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider mb-2">Analiz Sonucu</p>
                    <h2 className="text-3xl sm:text-4xl font-bold flex items-center gap-3">
                      {result.name}
                      <span className="px-3 py-1 bg-primary text-white text-xs rounded-full font-bold tracking-wide uppercase shadow-lg shadow-primary/20">Tespit Edildi</span>
                    </h2>
                  </div>
                </div>

                <div className="p-8 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Diagnosis Card */}
                  {result.disease && (
                    <div className="bg-red-50/50 rounded-2xl p-6 border border-red-100 hover:shadow-lg hover:border-red-200 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-zinc-900 mb-2">Tespit Edilen Durum</h3>
                          <p className="text-zinc-700 leading-relaxed">{result.disease}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notes Card */}
                  {result.notes && (
                    <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-zinc-900 mb-2">Model Notları</h3>
                          <p className="text-zinc-700 leading-relaxed text-sm">{result.notes}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Treatment Card (Full Width) */}
                  {result.treatment && (
                    <div className="md:col-span-2 bg-green-50/50 rounded-2xl p-8 border border-green-100 hover:shadow-lg hover:border-green-200 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row items-start gap-6">
                        <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div className="w-full">
                          <h3 className="text-2xl font-bold text-zinc-900 mb-3">Tedavi ve Bakım Önerileri</h3>
                          <div className="prose prose-green max-w-none text-zinc-700 leading-relaxed">
                            {result.treatment}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
