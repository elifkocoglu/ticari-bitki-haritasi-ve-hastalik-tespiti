import { NextResponse } from 'next/server';

// --- MOCK DATA (Fallback - Expanded) ---
const ANTALYA_MOCK = [
    { name: 'Domates (Salkım)', unit: 'Kg', min: '25.00', max: '40.00', avg: '32.50' },
    { name: 'Domates (Kokteyl)', unit: 'Kg', min: '35.00', max: '55.00', avg: '45.00' },
    { name: 'Domates (Beef)', unit: 'Kg', min: '30.00', max: '45.00', avg: '37.50' },
    { name: 'Salatalık', unit: 'Kg', min: '18.00', max: '28.00', avg: '23.00' },
    { name: 'Salatalık (Silor)', unit: 'Kg', min: '25.00', max: '35.00', avg: '30.00' },
    { name: 'Biber (Çarliston)', unit: 'Kg', min: '20.00', max: '35.00', avg: '27.50' },
    { name: 'Biber (Sivri)', unit: 'Kg', min: '25.00', max: '40.00', avg: '32.50' },
    { name: 'Biber (Kapya)', unit: 'Kg', min: '45.00', max: '60.00', avg: '52.50' },
    { name: 'Biber (Dolma)', unit: 'Kg', min: '30.00', max: '45.00', avg: '37.50' },
    { name: 'Patlıcan', unit: 'Kg', min: '22.00', max: '38.00', avg: '30.00' },
    { name: 'Patlıcan (Topak)', unit: 'Kg', min: '25.00', max: '40.00', avg: '32.50' },
    { name: 'Kabak', unit: 'Kg', min: '15.00', max: '25.00', avg: '20.00' },
    { name: 'Fasulye (Çalı)', unit: 'Kg', min: '45.00', max: '70.00', avg: '57.50' },
    { name: 'Fasulye (Ayşe)', unit: 'Kg', min: '50.00', max: '80.00', avg: '65.00' },
    { name: 'Patates', unit: 'Kg', min: '12.00', max: '22.00', avg: '17.00' },
    { name: 'Soğan (Kuru)', unit: 'Kg', min: '10.00', max: '18.00', avg: '14.00' },
    { name: 'Havuç', unit: 'Kg', min: '12.00', max: '20.00', avg: '16.00' },
    { name: 'Karnabahar', unit: 'Adet', min: '25.00', max: '40.00', avg: '32.50' },
    { name: 'Brokoli', unit: 'Kg', min: '30.00', max: '50.00', avg: '40.00' },
    { name: 'Ispanak', unit: 'Kg', min: '20.00', max: '30.00', avg: '25.00' },
    { name: 'Pırasa', unit: 'Kg', min: '15.00', max: '25.00', avg: '20.00' },
    { name: 'Marul (Kıvırcık)', unit: 'Adet', min: '15.00', max: '25.00', avg: '20.00' },
    { name: 'Maydanoz', unit: 'Demet', min: '5.00', max: '10.00', avg: '7.50' },
    { name: 'Dereotu', unit: 'Demet', min: '5.00', max: '10.00', avg: '7.50' },
    { name: 'Nane', unit: 'Demet', min: '5.00', max: '10.00', avg: '7.50' },
    { name: 'Muz (Yerli)', unit: 'Kg', min: '35.00', max: '50.00', avg: '42.50' },
    { name: 'Avokado', unit: 'Adet', min: '20.00', max: '40.00', avg: '30.00' },
    { name: 'Çilek', unit: 'Kg', min: '60.00', max: '90.00', avg: '75.00' }
];

const SECOND_CITY_MOCK = [ // Generic mock for Mersin/Istanbul
    { name: 'Limon (Lamas)', unit: 'Kg', min: '15.00', max: '25.00', avg: '20.00' },
    { name: 'Limon (Mayer)', unit: 'Kg', min: '10.00', max: '18.00', avg: '14.00' },
    { name: 'Portakal (Washington)', unit: 'Kg', min: '12.00', max: '18.00', avg: '15.00' },
    { name: 'Portakal (Sıkmalık)', unit: 'Kg', min: '8.00', max: '12.00', avg: '10.00' },
    { name: 'Mandalina (Satsuma)', unit: 'Kg', min: '15.00', max: '25.00', avg: '20.00' },
    { name: 'Mandalina (King)', unit: 'Kg', min: '18.00', max: '30.00', avg: '24.00' },
    { name: 'Greyfurt', unit: 'Kg', min: '8.00', max: '15.00', avg: '11.50' },
    { name: 'Muz (Anamur)', unit: 'Kg', min: '30.00', max: '45.00', avg: '37.50' },
    { name: 'Muz (İthal)', unit: 'Kg', min: '50.00', max: '70.00', avg: '60.00' },
    { name: 'Çilek', unit: 'Kg', min: '60.00', max: '90.00', avg: '75.00' },
    { name: 'Üzüm (Sultaniye)', unit: 'Kg', min: '25.00', max: '40.00', avg: '32.50' },
    { name: 'Elma (Golden)', unit: 'Kg', min: '20.00', max: '30.00', avg: '25.00' },
    { name: 'Elma (Starking)', unit: 'Kg', min: '22.00', max: '35.00', avg: '28.50' },
    { name: 'Armut (Deveci)', unit: 'Kg', min: '30.00', max: '50.00', avg: '40.00' },
    { name: 'Ayva', unit: 'Kg', min: '25.00', max: '40.00', avg: '32.50' },
    { name: 'Nar', unit: 'Kg', min: '25.00', max: '45.00', avg: '35.00' },
    { name: 'Kivi', unit: 'Kg', min: '30.00', max: '50.00', avg: '40.00' },
    { name: 'Pırasa', unit: 'Kg', min: '15.00', max: '25.00', avg: '20.00' },
    { name: 'Ispanak', unit: 'Kg', min: '20.00', max: '35.00', avg: '27.50' },
    { name: 'Lahana (Beyaz)', unit: 'Kg', min: '10.00', max: '20.00', avg: '15.00' },
    { name: 'Lahana (Kırmızı)', unit: 'Kg', min: '15.00', max: '25.00', avg: '20.00' },
    { name: 'Turp (Kırmızı)', unit: 'Kg', min: '10.00', max: '18.00', avg: '14.00' },
    { name: 'Havuç', unit: 'Kg', min: '12.00', max: '22.00', avg: '17.00' },
    { name: 'Kereviz', unit: 'Kg', min: '20.00', max: '35.00', avg: '27.50' },
    { name: 'Sarımsak (Kuru)', unit: 'Kg', min: '80.00', max: '120.00', avg: '100.00' },
    { name: 'Sarımsak (Taze)', unit: 'Demet', min: '15.00', max: '25.00', avg: '20.00' }
];

// --- HELPERS ---
const cleanCurrency = (str: string) => parseFloat(str?.replace(',', '.').replace(/[^\d.]/g, '') || '0').toFixed(2);
const cleanText = (str: string) => str?.replace(/<[^>]*>/g, '').trim() || '';

// --- ANTALYA SCRAPER ---
async function fetchAntalyaData() {
    try {
        const res = await fetch('https://www.antalyakomisyonculardernegi.com/', {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            next: { revalidate: 3600 }
        });
        if (!res.ok) throw new Error('Antalya fetch failed');
        const html = await res.text();

        const tbody = html.match(/<tbody>([\s\S]*?)<\/tbody>/i)?.[1];
        if (!tbody) throw new Error('Antalya table not found');

        const rows = [...tbody.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
        const data = rows.map(match => {
            const cells = [...match[1].matchAll(/<(?:td|th)[^>]*>([\s\S]*?)<\/(?:td|th)>/gi)].map(m => cleanText(m[1]));
            // Layout: #, Name, TodayPrice, YesterdayPrice
            // Relaxed check: Accept if Name exists and has some columns
            if (cells.length < 3) return null;

            let priceStr = cells[2];
            // If today's price is weird, try yesterday (col 3)
            if (!priceStr || priceStr.includes('Fiyat Bekleniyor') || priceStr === '0' || priceStr === '0,00') {
                priceStr = cells[3];
            }

            const price = parseFloat(cleanCurrency(priceStr));
            if (!price || price < 0.1) return null;

            return {
                name: cells[1],
                unit: 'Kg',
                min: (price * 0.9).toFixed(2),
                max: (price * 1.1).toFixed(2),
                avg: price.toFixed(2)
            };
        }).filter(item => item !== null);

        return data.length > 0 ? data : null;
    } catch (e) {
        console.error('Antalya Error:', e);
        return null;
    }
}

// --- MERSIN SCRAPER ---
async function fetchMersinData() {
    try {
        const res = await fetch('https://mersin.bel.tr/hal-fiyatlari', {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            next: { revalidate: 3600 }
        });
        if (!res.ok) throw new Error('Mersin fetch failed');
        const html = await res.text();

        const tbody = html.match(/<tbody>([\s\S]*?)<\/tbody>/i)?.[1];
        if (!tbody) {
            console.log("Mersin: No tbody found, falling back to Istanbul.");
            return null;
        }

        const rows = [...tbody.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
        const data = rows.map(match => {
            const cells = [...match[1].matchAll(/<(?:td|th)[^>]*>([\s\S]*?)<\/(?:td|th)>/gi)].map(m => cleanText(m[1]));
            // Relaxed check: Name + at least 1-2 prices
            if (cells.length < 3) return null;

            const name = cells[1] || cells[0];
            // Try last two columns for prices
            const min = cleanCurrency(cells[cells.length - 2]);
            const max = cleanCurrency(cells[cells.length - 1]);

            if (parseFloat(max) < 0.1) return null;

            return {
                name: name,
                unit: 'Kg',
                min: min,
                max: max,
                avg: ((parseFloat(min) + parseFloat(max)) / 2).toFixed(2)
            };
        }).filter(item => item !== null);

        return data.length > 0 ? data : null;
    } catch (e) {
        console.error('Mersin Error:', e);
        return null;
    }
}

// --- ISTANBUL SCRAPER (FALLBACK) ---
async function fetchIstanbulData() {
    try {
        const res = await fetch('https://hal.ibb.istanbul/online-islemler/gunluk-fiyat-bulteni', {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            next: { revalidate: 3600 }
        });
        if (!res.ok) throw new Error('Istanbul fetch failed');
        const html = await res.text();

        const tbody = html.match(/<tbody>([\s\S]*?)<\/tbody>/i)?.[1];
        if (!tbody) return null;

        const rows = [...tbody.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
        const data = rows.map(match => {
            const cells = [...match[1].matchAll(/<(?:td|th)[^>]*>([\s\S]*?)<\/(?:td|th)>/gi)].map(m => cleanText(m[1]));

            const name = cells.find(c => c.length > 3 && isNaN(Number(c.charAt(0))));
            const prices = cells.filter(c => !isNaN(parseFloat(c.replace(',', '.'))) && c.length > 0 && c.length < 10);

            if (!name || prices.length < 2) return null;

            const min = cleanCurrency(prices[0]);
            const max = cleanCurrency(prices[prices.length - 1]);

            return {
                name: name,
                unit: cells.find(c => c === 'KG' || c === 'ADET' || c === 'SANDIK' || c === 'DEMET') || 'Kg',
                min: min,
                max: max,
                avg: ((parseFloat(min) + parseFloat(max)) / 2).toFixed(2)
            };
        }).filter(item => item !== null);

        return data.length > 0 ? data : null;
    } catch (e) {
        console.error('Istanbul Error:', e);
        return null;
    }
}

export async function GET() {
    // 1. Antalya (Primary Left)
    let antalyaData = await fetchAntalyaData();
    const antalyaSource = antalyaData ? "Antalya Komisyoncular Derneği" : "Yedek Veri (Antalya)";
    if (!antalyaData) antalyaData = ANTALYA_MOCK;

    // 2. Second City (Right - Priority: Mersin > Istanbul > Mock)
    let secondData = await fetchMersinData();
    let secondSource = "Mersin Büyükşehir Belediyesi";
    let secondCity = "Mersin";

    if (!secondData) {
        console.log("Mersin data failed, trying Istanbul...");
        secondData = await fetchIstanbulData();
        secondSource = "İBB Hal Müdürlüğü";
        secondCity = "İstanbul";
    }

    if (!secondData) {
        console.log("Istanbul data failed, using Mock.");
        secondData = SECOND_CITY_MOCK;
        secondSource = "Yedek Veri (Sistem)";
        secondCity = "Mersin / İstanbul"; // Ambiguous fallback title
    }

    const today = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

    return NextResponse.json({
        success: true,
        lastUpdated: today,
        antalya: {
            source: antalyaSource,
            data: antalyaData
        },
        second: {
            city: secondCity,
            source: secondSource,
            data: secondData
        }
    });
}
