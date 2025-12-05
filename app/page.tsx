// app/page.tsx
"use client";
import React from "react";
import JourneyIntro from "./(components)/JourneyIntro";
import BenefitsCarousel from "./(components)/BenefitsCarousel";
import ProductCard from "./(components)/ProductCard";

export default function Home() {
  const [started, setStarted] = React.useState(false);

  return (
    <div>
      {!started ? <JourneyIntro onStart={() => setStarted(true)} /> : null}
      <main>
        <BenefitsCarousel />
        <ProductCard />
      </main>
    </div>
  );
}
