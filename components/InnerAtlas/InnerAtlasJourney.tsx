"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParallaxWorld, { DiagnosticState } from "./ParallaxWorld";
import ChariotDriver from "./ChariotDriver";
import CinematicOverlay from "./CinematicOverlay";
import { REALM_SCENARIOS } from "./RealmConfig";
import SoulTwinReaction from "./SoulTwinReaction";
import TransitionOverlay from "./TransitionOverlay";

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

    // Twin Witness State
    const [twinEvent, setTwinEvent] = useState<string | null>(null);
    const [twinMessage, setTwinMessage] = useState<string>("");

    // Transition State
    const [showTransition, setShowTransition] = useState(false);
    const [transitionPhase, setTransitionPhase] = useState<JourneyPhase>("arrival");

    // -- TRANSITION SYSTEM --
    const triggerTransition = (nextPhase: JourneyPhase, newBiome: BiomeType) => {
        // Save current phase for Gita line
        setTransitionPhase(phase);

        // 1. Show meditative overlay
        setShowTransition(true);

        // 2. Warp Speed (behind overlay)
        setTimeout(() => {
            setVelocity(10);
        }, 500);

        // 3. Wait for meditation (5 seconds total)
        setTimeout(() => {
            // Swap Biome behind the overlay
            setBiome(newBiome);
            setPhase(nextPhase);

            // Hide overlay
            setShowTransition(false);

            // 4. Decelerate
            setTimeout(() => {
                setVelocity(1);
            }, 1000);
        }, 5000); // Extended from 1.5s to 5s for meditation
    };

    // -- STEERING HANDLER --
    const handleSteer = (direction: "left" | "center" | "right", choiceId: string) => {
        // 1. Physically steer chariot
        const targetX = direction === "left" ? -0.8 : direction === "right" ? 0.8 : 0;
        setSteerX(targetX);

        // 2. Save Selection (Generic handler)
        const realmType = phase.split('_')[0]; // "mind", "heart", "shadow"
        setSelections(prev => ({ ...prev, [realmType]: choiceId }));

        // 3. Twin Witness Reaction
        const realmLabels: Record<string, string> = {
            mind: "Mind",
            heart: "Heart",
            shadow: "Shadow"
        };
        setTwinEvent("realm_choice");
        setTwinMessage(`${realmLabels[realmType]} realm choice: ${choiceId}`);

        // 4. Trigger Transition Sequence based on CONFIG
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


    // -- RESISTANCE MECHANIC --
    const [resistance, setResistance] = useState(0); // 0.0 to 1.0
    const interactionTimer = useRef<NodeJS.Timeout | null>(null);
    const lastInteractionTime = useRef<number>(Date.now());

    // Track steering for Twin witness
    useEffect(() => {
        if (Math.abs(steerX) > 0.5) {
            lastInteractionTime.current = Date.now();
        }
    }, [steerX]);

    // Reset resistance on phase change
    useEffect(() => {
        setResistance(0);
        if (interactionTimer.current) clearInterval(interactionTimer.current);

        // Only build resistance during choice phases
        if (phase.includes("choice")) {
            const startTime = Date.now();
            interactionTimer.current = setInterval(() => {
                const elapsed = (Date.now() - startTime) / 1000;
                const timeSinceInteraction = (Date.now() - lastInteractionTime.current) / 1000;

                // Start building resistance after 5 seconds of no interaction
                if (timeSinceInteraction > 5) {
                    setResistance(r => {
                        const newResistance = Math.min(r + 0.05, 1);

                        // Twin whisper when resistance crosses threshold
                        if (newResistance > 0.5 && r <= 0.5) {
                            setTwinEvent("hesitation");
                            setTwinMessage("Ruk gaye?");
                        }

                        return newResistance;
                    });
                } else {
                    // User is active, reduce resistance
                    setResistance(r => {
                        const newResistance = Math.max(r - 0.1, 0);

                        // Twin encouragement when resuming
                        if (newResistance < 0.5 && r >= 0.5) {
                            setTwinEvent("resumed");
                            setTwinMessage("Chalo, aage badhte hain.");
                        }

                        return newResistance;
                    });
                }
            }, 1000);
        }

        return () => {
            if (interactionTimer.current) clearInterval(interactionTimer.current);
        };
    }, [phase]);

    // -- PHYSICS MODIFIERS --
    // Resistance slows down the world
    const effectiveVelocity = Math.max(velocity * (1 - resistance * 0.6), 0.2);

    // Build diagnostic state from selections
    const diagnosticState: DiagnosticState = {
        mindState: selections.mind || undefined,
        heartState: selections.heart || undefined,
        shadowState: selections.shadow || undefined
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#050b14] text-white">

            {/* 1. VISUAL WORLD ENGINE */}
            <ParallaxWorld
                velocity={effectiveVelocity}
                biome={biome}
                resistance={resistance}
                diagnosticState={diagnosticState}
            />

            {/* 2. THE HERO (CHARIOT) */}
            <ChariotDriver
                steerX={steerX}
                velocity={effectiveVelocity}
            />

            {/* 3. CINEMATIC OVERLAY (UI) */}
            <CinematicOverlay
                phase={phase}
                onSteer={handleSteer}
                velocity={effectiveVelocity}
                resistance={resistance}
            />

            {/* 4. SFX CONTROLLER (Hidden) */}
            {/* <AmbientAudioController biome={biome} velocity={effectiveVelocity} resistance={resistance} /> */}

            {/* 5. SOUL TWIN WITNESS */}
            {twinEvent && (
                <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
                    <div className="pointer-events-auto">
                        <SoulTwinReaction
                            eventType={twinEvent as any}
                            eventPayload={{ message: twinMessage }}
                            characterMode="gann_baba"
                        />
                    </div>
                </div>
            )}

            {/* 6. MEDITATIVE TRANSITION OVERLAY */}
            <AnimatePresence>
                {showTransition && (
                    <TransitionOverlay
                        show={showTransition}
                        phase={transitionPhase}
                    />
                )}
            </AnimatePresence>

        </div>
    );
}
