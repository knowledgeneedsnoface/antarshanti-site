"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '../utils/storage';
import { Analytics } from '../lib/Analytics';

export type RelicRarity = 'COMMON' | 'RARE' | 'MYTHIC';
export type RelicType = 'ANCHOR' | 'RELEASE' | 'IGNITE';

export interface Relic {
    id: string;
    seed: string;
    path: RelicType;
    rarity: RelicRarity;
    timestamp: number;
    visualId: string; // To map to Lottie file
}

export interface ShrineData {
    relics: Relic[];
    ritualCount: number;
    glowLevel: number; // 0-100
    level: number;     // 0-9+
    streakDays: number;
    lastVisit: number;
}

interface ShrineContextType {
    shrine: ShrineData;
    addRelic: (seed: string, path: string) => Relic; // Returns the created relic
    resetShrine: () => void;
    checkStreak: () => void;
}

const ShrineContext = createContext<ShrineContextType | undefined>(undefined);

const INITIAL_STATE: ShrineData = {
    relics: [],
    ritualCount: 0,
    glowLevel: 0,
    level: 0,
    streakDays: 0,
    lastVisit: 0
};

// Rarity Weights
const RARITY_CHANCE = {
    MYTHIC: 0.05,
    RARE: 0.15,
    // COMMON is remainder
};

export function ShrineProvider({ children }: { children: React.ReactNode }) {
    const [shrine, setShrine] = useState<ShrineData>(INITIAL_STATE);

    useEffect(() => {
        const loaded = storage.get<ShrineData>('shrine_data', INITIAL_STATE);

        // Check if streak is broken or needs update on load
        if (loaded.lastVisit > 0) {
            // Logic to dim shrine if inactive for too long could go here
        }

        setShrine(loaded);
    }, []);

    const saveShrine = (data: ShrineData) => {
        setShrine(data);
        storage.set('shrine_data', data);
    };

    const calculateLevel = (count: number, currentLevel: number) => {
        // Simple progression: Level up every 3 rituals for early game, then scales
        const required = (currentLevel + 1) * 3;
        return count >= required ? currentLevel + 1 : currentLevel;
    };

    const checkStreak = () => {
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        const diff = now - shrine.lastVisit;

        let newStreak = shrine.streakDays;

        if (diff < oneDay) {
            // visited today already, no change to streak
        } else if (diff < 2 * oneDay) {
            // Consecutive day
            newStreak++;
            Analytics.track('shrine_streak_bonus', { days: newStreak });
        } else {
            // Streak broken
            newStreak = 0; // Or reset to 1 if we consider this a new start
        }

        saveShrine({
            ...shrine,
            streakDays: newStreak,
            lastVisit: now
        });
    };

    const addRelic = (seed: string, path: string): Relic => {
        const rand = Math.random();
        let rarity: RelicRarity = 'COMMON';
        if (rand < RARITY_CHANCE.MYTHIC) rarity = 'MYTHIC';
        else if (rand < (RARITY_CHANCE.MYTHIC + RARITY_CHANCE.RARE)) rarity = 'RARE';

        const newRelic: Relic = {
            id: crypto.randomUUID(),
            seed,
            path: path as RelicType,
            rarity,
            timestamp: Date.now(),
            visualId: `${path.toLowerCase()}_${rarity.toLowerCase()}` // e.g., anchor_rare
        };

        // Evolution Logic
        const newCount = shrine.ritualCount + 1;
        const newLevel = calculateLevel(newCount, shrine.level);

        // Glow boost
        let glowBoost = 10;
        if (rarity === 'RARE') glowBoost = 25;
        if (rarity === 'MYTHIC') glowBoost = 50;

        const newGlow = Math.min(shrine.glowLevel + glowBoost, 100);

        const newData: ShrineData = {
            ...shrine,
            relics: [newRelic, ...shrine.relics],
            ritualCount: newCount,
            glowLevel: newGlow,
            level: newLevel,
            lastVisit: Date.now() // Update visit time
        };

        saveShrine(newData);

        Analytics.track('relic_added_to_shrine', {
            path,
            seed,
            rarity,
            shrineLevel: newLevel
        });

        if (newLevel > shrine.level) {
            Analytics.track('shrine_evolved', { newLevel });
        }

        return newRelic;
    };

    const resetShrine = () => {
        saveShrine(INITIAL_STATE);
    };

    return (
        <ShrineContext.Provider value={{ shrine, addRelic, resetShrine, checkStreak }}>
            {children}
        </ShrineContext.Provider>
    );
}

export const useShrine = () => {
    const context = useContext(ShrineContext);
    if (!context) throw new Error("useShrine must be used within ShrineProvider");
    return context;
};
