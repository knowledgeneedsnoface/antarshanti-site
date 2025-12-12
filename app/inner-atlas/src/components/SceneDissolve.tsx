"use client";

import React from 'react';
import { motion, PanInfo } from 'framer-motion';
import { useRitual } from '../contexts/RitualContext';
import { Analytics } from '../lib/Analytics';

export default function SceneDissolve() {
    const { nextScene } = useRitual();

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x > 100 || info.offset.x < -100) {
            Analytics.track('dissolve_complete', { velocity: info.velocity.x });
            nextScene();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-white/60 mb-12 uppercase tracking-[0.2em]">
                Swipe to Release
            </h2>

            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="w-64 h-64 bg-blue-900/40 backdrop-blur-md rounded-2xl flex items-center justify-center cursor-grab active:cursor-grabbing border border-white/10"
            >
                <div className="grid grid-cols-3 gap-2">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-8 h-8 bg-blue-300 rounded-full opacity-50" />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
