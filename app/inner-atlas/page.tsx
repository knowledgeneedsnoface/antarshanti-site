"use client";

import { useState } from 'react';
import GlobalProviders from './src/components/GlobalProviders';
import App from './src/components/App';
import PortalScene from './src/components/PortalScene';
// We will eventually import Chamber here

export default function InnerAtlasPage() {
    const [path, setPath] = useState<string | null>(null);

    const handlePortalComplete = (selectedPath: string) => {
        setPath(selectedPath);
        console.log("Portal complete. Path chosen:", selectedPath);
        // Next step: switch to ChamberScene
    };

    return (
        <GlobalProviders>
            <App>
                {!path ? (
                    <PortalScene onComplete={handlePortalComplete} />
                ) : (
                    <div className="flex h-screen items-center justify-center text-white">
                        {/* Placeholder for Chamber Scene */}
                        <div>
                            <h1 className="text-4xl mb-4">Journey to {path}</h1>
                            <p className="text-white/60">Chamber loading...</p>
                        </div>
                    </div>
                )}
            </App>
        </GlobalProviders>
    );
}
