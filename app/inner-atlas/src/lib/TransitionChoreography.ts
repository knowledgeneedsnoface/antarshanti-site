/**
 * Transition Choreography System
 * Defines all view-to-view transitions with precise timings
 */

import { Variants } from 'framer-motion';

export const TRANSITION_DURATIONS = {
    fast: 300,
    medium: 600,
    slow: 900,
    cinematic: 1500
} as const;

export const EASINGS = {
    smooth: [0.4, 0.0, 0.2, 1],
    softSnap: [0.175, 0.885, 0.32, 1.275],
    exhale: [0.2, 0.8, 0.2, 1],
    relicFloat: [0.45, 0, 0.55, 1]
} as const;

/**
 * View transition variants for AnimatePresence
 */
export const viewTransitions: Record<string, Variants> = {
    PORTAL: {
        initial: { opacity: 0, scale: 0.95 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: TRANSITION_DURATIONS.slow / 1000,
                ease: EASINGS.smooth
            }
        },
        exit: {
            opacity: 0,
            scale: 1.05,
            transition: {
                duration: TRANSITION_DURATIONS.medium / 1000,
                ease: EASINGS.smooth
            }
        }
    },

    CHAMBER: {
        initial: { opacity: 0, filter: 'blur(8px)' },
        animate: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: {
                duration: TRANSITION_DURATIONS.slow / 1000,
                ease: EASINGS.exhale
            }
        },
        exit: {
            opacity: 0,
            filter: 'blur(8px)',
            transition: {
                duration: TRANSITION_DURATIONS.medium / 1000
            }
        }
    },

    MIRROR: {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: TRANSITION_DURATIONS.cinematic / 1000,
                ease: EASINGS.smooth
            }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: TRANSITION_DURATIONS.medium / 1000
            }
        }
    },

    JOURNEY: {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: TRANSITION_DURATIONS.slow / 1000,
                ease: EASINGS.exhale
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: TRANSITION_DURATIONS.fast / 1000
            }
        }
    },

    SHRINE: {
        initial: { opacity: 0, scale: 0.98 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: TRANSITION_DURATIONS.medium / 1000,
                ease: EASINGS.smooth
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: TRANSITION_DURATIONS.fast / 1000
            }
        }
    }
};

/**
 * Reduced motion variants (simpler, faster)
 */
export const reducedMotionVariants: Record<string, Variants> = {
    default: {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { duration: 0.2 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.1 }
        }
    }
};

/**
 * Transition choreography definitions
 * Specifies what happens during each view transition
 */
export interface TransitionChoreography {
    from: string;
    to: string;
    steps: TransitionStep[];
    totalDuration: number;
    prefetchAssets?: string[];
}

export interface TransitionStep {
    name: string;
    delay: number;
    duration: number;
    action: 'audio' | 'animation' | 'prefetch' | 'analytics';
    payload?: any;
}

export const TRANSITION_CHOREOGRAPHIES: TransitionChoreography[] = [
    {
        from: 'PORTAL',
        to: 'CHAMBER',
        totalDuration: 1500,
        prefetchAssets: ['chamber'],
        steps: [
            { name: 'play_path_select', delay: 0, duration: 180, action: 'audio', payload: 'path_select_bell' },
            { name: 'node_pulse', delay: 180, duration: 200, action: 'animation' },
            { name: 'prefetch_chamber', delay: 400, duration: 0, action: 'prefetch', payload: 'chamber' },
            { name: 'fade_overlay', delay: 600, duration: 400, action: 'animation' },
            { name: 'track_path_selected', delay: 1000, duration: 0, action: 'analytics', payload: 'path_selected' }
        ]
    },
    {
        from: 'CHAMBER',
        to: 'MIRROR',
        totalDuration: 1200,
        prefetchAssets: ['mirror'],
        steps: [
            { name: 'gratitude_complete', delay: 0, duration: 600, action: 'animation' },
            { name: 'prefetch_mirror', delay: 200, duration: 0, action: 'prefetch', payload: 'mirror' },
            { name: 'fade_to_mirror', delay: 600, duration: 600, action: 'animation' },
            { name: 'track_ritual_complete', delay: 800, duration: 0, action: 'analytics', payload: 'ritual_complete' }
        ]
    },
    {
        from: 'MIRROR',
        to: 'JOURNEY',
        totalDuration: 1000,
        prefetchAssets: ['journey'],
        steps: [
            { name: 'snapshot_flash', delay: 0, duration: 300, action: 'animation' },
            { name: 'prefetch_journey', delay: 100, duration: 0, action: 'prefetch', payload: 'journey' },
            { name: 'fade_to_journey', delay: 300, duration: 700, action: 'animation' },
            { name: 'play_soft_bell', delay: 700, duration: 0, action: 'audio', payload: 'soft_end_bell' }
        ]
    },
    {
        from: 'JOURNEY',
        to: 'SHRINE',
        totalDuration: 800,
        prefetchAssets: ['shrine'],
        steps: [
            { name: 'prefetch_shrine', delay: 0, duration: 0, action: 'prefetch', payload: 'shrine' },
            { name: 'fade_to_shrine', delay: 200, duration: 600, action: 'animation' },
            { name: 'track_journey_complete', delay: 600, duration: 0, action: 'analytics', payload: 'return_loop_complete' }
        ]
    }
];

/**
 * Get choreography for a specific transition
 */
export function getTransitionChoreography(from: string, to: string): TransitionChoreography | null {
    return TRANSITION_CHOREOGRAPHIES.find(c => c.from === from && c.to === to) || null;
}
