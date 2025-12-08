"use client";
import React from "react";

export default function JourneyIntro({ onStart }: { onStart: () => void }) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-white px-4">
      <div className="bg-white/95 backdrop-blur-xl max-w-2xl rounded-3xl p-12 text-center shadow-2xl border border-amber-100">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-4xl mb-4">
            🕉
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          Welcome to AntarShanti
        </h1>
        <p className="mt-4 text-xl text-gray-700 leading-relaxed">
          A 10-minute daily puja ritual that becomes your self-therapy.
        </p>
        <p className="mt-3 text-lg text-gray-600">
          Experience inner peace through ancient wisdom, designed for modern life.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <button 
            onClick={onStart} 
            className="px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xl rounded-2xl shadow-xl transition-all hover:scale-105"
          >
            🙏 Begin the Journey
          </button>
          <a 
            href="#benefits" 
            className="px-10 py-4 border-2 border-amber-500 text-amber-600 font-bold text-xl rounded-2xl hover:bg-amber-50 transition-all"
          >
            See Benefits
          </a>
        </div>
      </div>
    </section>
  );
}
