import { JourneyPhase, BiomeType } from "./InnerAtlasJourney";

// ---------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------

export interface RealmOption {
    id: string;
    label: string;
    sub: string;
    direction: "left" | "center" | "right";
    nextBiome: BiomeType;
}

export interface RealmScenario {
    narrative: string;
    options: RealmOption[];
    nextPhase: JourneyPhase;
}

// ---------------------------------------------------------------------
// CONFIGURATION
// ---------------------------------------------------------------------

export const REALM_SCENARIOS: Partial<Record<JourneyPhase, RealmScenario>> = {

    // --- MIND REALM ---
    mind_choice: {
        narrative: "The landscape of your mind surrounds you. How does it feel right now?",
        nextPhase: "heart_choice", // Point directly to next choice
        options: [
            {
                id: "stormy_sky",
                direction: "left",
                label: "Stormy Sky",
                sub: "Bhaaga bhaaga",
                nextBiome: "storm"
            },
            {
                id: "quiet_lake",
                direction: "center",
                label: "Quiet Lake",
                sub: "Shaant aur saaf",
                nextBiome: "lake"
            },
            {
                id: "crowded_bazaar",
                direction: "right",
                label: "Crowded Bazaar",
                sub: "Shor gul",
                nextBiome: "bazaar"
            }
        ]
    },

    // --- HEART REALM ---
    heart_choice: {
        narrative: "We enter the heart. What emotion is flowing through you?",
        nextPhase: "shadow_choice", // Determine next phase
        options: [
            {
                id: "heavy_stone",
                direction: "left",
                label: "Heavy Stone",
                sub: "Bhaari",
                nextBiome: "void"
            },
            {
                id: "flowering_garden",
                direction: "center",
                label: "Flowering Garden",
                sub: "Khush",
                nextBiome: "forest"
            },
            {
                id: "burning_fire",
                direction: "right",
                label: "Burning Fire",
                sub: "Gussa",
                nextBiome: "desert"
            }
        ]
    },

    // --- SHADOW REALM ---
    shadow_choice: {
        narrative: "The shadow draws near. What do you fear most?",
        nextPhase: "journey_ending", // Trigger 30-second ending sequence
        options: [
            {
                id: "failure",
                direction: "left",
                label: "Total Failure",
                sub: "Haar jaana",
                nextBiome: "storm"
            },
            {
                id: "loneliness",
                direction: "center",
                label: "Deep Loneliness",
                sub: "Akela-pan",
                nextBiome: "void"
            },
            {
                id: "judgement",
                direction: "right",
                label: "Others' Judgement",
                sub: "Log kya kahenge",
                nextBiome: "bazaar"
            }
        ]
    }
};
