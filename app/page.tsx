"use client";

import React from "react";
// Phase 2: Ritual Journey Components
import dynamic from "next/dynamic";
import PortalFallback from "./(components)/PortalFallback";

const PortalHero = dynamic(() => import("./(components)/PortalHero"), {
  loading: () => <PortalFallback />,
  ssr: false
});

import LandingNarrative from "./(components)/LandingNarrative";
import QuickBuySticky from "./(components)/QuickBuySticky";
import CursorEffect from "./(components)/CursorEffect";
import AtmosphericBackground from "./(components)/AtmosphericBackground";
import GlobalFooter from "./(components)/GlobalFooter"; // Ensure footer is here effectively if not in layout

export default function Home() {
  return (
    <>
      <div className="pt-0 text-gray-900 relative">
        <AtmosphericBackground />
        <CursorEffect />
        <PortalHero />
        <main>
          <LandingNarrative />
        </main>
        <QuickBuySticky />
      </div>
    </>
  );
}
