"use client";

import React, { createContext, useContext, useState } from 'react';
import { Personalizer, RitualTheme } from '../lib/Personalizer';
import { Analytics } from '../lib/Analytics';

interface PersonalizationContextType {
    theme: RitualTheme | null;
    setSeed: (seed: string) => void;
    clearTheme: () => void;
}

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

export function PersonalizationProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<RitualTheme | null>(null);

    const setSeed = (seed: string) => {
        const newTheme = Personalizer.generate(seed);
        setTheme(newTheme);
        Analytics.track('seed_entered', { seed, path: newTheme.path });

        // Update CSS Variables dynamically
        if (typeof document !== 'undefined') {
            document.documentElement.style.setProperty('--color-theme-primary', newTheme.palette.primary);
            document.documentElement.style.setProperty('--color-theme-secondary', newTheme.palette.secondary);
        }
    };

    const clearTheme = () => {
        setTheme(null);
    };

    return (
        <PersonalizationContext.Provider value={{ theme, setSeed, clearTheme }}>
            {children}
        </PersonalizationContext.Provider>
    );
}

export const usePersonalization = () => {
    const context = useContext(PersonalizationContext);
    if (!context) throw new Error("usePersonalization must be used within PersonalizationProvider");
    return context;
};
