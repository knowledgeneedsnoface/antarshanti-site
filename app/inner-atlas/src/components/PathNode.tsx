"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../contexts/AudioContext';
import { Analytics } from '../lib/Analytics';
import { LottieManager } from '../lib/LottieManager';
import PathProphecy from './PathProphecy';

interface PathNodeProps {
    type: 'ANCHOR' | 'RELEASE' | 'IGNITE';
    isRecommended: boolean;
    onSelect: (type: string) => void;
    color: string;
    delay: number;
    prophecyText: string;
}

export default function PathNode({ type, isRecommended, onSelect, color, delay, prophecyText }: PathNodeProps) {
    const { play } = useAudio();
    const [isHovered, setIsHovered] = useState(false);
    const lottieContainerRef = useRef<HTMLDivElement>(null);

    // Load Lottie
    useEffect(() => {
        if (lottieContainerRef.current) {
            // In a real app we'd load: `/inner-atlas/lottie/glyph_${type.toLowerCase()}.json`
            // For scaffold stability, we act as if we loaded it.
            LottieManager.loadAnimation(
                `glyph_${type}`,
                lottieContainerRef.current,
                `/inner-atlas/lottie/glyph_${type.toLowerCase()}.json`
            );
        }
        return () => {
            LottieManager.destroy(`glyph_${type}`);
        };
    }, [type]);

    const handleHover = () => {
        if (!isHovered) {
            setIsHovered(true);
            play('path_chime', 0.18);
            Analytics.track('path_node_hover', { type, recommended: isRecommended });
            Analytics.track('path_prophesy_shown', { type, text: prophecyText });
        }
    };

    const handleLeave = () => {
        setIsHovered(false);
    };

    const handleClick = () => {
        play('path_select_bell', 0.3);
        Analytics.track('path_node_clicked', { type });
        onSelect(type);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <div className="relative group flex flex-col items-center">
            {/* Prophecy Tooltip */}
            <PathProphecy isVisible={isHovered} text={prophecyText} />

            {/* Recommendation Label */}
            {isRecommended && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: delay + 0.5, duration: 0.8 }}
                    className="absolute -bottom-12 text-center"
                >
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-amber-400 opacity-90">
                        Your Affinity
                    </span>
                    <div className="w-1 h-1 bg-amber-400 rounded-full mx-auto mt-1" />
                </motion.div>
            )}

            {/* Main Interactive Node */}
            <motion.button
                role="button"
                tabIndex={0}
                aria-label={`Select ${type} Path`}
                aria-description={isRecommended ? `Recommended: ${prophecyText}` : prophecyText}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                onFocus={handleHover}
                onBlur={handleLeave}

                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: 1,
                    scale: isRecommended ? 1.05 : 1 // Idle scale if recommended
                }}
                transition={{ delay, duration: 0.8, ease: "easeOut" }}

                className="relative w-32 h-32 flex items-center justify-center outline-none"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Aura Field */}
                <motion.div
                    className="absolute inset-0 rounded-full opacity-20 blur-xl"
                    style={{ backgroundColor: color }}
                    animate={{
                        scale: isHovered ? [1, 1.2, 1.1] : [1, 1.05, 1],
                        opacity: isHovered ? 0.4 : 0.2
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Pulse Ring (Recommended Only) */}
                {isRecommended && (
                    <motion.div
                        className="absolute inset-0 rounded-full border border-white/20"
                        animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        style={{ borderColor: color }}
                    />
                )}

                {/* Glyph Container */}
                <div
                    className="relative w-20 h-20 flex items-center justify-center z-10 transition-all duration-300"
                    ref={lottieContainerRef}
                    style={{
                        filter: isHovered ? `drop-shadow(0 0 15px ${color})` : 'none'
                    }}
                >
                    {/* Fallback Glyph if Lottie fails or loading */}
                    <span className="text-3xl opacity-80" aria-hidden="true">
                        {type === 'ANCHOR' ? '🪨' : type === 'RELEASE' ? '🌬️' : '🔥'}
                    </span>
                </div>
            </motion.button>

            {/* Label below */}
            <motion.div
                className="mt-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: delay + 0.3 }}
            >
                <span className="text-sm font-bold tracking-widest text-white block">{type}</span>
            </motion.div>

        </div>
    );
}
