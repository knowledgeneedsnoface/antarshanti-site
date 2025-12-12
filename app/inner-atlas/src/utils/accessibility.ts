/**
 * Inner Atlas Accessibility Utilities
 * Helpers for managing focus, reduced motion, and ARIA announcements.
 */

// Check if user prefers reduced motion
export const getPrefersReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Announce message to screen readers via Live Region
export const announceToScreenReader = (message: string, assertiveness: 'polite' | 'assertive' = 'polite') => {
    if (typeof document === 'undefined') return;

    let announcer = document.getElementById('atlas-announcer');
    if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'atlas-announcer';
        announcer.setAttribute('aria-live', assertiveness);
        announcer.setAttribute('aria-atomic', 'true');
        announcer.style.cssText = 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;';
        document.body.appendChild(announcer);
    }

    // Clear and set texture to ensure announcement triggers
    announcer.textContent = '';
    setTimeout(() => {
        if (announcer) announcer.textContent = message;
    }, 50);
};

// Trap focus within an element (for Modals/Chambers)
export const setupFocusTrap = (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    };

    element.addEventListener('keydown', handleTab);
    return () => element.removeEventListener('keydown', handleTab);
};
