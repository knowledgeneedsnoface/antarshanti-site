"use client";
import React from "react";

export default function JourneyIntro({ onStart }: { onStart: () => void }) {
  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white">
      <div className="bg-white/90 max-w-2xl rounded-2xl p-8 text-center shadow">
        <h1 className="text-3xl font-semibold">Welcome to AntarShanti</h1>
        <p className="mt-4 text-sm text-gray-700">
          A 10-minute daily ritual that acts as self-therapy — puja as meditation.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button onClick={onStart} className="rounded-full bg-amber-600 px-6 py-2 text-white">
            Begin the Journey
          </button>
          <a href="#benefits" className="rounded-full border px-6 py-2">See Benefits</a>
        </div>
      </div>
    </section>
  );
}
