"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../contexts/AudioContext';
import { Analytics } from '../lib/Analytics';

interface PathNodeProps {
    type: 'ANCHOR' | 'RELEASE' | 'IGNITE';
    isRecommended: boolean;
    onSelect: (type: string) => void;
    color: string;
    delay: number;
}

export default function PathNode({ type, isRecommended, onSelect, color, delay }: PathNodeProps) {
    const { play } = useAudio();

    const handleHover = () => {
        play('path_chime', 0.15); // Soft chime
        Analytics.track('path_node_hover', { type });
    };

    const handleClick = () => {
        play('path_select_bell', 0.8);
        Analytics.track('path_selected', { type });
        onSelect(type);
    };

    return (
        <motion.button
            aria-label={`Select ${type} Path`}
            aria-description={isRecommended ? "Recommended for you" : undefined}
            onClick={handleClick}
            onMouseEnter={handleHover}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.8 }}
            className="flex flex-col items-center gap-4 group relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Ring / Node Visual */}
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Pulse Ring if Recommended */}
                {isRecommended && (
                    <motion.div
                        className="absolute inset-0 rounded-full border border-white/20"
                        animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ borderColor: color }}
                    />
                )}

                {/* Core Node */}
                <div
                    className="w-16 h-16 rounded-full glass-panel shadow-lg flex items-center justify-center text-2xl group-hover:bg-white/10 transition-colors"
                    style={{
                        boxShadow: `0 0 20px ${color}30`,
                        border: `1px solid ${color}40`
                    }}
                >
                    {type === 'ANCHOR' ? '🪨' : type === 'RELEASE' ? '🌬️' : '🔥'}
                </div>
            </div>

            {/* Label */}
            <div className="text-center">
                <span className="block text-sm font-bold tracking-widest text-white/80">{type}</span>
                {isRecommended && <span className="text-[10px] uppercase text-amber-400 opacity-80">Recommended</span>}
            </div>
        </motion.button>
    );
}
