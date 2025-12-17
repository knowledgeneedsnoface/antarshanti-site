/**
 * GITA-ALIGNED PRESENCE ENGINE
 * 
 * Core principle: Yoga is attention in action
 * Goal: Send users back into life with awareness, not deeper into the app
 */

export type RitualMode = "DRISHTI" | "KARMA" | "PRANA" | "SHRAVANA" | "SMARANA";

export type LunarPhase = "new_moon" | "waxing" | "full_moon" | "waning";

export type TimeOfDay = "morning" | "daytime" | "evening" | "night";

export interface RitualSelectionInputs {
    localTime: number; // 0-23
    dayOfWeek: number; // 0-6
    lunarPhase: LunarPhase;
    lastRitualMode: RitualMode | null;
    dayOfCycle: number; // 1-30
}

export interface DailyRitual {
    id: string;
    mode: RitualMode;
    dayOfCycle: number;
    primaryLine: string;
    secondaryLine: string;
    optionalLine?: string;
    duration: number; // seconds
    closureLine: string;
}

/**
 * RITUAL MODES (GITA-ALIGNED TAXONOMY)
 * Never shown to user - internal classification only
 */
export const RITUAL_MODES = {
    DRISHTI: "Seeing / Observing",      // Presence through observation
    KARMA: "Action / Movement",          // Presence through simple action
    PRANA: "Breath / Body",              // Presence through breath/sensation (max 20s)
    SHRAVANA: "Listening",               // Presence through sound
    SMARANA: "Remembrance"               // Presence through remembering truth
};

/**
 * 30-DAY LUNAR-ALIGNED RITUAL MAP
 * Day 1 = New Moon, Day 15 = Full Moon
 */
export const THIRTY_DAY_RITUALS: DailyRitual[] = [
    // DAYS 1-3: NEW MOON (QUIET RESET)
    {
        id: "day_01_new_moon",
        mode: "SMARANA",
        dayOfCycle: 1,
        primaryLine: "Sit quietly.",
        secondaryLine: "Remember: today does not need fixing.",
        duration: 30,
        closureLine: "Say 'Thank you' softly."
    },
    {
        id: "day_02_silence",
        mode: "SHRAVANA",
        dayOfCycle: 2,
        primaryLine: "Listen to the quietest sound around you.",
        secondaryLine: "If none appear, listen to silence.",
        duration: 20,
        closureLine: "Return to your day."
    },
    {
        id: "day_03_one_breath",
        mode: "PRANA",
        dayOfCycle: 3,
        primaryLine: "Take one slow breath.",
        secondaryLine: "Let it complete itself.",
        duration: 15,
        closureLine: "That is enough."
    },

    // DAYS 4-7: WAXING (RETURN TO LIFE)
    {
        id: "day_04_walking",
        mode: "KARMA",
        dayOfCycle: 4,
        primaryLine: "Take a short walk.",
        secondaryLine: "Feel each step land.",
        duration: 60,
        closureLine: "Continue your day."
    },
    {
        id: "day_05_flame",
        mode: "DRISHTI",
        dayOfCycle: 5,
        primaryLine: "Watch the flame.",
        secondaryLine: "Do nothing else.",
        duration: 20,
        closureLine: "Blow it out gently."
    },
    {
        id: "day_06_sounds",
        mode: "SHRAVANA",
        dayOfCycle: 6,
        primaryLine: "Pause.",
        secondaryLine: "Listen to sounds without naming them.",
        duration: 20,
        closureLine: "Return to silence."
    },
    {
        id: "day_07_remembrance",
        mode: "SMARANA",
        dayOfCycle: 7,
        primaryLine: "Remember this:",
        secondaryLine: "Do what is yours. Let the rest be.",
        duration: 20,
        closureLine: "Carry this forward."
    },

    // DAYS 8-11: BUILDING AWARENESS
    {
        id: "day_08_simple_action",
        mode: "KARMA",
        dayOfCycle: 8,
        primaryLine: "Do one small thing slowly.",
        secondaryLine: "Washing hands is enough.",
        duration: 30,
        closureLine: "Notice the difference."
    },
    {
        id: "day_09_sky",
        mode: "DRISHTI",
        dayOfCycle: 9,
        primaryLine: "Look at the sky.",
        secondaryLine: "Notice its depth.",
        duration: 20,
        closureLine: "Return inside."
    },
    {
        id: "day_10_birds",
        mode: "SHRAVANA",
        dayOfCycle: 10,
        primaryLine: "Listen to birds.",
        secondaryLine: "If none are heard, listen to air.",
        duration: 20,
        closureLine: "Continue listening."
    },
    {
        id: "day_11_feet",
        mode: "PRANA",
        dayOfCycle: 11,
        primaryLine: "Feel your feet on the ground.",
        secondaryLine: "No movement needed.",
        duration: 15,
        closureLine: "Stand for a moment."
    },

    // DAYS 12-14: APPROACHING FULL
    {
        id: "day_12_body_walk",
        mode: "KARMA",
        dayOfCycle: 12,
        primaryLine: "Walk for one minute.",
        secondaryLine: "Let the body lead.",
        duration: 60,
        closureLine: "Return to stillness."
    },
    {
        id: "day_13_no_force",
        mode: "SMARANA",
        dayOfCycle: 13,
        primaryLine: "Remember:",
        secondaryLine: "Nothing needs to be forced today.",
        duration: 20,
        closureLine: "Let this settle."
    },
    {
        id: "day_14_light",
        mode: "DRISHTI",
        dayOfCycle: 14,
        primaryLine: "Watch light change.",
        secondaryLine: "Even briefly.",
        duration: 20,
        closureLine: "Return to your day."
    },

    // DAY 15: FULL MOON (PEAK STILLNESS)
    {
        id: "day_15_full_moon",
        mode: "DRISHTI",
        dayOfCycle: 15,
        primaryLine: "If possible, step outside.",
        secondaryLine: "Look at the moon. Do nothing else.",
        optionalLine: "If moon not visible, look at darkness.",
        duration: 30,
        closureLine: "Say 'Thank you' softly."
    },

    // DAYS 16-18: RELEASE
    {
        id: "day_16_night_sounds",
        mode: "SHRAVANA",
        dayOfCycle: 16,
        primaryLine: "Listen to night sounds.",
        secondaryLine: "Let them pass through.",
        duration: 20,
        closureLine: "Return to quiet."
    },
    {
        id: "day_17_one_thing",
        mode: "KARMA",
        dayOfCycle: 17,
        primaryLine: "Put one thing back in its place.",
        secondaryLine: "Slowly.",
        duration: 30,
        closureLine: "Notice the order."
    },
    {
        id: "day_18_release",
        mode: "SMARANA",
        dayOfCycle: 18,
        primaryLine: "Remember:",
        secondaryLine: "What has passed does not need holding.",
        duration: 20,
        closureLine: "Let it go."
    },

    // DAYS 19-22: INTEGRATION
    {
        id: "day_19_watch_breath",
        mode: "DRISHTI",
        dayOfCycle: 19,
        primaryLine: "Watch your breath.",
        secondaryLine: "Without changing it.",
        duration: 20,
        closureLine: "Return to natural breathing."
    },
    {
        id: "day_20_stretch",
        mode: "KARMA",
        dayOfCycle: 20,
        primaryLine: "Stretch your arms once.",
        secondaryLine: "Let them drop.",
        duration: 15,
        closureLine: "Feel the release."
    },
    {
        id: "day_21_familiar_sound",
        mode: "SHRAVANA",
        dayOfCycle: 21,
        primaryLine: "Listen to a familiar sound.",
        secondaryLine: "Hear it freshly.",
        duration: 20,
        closureLine: "Continue listening."
    },
    {
        id: "day_22_sufficient",
        mode: "SMARANA",
        dayOfCycle: 22,
        primaryLine: "Remember:",
        secondaryLine: "This moment is sufficient.",
        duration: 20,
        closureLine: "Carry this forward."
    },

    // DAYS 23-26: QUIETING
    {
        id: "day_23_breath",
        mode: "PRANA",
        dayOfCycle: 23,
        primaryLine: "One slow breath.",
        secondaryLine: "That is enough.",
        duration: 15,
        closureLine: "Return to your day."
    },
    {
        id: "day_24_tree",
        mode: "DRISHTI",
        dayOfCycle: 24,
        primaryLine: "Look at a tree or plant.",
        secondaryLine: "Notice its stillness.",
        duration: 20,
        closureLine: "Return inside."
    },
    {
        id: "day_25_walk_nowhere",
        mode: "KARMA",
        dayOfCycle: 25,
        primaryLine: "Walk without destination.",
        secondaryLine: "Even briefly.",
        duration: 30,
        closureLine: "Return to stillness."
    },
    {
        id: "day_26_between_sounds",
        mode: "SHRAVANA",
        dayOfCycle: 26,
        primaryLine: "Listen to silence between sounds.",
        secondaryLine: "",
        duration: 20,
        closureLine: "Return to quiet."
    },

    // DAYS 27-30: CLOSURE / RETURN
    {
        id: "day_27_rest",
        mode: "SMARANA",
        dayOfCycle: 27,
        primaryLine: "Remember:",
        secondaryLine: "I am allowed to rest.",
        duration: 20,
        closureLine: "Rest now."
    },
    {
        id: "day_28_flame_return",
        mode: "DRISHTI",
        dayOfCycle: 28,
        primaryLine: "Watch the flame again.",
        secondaryLine: "Notice what feels different.",
        duration: 20,
        closureLine: "Blow it out gently."
    },
    {
        id: "day_29_do_nothing",
        mode: "KARMA",
        dayOfCycle: 29,
        primaryLine: "Do nothing for 30 seconds.",
        secondaryLine: "Stay upright.",
        duration: 30,
        closureLine: "Return to action."
    },
    {
        id: "day_30_direction",
        mode: "SMARANA",
        dayOfCycle: 30,
        primaryLine: "Remember:",
        secondaryLine: "Direction is enough.",
        duration: 20,
        closureLine: "The cycle begins again."
    }
];

/**
 * Get current lunar phase based on date
 * Simplified calculation - can be enhanced with actual lunar API
 */
export function getLunarPhase(date: Date = new Date()): LunarPhase {
    const day = date.getDate();

    // Simplified lunar cycle (actual would use astronomical calculation)
    if (day >= 1 && day <= 7) return "new_moon";
    if (day >= 8 && day <= 14) return "waxing";
    if (day >= 15 && day <= 21) return "full_moon";
    return "waning";
}

/**
 * Get time of day category
 */
export function getTimeOfDay(hour: number): TimeOfDay {
    if (hour >= 4 && hour < 10) return "morning";
    if (hour >= 10 && hour < 16) return "daytime";
    if (hour >= 16 && hour < 20) return "evening";
    return "night";
}

/**
 * Get day of 30-day cycle
 */
export function getDayOfCycle(date: Date = new Date()): number {
    const day = date.getDate();
    return day > 30 ? day % 30 : day;
}

/**
 * RITUAL SELECTION ALGORITHM
 * Contextual, not random
 */
export function selectDailyRitual(inputs: RitualSelectionInputs): DailyRitual {
    const { localTime, dayOfWeek, lunarPhase, lastRitualMode, dayOfCycle } = inputs;

    // STEP 1: Get ritual for current day of cycle
    const baseRitual = THIRTY_DAY_RITUALS.find(r => r.dayOfCycle === dayOfCycle)
        || THIRTY_DAY_RITUALS[0];

    // STEP 2: Lunar override (strongest signal)
    if (lunarPhase === "full_moon" && dayOfCycle === 15) {
        // Force full moon ritual
        return THIRTY_DAY_RITUALS.find(r => r.id === "day_15_full_moon")!;
    }

    if (lunarPhase === "new_moon" && dayOfCycle === 1) {
        // Force new moon ritual
        return THIRTY_DAY_RITUALS.find(r => r.id === "day_01_new_moon")!;
    }

    // STEP 3: Mode rotation rule (never repeat same mode)
    // If base ritual mode matches last mode, find alternative
    if (lastRitualMode && baseRitual.mode === lastRitualMode) {
        // Find next ritual with different mode
        const alternatives = THIRTY_DAY_RITUALS.filter(
            r => r.mode !== lastRitualMode && Math.abs(r.dayOfCycle - dayOfCycle) <= 2
        );

        if (alternatives.length > 0) {
            return alternatives[0];
        }
    }

    // STEP 4: Time of day tuning (subtle preference)
    const timeOfDay = getTimeOfDay(localTime);

    // Morning: prefer DRISHTI or KARMA
    // Evening: prefer SHRAVANA or SMARANA
    // Night: prefer SMARANA or PRANA

    // STEP 5: Return base ritual (simplicity beats novelty)
    return baseRitual;
}

/**
 * Get today's ritual with full context
 */
export function getTodaysRitual(lastRitualMode: RitualMode | null = null): DailyRitual {
    const now = new Date();
    const hour = now.getHours();
    const dayOfWeek = now.getDay();
    const lunarPhase = getLunarPhase(now);
    const dayOfCycle = getDayOfCycle(now);

    return selectDailyRitual({
        localTime: hour,
        dayOfWeek,
        lunarPhase,
        lastRitualMode,
        dayOfCycle
    });
}
