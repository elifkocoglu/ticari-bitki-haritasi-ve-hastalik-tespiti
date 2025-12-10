import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import NewsList from "../components/NewsList";
import LogoutButton from "../components/LogoutButton";
import HeaderProfile from "../components/HeaderProfile";

export default async function AnaPage() {
  const session = await getServerSession(authOptions as any);
  if (!session) redirect("/auth/login");

  return (
    <div className="min-h-screen w-full">
      {/* Top Bar with Modern Glass Effect */}
      <div className="bg-white/80 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-10 shadow-sm">
        <div className="w-full max-w-full px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-zinc-800 tracking-wide flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#4CAF50]"></span>
            e-kin <span className="text-zinc-500 font-normal text-sm ml-2">Panel</span>
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-600 hidden sm:inline">Hoş geldin, {(session as any)?.user?.name || (session as any)?.user?.email}</span>
            <HeaderProfile />
            <LogoutButton />
          </div>
        </div>
      </div>

      <main className="w-full max-w-full px-6 py-6">
        {/* Hero Section */}
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-[#1B5E20] mb-2">Genel Bakış</h2>
          <p className="text-sm text-zinc-600">Tarım verilerine ve analiz araçlarına buradan ulaşabilirsiniz.</p>
        </div>

        {/* Navigation Cards with LED Effect */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <Link href="/bilgi" className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm hover:shadow-lg transition-all border border-zinc-100 btn-led flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-zinc-800 mb-2 group-hover:text-blue-600 transition-colors">Bilgi Rehberi</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">Bitkiler hakkında detaylı bilgiler, toprak istekleri ve bakım ipuçları.</p>
          </Link>

          <Link href="/tani" className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm hover:shadow-lg transition-all border border-zinc-100 btn-led flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4.5c0-.83-.67-1.5-1.5-1.5S7 3.67 7 4.5 7.67 6 8.5 6 10 5.33 10 4.5zM19 8c-1.66 0-3 1.34-3 3 0 1.31.84 2.41 2 2.83V17c0 1.66-1.34 3-3 3s-3-1.34-3-3v-4c0-1.66-1.34-3-3-3s-3 1.34-3 3v2h-2v-2c0-2.76 2.24-5 5-5s5 2.24 5 5v1.17c1.16-.42 2-1.52 2-2.83 0-1.66-1.34-3-3-3z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-zinc-800 mb-2 group-hover:text-green-600 transition-colors">Bitki Tanı</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">Yapay zeka ile bitki hastalıklarını teşhis edin ve tedavi önerileri alın.</p>
          </Link>

          <Link href="/harita" className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm hover:shadow-lg transition-all border border-zinc-100 btn-led flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-16 h-16 text-amber-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-zinc-800 mb-2 group-hover:text-amber-600 transition-colors">Ticari Harita</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">İllere göre tarım potansiyeli, üretim verileri ve fırsat analizleri.</p>
          </Link>
        </div>

        {/* News Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100">
          <h2 className="text-xl font-bold text-zinc-800 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
            Güncel Haberler
          </h2>
          <NewsList />
        </div>
      </main>
    </div>
  );
}
