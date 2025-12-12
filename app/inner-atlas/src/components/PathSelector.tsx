"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePersonalization } from '../contexts/PersonalizationContext';
import { Analytics } from '../lib/Analytics';
import PathNode from './PathNode';

interface PathSelectorProps {
    onPathSelected: (path: string) => void;
}

export default function PathSelector({ onPathSelected }: PathSelectorProps) {
    const { theme } = usePersonalization();

    useEffect(() => {
        Analytics.track('path_nodes_rendered', { seed: theme?.seed });
    }, [theme]);

    const handleSelect = (path: string) => {
        Analytics.track('path_selected', { path, seed: theme?.seed });
        onPathSelected(path);
    };

    if (!theme) return null;

    return (
        <div className="relative z-20 w-full max-w-4xl mx-auto py-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">

                <PathNode
                    type="ANCHOR"
                    isRecommended={theme.path === 'ANCHOR'}
                    onSelect={handleSelect}
                    color="var(--mood-anchor)"
                    delay={0.1}
                    prophecyText="Stillness is not the absence of movement — but its master."
                />

                <PathNode
                    type="RELEASE"
                    isRecommended={theme.path === 'RELEASE'}
                    onSelect={handleSelect}
                    color="var(--mood-release)"
                    delay={0.2}
                    prophecyText="What you soften… releases you back."
                />

                <PathNode
                    type="IGNITE"
                    isRecommended={theme.path === 'IGNITE'}
                    onSelect={handleSelect}
                    color="var(--mood-ignite)"
                    delay={0.3}
                    prophecyText="A spark ignored is a fire denied."
                />

            </div>

            {/* Screen Reader Announcements */}
            <div className="sr-only" role="status" aria-live="polite">
                {`We recommend the ${theme.path} path based on your seed word.`}
            </div>
        </div>
    );
}
