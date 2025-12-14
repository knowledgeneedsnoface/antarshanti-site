"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------
// IMPORT ALL MODULES
// ---------------------------------------------------------------------
import ChariotArrival from "./ChariotArrival";
import MindRealm, { MindStateKey } from "./MindRealm";
import HeartRealm, { HeartStateKey } from "./HeartRealm";
import ShadowRealm, { ShadowStateKey } from "./ShadowRealm";
import KurukshetraSelection, { BattleKey } from "./KurukshetraSelection";
import PowerObjectsSelector, { DhanushKey, ChakraKey, RathKey } from "./PowerObjectsSelector";
import CosmicGitaMoment from "./CosmicGitaMoment";
import SoulMapReveal from "./SoulMapReveal";
import RitualAssignment from "./RitualAssignment";
import DailyRitualHome from "./DailyRitualHome";
import RitualPlayer from "./RitualPlayer";
import PostRitualReflection from "./PostRitualReflection";
import DailyDashboard from "./DailyDashboard";
import LoreBook from "./LoreBook";
import DailySurpriseGenerator from "./DailySurpriseGenerator";
import SoulTwinReaction, { CharacterMode } from "./SoulTwinReaction";

// ---------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------
export type ScreenKey =
    | "chariot" | "mind" | "heart" | "shadow" | "kurukshetra" | "power"
    | "gitaMoment" | "soulMap" | "ritualAssignment"
    | "home" | "ritualPlayer" | "postReflection"
    | "dashboard" | "lorebook";

interface InnerAtlasAppShellProps {
    initialScreen?: ScreenKey;
}

export default function InnerAtlasAppShell({ initialScreen = "chariot" }: InnerAtlasAppShellProps) {

    // -----------------------------------------------------------------
    // 1. GLOBAL STATE
    // -----------------------------------------------------------------
    const [screen, setScreen] = useState<ScreenKey>(initialScreen);

    // Diagnostic State
    const [mindState, setMindState] = useState<MindStateKey | null>(null);
    const [heartState, setHeartState] = useState<HeartStateKey | null>(null);
    const [shadowState, setShadowState] = useState<ShadowStateKey | null>(null);
    const [kurukshetraBattle, setKurukshetraBattle] = useState<BattleKey | null>(null);
    const [powerObjects, setPowerObjects] = useState<{
        dhanush: DhanushKey,
        chakra: ChakraKey,
        rath: RathKey
    }>({
        dhanush: "focus",
        chakra: "truth",
        rath: "stability_path"
    });

    const [gitaLine, setGitaLine] = useState<string | null>(null);
    const [assignedRitual, setAssignedRitual] = useState<string | null>(null);

    // Daily Loop State
    const [todayMood, setTodayMood] = useState<string | null>(null);
    const [postMood, setPostMood] = useState<string | null>(null);

    // History & Streaks
    const [streakCount, setStreakCount] = useState(0);
    const [weeklyCompletion, setWeeklyCompletion] = useState([false, false, false, false, false, false, false]);
    const [moodHistory, setMoodHistory] = useState<any[]>([]); // Mock data will be used if empty
    const [ritualHistory, setRitualHistory] = useState<any[]>([]);

    // Surprise State
    const [showSurprise, setShowSurprise] = useState(false);
    const [lastSurpriseDate, setLastSurpriseDate] = useState<number | null>(null);

    // Soul Twin State
    const [twinEvent, setTwinEvent] = useState<string | null>("daily_check_in");
    const [twinPayload, setTwinPayload] = useState<any>({});

    // -----------------------------------------------------------------
    // 2. NAVIGATION & HANDLERS
    // -----------------------------------------------------------------

    const next = (target: ScreenKey) => {
        setScreen(target);
        window.scrollTo(0, 0);
    };

    // Twin Trigger Helper
    const triggerTwin = (event: string, payload: any = {}) => {
        setTwinEvent(event);
        setTwinPayload(payload);
    };

    // Screen Change Twin Triggers
    useEffect(() => {
        if (screen === "home") triggerTwin("daily_check_in");
        if (screen === "dashboard") triggerTwin("dashboard_opened");
        if (screen === "ritualAssignment") triggerTwin("encouragement_needed");
    }, [screen]);


    // Handlers
    const handleMindSelect = (key: MindStateKey) => {
        setMindState(key);
        next("heart");
    };

    const handleHeartSelect = (key: HeartStateKey) => {
        setHeartState(key);
        next("shadow");
    };

    const handleShadowSelect = (key: ShadowStateKey) => {
        setShadowState(key);
        next("kurukshetra");
    };

    const handleBattleSelect = (key: BattleKey) => {
        setKurukshetraBattle(key);
        next("power");
    };

    const handlePowerSelection = (selections: any) => {
        setPowerObjects(selections);
        next("gitaMoment");
    };

    const handleGitaComplete = () => {
        next("soulMap");
    };

    const handleSoulMapComplete = () => {
        next("ritualAssignment");
    };

    const handleRitualAssigned = (key: string) => {
        setAssignedRitual(key);
        next("home");
    };

    // Daily Loop Handlers
    const handleStartRitual = (key: string, mood: string | null) => {
        setTodayMood(mood);
        triggerTwin("ritual_started");
        next("ritualPlayer");
    };

    const handleRitualComplete = (key: string) => {
        // Update History
        const newHistoryItem = { date: Date.now(), ritualKey: key };
        setRitualHistory(prev => [...prev, newHistoryItem]);

        // Update Streak (Simulated)
        setStreakCount(prev => prev + 1);
        const day = new Date().getDay();
        const newWeekly = [...weeklyCompletion];
        newWeekly[day] = true;
        setWeeklyCompletion(newWeekly);

        triggerTwin("ritual_completed");
        next("postReflection");
    };

    const handleReflectionComplete = (data: any) => {
        setPostMood(data.afterMood);
        // Add to history
        const newMoodItem = { date: Date.now(), previousMood: todayMood || "neutral", afterMood: data.afterMood };
        setMoodHistory(prev => [...prev, newMoodItem]);

        triggerTwin("streak_updated", { streak: streakCount + 1 });
        next("home");
    };

    const handleSurpriseGenerated = (item: any) => {
        setLastSurpriseDate(Date.now());
    };

    // -----------------------------------------------------------------
    // 3. RENDERER
    // -----------------------------------------------------------------

    const renderScreen = () => {
        switch (screen) {
            case "chariot":
                return <ChariotArrival onStartInnerAtlas={() => next("mind")} />;
            case "mind":
                return <MindRealm onMindSelection={handleMindSelect} />;
            case "heart":
                return <HeartRealm onHeartSelection={handleHeartSelect} />;
            case "shadow":
                return <ShadowRealm onShadowSelection={handleShadowSelect} />;
            case "kurukshetra":
                return <KurukshetraSelection onKurukshetraSelection={handleBattleSelect} />;
            case "power":
                return <PowerObjectsSelector onPowerObjectsSelection={handlePowerSelection} />;
            case "gitaMoment":
                return (
                    <CosmicGitaMoment
                        kurukshetraBattleKey={kurukshetraBattle || "duty_vs_desire"}
                        onGitaMomentComplete={handleGitaComplete}
                    />
                );
            case "soulMap":
                return (
                    <SoulMapReveal
                        mindStateKey={mindState || "stormy_sky"}
                        heartStateKey={heartState || "heavy"}
                        shadowStateKey={shadowState || "self_doubt"}
                        kurukshetraBattleKey={kurukshetraBattle || "duty_vs_desire"}
                        powerObjects={powerObjects}
                        gitaLine={gitaLine || "Karmanye Vadhikaraste"}
                        onSoulMapComplete={handleSoulMapComplete}
                    />
                );
            case "ritualAssignment":
                return (
                    <RitualAssignment
                        mindStateKey={mindState || "stormy_sky"}
                        heartStateKey={heartState || "heavy"}
                        shadowStateKey={shadowState || "self_doubt"}
                        kurukshetraBattleKey={kurukshetraBattle || "duty_vs_desire"}
                        powerObjects={powerObjects}
                        onRitualAssigned={handleRitualAssigned}
                    />
                );
            case "home":
                return (
                    <div className="relative">
                        <DailyRitualHome
                            assignedRitualKey={assignedRitual || "karma_yoga"}
                            gitaLine={gitaLine || "Yogastha Kuru Karmani"}
                            onStartRitual={handleStartRitual}
                            onOpenDashboard={() => next("dashboard")}
                            onOpenLore={() => next("lorebook")}
                            onOpenSurprise={() => setShowSurprise(true)}
                        />

                        {/* Surprise Overlay handled here if lifted */}
                        {showSurprise && (
                            <DailySurpriseGenerator
                                lastSurpriseDate={lastSurpriseDate}
                                onSurpriseGenerated={handleSurpriseGenerated}
                                onClose={() => setShowSurprise(false)}
                            />
                        )}

                        {/* Persistent Twin on Home */}
                        <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
                            <div className="pointer-events-auto">
                                <SoulTwinReaction
                                    eventType={(twinEvent as any) || "daily_check_in"}
                                    eventPayload={twinPayload}
                                    characterMode="duo"
                                />
                            </div>
                        </div>
                    </div>
                );
            case "ritualPlayer":
                return (
                    <RitualPlayer
                        assignedRitualKey={assignedRitual || "karma_yoga"}
                        onRitualComplete={() => handleRitualComplete(assignedRitual || "karma_yoga")}
                    />
                );
            case "postReflection":
                return (
                    <PostRitualReflection
                        assignedRitualKey={assignedRitual || "karma_yoga"}
                        previousMood={todayMood || "neutral"}
                        onReflectionComplete={handleReflectionComplete}
                        streakCount={streakCount}
                        weeklyCompletion={weeklyCompletion}
                    />
                );
            case "dashboard":
                return (
                    <>
                        <DailyDashboard
                            streakCount={streakCount}
                            weeklyCompletion={weeklyCompletion}
                            moodHistory={moodHistory}
                            ritualHistory={ritualHistory}
                            onCloseDashboard={() => next("home")}
                        />
                        {/* Twin for Dashboard */}
                        <div className="fixed bottom-6 left-6 z-[60]">
                            <SoulTwinReaction
                                eventType="dashboard_opened"
                                characterMode="gann_baba"
                            />
                        </div>
                    </>
                );
            case "lorebook":
                return <LoreBook onCloseLoreBook={() => next("home")} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFBF2] text-gray-900 font-sans overflow-x-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={screen}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderScreen()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
