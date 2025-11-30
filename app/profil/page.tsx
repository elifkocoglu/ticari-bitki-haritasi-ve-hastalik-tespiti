"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { db, storage } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import Link from "next/link";

const AVATARS = [
    { id: "female", src: "/avatars/farmer-female.png", label: "Kadın Çiftçi" },
    { id: "male", src: "/avatars/farmer-male.png", label: "Erkek Çiftçi" },
];

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        displayName: "",
        city: "",
        photoURL: "",
    });
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/login");
            return;
        }

        if (session?.user?.email) {
            fetchUserData(session.user.email);
        }
    }, [session, status, router]);

    const fetchUserData = async (email: string) => {
        try {
            const userRef = doc(db, "users", email);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setFormData({
                    displayName: data.displayName || data.name || session?.user?.name || "",
                    city: data.city || "",
                    photoURL: data.photoURL || "",
                });
                const isAvatar = AVATARS.find(a => a.src === data.photoURL);
                if (isAvatar) setSelectedAvatar(isAvatar.id);
            } else {
                setFormData({
                    displayName: session?.user?.name || "",
                    city: "",
                    photoURL: session?.user?.image || "",
                });
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadFile(e.target.files[0]);
            setSelectedAvatar(null);
            const reader = new FileReader();
            reader.onload = (ev) => {
                setFormData(prev => ({ ...prev, photoURL: ev.target?.result as string }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleAvatarSelect = (avatar: typeof AVATARS[0]) => {
        setSelectedAvatar(avatar.id);
        setUploadFile(null);
        setFormData(prev => ({ ...prev, photoURL: avatar.src }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user?.email) return;
        setSaving(true);
        setMessage(null);

        try {
            let finalPhotoURL = formData.photoURL;

            // Upload file if selected
            if (uploadFile) {
                try {
                    const storageRef = ref(storage, `profiles/${session.user.email}/${uploadFile.name}`);
                    await uploadBytes(storageRef, uploadFile);
                    finalPhotoURL = await getDownloadURL(storageRef);
                } catch (storageError: any) {
                    console.error("Storage Error:", storageError);
                    throw new Error(`Fotoğraf yüklenemedi (Depolama İzni): ${storageError.message}`);
                }
            }

            try {
                const userRef = doc(db, "users", session.user.email);
                await setDoc(userRef, {
                    displayName: formData.displayName,
                    city: formData.city,
                    photoURL: finalPhotoURL,
                    email: session.user.email,
                    updatedAt: new Date().toISOString()
                }, { merge: true });
            } catch (firestoreError: any) {
                console.error("Firestore Error:", firestoreError);
                throw new Error(`Veri kaydedilemedi (Veritabanı İzni): ${firestoreError.message}`);
            }

            setFormData(prev => ({ ...prev, photoURL: finalPhotoURL }));
            setMessage({ type: "success", text: "Profil başarıyla güncellendi!" });

            router.refresh();

        } catch (error: any) {
            console.error("Profile Save Error:", error);
            setMessage({ type: "error", text: error.message });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-white">Yükleniyor...</div>;
    }

    return (
        <div className="min-h-screen w-full py-10 px-4">
            <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-zinc-200">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-zinc-800">Profil Düzenle</h1>
                    <Link href="/ana" className="text-sm text-zinc-500 hover:text-primary transition-colors">
                        ← Panele Dön
                    </Link>
                </div>

                {message && (
                    <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-zinc-700">Profil Fotoğrafı</label>

                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-zinc-100">
                                {formData.photoURL ? (
                                    <Image src={formData.photoURL} alt="Profile" fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-400">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 space-y-6">
                                <div>
                                    <p className="text-xs text-zinc-500 mb-3">Hazır Avatar Seçin:</p>
                                    <div className="flex gap-4">
                                        {AVATARS.map(avatar => (
                                            <button
                                                key={avatar.id}
                                                type="button"
                                                onClick={() => handleAvatarSelect(avatar)}
                                                className={`relative w-16 h-16 rounded-full overflow-hidden border-2 transition-all ${selectedAvatar === avatar.id ? 'border-primary ring-2 ring-primary/30 scale-110' : 'border-zinc-200 hover:border-zinc-300'}`}
                                            >
                                                <Image src={avatar.src} alt={avatar.label} fill className="object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <p className="text-xs text-zinc-400 italic">
                                        * Özel fotoğraf yükleme servisi şu an bakımda. Lütfen yukarıdaki avatarlardan birini seçiniz.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-zinc-700">Ad Soyad</label>
                            <input
                                type="text"
                                value={formData.displayName}
                                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                placeholder="Adınız Soyadınız"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-zinc-700">Yaşadığınız Şehir</label>
                            <select
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            >
                                <option value="">Seçiniz...</option>
                                <option value="Adana">Adana</option>
                                <option value="Ankara">Ankara</option>
                                <option value="Antalya">Antalya</option>
                                <option value="Bursa">Bursa</option>
                                <option value="Diyarbakır">Diyarbakır</option>
                                <option value="Gaziantep">Gaziantep</option>
                                <option value="İstanbul">İstanbul</option>
                                <option value="İzmir">İzmir</option>
                                <option value="Konya">Konya</option>
                                <option value="Manisa">Manisa</option>
                                <option value="Mersin">Mersin</option>
                                <option value="Samsun">Samsun</option>
                                <option value="Şanlıurfa">Şanlıurfa</option>
                                <option value="Diğer">Diğer</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {saving ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Kaydediliyor...
                                </>
                            ) : (
                                "Değişiklikleri Kaydet"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
