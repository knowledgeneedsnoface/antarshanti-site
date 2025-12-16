import React from "react";

export default function PortalFallback() {
    return (
        <section className="relative w-full h-screen min-h-[800px] overflow-hidden bg-[#0a0502] text-white flex flex-col items-center justify-center z-50">

            {/* Static Portal Ring with Pulse */}
            <div className="relative mb-12 animate-pulse">
                {/* Glow Halo */}
                <div className="absolute inset-0 rounded-full bg-amber-600/20 blur-2xl transform scale-105" />

                {/* Ring SVG */}
                <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle
                        cx="120" cy="120" r="100"
                        stroke="url(#fallbackGradient)"
                        strokeWidth="2"
                        className="opacity-80"
                    />
                    <circle
                        cx="120" cy="120" r="100"
                        stroke="url(#fallbackGradient)"
                        strokeWidth="4"
                        className="opacity-40"
                    />
                    <defs>
                        <linearGradient id="fallbackGradient" x1="20" y1="20" x2="220" y2="220" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F59E0B" stopOpacity="0" />
                            <stop offset="0.5" stopColor="#F59E0B" />
                            <stop offset="1" stopColor="#F59E0B" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Content Copy - Matches PortalHero exactly */}
            <div className="z-10 text-center max-w-2xl px-6 pointer-events-none select-none">
                <h1 className="text-4xl md:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 mb-4 tracking-tight">
                    Enter Your 10-Minute Sanctuary
                </h1>

                <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-2">
                    A physical daily ritual kit, guided by a living digital soul companion.
                </p>

                <p className="text-sm md:text-base text-amber-100/60 font-serif italic tracking-wide mb-10">
                    Light. Breathe. Reflect. Your inner state evolves with you.
                </p>

                {/* Placeholder for buttons to reserve space */}
                <div className="h-[50px] w-full" />
            </div>
        </section>
    );
}
