"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface JourneyEndingProps {
    onComplete: () => void;
}

/**
 * JOURNEY ENDING SEQUENCE
 * 30 seconds of precise, frame-by-frame release
 * Design goal: End with orientation without closure
 * User should feel ready to act, not satisfied
 */
export default function JourneyEnding({ onComplete }: JourneyEndingProps) {
    const [phase, setPhase] = useState<number>(0);
    const [showText, setShowText] = useState(false);
    const [textOpacity, setTextOpacity] = useState(0);

    // Single line options (choose one, never rotate)
    const ENDING_LINES = [
        "Direction is enough for today.",
        "The rest is lived.",
        "Don't think. Practice."
    ];
    const selectedLine = ENDING_LINES[0]; // Always use first one for consistency

    useEffect(() => {
        // T-30s to T-24s: Slowdown begins (6 seconds)
        const timer1 = setTimeout(() => setPhase(1), 0);

        // T-24s to T-20s: World stops asking (4 seconds)
        const timer2 = setTimeout(() => setPhase(2), 6000);

        // T-20s to T-16s: Horizon opens (4 seconds)
        const timer3 = setTimeout(() => setPhase(3), 10000);

        // T-16s to T-12s: Twin withdraws (4 seconds)
        const timer4 = setTimeout(() => setPhase(4), 14000);

        // T-12s to T-8s: The only line (4 seconds)
        const timer5 = setTimeout(() => {
            setPhase(5);
            setShowText(true);
            // Fade in over 1.5s
            setTimeout(() => setTextOpacity(1), 50);
        }, 18000);

        // T-8s to T-4s: Release (4 seconds)
        const timer6 = setTimeout(() => {
            setPhase(6);
            // Fade out text
            setTextOpacity(0);
            setTimeout(() => setShowText(false), 1500);
        }, 22000);

        // T-4s to T-0s: Return (4 seconds)
        const timer7 = setTimeout(() => {
            setPhase(7);
            // Cross-fade to Daily Ritual Home
            setTimeout(() => onComplete(), 4000);
        }, 26000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearTimeout(timer5);
            clearTimeout(timer6);
            clearTimeout(timer7);
        };
    }, [onComplete]);

    // Calculate visual properties based on phase
    const getVisualProps = () => {
        switch (phase) {
            case 1: // T-30s to T-24s: Slowdown
                return {
                    velocity: 0.75, // 25% reduction
                    fov: 1.05, // 5% wider
                    brightness: 1.0
                };
            case 2: // T-24s to T-20s: World stops asking
                return {
                    velocity: 0.75,
                    fov: 1.05,
                    brightness: 1.0,
                    hideUI: true
                };
            case 3: // T-20s to T-16s: Horizon opens
                return {
                    velocity: 0.75,
                    fov: 1.1,
                    brightness: 1.1, // Warmer light
                    hideUI: true,
                    flattenTerrain: true
                };
            case 4: // T-16s to T-12s: Twin withdraws
                return {
                    velocity: 0.75,
                    fov: 1.1,
                    brightness: 1.1,
                    hideUI: true,
                    flattenTerrain: true,
                    hideTwin: true
                };
            case 5: // T-12s to T-8s: The only line
                return {
                    velocity: 0.75,
                    fov: 1.1,
                    brightness: 1.1,
                    hideUI: true,
                    flattenTerrain: true,
                    hideTwin: true
                };
            case 6: // T-8s to T-4s: Release
                return {
                    velocity: 0.5, // Near-stop
                    fov: 1.1,
                    brightness: 1.15, // Brightness lifts
                    hideUI: true,
                    flattenTerrain: true,
                    hideTwin: true
                };
            case 7: // T-4s to T-0s: Return
                return {
                    velocity: 0.3,
                    fov: 1.1,
                    brightness: 1.2,
                    hideUI: true,
                    flattenTerrain: true,
                    hideTwin: true,
                    crossFade: true
                };
            default:
                return {
                    velocity: 1.0,
                    fov: 1.0,
                    brightness: 1.0
                };
        }
    };

    const props = getVisualProps();

    return (
        <div className="fixed inset-0 z-50">
            {/* Background world effects */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-amber-600/10"
                animate={{
                    opacity: phase >= 3 ? 0.3 : 0,
                    scale: props.fov
                }}
                transition={{ duration: 2, ease: "easeOut" }}
            />

            {/* Brightness overlay */}
            <motion.div
                className="absolute inset-0 bg-white/0"
                animate={{
                    opacity: (props.brightness - 1) * 0.15
                }}
                transition={{ duration: 2, ease: "easeOut" }}
            />

            {/* The Only Line (T-12s to T-8s) */}
            <AnimatePresence>
                {showText && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: textOpacity }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                        <p className="text-white/60 text-sm md:text-base font-light tracking-wide text-center px-8">
                            {selectedLine}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bell tone indicator (T-8s to T-4s) */}
            {phase === 6 && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.1, 0] }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
            )}

            {/* Cross-fade to Daily Ritual Home (T-4s to T-0s) */}
            {props.crossFade && (
                <motion.div
                    className="absolute inset-0 bg-[#FFF8F0]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                />
            )}
        </div>
    );
}
