"use client";

// Simple haptic feedback utility
// Uses Navigator.vibrate() if available

export const triggerHaptic = (pattern: number | number[] = 10) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
        try {
            navigator.vibrate(pattern);
        } catch (e) {
            // Ignore if not supported or permission denied
        }
    }
};

export const hapticPatterns = {
    light: 4,
    medium: 10,
    heavy: 25,
    success: [10, 30, 10],
    warning: [50, 20, 50],
    error: [50, 50, 50, 50, 50],
    ritualStart: [20, 50, 80],
    breathing: 5, // For continuous small ticks
};
