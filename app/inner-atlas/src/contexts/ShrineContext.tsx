"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '../utils/storage';
import { Analytics } from '../lib/Analytics';

export interface Relic {
    id: string;
    seed: string;
    path: string;
    timestamp: number;
}

interface ShrineData {
    relics: Relic[];
    ritualCount: number;
    glowLevel: number; // 0-100 based on activity
}

interface ShrineContextType {
    shrine: ShrineData;
    addRelic: (seed: string, path: string) => void;
    resetShrine: () => void;
}

const ShrineContext = createContext<ShrineContextType | undefined>(undefined);

const INITIAL_STATE: ShrineData = {
    relics: [],
    ritualCount: 0,
    glowLevel: 0
};

export function ShrineProvider({ children }: { children: React.ReactNode }) {
    const [shrine, setShrine] = useState<ShrineData>(INITIAL_STATE);

    useEffect(() => {
        const loaded = storage.get<ShrineData>('shrine_data', INITIAL_STATE);
        setShrine(loaded);
    }, []);

    const saveShrine = (data: ShrineData) => {
        setShrine(data);
        storage.set('shrine_data', data);
    };

    const addRelic = (seed: string, path: string) => {
        const newRelic: Relic = {
            id: crypto.randomUUID(),
            seed,
            path,
            timestamp: Date.now()
        };

        const newData: ShrineData = {
            relics: [newRelic, ...shrine.relics],
            ritualCount: shrine.ritualCount + 1,
            glowLevel: Math.min(shrine.glowLevel + 10, 100)
        };

        saveShrine(newData);
        Analytics.track('relic_collected', { path, seed });
        Analytics.track('shrine_saved', { count: newData.ritualCount });
    };

    const resetShrine = () => {
        saveShrine(INITIAL_STATE);
    };

    return (
        <ShrineContext.Provider value={{ shrine, addRelic, resetShrine }}>
            {children}
        </ShrineContext.Provider>
    );
}

export const useShrine = () => {
    const context = useContext(ShrineContext);
    if (!context) throw new Error("useShrine must be used within ShrineProvider");
    return context;
};
