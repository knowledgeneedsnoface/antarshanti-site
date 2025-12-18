"use client";

import React from "react";
import { getRitualVisual } from "./ritualRenderer";

interface RitualVisualProps {
    visual: string;
    opacity?: number;
}

/**
 * Renders background visuals based on ritual mode
 * Delegates to ritualRenderer for component mapping
 */
export default function RitualVisual({ visual, opacity = 0.25 }: RitualVisualProps) {
    const prefersReducedMotion = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    return (
        <div className="fixed inset-0 pointer-events-none">
            {getRitualVisual(visual, opacity, prefersReducedMotion)}
        </div>
    );
}
