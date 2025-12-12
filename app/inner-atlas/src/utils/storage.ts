/**
 * Inner Atlas Storage Utilities
 * Safe wrappers for LocalStorage with error handling and JSON parsing.
 */

const PREFIX = 'antarshanti_atlas_';

export const storage = {
    get: <T>(key: string, defaultValue: T): T => {
        if (typeof window === 'undefined') return defaultValue;
        try {
            const item = window.localStorage.getItem(PREFIX + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return defaultValue;
        }
    },

    set: <T>(key: string, value: T): void => {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
        } catch (error) {
            console.warn(`Error writing localStorage key "${key}":`, error);
        }
    },

    remove: (key: string): void => {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.removeItem(PREFIX + key);
        } catch (error) {
            console.warn(`Error removing localStorage key "${key}":`, error);
        }
    },

    clearAll: (): void => {
        if (typeof window === 'undefined') return;
        // Only clear keys starting with our prefix
        Object.keys(window.localStorage).forEach(key => {
            if (key.startsWith(PREFIX)) {
                window.localStorage.removeItem(key);
            }
        });
    }
};
