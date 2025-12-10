"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const BACKGROUND_IMAGES = [
    "/bg-lavender.jpg",
    "/bg-rose.jpg",
    "/bg-wheat.jpg"
];

export default function BackgroundController() {
    const pathname = usePathname();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [prevImageIndex, setPrevImageIndex] = useState(0);

    // Exclude background check removed - applies globally now

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => {
                setPrevImageIndex(prev);
                return (prev + 1) % BACKGROUND_IMAGES.length;
            });
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 -z-[1] pointer-events-none overflow-hidden bg-zinc-900">
            {BACKGROUND_IMAGES.map((src, index) => {
                const isCurrent = index === currentImageIndex;
                const isPrev = index === prevImageIndex;

                let zIndex = 0;
                let opacity = 0;

                if (isCurrent) {
                    zIndex = 20;
                    opacity = 1;
                } else if (isPrev) {
                    zIndex = 10;
                    opacity = 1;
                }

                return (
                    <div
                        key={src}
                        className="absolute inset-0 overflow-hidden"
                        style={{
                            opacity: opacity,
                            zIndex: zIndex,
                            transition: isCurrent ? "opacity 1.5s ease-in-out" : "opacity 0s"
                        }}
                    >
                        <img
                            src={src}
                            alt="Background"
                            loading="eager"
                            decoding="sync"
                            className="w-full h-full object-cover"
                            style={{
                                // Enhanced Ken Burns effect
                                // Scale from 1.0 to 1.15 over 15 seconds
                                transform: isCurrent ? "scale(1.15)" : "scale(1.0)",
                                transition: "transform 15s ease-out"
                            }}
                        />
                    </div>
                );
            })}

            {/* Overlay for readability - Adjusted to 60% white opacity */}
            <div className="absolute inset-0 bg-slate-50/60 backdrop-blur-[2px] z-[30]" />
        </div>
    );
}
