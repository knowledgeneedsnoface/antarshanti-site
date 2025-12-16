"use client";

import React, { useState, useEffect } from 'react';
import TwinMini from '@/components/twin/TwinMini';
import { TwinSkeleton } from '@/components/LoadingSkeletons';
import TwinFull from '@/components/twin/TwinFull';
import TwinOnboarding from '@/components/twin/TwinOnboarding';
import LevelUpModal from '@/components/twin/LevelUpModal';
import { getTwin, createTwin, getEventQueue } from '@/lib/twin/twinClient';
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
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    const data = await getTwin(userId);
    setTwin(data);
    setLoading(false);

    // Show onboarding if:
    // 1. No twin exists
    // 2. User hasn't dismissed it
    // 3. Not on demo page (to avoid conflicts)
    const dismissed = localStorage.getItem('twin_onboarding_dismissed');
    const isDemo = window.location.pathname === '/twin/demo';

    if (!data && mounted && !dismissed && !isDemo) {
      // Delay to avoid conflict with page load
      setTimeout(() => setShowOnboarding(true), 3000);
    }
  }

  async function handleCreateTwin(name: string, path: SpiritualPath, avatarSeed: number) {
    const newTwin = await createTwin(userId, name, path, avatarSeed);
    setTwin(newTwin);
    setShowOnboarding(false);
  }

  function handleSkipOnboarding() {
    setShowOnboarding(false);
    localStorage.setItem('twin_onboarding_dismissed', 'true');
  }

  const [quickBuyVisible, setQuickBuyVisible] = useState(false);

  useEffect(() => {
    const handleQuickBuy = (e: any) => {
      setQuickBuyVisible(e.detail.visible);
    };

    window.addEventListener('quick-buy-visibility', handleQuickBuy);
    return () => window.removeEventListener('quick-buy-visibility', handleQuickBuy);
  }, []);

  const positionClasses = `fixed z-50 right-6 transition-all duration-300 ${quickBuyVisible ? 'bottom-24 md:bottom-auto md:top-20' : 'bottom-6 md:bottom-auto md:top-20'
    }`;

  if (!mounted) return null;

  return (
    <>
      {/* Twin Mini - Fixed position */}
      {loading ? (
        <div className={positionClasses}>
          <TwinSkeleton />
        </div>
      ) : twin ? (
        <div className={positionClasses}>
          <TwinMini twin={twin} onClick={() => setShowTwinFull(true)} />
        </div>
      ) : null}

      {/* Modals */}
      {showOnboarding && (
        <TwinOnboarding
          onComplete={handleCreateTwin}
          onSkip={handleSkipOnboarding}
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
