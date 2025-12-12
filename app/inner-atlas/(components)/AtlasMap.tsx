"use client";

import { useAtlas } from "../(store)/atlasContext";

// Visual representation of the journey
export default function AtlasMap() {
    const { config, currentPath } = useAtlas();

    return (
        <div className="w-full h-full p-10 flex items-center justify-center opacity-30 pointer-events-none absolute inset-0">
            {/* Abstract Map Background Simulation */}
            <div className="grid grid-cols-6 gap-4">
                {Array.from({ length: 24 }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-12 h-12 rounded-full border border-white/10 ${i % 3 === 0 ? 'bg-white/5' : ''}`}
                        style={{
                            transform: `translateY(${i % 2 === 0 ? 0 : 20}px)`,
                            borderColor: config?.palette.primary
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
