"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JourneyPhase } from "./InnerAtlasJourney";

interface CinematicOverlayProps {
    phase: JourneyPhase;
    velocity: number;
    onSteer: (direction: "left" | "center" | "right", choiceId: string) => void;
}

import { REALM_SCENARIOS } from "./RealmConfig";

export default function CinematicOverlay({ phase, velocity, onSteer }: CinematicOverlayProps) {

    // Determine if UI should be visible (Hide during warp)
    const isTransitioning = velocity > 5;

    // Get current scenario data from CONFIG
    const currentScenario = REALM_SCENARIOS[phase as keyof typeof REALM_SCENARIOS];

    if (!currentScenario || isTransitioning) return null;

    return (
        <div className="absolute inset-0 z-30 flex flex-col justify-between py-20 px-6 pointer-events-none">

            {/* 1. MICRO-NARRATION (Top) */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center pt-10"
            >
                <h2 className="text-2xl md:text-3xl font-light text-white/90 drop-shadow-md font-serif italic">
                    "{currentScenario.narrative}"
                </h2>
            </motion.div>

            {/* 2. STEERING CONTROLS (Bottom/Sides) */}
            {/* These are placed spatially (Left, Center, Right) */}
            <div className="flex flex-row justify-center items-end gap-4 md:gap-10 h-full pb-10 pointer-events-auto">

                {currentScenario.options.map((opt: any) => (
                    <SteerCard
                        key={opt.id}
                        label={opt.label}
                        sub={opt.sub}
                        direction={opt.direction} // "left" | "center" | "right"
                        onClick={() => onSteer(opt.direction, opt.id)}
                    />
                ))}

            </div>

        </div>
    );
}

// ---------------------------------------------------------------------
// SUB-COMPONENT: STEER CARD
// ---------------------------------------------------------------------
function SteerCard({ label, sub, direction, onClick }: any) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            className={`
                group relative
                w-32 h-48 md:w-48 md:h-64
                rounded-xl border border-white/20 bg-black/40 backdrop-blur-md
                flex flex-col items-center justify-center text-center p-4
                transition-all duration-300
                hover:bg-amber-900/40 hover:border-amber-400/50
            `}
        >
            {/* Direction Hint */}
            <div className="absolute top-2 text-xs uppercase tracking-widest opacity-50 text-amber-200">
                {direction === "left" ? "← Left" : direction === "right" ? "Right →" : "↑ Center"}
            </div>

            <h3 className="text-lg md:text-xl font-bold text-white mb-1">{label}</h3>
            <p className="text-xs text-gray-300 font-light">{sub}</p>

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
        </motion.button>
    )
}
