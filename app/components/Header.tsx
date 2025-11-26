"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/auth/login");
    };

    // Hide header on login page and landing page
    if (pathname === "/auth/login" || pathname === "/") {
        return null;
    }

    return (
        <header className="border-b border-[var(--beige)] bg-cream/70">
            <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/ana" className="font-semibold text-primary">Tarım Bilgi</Link>
                <div className="flex gap-4 text-sm items-center">
                    <Link href="/bilgi" className="hover:underline">Bilgi Rehberi</Link>
                    <Link href="/tani" className="hover:underline">Bitki Tanı</Link>
                    {user ? (
                        <button onClick={handleLogout} className="text-red-600 hover:underline">Çıkış Yap</button>
                    ) : (
                        <Link href="/auth/login" className="hover:underline">Giriş</Link>
                    )}
                </div>
            </nav>
        </header>
    );
}
