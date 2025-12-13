"use client";

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import RitualPlayer from '@/components/InnerAtlas/RitualPlayer';

function RitualPlayerPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Get ritual key from URL (default to karma_yoga if missing)
    const ritualKey = searchParams.get('id') || 'karma_yoga';

    const handleComplete = (key: string) => {
        // Redirect back to Daily Home Dashboard after completion
        // Adding a timestamp or flag could be used for 'streak' tracking in future
        router.push(`/get-started?ritual=${key}&completed=true`);
    };

    return (
        <RitualPlayer
            assignedRitualKey={ritualKey}
            onRitualComplete={handleComplete}
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
