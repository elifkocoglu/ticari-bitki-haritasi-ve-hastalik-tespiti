import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("image") as File;

        if (!file) {
            return NextResponse.json({ error: "Dosya yüklenmedi." }, { status: 400 });
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({
                error: "API anahtarı eksik. Lütfen .env.local dosyasına GEMINI_API_KEY ekleyin."
            }, { status: 500 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString("base64");

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      Bu bitkiyi analiz et ve aşağıdaki formatta SADECE JSON döndür. Başka hiçbir metin ekleme.
      Eğer resimde bitki yoksa "name" alanına "Bitki tespit edilemedi" yaz.
      
      Format:
      {
        "name": "Bitki Adı",
        "disease": "Varsa hastalık adı veya 'Hastalık belirtisi yok'",
        "treatment": "Hastalık varsa tedavi önerisi, yoksa bakım tavsiyesi",
        "notes": "Ek bilgiler, sulama/güneş ihtiyacı vb."
      }
    `;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Image,
                    mimeType: file.type,
                },
            },
        ]);

        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
        const data = JSON.parse(jsonStr);

        return NextResponse.json(data);

    } catch (error: any) {
        console.error("API Hatası:", error);
        return NextResponse.json({
            error: "Bir hata oluştu: " + (error.message || "Bilinmeyen hata"),
            details: error.toString()
        }, { status: 500 });
    }
}
