"use client";

import React from "react";
import { motion } from "framer-motion";

interface RitualVisualProps {
    visual: string;
    opacity?: number;
}

/**
 * Renders background visuals based on ritual mode
 * All animations are subtle, slow, and respect reduced-motion
 */
export default function RitualVisual({ visual, opacity = 0.25 }: RitualVisualProps) {
    const prefersReducedMotion = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    // Map visual types to components
    const visualComponents: Record<string, React.ReactElement> = {
        sky_horizon: <SkyHorizon opacity={opacity} prefersReducedMotion={prefersReducedMotion} />,
        full_moon_sky: <FullMoonSky opacity={opacity} prefersReducedMotion={prefersReducedMotion} />,
        ground_forward_drift: <GroundForwardDrift opacity={opacity} prefersReducedMotion={prefersReducedMotion} />,
        sound_waves: <SoundWaves opacity={opacity} prefersReducedMotion={prefersReducedMotion} />,
        night_sound_waves: <SoundWaves opacity={opacity * 0.7} prefersReducedMotion={prefersReducedMotion} />,
        breath_glow: <BreathGlow opacity={opacity} prefersReducedMotion={prefersReducedMotion} />,
        warm_particles: <WarmParticles opacity={opacity} prefersReducedMotion={prefersReducedMotion} />,
        flame_focus: <FlameFlicker opacity={opacity} prefersReducedMotion={prefersReducedMotion} />,
        breath_observation: <BreathGlow opacity={opacity * 0.5} prefersReducedMotion={prefersReducedMotion} />,
        body_stretch: <WarmParticles opacity={opacity * 0.5} prefersReducedMotion={prefersReducedMotion} />,
        nature_stillness: <SkyHorizon opacity={opacity * 0.6} prefersReducedMotion={prefersReducedMotion} />,
        sound_gap: <SoundWaves opacity={opacity * 0.4} prefersReducedMotion={prefersReducedMotion} />,
        still_body: <WarmParticles opacity={opacity * 0.3} prefersReducedMotion={prefersReducedMotion} />
    };

    return (
        <div className="fixed inset-0 pointer-events-none">
            {visualComponents[visual] || <SkyHorizon opacity={opacity} prefersReducedMotion={prefersReducedMotion} />}
        </div>
    );
}

// Visual Components

function SkyHorizon({ opacity, prefersReducedMotion }: { opacity: number; prefersReducedMotion: boolean }) {
    return (
        <motion.div
            className="absolute inset-0 bg-gradient-to-b from-amber-100 via-orange-50 to-transparent"
            style={{ opacity }}
            animate={prefersReducedMotion ? {} : { opacity: [opacity, opacity * 0.8, opacity] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
    );
}

function FullMoonSky({ opacity, prefersReducedMotion }: { opacity: number; prefersReducedMotion: boolean }) {
    return (
        <>
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-indigo-900 to-transparent" style={{ opacity: opacity * 0.6 }} />
            <motion.div
                className="absolute top-20 right-20 w-32 h-32 rounded-full bg-white"
                style={{ opacity: opacity * 1.5 }}
                animate={prefersReducedMotion ? {} : { opacity: [opacity * 1.5, opacity * 1.2, opacity * 1.5] }}
                transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
            />
        </>
    );
}

function GroundForwardDrift({ opacity, prefersReducedMotion }: { opacity: number; prefersReducedMotion: boolean }) {
    return (
        <motion.div
            className="absolute inset-0 bg-gradient-to-t from-stone-200 via-transparent to-transparent"
            style={{ opacity }}
            animate={prefersReducedMotion ? {} : { y: [0, -20, 0] }}
            transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        />
    );
}

function SoundWaves({ opacity, prefersReducedMotion }: { opacity: number; prefersReducedMotion: boolean }) {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute w-64 h-64 rounded-full border border-blue-300"
                    style={{ opacity: opacity * 0.3 }}
                    animate={prefersReducedMotion ? {} : {
                        scale: [1, 2, 3],
                        opacity: [opacity * 0.3, opacity * 0.1, 0]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        delay: i * 8,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
}

function BreathGlow({ opacity, prefersReducedMotion }: { opacity: number; prefersReducedMotion: boolean }) {
    return (
        <motion.div
            className="absolute inset-0 flex items-center justify-center"
        >
            <motion.div
                className="w-48 h-48 rounded-full bg-gradient-radial from-amber-200 to-transparent"
                style={{ opacity }}
                animate={prefersReducedMotion ? {} : {
                    scale: [1, 1.3, 1],
                    opacity: [opacity, opacity * 0.5, opacity]
                }}
                transition={{ duration: 20, repeat: 1, ease: "easeInOut" }} // Single cycle only
            />
        </motion.div>
    );
}

function WarmParticles({ opacity, prefersReducedMotion }: { opacity: number; prefersReducedMotion: boolean }) {
    return (
        <div className="absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-amber-400"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: opacity * 0.4
                    }}
                    animate={prefersReducedMotion ? {} : {
                        y: [0, -30, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [opacity * 0.4, opacity * 0.1, opacity * 0.4]
                    }}
                    transition={{
                        duration: 20 + Math.random() * 15,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
}

function FlameFlicker({ opacity, prefersReducedMotion }: { opacity: number; prefersReducedMotion: boolean }) {
    return (
        <motion.div
            className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-16 h-24 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent rounded-full"
            style={{ opacity }}
            animate={prefersReducedMotion ? {} : {
                scaleY: [1, 1.1, 0.95, 1.05, 1],
                opacity: [opacity, opacity * 0.8, opacity * 0.9, opacity]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
    );
}
