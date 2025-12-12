"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePersonalization } from '../contexts/PersonalizationContext';
import { useShrine } from '../contexts/ShrineContext';
import { useAudio } from '../contexts/AudioContext';
import { GratitudeEngine } from '../lib/GratitudeEngine';
import { MicroHabitEngine } from '../lib/MicroHabitEngine';
import { QuestEngine } from '../lib/QuestEngine';
import { Analytics } from '../lib/Analytics';
import StreakDisplay from './StreakDisplay';
import MicroHabitCard from './MicroHabitCard';
import TomorrowQuestCard from './TomorrowQuestCard';
import ReminderPreferences from './ReminderPreferences';
import { RitualPath } from '../lib/Personalizer';

interface FinalJourneyPageProps {
    onComplete?: () => void;
}

export default function FinalJourneyPage({ onComplete }: FinalJourneyPageProps) {
    const { theme } = usePersonalization();
    const { shrine, checkStreak } = useShrine();
    const { play } = useAudio();

    useEffect(() => {
        // Update streak on entry
        checkStreak();

        // Play soft end bell
        play('soft_end_bell', 0.4);

        // Analytics
        Analytics.track('journey_page_viewed', {
            seed: theme?.seed,
            path: theme?.path,
            shrineLevel: shrine.level,
            streak: shrine.streakDays
        });

        Analytics.track('streak_displayed', { streak: shrine.streakDays });
    }, [checkStreak, play, theme, shrine]);

    if (!theme) return null;

    // Generate content
    const gratitudeLine = GratitudeEngine.generate(theme.seed);
    const microHabit = MicroHabitEngine.generate(theme.path as RitualPath, theme.seed);
    const quest = QuestEngine.generate(theme.seed);

    // Background gradient based on path
    const getBackgroundGradient = () => {
        switch (theme.path) {
            case 'ANCHOR':
                return 'linear-gradient(180deg, #2A1810 0%, #0A0502 100%)';
            case 'RELEASE':
                return 'linear-gradient(180deg, #1A2530 0%, #0A0F15 100%)';
            case 'IGNITE':
                return 'linear-gradient(180deg, #2A0F0A 0%, #0A0502 100%)';
            default:
                return 'linear-gradient(180deg, #1A1410 0%, #0A0502 100%)';
        }
    };

    return (
        <div
            className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden"
            style={{ background: getBackgroundGradient() }}
        >
            {/* Ambient Glow */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at 50% 30%, ${theme.palette.primary}20 0%, transparent 60%)`
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-12">

                {/* Gratitude Line */}
                <motion.h2
                    className="text-2xl md:text-3xl font-serif text-white/90 text-center leading-relaxed max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    {gratitudeLine}
                </motion.h2>

                {/* Streak Display */}
                <StreakDisplay streak={shrine.streakDays} />

                {/* Divider */}
                <motion.div
                    className="w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                />

                {/* Micro Habit Card */}
                <MicroHabitCard habit={microHabit.text} path={theme.path} />

                {/* Tomorrow's Quest */}
                <TomorrowQuestCard quest={quest.text} theme={quest.theme} />

                {/* Reminder Preferences */}
                <ReminderPreferences />

                {/* Return to Shrine Button */}
                {onComplete && (
                    <motion.button
                        onClick={() => {
                            Analytics.track('return_loop_complete');
                            onComplete();
                        }}
                        className="mt-8 px-6 py-3 text-white/40 hover:text-white/60 text-sm font-light border border-white/10 hover:border-white/20 rounded-full transition-all duration-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Return to Shrine
                    </motion.button>
                )}
            </div>

            {/* Accessibility Caption */}
            <div className="sr-only" role="status" aria-live="polite">
                Journey complete. {gratitudeLine} Your streak: {shrine.streakDays} days.
            </div>
        </div>
    );
}
