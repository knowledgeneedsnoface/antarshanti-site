"use client";

import React from "react";
// import ScrollProgress from "./(components)/ScrollProgress";
// import HeroSection from "./(components)/HeroSection";
import HealingPromise from "./(components)/HealingPromise";
// import ThirtyDaysGuide from "./(components)/ThirtyDaysGuide";
// import DailyRitualSteps from "./(components)/DailyRitualSteps";
// import BenefitsSection from "./(components)/BenefitsSection";
import WhatsInside from "./(components)/WhatsInside";
import ProductCard from "./(components)/ProductCard";
import VoicesOfPeace from "./(components)/VoicesOfPeace";
import AboutFounderSection from "./(components)/AboutFounderSection";

// New Immersive Components
import SacredHero from "./(components)/SacredHero";
import ImmersiveRitual from "./(components)/ImmersiveRitual";
import ImmersiveGuide from "./(components)/ImmersiveGuide";
import ImmersiveBenefits from "./(components)/ImmersiveBenefits";
import QuickBuySticky from "./(components)/QuickBuySticky";

export default function Home() {
  return (
    <>
      <div className="pt-0 bg-[#faf9f6]">
        <SacredHero />
        <main>
          <HealingPromise />
          <ImmersiveRitual />
          <ImmersiveGuide />
          <ImmersiveBenefits />
          <WhatsInside />
          <ProductCard />
          <VoicesOfPeace />
          <AboutFounderSection />
        </main>
        <QuickBuySticky />
      </div>
    </>
  );
}
