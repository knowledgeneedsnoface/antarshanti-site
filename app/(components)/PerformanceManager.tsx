"use client";

import { useState, useEffect, useCallback } from "react";

// Hook to detect low-end devices or battery saver mode
export function usePerformanceMode() {
    const [isLiteMode, setIsLiteMode] = useState(false);
    const [deviceTier, setDeviceTier] = useState<"high" | "low">("high");

    useEffect(() => {
        // 1. Check for basic hardware concurrency (CPU cores)
        // Low core count usually implies older/low-end device
        if (typeof navigator !== "undefined" && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
            setDeviceTier("low");
            setIsLiteMode(true);
        }

        // 2. RAM estimation (if available in Chrome)
        // @ts-ignore
        if (typeof navigator !== "undefined" && navigator.deviceMemory && navigator.deviceMemory < 4) {
            setDeviceTier("low");
            setIsLiteMode(true);
        }

        // 3. User preference for reduced motion
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mediaQuery.matches) {
            setIsLiteMode(true);
        }

        // 4. Check for Battery Saver Mode (Battery Safe Mode Task)
        // We'll leave this open for the BatteryManager to verify, but this serves as the base logic.

        // Check local storage for manual override
        const stored = localStorage.getItem("antarshanti-lite-mode");
        if (stored) {
            setIsLiteMode(stored === "true");
        }

        // Listen for battery triggers
        const handleBatteryTrigger = () => {
            setIsLiteMode(true);
            localStorage.setItem("antarshanti-lite-mode", "true");
        };

        window.addEventListener("trigger-lite-mode", handleBatteryTrigger);

        return () => {
            window.removeEventListener("trigger-lite-mode", handleBatteryTrigger);
        };
    }, []);

    const toggleLiteMode = useCallback(() => {
        setIsLiteMode((prev) => {
            const next = !prev;
            localStorage.setItem("antarshanti-lite-mode", String(next));
            return next;
        });
    }, []);

    return { isLiteMode, toggleLiteMode, deviceTier };
}
