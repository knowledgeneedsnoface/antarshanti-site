"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AudioManager } from '../lib/AudioManager';

interface AudioContextType {
    play: (id: string, volume?: number) => void;
    playLoop: (id: string, volume?: number) => void;
    stopLoop: (id: string) => void;
    setVolume: (id: string, volume: number) => void;
    toggleMute: () => void;
    isMuted: boolean;
    initAudio: () => void;
}

const AudioCtx = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [isMuted, setIsMuted] = useState(false);

    const initAudio = () => {
        AudioManager.init();
    };

    const toggleMute = () => {
        const newState = !isMuted;
        setIsMuted(newState);
        AudioManager.setMute(newState);
    };

    const play = (id: string, volume = 1.0) => AudioManager.playOneShot(id, volume);
    const playLoop = (id: string, volume = 1.0) => AudioManager.playLoop(id, volume);
    const stopLoop = (id: string) => AudioManager.stopLoop(id);
    const setVolume = (id: string, volume: number) => AudioManager.setVolume(id, volume);

    return (
        <AudioCtx.Provider value={{ play, playLoop, stopLoop, setVolume, toggleMute, isMuted, initAudio }}>
            {children}
        </AudioCtx.Provider>
    );
}

export const useAudio = () => {
    const context = useContext(AudioCtx);
    if (!context) throw new Error("useAudio must be used within AudioProvider");
    return context;
};
