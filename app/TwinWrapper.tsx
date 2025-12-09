"use client";

import React, { useState, useEffect } from 'react';
import TwinMini from '@/components/twin/TwinMini';
import TwinFull from '@/components/twin/TwinFull';
import TwinOnboarding from '@/components/twin/TwinOnboarding';
import LevelUpModal from '@/components/twin/LevelUpModal';
import { getTwin, createTwin, postEvent, getEventQueue } from '@/lib/twin/twinClient';
import { SoulTwin, SpiritualPath } from '@/lib/twin/rules';

export default function TwinWrapper() {
  const [twin, setTwin] = useState<SoulTwin | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showTwinFull, setShowTwinFull] = useState(false);
  const [levelUpData, setLevelUpData] = useState<{ isOpen: boolean; newLevel: number; gains: any }>({
    isOpen: false,
    newLevel: 1,
    gains: {},
  });
  const [mounted, setMounted] = useState(false);

  const userId = typeof window !== 'undefined' ? (localStorage.getItem('userId') || generateUserId()) : 'temp-user';

  function generateUserId() {
    const id = 'user-' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', id);
    return id;
  }

  useEffect(() => {
    setMounted(true);
    loadTwin();
  }, []);

  async function loadTwin() {
    const data = await getTwin(userId);
    setTwin(data);
    
    // Show onboarding if no twin exists
    if (!data && mounted) {
      setTimeout(() => setShowOnboarding(true), 1000);
    }
  }

  async function handleCreateTwin(name: string, path: SpiritualPath, avatarSeed: number) {
    const newTwin = await createTwin(userId, name, path, avatarSeed);
    setTwin(newTwin);
    setShowOnboarding(false);
  }

  if (!mounted) return null;

  return (
    <>
      {/* Twin Mini - Fixed position */}
      {twin && (
        <div className="fixed top-20 right-6 z-50">
          <TwinMini twin={twin} onClick={() => setShowTwinFull(true)} />
        </div>
      )}

      {/* Modals */}
      {showOnboarding && (
        <TwinOnboarding
          onComplete={handleCreateTwin}
          onSkip={() => setShowOnboarding(false)}
        />
      )}

      {showTwinFull && twin && (
        <TwinFull
          twin={twin}
          onClose={() => setShowTwinFull(false)}
        />
      )}

      <LevelUpModal
        isOpen={levelUpData.isOpen}
        newLevel={levelUpData.newLevel}
        attributeGains={levelUpData.gains}
        onClose={() => setLevelUpData({ ...levelUpData, isOpen: false })}
      />
    </>
  );
}
