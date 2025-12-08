"use client";
import React from "react";
import HeroSection from "./(components)/HeroSection";
import JourneyIntro from "./(components)/JourneyIntro";
import HealingPromise from "./(components)/HealingPromise";
import RitualJourney from "./(components)/RitualJourney";
import WhatsInside from "./(components)/WhatsInside";
import VoicesOfPeace from "./(components)/VoicesOfPeace";
import ProductCard from "./(components)/ProductCard";
import AboutFounderSection from "./(components)/AboutFounderSection";

export default function Home() {
  const [started, setStarted] = React.useState(false);

  return (
    <div className="pt-20">
      {!started ? (
        <JourneyIntro onStart={() => setStarted(true)} />
      ) : (
        <>
          <HeroSection />
          <main>
            <HealingPromise />
            <RitualJourney />
            <WhatsInside />
            <ProductCard />
            <VoicesOfPeace />
            <AboutFounderSection />
          </main>
        </>
      )}
    </div>
  );
}
