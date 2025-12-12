"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Relic } from '../contexts/ShrineContext';
import { Analytics } from '../lib/Analytics';

interface RelicItemProps {
    relic: Relic;
    onClick?: (relic: Relic) => void;
}

export default function RelicItem({ relic, onClick }: RelicItemProps) {

    // Determine color
    const baseColor = relic.path === 'IGNITE' ? '#F44336'
        : relic.path === 'RELEASE' ? '#03A9F4'
            : '#795548'; // Anchor

    const borderColor = relic.rarity === 'MYTHIC' ? '#FFD700' : relic.rarity === 'RARE' ? '#E0F7FA' : baseColor;

    const handleHover = () => {
        Analytics.track('relic_hover', { id: relic.id, rarity: relic.rarity });
    };

    return (
        <motion.div
            role="button"
            tabIndex={0}
            aria-label={`${relic.rarity} ${relic.path} Relic: ${relic.seed}`}
            onClick={() => onClick && onClick(relic)}
            onHoverStart={handleHover}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative w-24 h-32 flex flex-col items-center justify-center p-2 group cursor-pointer"
        >
            {/* Rarity Glow */}
            {relic.rarity !== 'COMMON' && (
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-xl rounded-full"
                    style={{ background: borderColor }}
                />
            )}

            {/* The Visual Token */}
            <div
                className={`w-16 h-16 mb-3 shadow-md transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]
                 ${relic.path === 'ANCHOR' ? 'rounded-md' : relic.path === 'RELEASE' ? 'rounded-full' : 'rounded-none rotate-45'}
                `}
                style={{
                    border: `1px solid ${borderColor}`,
                    background: `linear-gradient(135deg, ${baseColor}20, ${baseColor}60)`
                }}
            >
                {/* Inner Icon / Lottie would go here */}
                {relic.rarity === 'MYTHIC' && (
                    <div className="w-full h-full animate-pulse bg-white/20" />
                )}
            </div>

            {/* Label */}
            <span className="text-[10px] text-white/50 uppercase tracking-wider truncate max-w-full font-serif text-center">
                {relic.seed}
            </span>
            <span className="text-[8px] text-[var(--color-gold)] opacity-0 group-hover:opacity-80 transition-opacity">
                {new Date(relic.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>

        </motion.div>
    );
}
