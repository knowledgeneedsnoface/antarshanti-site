"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RitualStage from "./RitualStage";
import RitualVisual from "./RitualVisual";
import ritualLibrary from "@/data/ritualLibrary.json";

interface Ritual {
    day: number;
    mode: string;
    visual: string;
    durationSeconds: number;
    copy: {
        hinglish: string;
        english: string;
    };
    fallback?: {
        hinglish: string;
        english: string;
    };
}

type Stage = "arrival" | "instruction" | "presence" | "closure" | "complete";

/**
 * DAILY RITUAL ENGINE
 * 
 * Controls ritual flow:
 * 1. Determines today's ritual from 30-day cycle
 * 2. Manages stage progression (arrival → instruction → presence → closure)
 * 3. Handles timing and transitions
 * 4. Silently transitions to Daily Home at end
 * 
 * No progress bars, no step numbers, no gamification
 * Feels like weather, not UI
 */
export default function DailyRitualEngine() {
    const router = useRouter();
    const [ritual, setRitual] = useState<Ritual | null>(null);
    const [currentStage, setCurrentStage] = useState<Stage>("arrival");
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Determine today's ritual on mount
    useEffect(() => {
        const cycleDay = getCycleDay();
        const todaysRitual = ritualLibrary.rituals.find((r: any) => r.day === cycleDay);

        if (todaysRitual) {
            setRitual(todaysRitual as Ritual);
        }
    }, []);

    // Handle stage advancement
    const advanceStage = () => {
        setIsTransitioning(true);

        setTimeout(() => {
            if (currentStage === "arrival") {
                setCurrentStage("instruction");
            } else if (currentStage === "instruction") {
                setCurrentStage("presence");
            } else if (currentStage === "presence") {
                setCurrentStage("closure");
            } else if (currentStage === "closure") {
                setCurrentStage("complete");
                // Save completion and transition to Daily Home
                saveRitualCompletion();
                setTimeout(() => {
                    router.push("/get-started");
                }, 2000);
            }
            setIsTransitioning(false);
        }, 400);
    };

    if (!ritual) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFF8F0] to-[#F5EDE3]">
                <p className="text-gray-600">Loading ritual...</p>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#F5EDE3]">
            {/* Background visual */}
            <RitualVisual visual={ritual.visual} opacity={0.25} />

            {/* Stage content */}
            {!isTransitioning && currentStage !== "complete" && (
                <>
                    {currentStage === "arrival" && (
                        <RitualStage
                            primaryText="Shuru karte hain."
                            secondaryText="Let's begin."
                            durationSeconds={5}
                            onAdvance={advanceStage}
                        />
                    )}

                    {currentStage === "instruction" && (
                        <RitualStage
                            primaryText={ritual.copy.hinglish}
                            secondaryText={ritual.copy.english}
                            durationSeconds={15}
                            onAdvance={advanceStage}
                        />
                    )}

                    {currentStage === "presence" && (
                        <RitualStage
                            primaryText={ritual.fallback?.hinglish || ritual.copy.hinglish}
                            secondaryText={ritual.fallback?.english || ritual.copy.english}
                            durationSeconds={ritual.durationSeconds}
                            allowManualAdvance={ritual.durationSeconds > 20}
                            onAdvance={advanceStage}
                        />
                    )}

                    {currentStage === "closure" && (
                        <RitualStage
                            primaryText="Bas."
                            secondaryText="That's enough."
                            durationSeconds={5}
                            onAdvance={advanceStage}
                        />
                    )}
                </>
            )}
        </div>
    );
}

/**
 * Determine current day in 30-day cycle
 * Uses localStorage to track cycle start
 */
function getCycleDay(): number {
    if (typeof window === 'undefined') return 1;

    const CYCLE_START_KEY = "antarshanti_cycle_start";
    let cycleStart = localStorage.getItem(CYCLE_START_KEY);

    if (!cycleStart) {
        // First time - set today as Day 1
        cycleStart = new Date().toISOString();
        localStorage.setItem(CYCLE_START_KEY, cycleStart);
        return 1;
    }

    const startDate = new Date(cycleStart);
    const today = new Date();
    const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    return (daysSinceStart % 30) + 1;
}

/**
 * Save ritual completion to localStorage
 */
function saveRitualCompletion() {
    if (typeof window === 'undefined') return;

    const cycleDay = getCycleDay();
    localStorage.setItem("antarshanti_last_completed_day", cycleDay.toString());
}
