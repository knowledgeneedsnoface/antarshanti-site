"use client";

import { useState } from 'react';
import GlobalProviders from './src/components/GlobalProviders';
import App from './src/components/App';
import PortalScene from './src/components/PortalScene';
import ChamberSceneManager from './src/components/ChamberSceneManager';

export default function InnerAtlasPage() {
    const [path, setPath] = useState<string | null>(null);

    const handlePortalComplete = (selectedPath: string) => {
        setPath(selectedPath);
        // Portal unmounts, but ChamberSceneManager (below) persists via Context
    };

    return (
        <GlobalProviders>
            <App>
                <ChamberSceneManager />

                {!path && (
                    <PortalScene onComplete={handlePortalComplete} />
                )}
            </App>
        </GlobalProviders>
    );
}
