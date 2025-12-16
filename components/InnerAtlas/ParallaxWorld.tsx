"use client";

import React from "react";
import { motion } from "framer-motion";
import { BiomeType } from "./InnerAtlasJourney";

interface ParallaxWorldProps {
    velocity: number; // 0 (stop) to 10 (warp)
    biome: BiomeType;
}

// ---------------------------------------------------------------------
// ASSETS CONFIG (Placeholders for now)
// ---------------------------------------------------------------------
const BIOME_ASSETS = {
    void: {
        bg: "bg-[#050b14]", // Deep Dark
        ground: "from-[#0a1525] to-transparent",
        sky: null,
    },
    storm: {
        bg: "bg-[#1a1c29]",
        ground: "from-[#202533] to-transparent",
        sky: "url('/assets/clouds-storm.png')",
    },
    forest: {
        bg: "bg-[#0f1c13]",
        ground: "from-[#1a2e22] to-transparent",
        sky: null,
    },
    cosmic: {
        bg: "bg-[#160d26]",
        ground: "from-[#2a1b42] to-transparent",
        sky: "url('/assets/stars.png')",
    },
    // ... add others
};

export default function ParallaxWorld({ velocity, biome }: ParallaxWorldProps) {

    const currentTheme = BIOME_ASSETS[biome as keyof typeof BIOME_ASSETS] || BIOME_ASSETS.void;

    // -- ANIMATION SPEEDS --
    // We use CSS duration directly controlled by velocity
    // Higher velocity = Lower duration (Faster)
    const groundSpeed = velocity > 0 ? `${10 / velocity}s` : "0s";
    const horizonSpeed = velocity > 0 ? `${40 / velocity}s` : "0s";

    // Warp Blur Effect
    const warpBlur = velocity > 5 ? `blur(${velocity - 4}px)` : "blur(0px)";

    return (
        <div className={`absolute inset-0 transition-colors duration-1000 ${currentTheme.bg}`}>

            {/* 1. SKY / FAR LAYER */}
            {currentTheme.sky && (
                <div className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: currentTheme.sky,
                        backgroundSize: 'cover',
                        filter: warpBlur
                    }}
                />
            )}

            {/* 2. STARS (Always present in some form) */}
            <motion.div
                className="absolute inset-0"
                animate={{ opacity: velocity > 5 ? 1 : 0.5 }}
            >
                {/* Simple CSS Starfield simulation */}
                <div className="star-field w-full h-full opacity-30" />
            </motion.div>


            {/* 3. HORIZON (Mountains/Trees) - Moves slowly */}
            <div className="absolute bottom-[30vh] left-0 right-0 h-[40vh] overflow-hidden opacity-60">
                <div
                    className="w-[200%] h-full flex"
                    style={{
                        animation: `scrollLeft ${horizonSpeed} linear infinite`
                    }}
                >
                    {/* Repeat pattern twice for loop */}
                    <div className="w-1/2 h-full bg-[url('/assets/horizon-mountains.svg')] bg-repeat-x bg-contain" />
                    <div className="w-1/2 h-full bg-[url('/assets/horizon-mountains.svg')] bg-repeat-x bg-contain" />
                </div>
            </div>

            {/* 4. GROUND (The Road) - Moves fast */}
            <div className="absolute bottom-0 left-0 right-0 h-[50vh] perspective-origin-bottom overflow-hidden">
                {/* Ground Plane with specialized gradient to simulate endless floor */}
                <div
                    className={`w-full h-[200%] absolute top-[-50%] bg-gradient-to-b ${currentTheme.ground}`}
                    style={{
                        transform: "perspective(500px) rotateX(60deg)",
                        transformOrigin: "bottom",
                    }}
                >
                    {/* Grid Lines for motion reference */}
                    <div
                        className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:100px_100px]"
                        style={{
                            animation: `scrollGround ${groundSpeed} linear infinite`
                        }}
                    />
                </div>
            </div>

            {/* 5. WARP LINES (Only visible at high velocity) */}
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${velocity > 5 ? "opacity-100" : "opacity-0"}`}>
                <div className="warp-tunnel w-full h-full" />
            </div>

            {/* GLOBAL CSS FOR SCROLL */}
            <style jsx global>{`
        @keyframes scrollLeft {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
        }
        @keyframes scrollGround {
            from { background-position: 0 0; }
            to { background-position: 0 100px; }
        }
      `}</style>

        </div>
    );
}
