"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Debug: Check if config is loaded
  const isConfigMissing = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await signIn("credentials", { redirect: false, email, password });
    if (res?.ok) {
      router.push("/ana");
    } else {
      console.error("Login failed:", res?.error);
      if (res?.error?.includes("doğrulanmamış")) {
        setError("Giriş yapılamadı: E-posta adresiniz doğrulanmamış. Lütfen mail kutunuzu kontrol edin.");
      } else if (res?.error?.includes("Kullanıcı bulunamadı")) {
        setError("Bu e-posta adresi ile kayıtlı bir kullanıcı bulunamadı. Lütfen kayıt olun.");
      } else if (res?.error?.includes("Şifre hatalı")) {
        setError("Giriş başarısız: Şifreniz hatalı. Lütfen tekrar deneyin.");
      } else {
        // Show the actual error message from the backend
        setError(res?.error || "Giriş başarısız. Bilgilerinizi kontrol edin.");
      }
    }
  }

  async function handleGoogleLogin() {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/ana"); // Redirect to dashboard after successful login
    } catch (err: any) {
      console.error("Google login error:", err);
      setError("Google ile giriş yapılırken bir hata oluştu.");
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-primary mb-4">Giriş yap</h1>

      {isConfigMissing && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Konfigürasyon Hatası!</strong>
          <span className="block sm:inline"> Firebase API anahtarı bulunamadı. Lütfen .env.local dosyasını kontrol edin.</span>
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input className="border p-2 rounded" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Şifre" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex justify-end">
          <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
            Şifremi unuttum
          </Link>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded btn-led" type="submit">Giriş yap</button>
      </form>

      {/* Register Link */}
      <div className="mt-4 text-center">
        <p className="text-sm text-zinc-600">
          Hesabınız yok mu? <Link href="/auth/register" className="text-primary font-medium hover:underline">Kayıt Ol</Link>
        </p>
      </div>

      <div className="mt-6 border-t pt-4">
        <button
          className="w-full px-4 py-2 bg-white border border-zinc-300 text-zinc-700 rounded flex items-center justify-center gap-2 hover:bg-zinc-50 transition-colors"
          onClick={handleGoogleLogin}
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Google ile devam et
        </button>
      </div>
    </div>
  );
}
