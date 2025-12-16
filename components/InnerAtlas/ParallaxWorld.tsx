"use client";

import React from "react";
import { motion } from "framer-motion";
import { BiomeType } from "./InnerAtlasJourney";

export interface DiagnosticState {
    mindState?: string; // "stormy_sky" | "quiet_lake" | "crowded_bazaar"
    heartState?: string; // "heavy_stone" | "flowering_garden" | "burning_fire"
    shadowState?: string; // "failure" | "loneliness" | "judgement"
}

interface ParallaxWorldProps {
    velocity: number; // 0 (stop) to 10 (warp)
    biome: BiomeType;
    resistance: number; // 0 to 1
    diagnosticState?: DiagnosticState; // NEW: User's inner state
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

export default function ParallaxWorld({ velocity, biome, resistance, diagnosticState }: ParallaxWorldProps) {

    const currentTheme = BIOME_ASSETS[biome as keyof typeof BIOME_ASSETS] || BIOME_ASSETS.void;

    // -- DIAGNOSTIC-DRIVEN ATMOSPHERE MODIFIERS --
    // Morph biome based on user's inner state
    const getMindModifier = () => {
        if (!diagnosticState?.mindState) return 1;
        if (diagnosticState.mindState === "stormy_sky") return 0.7; // Darker, more turbulent
        if (diagnosticState.mindState === "quiet_lake") return 1.2; // Brighter, calmer
        if (diagnosticState.mindState === "crowded_bazaar") return 1.0; // Neutral
        return 1;
    };

    const getHeartModifier = () => {
        if (!diagnosticState?.heartState) return 1;
        if (diagnosticState.heartState === "heavy_stone") return 0.8; // Slower, heavier
        if (diagnosticState.heartState === "flowering_garden") return 1.1; // Lighter
        if (diagnosticState.heartState === "burning_fire") return 1.3; // Faster, intense
        return 1;
    };

    const getShadowFog = () => {
        if (!diagnosticState?.shadowState) return 0;
        if (diagnosticState.shadowState === "failure") return 0.15; // Moderate fog
        if (diagnosticState.shadowState === "loneliness") return 0.25; // Heavy fog
        if (diagnosticState.shadowState === "judgement") return 0.1; // Light fog
        return 0;
    };

    const mindMod = getMindModifier();
    const heartMod = getHeartModifier();
    const shadowFog = getShadowFog();

    // -- ANIMATION SPEEDS (Modified by heart state) --
    const baseGroundSpeed = 10 / (velocity || 0.1);
    const baseHorizonSpeed = 40 / (velocity || 0.1);
    const groundSpeed = velocity > 0 ? `${baseGroundSpeed / heartMod}s` : "0s";
    const horizonSpeed = velocity > 0 ? `${baseHorizonSpeed / heartMod}s` : "0s";

    // Warp Blur Effect
    const warpBlur = velocity > 5 ? `blur(${velocity - 4}px)` : "blur(0px)";

    // Resistance Filters (Enhanced with mind modifier)
    const saturation = (1 - resistance) * mindMod; // Mind state affects color
    const brightness = (1 - (resistance * 0.4)) * mindMod; // Mind state affects light
    const fogOpacity = Math.min((resistance * 0.5) + shadowFog, 0.7); // Resistance + Shadow fog

    // Heartbeat pulse when resistance is high
    const showHeartbeat = resistance > 0.5;

    return (
        <div
            className={`absolute inset-0 transition-colors duration-1000 ${currentTheme.bg}`}
            style={{ filter: `saturate(${saturation}) brightness(${brightness})` }}
        >

            {/* 0. RESISTANCE FOG (New Layer) */}
            <div
                className="absolute inset-0 bg-gray-900 pointer-events-none z-10 transition-opacity duration-1000"
                style={{ opacity: fogOpacity }}
            />

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

            {/* 6. HEARTBEAT PULSE (Resistance feedback) */}
            {showHeartbeat && (
                <motion.div
                    className="absolute inset-0 pointer-events-none z-20"
                    animate={{
                        boxShadow: [
                            "inset 0 0 0px rgba(212, 169, 74, 0)",
                            "inset 0 0 60px rgba(212, 169, 74, 0.3)",
                            "inset 0 0 0px rgba(212, 169, 74, 0)"
                        ]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            )}

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
