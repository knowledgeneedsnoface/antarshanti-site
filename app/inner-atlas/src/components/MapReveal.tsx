"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePersonalization } from '../contexts/PersonalizationContext';
import { useAudio } from '../contexts/AudioContext';
import MapTile from './MapTile';
import PathSelector from './PathSelector';
import { Analytics } from '../lib/Analytics';

interface MapRevealProps {
    onPathSelected: (path: string) => void;
}

export default function MapReveal({ onPathSelected }: MapRevealProps) {
    const { theme } = usePersonalization();
    const { play } = useAudio();

    useEffect(() => {
        // Map Assembly Sound
        play('map_whoosh', 0.4);
        Analytics.track('map_generated', { seed: theme?.seed });
    }, [theme, play]);

    if (!theme) return null;

    // Determine visual style roughly from path
    const mapStyle = theme.path === 'IGNITE' ? 'volcanic' : theme.path === 'RELEASE' ? 'airy' : 'smooth';

    return (
        <div className="relative w-full max-w-4xl h-[60vh] mx-auto flex items-center justify-center">

            {/* 1. Abstract Floating Tiles (Background Geometry) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
                <div className="relative w-[300px] h-[300px]">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <MapTile
                            key={i}
                            index={i}
                            delay={i * 0.08} // 80ms stagger
                            color={theme.palette.primary}
                            style={mapStyle}
                        />
                    ))}
                </div>
            </div>

            {/* 2. Path Choice Overlay */}
            <motion.div
                className="relative z-10 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }} // Fade in after tiles
            >
                <PathSelector onPathSelected={onPathSelected} />
            </motion.div>

            {/* Instruction Text */}
            <motion.div
                className="absolute bottom-10 left-0 right-0 text-center text-white/40 text-sm font-light italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
            >
                Choose your path to begin the ritual.
            </motion.div>
        </div>
    );
}
