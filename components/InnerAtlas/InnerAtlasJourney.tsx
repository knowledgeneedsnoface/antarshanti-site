"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParallaxWorld from "./ParallaxWorld";
import ChariotDriver from "./ChariotDriver";
import CinematicOverlay from "./CinematicOverlay";
import { REALM_SCENARIOS } from "./RealmConfig";

// ---------------------------------------------------------------------
// TYPES & CONFIG
// ---------------------------------------------------------------------

export type JourneyPhase =
    | "arrival"
    | "mind_choice"
    | "mind_transition"
    | "heart_choice"
    | "heart_transition"
    | "shadow_choice"
    | "shadow_transition"
    | "battle_choice"
    | "battle_transition"
    | "power_choice"
    | "power_transition"
    | "gita_reveal";

export type BiomeType = "void" | "storm" | "forest" | "lake" | "bazaar" | "desert" | "cosmic";

interface JourneyState {
    velocity: number; // 0 to 10 (1=cruise, 10=warp)
    biome: BiomeType;
    steerX: number; // -1 (Left) to 1 (Right)
    distanceTraveled: number;
}

// ---------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------

export default function InnerAtlasJourney() {

    // -- GLOBAL ENGINE STATE --
    const [phase, setPhase] = useState<JourneyPhase>("arrival");

    // The Physics State
    const [velocity, setVelocity] = useState(0);
    const [steerX, setSteerX] = useState(0); // -1 to 1
    const [biome, setBiome] = useState<BiomeType>("void");

    // Selection History
    const [selections, setSelections] = useState({
        mind: null as string | null,
        heart: null as string | null,
        shadow: null as string | null,
        battle: null as string | null,
        power: null as any
    });

    // -- TRANSITION SYSTEM --
    const triggerTransition = (nextPhase: JourneyPhase, newBiome: BiomeType) => {
        // 1. Warp Speed
        setVelocity(10);

        // 2. Wait for acceleration visual
        setTimeout(() => {
            // 3. Swap Biome behind the blur
            setBiome(newBiome);
            setPhase(nextPhase);

            // 4. Decelerate
            setTimeout(() => {
                setVelocity(1);
            }, 2000);
        }, 1500);
    };

    // -- STEERING HANDLER --
    const handleSteer = (direction: "left" | "center" | "right", choiceId: string) => {
        // 1. Physically steer chariot
        const targetX = direction === "left" ? -0.8 : direction === "right" ? 0.8 : 0;
        setSteerX(targetX);

        // 2. Save Selection (Generic handler)
        setSelections(prev => ({ ...prev, [phase.split('_')[0]]: choiceId }));

        // 3. Trigger Transition Sequence based on CONFIG
        const scenario = REALM_SCENARIOS[phase as keyof typeof REALM_SCENARIOS];
        if (scenario) {
            const selectedOption = scenario.options.find(opt => opt.id === choiceId);

            if (selectedOption) {
                // Use config for next phase and biome
                // Fallback to 'void' if not specified
                triggerTransition(scenario.nextPhase, selectedOption.nextBiome || "void");
            }
        }
    };

    // -- INITIALIZATION --
    useEffect(() => {
        // Start sequence
        setTimeout(() => {
            setVelocity(1); // Start rolling
            setPhase("mind_choice"); // For testing, jump to first choice
        }, 4000); // Wait for "Arrival" text
    }, []);


    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#050b14] text-white">

            {/* 1. VISUAL WORLD ENGINE */}
            <ParallaxWorld
                velocity={velocity}
                biome={biome}
            />

            {/* 2. THE HERO (CHARIOT) */}
            <ChariotDriver
                steerX={steerX}
                velocity={velocity}
            />

            {/* 3. CINEMATIC OVERLAY (UI) */}
            <CinematicOverlay
                phase={phase}
                onSteer={handleSteer}
                velocity={velocity}
            />

            {/* 4. SFX CONTROLLER (Hidden) */}
            {/* <AmbientAudioController biome={biome} velocity={velocity} /> */}

        </div>
    );
}
