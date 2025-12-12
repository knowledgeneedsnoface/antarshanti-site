"use client";

import React from 'react';
import { AudioProvider } from '../contexts/AudioContext';
import { ShrineProvider } from '../contexts/ShrineContext';
import { PersonalizationProvider } from '../contexts/PersonalizationContext';

export default function GlobalProviders({ children }: { children: React.ReactNode }) {
    return (
        <AudioProvider>
            <ShrineProvider>
                <PersonalizationProvider>
                    {children}
                </PersonalizationProvider>
            </ShrineProvider>
        </AudioProvider>
    );
}
