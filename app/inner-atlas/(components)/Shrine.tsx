"use client";

import { useState, useEffect } from "react";
import { relicStore, ShrineState } from "../(store)/relicStore";

export default function Shrine() {
    const [state, setState] = useState<ShrineState | null>(null);

    useEffect(() => {
        setState(relicStore.get());
    }, []);

    if (!state) return <div>Loading Shrine...</div>;

    return (
        <div className="p-10 text-white max-w-4xl mx-auto">
            <h2 className="text-3xl font-light mb-8 border-b border-white/10 pb-4">Your Shrine</h2>

            <div className="flex gap-8 mb-12">
                <div className="text-center">
                    <div className="text-4xl font-bold text-amber-500">{state.relics.length}</div>
                    <div className="text-xs uppercase tracking-widest opacity-60">Relics</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl font-bold text-amber-500">{state.habitStreak}</div>
                    <div className="text-xs uppercase tracking-widest opacity-60">Day Streak</div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {state.relics.map((relic) => (
                    <div key={relic.id} className="aspect-square bg-white/5 rounded-xl border border-white/10 p-4 flex flex-col items-center justify-center hover:bg-white/10 transition-colors">
                        <div className="text-4xl mb-2">
                            {relic.path === 'ANCHOR' ? '🪨' : relic.path === 'RELEASE' ? '🌬️' : '🔥'}
                        </div>
                        <div className="text-sm font-medium">{relic.seed}</div>
                        <div className="text-xs opacity-40">{new Date(relic.timestamp).toLocaleDateString()}</div>
                    </div>
                ))}
                {state.relics.length === 0 && (
                    <div className="col-span-full text-center py-12 opacity-40 italic">
                        No relics yet. Begin your journey.
                    </div>
                )}
            </div>
        </div>
    );
}
