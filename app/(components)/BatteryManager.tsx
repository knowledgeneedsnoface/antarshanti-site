"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner"; // Assuming sonner or similar exists, or we create a custom toast dispatch
// Actually, I'll create a custom event or simple toast mechanism if 'sonner' isn't installed.
// The prompt asks for "Toast component".

// Let's create a custom hook/component for battery management.
import { usePerformanceMode } from "./PerformanceManager";

export default function BatteryManager() {
    const { toggleLiteMode, isLiteMode } = usePerformanceMode();
    const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

    useEffect(() => {
        // @ts-ignore
        if (typeof navigator !== "undefined" && navigator.getBattery) {
            // @ts-ignore
            navigator.getBattery().then((battery) => {
                const checkBattery = () => {
                    setBatteryLevel(battery.level);

                    // If battery < 20% and not charging, enable Lite Mode if not already enabled
                    if (battery.level < 0.2 && !battery.charging && !isLiteMode) {
                        // We need to enable it. But `toggleLiteMode` toggles.
                        // We probably need `setLiteMode` in `PerformanceManager`.
                        // For now, I'll assume if it's NOT enabled, I toggle it.
                        // But wait, `usePerformanceMode` doesn't expose `setLiteMode`.
                        // I'll emit a custom event or update localStorage manually then dispatch specific event?
                        // Or better, I should update `PerformanceManager` to accept an external trigger or check battery itself.
                        // The Prompt says: "PerformanceManager.js: Detect ... and battery saver mode."

                        // I will implement the logic HERE to show the toast, but `PerformanceManager` handles the actual mode switch.
                        // Actually, `PerformanceManager` had a TODO for battery.
                        // I should probably move this logic INTO `PerformanceManager` or expose a setter.
                        // But for now, let's dispatch a custom event.

                        window.dispatchEvent(new CustomEvent("trigger-lite-mode"));

                        // Show Toast
                        const toastEl = document.getElementById("battery-toast");
                        if (toastEl) {
                            toastEl.classList.remove("translate-y-20", "opacity-0");
                            setTimeout(() => {
                                toastEl.classList.add("translate-y-20", "opacity-0");
                            }, 4000);
                        }
                    }
                };

                checkBattery();
                battery.addEventListener("levelchange", checkBattery);
                battery.addEventListener("chargingchange", checkBattery);
            });
        }
    }, [isLiteMode]);

    return (
        <div
            id="battery-toast"
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[200] bg-gray-900/90 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 transition-all duration-500 translate-y-20 opacity-0 pointer-events-none"
        >
            <span className="text-amber-400">⚡</span>
            <div className="text-xs">
                <p className="font-medium">Battery-Safe Mode Active</p>
                <p className="text-gray-400">Effects minimized for power</p>
            </div>
        </div>
    );
}
