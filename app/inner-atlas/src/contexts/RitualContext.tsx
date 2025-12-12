"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePersonalization } from './PersonalizationContext';
import { Analytics } from '../lib/Analytics';

export type SceneType =
    | 'FLAME'
    | 'BREATH'
    | 'MANTRA'
    | 'DISSOLVE'
    | 'IGNITION'
    | 'RELIC'
    | 'GRATITUDE';

interface RitualContextType {
    currentScene: SceneType;
    currentSceneIndex: number;
    totalScenes: number;
    startRitual: () => void;
    nextScene: () => void;
    isRitualActive: boolean;
}

const RitualContext = createContext<RitualContextType | undefined>(undefined);

// Define scene sequences for each path
const SEQUENCES: Record<string, SceneType[]> = {
    ANCHOR: ['FLAME', 'BREATH', 'MANTRA', 'RELIC', 'GRATITUDE'],
    RELEASE: ['BREATH', 'DISSOLVE', 'FLAME', 'RELIC', 'GRATITUDE'],
    IGNITE: ['IGNITION', 'FLAME', 'MANTRA', 'RELIC', 'GRATITUDE'],
    // Fallback
    DEFAULT: ['BREATH', 'FLAME', 'RELIC', 'GRATITUDE']
};

export function RitualProvider({ children }: { children: React.ReactNode }) {
    const { theme } = usePersonalization();
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [isRitualActive, setIsRitualActive] = useState(false);

    // Determine sequence based on path, fallback to DEFAULT
    const pathKey = theme?.path || 'DEFAULT';
    const sequence = SEQUENCES[pathKey] || SEQUENCES.DEFAULT;
    const currentScene = sequence[currentSceneIndex];

    const startRitual = () => {
        console.log("[RitualContext] startRitual called. Path:", pathKey);
        setIsRitualActive(true);
        setCurrentSceneIndex(0);
        Analytics.track('chamber_started', { path: pathKey, seed: theme?.seed });
        Analytics.track('scene_enter', { scene: sequence[0], index: 0 });
    };

    const nextScene = () => {
        if (currentSceneIndex < sequence.length - 1) {
            const nextIndex = currentSceneIndex + 1;
            setCurrentSceneIndex(nextIndex);

            const nextSceneName = sequence[nextIndex];

            // Log completion of the PREVIOUS scene? 
            // Better to log entry of the new one
            Analytics.track('scene_enter', { scene: nextSceneName, index: nextIndex });
        } else {
            // End of ritual
            setIsRitualActive(false);
            Analytics.track('ritual_complete', { path: pathKey, seed: theme?.seed });
        }
    };

    return (
        <RitualContext.Provider value={{
            currentScene,
            currentSceneIndex,
            totalScenes: sequence.length,
            startRitual,
            nextScene,
            isRitualActive
        }}>
            {children}
        </RitualContext.Provider>
    );
}

export function useRitual() {
    const context = useContext(RitualContext);
    if (context === undefined) {
        throw new Error('useRitual must be used within a RitualProvider');
    }
    return context;
}
