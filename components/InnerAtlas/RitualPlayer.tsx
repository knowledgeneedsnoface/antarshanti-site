"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { getTodaysRitual, type DailyRitual, type RitualMode } from "@/lib/ritualEngine";

interface RitualPlayerProps {
    assignedRitualKey: string;
    onRitualComplete: (key: string) => void;
    mood?: string;
    streakCount?: number;
}

/**
 * GITA-ALIGNED RITUAL PLAYER
 * 
 * Uses contextual, lunar-aligned rituals from ritual engine
 * Structure: Primary line → Secondary line → Optional line → Closure
 * 
 * Non-negotiables:
 * - Never longer than 2 minutes total
 * - No gamification language
 * - No "challenge" or "habit" words
 * - Sends users back into life with awareness
 */
export default function RitualPlayer({ assignedRitualKey, onRitualComplete }: RitualPlayerProps) {
    const [todaysRitual, setTodaysRitual] = useState<DailyRitual | null>(null);
    const [currentPhase, setCurrentPhase] = useState<"primary" | "secondary" | "optional" | "closure" | "complete">("primary");
    const [timeRemaining, setTimeRemaining] = useState(0);

    // Load today's ritual
    useEffect(() => {
        const saved = localStorage.getItem('last_ritual_mode');
        const lastMode = saved ? (saved as RitualMode) : null;

        const ritual = getTodaysRitual(lastMode);
        setTodaysRitual(ritual);
        setTimeRemaining(ritual.duration);

        // Save this ritual's mode for next time
        localStorage.setItem('last_ritual_mode', ritual.mode);
    }, []);

    // Timer logic
    useEffect(() => {
        if (!todaysRitual || currentPhase === "complete") return;

        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    // Move to next phase
                    if (currentPhase === "primary") {
                        setCurrentPhase("secondary");
                        return todaysRitual.duration;
                    } else if (currentPhase === "secondary") {
                        if (todaysRitual.optionalLine) {
                            setCurrentPhase("optional");
                            return 10; // Optional line shows for 10 seconds
                        } else {
                            setCurrentPhase("closure");
                            return 15; // Closure shows for 15 seconds
                        }
                    } else if (currentPhase === "optional") {
                        setCurrentPhase("closure");
                        return 15;
                    } else if (currentPhase === "closure") {
                        setCurrentPhase("complete");
                        return 0;
                    }
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentPhase, todaysRitual]);

    // Handle completion
    useEffect(() => {
        if (currentPhase === "complete" && todaysRitual) {
            // Wait 2 seconds then complete
            const timeout = setTimeout(() => {
                onRitualComplete(assignedRitualKey);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [currentPhase, todaysRitual, onRitualComplete, assignedRitualKey]);

    if (!todaysRitual) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFF8F0] to-[#F5EDE3]">
                <p className="text-gray-600">Loading ritual...</p>
            </div>
        );
    }

    // Get current line to display
    const getCurrentLine = () => {
        switch (currentPhase) {
            case "primary":
                return todaysRitual.primaryLine;
            case "secondary":
                return todaysRitual.secondaryLine;
            case "optional":
                return todaysRitual.optionalLine || "";
            case "closure":
                return todaysRitual.closureLine;
            case "complete":
                return "";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#F5EDE3] flex flex-col items-center justify-center p-6">
            <AnimatePresence mode="wait">
                {currentPhase !== "complete" ? (
                    <motion.div
                        key={currentPhase}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-md w-full text-center"
                    >
                        {/* Ritual line */}
                        <p className="text-2xl md:text-3xl font-light text-gray-900 leading-relaxed mb-12">
                            {getCurrentLine()}
                        </p>

                        {/* Breathing circle (no timer shown, just visual rhythm) */}
                        <motion.div
                            className="w-24 h-24 mx-auto rounded-full border-2 border-gray-300"
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Phase indicator (subtle) */}
                        <div className="mt-12 flex justify-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${currentPhase === "primary" ? "bg-gray-900" : "bg-gray-300"}`} />
                            <div className={`w-2 h-2 rounded-full ${currentPhase === "secondary" ? "bg-gray-900" : "bg-gray-300"}`} />
                            {todaysRitual.optionalLine && (
                                <div className={`w-2 h-2 rounded-full ${currentPhase === "optional" ? "bg-gray-900" : "bg-gray-300"}`} />
                            )}
                            <div className={`w-2 h-2 rounded-full ${currentPhase === "closure" ? "bg-gray-900" : "bg-gray-300"}`} />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                        <p className="text-xl text-gray-600">Ritual complete.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
