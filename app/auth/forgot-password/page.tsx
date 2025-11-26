"use client";
import { FormEvent, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu (ve spam klasörünü) kontrol edin.");
        } catch (err: any) {
            console.error("Reset password error:", err);
            if (err.code === 'auth/user-not-found') {
                setError("Bu e-posta adresi ile kayıtlı bir kullanıcı bulunamadı.");
            } else {
                // Show exact error for debugging
                setError(`Hata Detayı: [${err.code}] - ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto px-4 py-10">
            <h1 className="text-2xl font-semibold text-primary mb-4">Şifremi Unuttum</h1>
            <p className="text-zinc-600 mb-6">
                E-posta adresinizi girin, size şifrenizi sıfırlamanız için bir bağlantı gönderelim.
            </p>

            <form onSubmit={onSubmit} className="flex flex-col gap-3">
                <input
                    className="border p-2 rounded"
                    placeholder="E-posta"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                />

                {error && <p className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200">{error}</p>}
                {message && <p className="text-green-600 text-sm bg-green-50 p-2 rounded border border-green-200">{message}</p>}

                <button
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors btn-led disabled:opacity-50"
                    type="submit"
                    disabled={loading || !!message}
                >
                    {loading ? "Gönderiliyor..." : "Sıfırlama Bağlantısı Gönder"}
                </button>
            </form>

            <div className="mt-4 text-center text-sm">
                <Link href="/auth/login" className="text-primary hover:underline">
                    &larr; Giriş sayfasına dön
                </Link>
            </div>
        </div>
    );
}
