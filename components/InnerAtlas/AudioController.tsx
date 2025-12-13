"use client";

import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import { Volume2, VolumeX } from "lucide-react";

// ============================================================================
// Types & Context
// ============================================================================

interface AudioContextType {
    playHover: () => void;
    playSelect: () => void;
    playTransition: () => void;
    playReveal: () => void;
    playAmbient: (track: "calm" | "cosmic" | "battle") => void;
    stopAmbient: () => void;
    isMuted: boolean;
    toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
};

// ============================================================================
// Component
// ============================================================================

export default function AudioProvider({ children }: { children: React.ReactNode }) {
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [currentAmbient, setCurrentAmbient] = useState<string | null>(null);

    // Audio Refs
    const hoverRef = useRef<HTMLAudioElement | null>(null);
    const selectRef = useRef<HTMLAudioElement | null>(null);
    const transitionRef = useRef<HTMLAudioElement | null>(null);
    const revealRef = useRef<HTMLAudioElement | null>(null);
    const ambientRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize Audio Objects
        hoverRef.current = new Audio("/audio/hover.mp3");
        selectRef.current = new Audio("/audio/select.mp3");
        transitionRef.current = new Audio("/audio/transition.mp3");
        revealRef.current = new Audio("/audio/cosmic-reveal.mp3");
        ambientRef.current = new Audio();

        // Set volumes
        if (hoverRef.current) hoverRef.current.volume = 0.2;
        if (selectRef.current) selectRef.current.volume = 0.3;
        if (transitionRef.current) transitionRef.current.volume = 0.4;
        if (revealRef.current) revealRef.current.volume = 0.5;
        if (ambientRef.current) ambientRef.current.volume = 0.3;
        if (ambientRef.current) ambientRef.current.loop = true;

    }, []);

    useEffect(() => {
        if (ambientRef.current) {
            ambientRef.current.muted = isMuted;
            if (isMuted) {
                ambientRef.current.pause();
            } else if (currentAmbient) {
                ambientRef.current.play().catch(e => console.log("Auto-play blocked", e));
            }
        }
    }, [isMuted, currentAmbient]);

    // Actions
    const playHover = () => {
        if (!isMuted && hoverRef.current) {
            hoverRef.current.currentTime = 0;
            hoverRef.current.play().catch(() => { });
        }
    };

    const playSelect = () => {
        if (!isMuted && selectRef.current) {
            selectRef.current.currentTime = 0;
            selectRef.current.play().catch(() => { });
        }
    };

    const playTransition = () => {
        if (!isMuted && transitionRef.current) {
            transitionRef.current.currentTime = 0;
            transitionRef.current.play().catch(() => { });
        }
    };

    const playReveal = () => {
        if (!isMuted && revealRef.current) {
            revealRef.current.currentTime = 0;
            revealRef.current.play().catch(() => { });
        }
    };

    const playAmbient = (track: "calm" | "cosmic" | "battle") => {
        let src = "";
        switch (track) {
            case "calm": src = "/audio/ambient-calm.mp3"; break;
            case "cosmic": src = "/audio/ambient-cosmic.mp3"; break;
            case "battle": src = "/audio/ambient-battle.mp3"; break;
            default: src = "/audio/ambient-calm.mp3";
        }

        if (currentAmbient !== src) {
            setCurrentAmbient(src);
            if (ambientRef.current) {
                ambientRef.current.src = src;
                if (!isMuted) ambientRef.current.play().catch(() => { });
            }
        }
    };

    const stopAmbient = () => {
        setCurrentAmbient(null);
        if (ambientRef.current) {
            ambientRef.current.pause();
        }
    };

    const toggleMute = () => setIsMuted(!isMuted);

    return (
        <AudioContext.Provider value={{
            playHover,
            playSelect,
            playTransition,
            playReveal,
            playAmbient,
            stopAmbient,
            isMuted,
            toggleMute
        }}>
            {children}

            {/* Floating Mute Button */}
            <button
                onClick={toggleMute}
                className="fixed top-24 right-6 z-50 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all"
                aria-label={isMuted ? "Unmute" : "Mute"}
            >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

        </AudioContext.Provider>
    );
}
