"use client";

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Accessibility Route Manager
 * Handles focus management and announcements on view transitions
 */
export function useA11yRouteManager(currentView: string) {
    const announceRef = useRef<HTMLDivElement>(null);
    const previousView = useRef<string>('');

    useEffect(() => {
        // Skip on initial mount
        if (!previousView.current) {
            previousView.current = currentView;
            return;
        }

        // View changed
        if (previousView.current !== currentView) {
            // 1. Announce to screen readers
            if (announceRef.current) {
                const viewNames: Record<string, string> = {
                    PORTAL: 'Portal - Enter your seed word',
                    CHAMBER: 'Chamber - Begin your ritual',
                    MIRROR: 'Mirror - View your reflection',
                    JOURNEY: 'Journey - Review your practice',
                    SHRINE: 'Shrine - Your sacred space'
                };

                announceRef.current.textContent = `Navigated to ${viewNames[currentView] || currentView}`;
            }

            // 2. Focus management - find and focus the main heading
            setTimeout(() => {
                const mainHeading = document.querySelector('h1, h2, [role="heading"]') as HTMLElement;
                if (mainHeading && mainHeading.tabIndex === -1) {
                    mainHeading.tabIndex = -1;
                }
                mainHeading?.focus();
            }, 100);

            previousView.current = currentView;
        }
    }, [currentView]);

    return {
        announceRef
    };
}

/**
 * Reduced Motion Hook
 * Detects and respects user's motion preferences
 */
export function useReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return mediaQuery.matches;
}

/**
 * Keyboard Navigation Hook
 * Provides keyboard-only navigation helpers
 */
export function useKeyboardNav(onEscape?: () => void, onEnter?: () => void) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && onEscape) {
                onEscape();
            }
            if (e.key === 'Enter' && onEnter) {
                onEnter();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onEscape, onEnter]);
}
