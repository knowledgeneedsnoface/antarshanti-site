"use client";

import React, { Suspense } from 'react';
import DailyRitualEngine from '@/components/ritual/DailyRitualEngine';

function RitualPlayerPageContent() {
    return <DailyRitualEngine />;
}

export default function RitualPlayerPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading Ritual...</div>}>
            <RitualPlayerPageContent />
        </Suspense>
    );
}
