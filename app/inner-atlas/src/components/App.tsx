"use client";

import React, { useEffect } from 'react';
import { Analytics } from '../lib/Analytics';
import { usePersonalization } from '../contexts/PersonalizationContext';
import { useAudio } from '../contexts/AudioContext';

export default function App({ children }: { children: React.ReactNode }) {
    const { initAudio } = useAudio();
    const { theme } = usePersonalization();

    useEffect(() => {
        Analytics.init();
        Analytics.track('visit_started');
    }, []);

    // Global interaction listener to unlock audio
    useEffect(() => {
        const unlock = () => {
            initAudio();
            document.removeEventListener('click', unlock);
            document.removeEventListener('keydown', unlock);
        };
        document.addEventListener('click', unlock);
        document.addEventListener('keydown', unlock);
        return () => {
            document.removeEventListener('click', unlock);
            document.removeEventListener('keydown', unlock);
        };
    }, [initAudio]);

    return (
        <main className={`inner-atlas-root ${theme ? 'mode-active' : 'mode-idle'}`}>
            {/* 
               This container provides the mounting point for the actual pages.
               The 'children' here will likely be the page content from Next.js 
               rendered inside this layout shell.
            */}
            {children}
        </main>
    );
}
