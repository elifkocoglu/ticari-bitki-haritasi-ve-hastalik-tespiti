import TurkeyMap from "../components/TurkeyMap";
import Link from "next/link";

export default function HaritaPage() {
  return (
    <div className="min-h-screen w-full">
      <section className="w-full max-w-full px-4 py-6">
        {/* Back Button */}
        <Link href="/ana" className="inline-flex items-center text-zinc-500 hover:text-primary mb-6 transition-colors group">
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Panele Dön
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-2 overflow-hidden">
          <TurkeyMap />
        </div>
      </section>
    </div>
  );
}


