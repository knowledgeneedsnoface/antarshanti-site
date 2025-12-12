"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const weeks = [
  {
    week: 1,
    theme: "Grounding & Clarity",
    hindi: "Main ruk kar khud se milta hoon",
    translation: "I pause and meet myself",
    gradient: "from-amber-100 to-orange-100",
    focusPoints: [
      "Establishing daily ritual habit",
      "Creating sacred morning space",
      "Building awareness practice"
    ]
  },
  {
    week: 2,
    theme: "Confidence & Inner Drive",
    hindi: "Main apni value pe khada hoon",
    translation: "I stand on my own worth",
    gradient: "from-orange-100 to-amber-200",
    focusPoints: [
      "Strengthening self-belief",
      "Vocal affirmations",
      "Inner power recognition"
    ]
  },
  {
    week: 3,
    theme: "Healing & Letting Go",
    hindi: "Jo mere liye nahi hai, main usey shanti se jaane deta hoon",
    translation: "What's not for me, I release with peace",
    gradient: "from-blue-100 to-purple-100",
    focusPoints: [
      "Emotional release work",
      "Forgiveness practice",
      "Attachment letting go"
    ]
  },
  {
    week: 4,
    theme: "Purpose & Power",
    hindi: "Main waise hi kaafi hoon",
    translation: "I am enough as I am",
    gradient: "from-amber-200 to-orange-200",
    focusPoints: [
      "Self-acceptance deepening",
      "Purpose clarity",
      "Integration & embodiment"
    ]
  }
];

export default function ThirtyDaysGuide() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white to-amber-50/30 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mandala-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mandala-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-wider text-amber-600 font-medium mb-3">
            YOUR SACRED PRACTICE
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            30 Days Guide
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            A gentle unfolding. A daily return to yourself.
          </p>
        </motion.div>

        {/* Desktop: 4 column grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {weeks.map((week, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative h-[400px] perspective-1000"
              onMouseEnter={() => setFlippedCard(index)}
              onMouseLeave={() => setFlippedCard(null)}
            >
              <motion.div
                animate={{ 
                  rotateY: flippedCard === index ? 180 : 0 
                }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="relative w-full h-full preserve-3d"
              >
                {/* Front of card */}
                <div className={`absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br ${week.gradient} p-6 shadow-xl border-2 border-white/50`}>
                  <div className="flex flex-col h-full">
                    <div className="text-sm font-medium text-gray-600 mb-4">
                      WEEK {week.week}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 leading-tight">
                      {week.theme}
                    </h3>

                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-gray-700 italic text-center leading-relaxed">
                        "{week.hindi}"
                      </p>
                    </div>

                    <div className="text-sm text-gray-600 text-center mt-4">
                      Hover to explore →
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-br ${week.gradient} p-6 shadow-xl border-2 border-white/50`}>
                  <div className="flex flex-col h-full">
                    <div className="text-sm font-medium text-gray-600 mb-3">
                      WEEK {week.week}
                    </div>

                    <div className="mb-4 pb-4 border-b border-gray-300/50">
                      <p className="text-sm text-gray-700 italic mb-2">
                        "{week.hindi}"
                      </p>
                      <p className="text-xs text-gray-600">
                        {week.translation}
                      </p>
                    </div>

                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-800 mb-3">
                        Week Focus:
                      </h4>
                      <ul className="space-y-2">
                        {week.focusPoints.map((point, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="text-sm text-gray-700 flex items-start gap-2"
                          >
                            <span className="text-amber-600 mt-0.5">•</span>
                            <span>{point}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Swipeable cards */}
        <div className="md:hidden overflow-x-auto pb-6 -mx-6 px-6 scrollbar-hide">
          <div className="flex gap-4" style={{ width: "max-content" }}>
            {weeks.map((week, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => setFlippedCard(flippedCard === index ? null : index)}
                className="w-[280px] flex-shrink-0"
              >
                <motion.div
                  animate={{ 
                    rotateY: flippedCard === index ? 180 : 0 
                  }}
                  transition={{ duration: 0.6 }}
                  className="relative h-[380px] preserve-3d"
                >
                  {/* Front */}
                  <div className={`absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br ${week.gradient} p-6 shadow-xl border-2 border-white/50`}>
                    <div className="flex flex-col h-full">
                      <div className="text-sm font-medium text-gray-600 mb-4">
                        WEEK {week.week}
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">
                        {week.theme}
                      </h3>

                      <div className="flex-1 flex items-center justify-center">
                        <p className="text-gray-700 italic text-center leading-relaxed">
                          "{week.hindi}"
                        </p>
                      </div>

                      <div className="text-sm text-gray-600 text-center mt-4">
                        Tap to explore →
                      </div>
                    </div>
                  </div>

                  {/* Back */}
                  <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-br ${week.gradient} p-6 shadow-xl border-2 border-white/50`}>
                    <div className="flex flex-col h-full">
                      <div className="text-sm font-medium text-gray-600 mb-3">
                        WEEK {week.week}
                      </div>

                      <div className="mb-4 pb-4 border-b border-gray-300/50">
                        <p className="text-sm text-gray-700 italic mb-2">
                          "{week.hindi}"
                        </p>
                        <p className="text-xs text-gray-600">
                          {week.translation}
                        </p>
                      </div>

                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-800 mb-3">
                          Week Focus:
                        </h4>
                        <ul className="space-y-2">
                          {week.focusPoints.map((point, i) => (
                            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-amber-600">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
