"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { AtlasConfig, PathType } from '../(hooks)/usePersonalizer';
import { useAtlasAudio } from '../(hooks)/useAtlasAudio';

interface AtlasContextType {
    config: AtlasConfig | null;
    setConfig: (config: AtlasConfig) => void;
    currentPath: PathType | null;
    setCurrentPath: (path: PathType) => void;
    audio: ReturnType<typeof useAtlasAudio>;
}

const AtlasContext = createContext<AtlasContextType | undefined>(undefined);

export function AtlasProvider({ children }: { children: ReactNode }) {
    const [config, setConfig] = useState<AtlasConfig | null>(null);
    const [currentPath, setCurrentPath] = useState<PathType | null>(null);
    const audio = useAtlasAudio();

    return (
        <AtlasContext.Provider value={{ config, setConfig, currentPath, setCurrentPath, audio }}>
            {children}
        </AtlasContext.Provider>
    );
}

export function useAtlas() {
    const context = useContext(AtlasContext);
    if (!context) {
        throw new Error("useAtlas must be used within an AtlasProvider");
    }
    return context;
}
