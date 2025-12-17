"use client";

import { useState, useEffect } from "react";

interface UseRitualTimerProps {
    durationSeconds: number;
    onComplete: () => void;
    autoStart?: boolean;
}

/**
 * Handles auto-advance timing for ritual stages
 * Respects prefers-reduced-motion
 */
export function useRitualTimer({ durationSeconds, onComplete, autoStart = true }: UseRitualTimerProps) {
    const [timeRemaining, setTimeRemaining] = useState(durationSeconds);
    const [isActive, setIsActive] = useState(autoStart);

    // Respect prefers-reduced-motion
    const prefersReducedMotion = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    useEffect(() => {
        if (!isActive || prefersReducedMotion) return;

        const interval = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    setIsActive(false);
                    onComplete();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive, onComplete, prefersReducedMotion]);

    const start = () => setIsActive(true);
    const pause = () => setIsActive(false);
    const reset = () => {
        setTimeRemaining(durationSeconds);
        setIsActive(false);
    };

    return {
        timeRemaining,
        isActive,
        start,
        pause,
        reset
    };
}
