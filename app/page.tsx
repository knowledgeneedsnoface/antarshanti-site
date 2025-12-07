"use client";
import { useEffect, useState } from "react";
import SacredHero from "./(components)/SacredHero";
import HealingPromise from "./(components)/HealingPromise";
import RitualJourney from "./(components)/RitualJourney";
import ProductReveal from "./(components)/ProductReveal";
import WhatsInside from "./(components)/WhatsInside";
import VoicesOfPeace from "./(components)/VoicesOfPeace";
import MinimalCheckout from "./(components)/MinimalCheckout";
import CursorGlow from "./(components)/CursorGlow";
import FloatingParticles from "./(components)/FloatingParticles";
import MandalaPulse from "./(components)/MandalaPulse";
import AmbientSoundToggle from "./(components)/AmbientSoundToggle";

export default function Page() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Smooth scroll behavior
    if (typeof document !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }

    // Prevent scroll restoration
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }

    return () => {
      if (typeof document !== "undefined") {
        document.documentElement.style.scrollBehavior = "auto";
      }
    };
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/30 via-white to-amber-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🕉</div>
          <p className="text-xl text-amber-700">Loading your sacred journey...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-amber-50/30 via-white to-amber-50/30">
        {/* Global Effects */}
        <CursorGlow />
        <FloatingParticles />
        <MandalaPulse />
        <AmbientSoundToggle
          enabled={soundEnabled}
          onToggle={() => setSoundEnabled(!soundEnabled)}
        />

        {/* Sections */}
        <SacredHero />
        <HealingPromise />
        <RitualJourney />
        <ProductReveal />
        <WhatsInside />
        <VoicesOfPeace />
        <MinimalCheckout />
      </div>
    </>
  );
}
