"use client";

import { usePathname } from "next/navigation";

export default function BackgroundController() {
    const pathname = usePathname();

    // Exclude background on map pages
    const isMapPage = pathname === "/harita" || pathname.startsWith("/il/");

    // For map pages, show a solid background (Modern Slate)
    if (isMapPage) {
        return <div className="fixed inset-0 -z-50 bg-[#F8FAFC]" />;
    }

    return (
        <div className="fixed inset-0 -z-[1] pointer-events-none">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                style={{
                    backgroundImage: "url('/background-wheat.jpg')"
                }}
            />

            {/* Overlay for readability - Adjusted to 60% white opacity */}
            <div className="absolute inset-0 bg-slate-50/60 backdrop-blur-[2px]" />
        </div>
    );
}
