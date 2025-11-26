import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ExportInfo() {
  const session = await getServerSession(authOptions as any);
  const provider = (session as any)?.provider as string | undefined;
  const canView = !!session && provider === "credentials";

  if (!canView) {
    return null;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold text-primary mb-3">İhracat / İthalat Bilgileri (Niş Bitkiler)</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded border border-[var(--beige)] bg-cream/60 p-4">
          <h3 className="font-semibold">Safran</h3>
          <ul className="list-disc ml-5 text-sm">
            <li>Başlıca üretim: Karabük (Safranbolu)
            </li>
            <li>Yaklaşık birim fiyat: yüksektir; düşük miktarda yüksek katma değer</li>
            <li>İhracat pazarı: AB ülkeleri, Orta Doğu (genel bilgi)</li>
          </ul>
        </div>
        <div className="rounded border border-[var(--beige)] bg-cream/60 p-4">
          <h3 className="font-semibold">Lavanta</h3>
          <ul className="list-disc ml-5 text-sm">
            <li>Başlıca üretim: Isparta ve çevresi</li>
            <li>Ürünler: yağ, sabit yağ karışımları, kozmetik hammaddesi</li>
            <li>İhracat: niş pazar; katma değer işleme ile artar</li>
          </ul>
        </div>
      </div>
      <p className="text-xs text-zinc-600 mt-3">Not: Bu veriler örnek/temsilidir; kamu açık verileri ile zenginleştirilecektir.</p>
    </section>
  );
}






