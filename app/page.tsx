"use client";

import React from "react";
// Old components preserved for revert
// import SacredHero from "./(components)/SacredHero";
// import ImmersiveRitual from "./(components)/ImmersiveRitual";
// import ImmersiveGuide from "./(components)/ImmersiveGuide";
// import ImmersiveBenefits from "./(components)/ImmersiveBenefits";

// Phase 2: Ritual Journey Components
import dynamic from "next/dynamic";
import PortalFallback from "./(components)/PortalFallback";

const PortalHero = dynamic(() => import("./(components)/PortalHero"), {
  loading: () => <PortalFallback />,
  ssr: false
});
import PortalTransition from "./(components)/PortalTransition";
import AuraReset from "./(components)/AuraReset";
import RitualRiver from "./(components)/RitualRiver";
import FlameMeditation from "./(components)/FlameMeditation";
import LotusTimeline from "./(components)/LotusTimeline";
import GratitudeSeal from "./(components)/GratitudeSeal";
import CallToContinue from "./(components)/CallToContinue";
import QuickBuySticky from "./(components)/QuickBuySticky";
import DailyRituals from "./(components)/DailyRituals";

import AboutFounderSection from "./(components)/AboutFounderSection";
import VoicesOfPeace from "./(components)/VoicesOfPeace";
import ProductCard from "./(components)/ProductCard";

export default function Home() {
  return (
    <>
      <div className="pt-0 bg-[#faf9f6] text-gray-900">
        <PortalHero />
        <PortalTransition />
        <main>
          <AuraReset />
          <RitualRiver />
          <DailyRituals />
          <FlameMeditation />
          <LotusTimeline />
          <GratitudeSeal />
          <CallToContinue />
          <ProductCard />

          {/* Supporting sections kept for content completeness */}
          <VoicesOfPeace />
          <AboutFounderSection />
        </main>
        <QuickBuySticky />
      </div>
    </>
  );
}
