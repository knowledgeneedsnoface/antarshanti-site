"use client";

import React, { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import RitualPlayer from '@/components/InnerAtlas/RitualPlayer';
import PostRitualReflection, { ReflectionData } from '@/components/InnerAtlas/PostRitualReflection';

function RitualPlayerPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Get ritual key and mood from URL
    const ritualKey = searchParams.get('id') || 'karma_yoga';
    const previousMood = searchParams.get('mood') || 'neutral';

    const [view, setView] = useState<'player' | 'reflection'>('player');

    const handleRitualComplete = () => {
        // Transition to reflection view instead of immediate redirect
        setView('reflection');
    };

    const handleReflectionComplete = (data: ReflectionData) => {
        console.log("Ritual Session Complete:", data);

        // Redirect back to Daily Home Dashboard after completion
        // Data could be sent to backend here
        router.push(`/get-started?ritual=${data.ritual}&completed=true`);
    };

    if (view === 'reflection') {
        return (
            <PostRitualReflection
                assignedRitualKey={ritualKey}
                previousMood={previousMood}
                onReflectionComplete={handleReflectionComplete}
            />
        );
    }

    return (
        <RitualPlayer
            assignedRitualKey={ritualKey}
            onRitualComplete={handleRitualComplete}
        />
    );
}

export default function RitualPlayerPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading Ritual...</div>}>
            <RitualPlayerPageContent />
        </Suspense>
    );
}
