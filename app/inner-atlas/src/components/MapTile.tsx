"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface MapTileProps {
    index: number;
    delay?: number;
    color?: string;
    style?: 'smooth' | 'airy' | 'volcanic'; // For visual variance
}

export default function MapTile({ index, delay = 0, color = "#FFF", style = 'smooth' }: MapTileProps) {
    // Unique shape based on style
    const borderRadius = style === 'airy' ? '50%' : style === 'volcanic' ? '4px' : '30% 70% 70% 30% / 30% 30% 70% 70%';

    return (
        <motion.div
            initial={{ opacity: 0, y: 18, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{
                duration: 0.6,
                delay: delay,
                ease: [0.2, 0.8, 0.2, 1]
            }}
            className="w-24 h-24 absolute backdrop-blur-sm border border-white/5 shadow-2xl"
            style={{
                borderRadius: borderRadius,
                backgroundColor: `${color}10`, // Low opacity
                borderTopColor: `${color}40`,
                left: `${(index % 3) * 80 + (Math.random() * 20)}px`, // Pseudo-random grid
                top: `${Math.floor(index / 3) * 80 + (Math.random() * 20)}px`,
            }}
        >
            {/* Inner texture/noise could go here */}
        </motion.div>
    );
}
