"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GlobalProviders from './src/components/GlobalProviders';
import App from './src/components/App';
import PortalScene from './src/components/PortalScene';
import ChamberSceneManager from './src/components/ChamberSceneManager';
import ShrineView from './src/components/ShrineView';
import MirrorScene from './src/components/MirrorScene';
import FinalJourneyPage from './src/components/FinalJourneyPage';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { useVisitManager } from './src/hooks/useVisitManager';
import { useA11yRouteManager, useReducedMotion } from './src/hooks/useA11yRouteManager';
import { AssetPrefetcher, ASSET_MANIFEST } from './src/lib/AssetPrefetcher';
import { viewTransitions, reducedMotionVariants, getTransitionChoreography } from './src/lib/TransitionChoreography';
import { Analytics } from './src/lib/Analytics';
import { useRitual } from './src/contexts/RitualContext';

type ViewState = 'PORTAL' | 'CHAMBER' | 'MIRROR' | 'JOURNEY' | 'SHRINE';

export default function InnerAtlasPage() {
    const [view, setView] = useState<ViewState>('PORTAL');
    const [isReady, setIsReady] = useState(false);
    const reducedMotion = useReducedMotion();
    const { isFirstVisit, markVisited, canResume, getResumeState } = useVisitManager();
    const { announceRef } = useA11yRouteManager(view);

    console.log("[InnerAtlas] Current View:", view);

    // Initialize and prefetch portal assets
    useEffect(() => {
        // Initialize audio context on first user interaction
        const initAudio = () => {
            AssetPrefetcher.initAudioContext();
            document.removeEventListener('click', initAudio);
        };
        document.addEventListener('click', initAudio);

        // Prefetch portal assets
        AssetPrefetcher.prefetchLotties(ASSET_MANIFEST.portal.lotties).catch(console.error);
        AssetPrefetcher.prefetchAudio(ASSET_MANIFEST.portal.audio).catch(console.error);

        setIsReady(true);

        return () => document.removeEventListener('click', initAudio);
    }, []);

    // Handle view transitions with choreography
    const handleViewTransition = (from: ViewState, to: ViewState) => {
        const choreography = getTransitionChoreography(from, to);

        if (choreography) {
            console.log(`[Transition] ${from} → ${to}`, choreography);

            // Execute prefetch steps
            const prefetchStep = choreography.steps.find(s => s.action === 'prefetch');
            if (prefetchStep && prefetchStep.payload) {
                const assetKey = prefetchStep.payload as keyof typeof ASSET_MANIFEST;
                const assets = ASSET_MANIFEST[assetKey];
                if (assets) {
                    if ('lotties' in assets && assets.lotties) {
                        AssetPrefetcher.prefetchLotties(assets.lotties).catch(console.error);
                    }
                    if ('audio' in assets && assets.audio) {
                        AssetPrefetcher.prefetchAudio(assets.audio).catch(console.error);
                    }
                }
            }

            // Track analytics
            const analyticsStep = choreography.steps.find(s => s.action === 'analytics');
            if (analyticsStep) {
                setTimeout(() => {
                    Analytics.track(analyticsStep.payload as any);
                }, analyticsStep.delay);
            }
        }

        setView(to);
    };

    const handlePortalComplete = (selectedPath: string) => {
        console.log("[InnerAtlas] Portal Complete -> Chamber");
        handleViewTransition('PORTAL', 'CHAMBER');

        // Mark as visited after first completion
        if (isFirstVisit()) {
            markVisited();
        }
    };

    // Get appropriate transition variants
    const getVariants = (viewName: string) => {
        return reducedMotion ? reducedMotionVariants.default : viewTransitions[viewName];
    };

    if (!isReady) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white/40 text-sm">Loading...</div>
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <GlobalProviders>
                <App>
                    {/* Screen reader announcements */}
                    <div
                        ref={announceRef}
                        className="sr-only"
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                    />

                    {/* View transitions */}
                    <AnimatePresence mode="wait" initial={false}>
                        {view === 'PORTAL' && (
                            <motion.div
                                key="portal"
                                variants={getVariants('PORTAL')}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="absolute inset-0"
                            >
                                <PortalScene onComplete={handlePortalComplete} />
                            </motion.div>
                        )}

                        {view === 'CHAMBER' && (
                            <motion.div
                                key="chamber"
                                variants={getVariants('CHAMBER')}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="absolute inset-0"
                            >
                                <ChamberSceneManager />
                                <RitualListener onRitualEnd={() => {
                                    console.log("[InnerAtlas] Ritual Finished detected");
                                    handleViewTransition('CHAMBER', 'MIRROR');
                                }} />
                            </motion.div>
                        )}

                        {view === 'MIRROR' && (
                            <motion.div
                                key="mirror"
                                variants={getVariants('MIRROR')}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="absolute inset-0"
                            >
                                <MirrorScene onComplete={() => {
                                    console.log("[InnerAtlas] Mirror Complete -> Journey");
                                    handleViewTransition('MIRROR', 'JOURNEY');
                                }} />
                            </motion.div>
                        )}

                        {view === 'JOURNEY' && (
                            <motion.div
                                key="journey"
                                variants={getVariants('JOURNEY')}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="absolute inset-0"
                            >
                                <FinalJourneyPage onComplete={() => {
                                    console.log("[InnerAtlas] Journey Complete -> Shrine");
                                    handleViewTransition('JOURNEY', 'SHRINE');
                                }} />
                            </motion.div>
                        )}

                        {view === 'SHRINE' && (
                            <motion.div
                                key="shrine"
                                variants={getVariants('SHRINE')}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="absolute inset-0"
                            >
                                <ShrineView />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </App>
            </GlobalProviders>
        </ErrorBoundary>
    );
}

// Helper component to listen for ritual end
function RitualListener({ onRitualEnd }: { onRitualEnd: () => void }) {
    const { isRitualActive } = useRitual();
    const [wasActive, setWasActive] = useState(false);

    useEffect(() => {
        if (isRitualActive) {
            setWasActive(true);
        } else if (wasActive && !isRitualActive) {
            onRitualEnd();
        }
    }, [isRitualActive, wasActive, onRitualEnd]);

    return null;
}
