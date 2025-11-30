"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;

    setError(null);
    setSuccess(null);
    setLoading(true);

    // Check if Firebase is configured
    if (!auth.app.options.apiKey) {
      setError("Sistem hatası: Firebase API anahtarı bulunamadı. Lütfen geliştirici ile iletişime geçin veya sayfayı yenileyin.");
      console.error("Firebase config is missing API Key.");
      setLoading(false);
      return;
    }

    console.log("Registration started...");

    try {
      // 1. Create user in Firebase Auth
      console.log("Creating user...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User created:", user.uid);

      // 2. Send Verification Email
      console.log("Sending verification email...");
      await sendEmailVerification(user);
      console.log("Verification email sent.");

      // 3. Save additional user data to Firestore
      console.log("Saving to Firestore...");
      try {
        const saveToFirestore = setDoc(doc(db, "users", email), {
          name: name,
          email: email,
          createdAt: new Date().toISOString(),
          role: "user"
        });

        // Timeout after 5 seconds
        const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Firestore timeout")), 5000));

        await Promise.race([saveToFirestore, timeout]);
        console.log("Firestore saved.");
      } catch (firestoreErr) {
        console.warn("Firestore save failed or timed out (proceeding anyway):", firestoreErr);
        // We proceed because the Auth account is created and email sent.
        // The user can still log in.
      }

      // 4. Sign out the user immediately
      await signOut(auth);
      console.log("User signed out.");

      // 5. Show success message and redirect
      setSuccess("Kayıt başarılı! Doğrulama maili gönderildi. Giriş sayfasına yönlendiriliyorsunuz...");

      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);

    } catch (err: any) {
      console.error("Registration error:", err);
      setLoading(false);
      if (err.code === 'auth/email-already-in-use') {
        setError("Bu e-posta adresi zaten kullanımda.");
      } else if (err.code === 'auth/weak-password') {
        setError("Şifre en az 6 karakter olmalıdır.");
      } else {
        setError(`Kayıt hatası: [${err.code}] - ${err.message}`);
      }
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-primary mb-4">Kayıt Ol</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input
          className="border p-2 rounded"
          placeholder="Ad Soyad"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />
        <input
          className="border p-2 rounded"
          placeholder="E-posta"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          className="border p-2 rounded"
          placeholder="Şifre"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        {error && <p className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200">{error}</p>}
        {success && <p className="text-green-600 text-sm bg-green-50 p-2 rounded border border-green-200">{success}</p>}

        <button
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors btn-led disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading || !!success}
        >
          {loading || success ? "İşlem yapılıyor..." : "Kayıt Ol"}
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-zinc-600">
        Zaten hesabınız var mı? <Link href="/auth/login" className="text-primary hover:underline">Giriş Yap</Link>
      </div>
    </div>
  );
}
