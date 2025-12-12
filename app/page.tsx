"use client";

import React from "react";
// Old components preserved for revert
// import SacredHero from "./(components)/SacredHero";
// import ImmersiveRitual from "./(components)/ImmersiveRitual";
// import ImmersiveGuide from "./(components)/ImmersiveGuide";
// import ImmersiveBenefits from "./(components)/ImmersiveBenefits";

// Phase 2: Ritual Journey Components
import PortalHero from "./(components)/PortalHero";
import AuraReset from "./(components)/AuraReset";
import RitualRiver from "./(components)/RitualRiver";
import FlameMeditation from "./(components)/FlameMeditation";
import LotusTimeline from "./(components)/LotusTimeline";
import GratitudeSeal from "./(components)/GratitudeSeal";
import CallToContinue from "./(components)/CallToContinue";
import QuickBuySticky from "./(components)/QuickBuySticky";

import AboutFounderSection from "./(components)/AboutFounderSection";
import VoicesOfPeace from "./(components)/VoicesOfPeace";
import ProductCard from "./(components)/ProductCard";

export default function Home() {
  return (
    <>
      <div className="pt-0 bg-[#faf9f6] text-gray-900">
        <PortalHero />
        <main>
          <AuraReset />
          <RitualRiver />
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
