"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TurkeyMap = dynamic(() => import("./components/TurkeyMap"), {
  ssr: false,
  loading: () => <div className="w-full h-[85vh] bg-cream rounded-md flex items-center justify-center text-zinc-500">Harita Yükleniyor...</div>
});

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/auth/login");
  };

  useEffect(() => {
    const handleScroll = () => handleRedirect();
    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchmove", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, []);

  return (
    <div
      className="h-screen w-screen overflow-hidden relative cursor-pointer"
      onClickCapture={handleRedirect}
    >
      <TurkeyMap className="h-full border-none rounded-none" interactive={false} />

      {/* Optional Overlay Text */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/80 px-6 py-2 rounded-full shadow-lg z-[1000] pointer-events-none">
        <p className="text-zinc-800 font-medium animate-pulse">Giriş yapmak için tıklayın veya kaydırın</p>
      </div>

      {/* Brand Overlay */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none select-none">
        <h1 className="text-6xl font-bold text-[#5D4037]/50 tracking-widest">e-kin</h1>
      </div>
    </div>
  );
}
