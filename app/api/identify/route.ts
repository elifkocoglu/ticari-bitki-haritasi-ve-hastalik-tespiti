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

        // Prepare FormData for the external API
        const externalFormData = new FormData();

        // Convert the file to a Blob to ensure it's correctly handled by the fetch API in Node environment
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: file.type });
        externalFormData.append("file", blob, file.name);

        console.log(`Forwarding file: ${file.name} (${file.type}, ${file.size} bytes) to external API...`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minutes timeout

        try {
            // Forward to external API
            const response = await fetch("https://elifkocoglu-bitki-harita.hf.space/bitki-analiz", {
                method: "POST",
                body: externalFormData,
                signal: controller.signal,
                // Remove explicit Content-Type header to let fetch generate the boundary
            });
            clearTimeout(timeoutId);

            console.log(`External API Response: ${response.status} ${response.statusText}`);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("External API Error Body:", errorText);
                throw new Error(`External API Error: ${response.status} ${response.statusText}`);
            }

            const externalData = await response.json();
            console.log("External API Success Data:", JSON.stringify(externalData).substring(0, 200) + "...");

            // Developer Specs:
            // Keys: teshis, guven, yorum
            // Logic: If guven < 0.60, return "Tanımlanamayan Bitki"

            const confidence = externalData.guven || 0;
            const threshold = 0.40; // Lowered from 0.60 to allow more results

            let mappedData;

            if (confidence < threshold) {
                mappedData = {
                    name: "Tanımlanamayan Bitki / Kapsam Dışı",
                    disease: "Belirsiz",
                    treatment: "Yüklediğiniz fotoğraf sistemimizdeki bitki türleriyle eşleşmedi veya güven oranı çok düşük. Lütfen daha net bir fotoğraf yükleyiniz.",
                    notes: `Güven Oranı: %${(confidence * 100).toFixed(1)} (Eşik: %${(threshold * 100).toFixed(0)})`
                };
            } else {
                mappedData = {
                    name: "Analiz Sonucu",
                    disease: externalData.teshis ? externalData.teshis.replace(/_/g, " ") : "Belirsiz",
                    treatment: externalData.yorum || "Öneri bulunamadı.",
                    notes: `Güven Oranı: %${(confidence * 100).toFixed(1)} (Eşik: %${(threshold * 100).toFixed(0)})`
                };
            }

            return NextResponse.json(mappedData);

        } catch (fetchError: any) {
            clearTimeout(timeoutId);
            if (fetchError.name === 'AbortError') {
                throw new Error("External API timed out after 2 minutes");
            }
            throw fetchError;
        }

    } catch (error: any) {
        console.error("API Proxy Hatası:", error);
        return NextResponse.json({
            error: "Analiz servisine ulaşılamadı: " + (error.message || "Bilinmeyen hata"),
            details: error.toString()
        }, { status: 500 });
    }
}
