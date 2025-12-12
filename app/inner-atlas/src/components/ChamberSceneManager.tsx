"use client";

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRitual } from '../contexts/RitualContext';
import { usePersonalization } from '../contexts/PersonalizationContext';

// Import Scenes (We will create these next)
// For now, these are placeholder imports that we will fill in shortly
import SceneFlame from './SceneFlame';
import SceneBreath from './SceneBreath';
import SceneMantra from './SceneMantra';
import SceneDissolve from './SceneDissolve';
import SceneIgnition from './SceneIgnition';
import SceneRelicForge from './SceneRelicForge';
import SceneGratitude from './SceneGratitude';

export default function ChamberSceneManager() {
    const { currentScene, isRitualActive } = useRitual();
    const { theme } = usePersonalization();

    console.log("[ChamberSceneManager] Render. Active:", isRitualActive, "Scene:", currentScene);

    if (!isRitualActive) {
        console.log("[ChamberSceneManager] Inactive");
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
                <div className="text-center p-8 border border-red-500">
                    <h2 className="text-xl mb-4">Ritual Not Active</h2>
                    <p className="text-sm opacity-50 mb-4">Waiting for context...</p>
                    <p className="text-xs font-mono">{JSON.stringify({ isRitualActive, currentScene })}</p>
                </div>
            </div>
        );
    }

    const renderScene = () => {
        switch (currentScene) {
            case 'FLAME':
                return <SceneFlame key="flame" />;
            case 'BREATH':
                return <SceneBreath key="breath" />;
            case 'MANTRA':
                return <SceneMantra key="mantra" />;
            case 'DISSOLVE':
                return <SceneDissolve key="dissolve" />;
            case 'IGNITION':
                return <SceneIgnition key="ignition" />;
            case 'RELIC':
                return <SceneRelicForge key="relic" />;
            case 'GRATITUDE':
                return <SceneGratitude key="gratitude" />;
            default:
                return null;
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
            style={{
                backgroundColor: 'var(--color-bg-void)',
                // Transition the background based on path intensity? 
                // For now, keep it dark/void for focus
            }}
        >
            {/* Dynamic Background or Overlay Layer based on Path */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    background: (theme?.path as string) === 'IGNITION'
                        ? 'radial-gradient(circle at center, var(--mood-ignite) 0%, transparent 70%)'
                        : (theme?.path as string) === 'RELEASE'
                            ? 'radial-gradient(circle at center, var(--mood-release) 0%, transparent 70%)'
                            : 'radial-gradient(circle at center, var(--mood-anchor) 0%, transparent 70%)'
                }}
            />

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentScene}
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="w-full h-full flex items-center justify-center relative"
                >
                    {renderScene()}
                </motion.div>
            </AnimatePresence>

            {/* Nav/Progress could go here (invisible or subtle) */}
        </div>
    );
}
