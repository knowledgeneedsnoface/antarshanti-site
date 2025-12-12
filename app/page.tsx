"use client";

import React from "react";
import ScrollProgress from "./(components)/ScrollProgress";
import HeroSection from "./(components)/HeroSection";
import HealingPromise from "./(components)/HealingPromise";

import ThirtyDaysGuide from "./(components)/ThirtyDaysGuide";
import DailyRitualSteps from "./(components)/DailyRitualSteps";
import BenefitsSection from "./(components)/BenefitsSection";
import WhatsInside from "./(components)/WhatsInside";
import ProductCard from "./(components)/ProductCard";
import VoicesOfPeace from "./(components)/VoicesOfPeace";
import AboutFounderSection from "./(components)/AboutFounderSection";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <div className="pt-20">
        <HeroSection />
        <main>
          <HealingPromise />

          <ThirtyDaysGuide />
          <DailyRitualSteps />
          <BenefitsSection />
          <WhatsInside />
          <ProductCard />
          <VoicesOfPeace />
          <AboutFounderSection />
        </main>
      </div>
    </>
  );
}
