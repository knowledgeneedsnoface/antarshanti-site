export interface Relic {
    id: string;
    seed: string; // The word used
    path: 'ANCHOR' | 'RELEASE' | 'IGNITE';
    timestamp: number;
    snapshotUrl?: string; // Data URI or URL
}

export interface ShrineState {
    relics: Relic[];
    habitStreak: number;
    lastVisit: number;
}

const STORAGE_KEY = 'antarshanti_shrine_v1';

export const relicStore = {
    get: (): ShrineState => {
        if (typeof window === 'undefined') return { relics: [], habitStreak: 0, lastVisit: 0 };
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : { relics: [], habitStreak: 0, lastVisit: 0 };
        } catch (e) {
            console.error("Failed to load Shrine data", e);
            return { relics: [], habitStreak: 0, lastVisit: 0 };
        }
    },

    save: (newState: ShrineState) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    },

    addRelic: (relic: Relic) => {
        const current = relicStore.get();
        const newState = {
            ...current,
            relics: [relic, ...current.relics], // Newest first
            lastVisit: Date.now()
        };
        relicStore.save(newState);
        return newState;
    }
};
