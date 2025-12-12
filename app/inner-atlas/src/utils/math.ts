/**
 * Inner Atlas Math Utilities
 * Helper functions for procedural animations and interactions.
 */

// Linear Interpolation: Smoothly transitions between two values
export const lerp = (start: number, end: number, t: number): number => {
    return start * (1 - t) + end * t;
};

// Clamps a value between a min and max
export const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
};

// Maps a value from one range to another (e.g., Scroll 0-100 -> Opacity 0-1)
export const mapRange = (
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
): number => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

// Generates a deterministic pseudo-random number from a seed string
export const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

// Converts degrees to radians
export const toRadians = (degrees: number): number => {
    return (degrees * Math.PI) / 180;
};

// Returns distance between two points
export const distance = (x1: number, y1: number, x2: number, y2: number): number => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
};
