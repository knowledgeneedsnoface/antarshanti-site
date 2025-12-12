"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useRitual } from '../contexts/RitualContext';
import { useAudio } from '../contexts/AudioContext';
import { Analytics } from '../lib/Analytics';
import { usePersonalization } from '../contexts/PersonalizationContext';

export default function SceneFlame() {
    const { nextScene } = useRitual();
    const { play, setVolume } = useAudio();
    const { theme } = usePersonalization();

    // State
    const [isHolding, setIsHolding] = useState(false);
    const [progress, setProgress] = useState(0); // 0 to 1
    const holdStartTime = useRef<number | null>(null);
    const requestRef = useRef<number | null>(null);
    const controls = useAnimation();

    const HOLD_DURATION = 3000; // 3 seconds to "charge"

    // Colors based on theme
    const flameColor = (theme?.path as string) === 'IGNITION' ? 'var(--mood-ignite)'
        : (theme?.path as string) === 'RELEASE' ? 'var(--mood-release)'
            : 'var(--mood-anchor)';

    // Ambience
    useEffect(() => {
        // play('soft_fire_loop', 0.2); // Assuming loop handling in AudioContext
        // return () => stop('soft_fire_loop');
    }, [play]);

    // Tick loop for holding
    const animate = (time: number) => {
        if (holdStartTime.current !== null) {
            const elapsed = time - holdStartTime.current;
            const p = Math.min(elapsed / HOLD_DURATION, 1);
            setProgress(p);

            // Audio volume swell
            // setVolume('soft_fire_loop', 0.2 + (p * 0.4));

            if (p >= 1) {
                // Done!
                handleComplete();
                return; // Stop loop
            }
            requestRef.current = requestAnimationFrame(animate);
        }
    };

    const handleDown = () => {
        setIsHolding(true);
        holdStartTime.current = performance.now();
        requestRef.current = requestAnimationFrame(animate);

        // Instant visual feedback
        controls.start({
            scale: 1.2,
            filter: 'brightness(1.5)',
            transition: { duration: 3, ease: 'easeInOut' } // Match hold duration roughly
        });
    };

    const handleUp = () => {
        if (progress < 1) {
            setIsHolding(false);
            holdStartTime.current = null;
            if (requestRef.current) cancelAnimationFrame(requestRef.current);

            // Reset visual
            setProgress(0);
            controls.start({
                scale: 1,
                filter: 'brightness(1)',
                transition: { duration: 0.5 }
            });
            // setVolume('soft_fire_loop', 0.2);
        }
    };

    const handleComplete = () => {
        setIsHolding(false);
        play('presence_bell', 0.5);
        Analytics.track('flame_hold_complete', { seed: theme?.seed });

        // Animation Out
        controls.start({
            scale: 20, // Expand to fill screen
            opacity: 0,
            transition: { duration: 1.5, ease: 'circIn' }
        }).then(() => {
            nextScene();
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            handleDown();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center relative">

            {/* Instruction */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isHolding ? 0.5 : 0.8, y: 0 }}
                className="text-white/80 font-serif text-lg mb-12 tracking-widest uppercase text-center"
            >
                {progress >= 1 ? "Presence Achieved" : "Hold the Flame"}
            </motion.h2>

            {/* The Flame */}
            <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Progress Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                    <circle
                        cx="128" cy="128" r="120"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                        className="opacity-10"
                    />
                    <motion.circle
                        cx="128" cy="128" r="120"
                        stroke={flameColor}
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="753" // 2 * pi * 120
                        strokeDashoffset={753 - (753 * progress)}
                        className="transition-all duration-75" // Smooth update
                    />
                </svg>

                {/* Core Interactive Element */}
                <motion.button
                    role="button"
                    tabIndex={0}
                    aria-label="Hold the flame to center yourself"
                    onMouseDown={handleDown}
                    onMouseUp={handleUp}
                    onMouseLeave={handleUp}
                    onTouchStart={handleDown}
                    onTouchEnd={handleUp}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleUp}
                    animate={controls}
                    whileHover={{ scale: 1.05 }}
                    className="w-40 h-40 rounded-full bg-gradient-radial from-orange-100 via-orange-500 to-transparent blur-md relative z-10 outline-none"
                    style={{
                        background: `radial-gradient(circle, #fff 0%, ${flameColor} 60%, transparent 100%)`,
                        boxShadow: `0 0 ${20 + (progress * 50)}px ${flameColor}`
                    }}
                >
                    {/* Inner Flicker (CSS Animation) */}
                    <div className="absolute inset-0 rounded-full bg-white opacity-40 animate-pulse" />
                </motion.button>
            </div>

            {/* Hint for A11y / Keyboard */}
            <p className="sr-only">Press and hold Space or Enter for 3 seconds.</p>
        </div>
    );
}
