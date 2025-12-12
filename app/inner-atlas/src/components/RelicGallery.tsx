"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useShrine, Relic } from '../contexts/ShrineContext';
import RelicItem from './RelicItem';

interface RelicGalleryProps {
    onRelicClick: (relic: Relic) => void;
}

export default function RelicGallery({ onRelicClick }: RelicGalleryProps) {
    const { shrine } = useShrine();

    if (shrine.relics.length === 0) {
        return (
            <div className="text-center py-20 opacity-40">
                <p className="text-sm uppercase tracking-widest">No relics yet.</p>
                <p className="text-xs mt-2">Complete a ritual to forge your first memory.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <h3 className="text-white/40 text-xs uppercase tracking-[0.2em] mb-8 text-center border-b border-white/5 pb-4">
                Collection ({shrine.relics.length})
            </h3>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8 justify-items-center">
                {shrine.relics.map((relic, i) => (
                    <motion.div
                        key={relic.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <RelicItem relic={relic} onClick={onRelicClick} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
