"use client";
import React from "react";
import HeroSection from "./(components)/HeroSection";
import HealingPromise from "./(components)/HealingPromise";
import RitualJourney from "./(components)/RitualJourney";
import ThirtyDaysGuide from "./(components)/ThirtyDaysGuide";
import WhatsInside from "./(components)/WhatsInside";
import VoicesOfPeace from "./(components)/VoicesOfPeace";
import ProductCard from "./(components)/ProductCard";
import AboutFounderSection from "./(components)/AboutFounderSection";

export default function Home() {
  return (
    <div className="pt-20">
      <HeroSection />
      <main>
        <HealingPromise />
        <RitualJourney />
        <ThirtyDaysGuide />
        <WhatsInside />
        <ProductCard />
        <VoicesOfPeace />
        <AboutFounderSection />
      </main>
    </div>
  );
}
