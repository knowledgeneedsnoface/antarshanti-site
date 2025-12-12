"use client";

import { useEffect, useState } from 'react';

export function useKeyboardNavigation() {
    const [isKeyboardUser, setIsKeyboardUser] = useState(false);

    useEffect(() => {
        const handleFirstTab = (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                setIsKeyboardUser(true);
                document.body.classList.add('keyboard-user');
                // Remove custom cursor classes if any, or ensure system cursor
                document.body.style.cursor = 'auto';
                window.removeEventListener('keydown', handleFirstTab);
            }
        };

        // Optional: detect mouse usage to switch back
        const handleMouseMove = () => {
            if (isKeyboardUser) {
                // We might not want to switch back immediately to avoid flickering, 
                // but generally sticky keyboard mode is fine until page reload.
                // Or we can switch back:
                // setIsKeyboardUser(false);
                // document.body.classList.remove('keyboard-user');
            }
        };

        window.addEventListener('keydown', handleFirstTab);
        return () => {
            window.removeEventListener('keydown', handleFirstTab);
        };
    }, [isKeyboardUser]);

    return isKeyboardUser;
}

export default function AccessibilityManager() {
    useKeyboardNavigation();
    return null;
}
