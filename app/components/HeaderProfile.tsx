"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";

export default function HeaderProfile() {
    const { data: session } = useSession();
    const [photoURL, setPhotoURL] = useState<string | null>(null);

    useEffect(() => {
        if (session?.user?.email) {
            const fetchAvatar = async () => {
                try {
                    const userRef = doc(db, "users", session.user!.email!);
                    const docSnap = await getDoc(userRef);
                    if (docSnap.exists() && docSnap.data().photoURL) {
                        setPhotoURL(docSnap.data().photoURL);
                    }
                } catch (error) {
                    console.error("Error fetching avatar:", error);
                }
            };
            fetchAvatar();
        }
    }, [session]);

    return (
        <Link
            href="/profil"
            title="Profilim"
            className="p-2 bg-zinc-100 text-zinc-600 rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center"
        >
            {photoURL ? (
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-zinc-300">
                    <Image src={photoURL} alt="Profil" fill className="object-cover" />
                </div>
            ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )}
        </Link>
    );
}
