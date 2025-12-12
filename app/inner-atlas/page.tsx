"use client";

import { useState } from 'react';
import GlobalProviders from './src/components/GlobalProviders';
import App from './src/components/App';
import PortalScene from './src/components/PortalScene';
import ChamberSceneManager from './src/components/ChamberSceneManager';
import ShrineView from './src/components/ShrineView'; // Import

type ViewState = 'PORTAL' | 'CHAMBER' | 'SHRINE';

export default function InnerAtlasPage() {
    const [view, setView] = useState<ViewState>('PORTAL');

    const handlePortalComplete = (selectedPath: string) => {
        // Path is set in context by the components themselves
        setView('CHAMBER');
    };

    // We need a way for Chamber to signal completion.
    // Ideally ChamberSceneManager accepts an onComplete prop, 
    // or we use a context effect. For now, let's assume Chamber context updates check this.
    // To make this robust, I'll pass a callback to ChamberSceneManager in the future.
    // For this step, I will add a temporary "Go to Shrine" button in the Gratitude scene,
    // OR, better, update RitualContext to have an onComplete callback.

    return (
        <GlobalProviders>
            <App>
                {view === 'PORTAL' && <PortalScene onComplete={handlePortalComplete} />}

                {view === 'CHAMBER' && (
                    <>
                        <ChamberSceneManager />
                        {/* 
                           ChamberSceneManager is fully self-contained overlay. 
                           We need it to tell us when it's done. 
                           However, RitualContext handles state.
                           If RitualContext says !isRitualActive, we can show Shrine.
                        */}
                        <RitualListener onRitualEnd={() => setView('SHRINE')} />
                    </>
                )}

                {view === 'SHRINE' && <ShrineView />}
            </App>
        </GlobalProviders>
    );
}

import { useRitual } from './src/contexts/RitualContext';
import { useEffect } from 'react';

// Helper to listen for ritual end
function RitualListener({ onRitualEnd }: { onRitualEnd: () => void }) {
    const { isRitualActive, currentSceneIndex } = useRitual();

    // We need to track if it WAS active to avoid triggering on initial mount
    const [wasActive, setWasActive] = useState(false);

    useEffect(() => {
        if (isRitualActive) {
            setWasActive(true);
        } else if (wasActive && !isRitualActive) {
            // Ritual just finished
            onRitualEnd();
        }
    }, [isRitualActive, wasActive, onRitualEnd]);

    return null;
}
