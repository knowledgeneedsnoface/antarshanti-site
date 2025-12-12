"use client";

import React from 'react';
import { AudioProvider } from '../contexts/AudioContext';
import { ShrineProvider } from '../contexts/ShrineContext';
import { PersonalizationProvider } from '../contexts/PersonalizationContext';

import { RitualProvider } from '../contexts/RitualContext';

export default function GlobalProviders({ children }: { children: React.ReactNode }) {
    return (
        <PersonalizationProvider>
            <ShrineProvider>
                <RitualProvider>
                    <AudioProvider>
                        {children}
                    </AudioProvider>
                </RitualProvider>
            </ShrineProvider>
        </PersonalizationProvider>
    );
}
