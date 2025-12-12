"use client";

import { useState, useEffect } from 'react';

interface VisitState {
    hasVisited: boolean;
    lastVisit: number;
    visitCount: number;
    ritualProgress?: {
        view: string;
        sceneIndex?: number;
        timestamp: number;
    };
}

const STORAGE_KEY = 'innerAtlas.visitState';
const RESUME_WINDOW = 48 * 60 * 60 * 1000; // 48 hours

export function useVisitManager() {
    const [visitState, setVisitState] = useState<VisitState>({
        hasVisited: false,
        lastVisit: 0,
        visitCount: 0
    });

    useEffect(() => {
        // Load visit state from localStorage
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    setVisitState(parsed);
                } catch (e) {
                    console.error('Failed to parse visit state', e);
                }
            }
        }
    }, []);

    const isFirstVisit = () => {
        return !visitState.hasVisited;
    };

    const markVisited = () => {
        const newState: VisitState = {
            hasVisited: true,
            lastVisit: Date.now(),
            visitCount: visitState.visitCount + 1
        };

        setVisitState(newState);

        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
        }
    };

    const getResumeState = () => {
        if (!visitState.ritualProgress) return null;

        const timeSinceProgress = Date.now() - visitState.ritualProgress.timestamp;

        // Only offer resume if within 48 hours
        if (timeSinceProgress > RESUME_WINDOW) {
            return null;
        }

        return visitState.ritualProgress;
    };

    const setResumeState = (view: string, sceneIndex?: number) => {
        const newState: VisitState = {
            ...visitState,
            ritualProgress: {
                view,
                sceneIndex,
                timestamp: Date.now()
            }
        };

        setVisitState(newState);

        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
        }
    };

    const clearResumeState = () => {
        const newState: VisitState = {
            ...visitState,
            ritualProgress: undefined
        };

        setVisitState(newState);

        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
        }
    };

    const canResume = () => {
        return getResumeState() !== null;
    };

    return {
        isFirstVisit,
        markVisited,
        getResumeState,
        setResumeState,
        clearResumeState,
        canResume,
        visitCount: visitState.visitCount,
        lastVisit: visitState.lastVisit
    };
}
