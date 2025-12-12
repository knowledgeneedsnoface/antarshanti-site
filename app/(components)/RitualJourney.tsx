"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const journeySteps = [
  {
    day: 1,
    icon: "✉️",
    affirmation: "I am worthy of this peace",
    title: "You open your first ritual envelope",
    description: "The paper is soft, the scent of sandalwood rises. You sit, breathe, and begin.",
  },
  {
    day: 5,
    icon: "🌅",
    affirmation: "Peace flows through me naturally",
    title: "You start feeling calmer",
    description: "The morning rush feels different. Your mind is clearer, your heart more open.",
  },
  {
    day: 12,
    icon: "🧠",
    affirmation: "I choose peace in every moment",
    title: "Your mind begins anticipating peace",
    description: "The ritual becomes a gentle friend. Your body knows what comes next.",
  },
  {
    day: 20,
    icon: "💫",
    affirmation: "Peace is my natural state",
    title: "You look forward to the ritual",
    description: "What began as discipline has become desire. Peace calls to you.",
  },
  {
    day: 30,
    icon: "🕉",
    affirmation: "I am peace embodied",
    title: "You complete the cycle of inner reset",
    description: "A new rhythm has been established. You carry peace within you always.",
  },
];

export default function RitualJourney() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-amber-50/30 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            Your 30-Day Ritual Journey
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            What begins as practice transforms into peace.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Animated progress line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute left-8 md:left-12 top-0 w-0.5 bg-gradient-to-b from-amber-300 via-orange-400 to-amber-600"
            style={{ zIndex: 0 }}
          />

          {journeySteps.map((step, index) => {
            const isExpanded = expandedIndex === index;
            const stepRef = useRef(null);
            const stepInView = useInView(stepRef, { once: true, margin: "-80px" });

            return (
              <motion.div
                key={index}
                ref={stepRef}
                initial={{ opacity: 0, x: -50 }}
                animate={stepInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative mb-12 last:mb-0"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={stepInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                  className="absolute left-6 md:left-10 w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg z-10"
                  style={{ top: "1.5rem" }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 rounded-full bg-amber-400"
                  />
                </motion.div>

                {/* Card */}
                <motion.div
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="ml-16 md:ml-24 cursor-pointer"
                >
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-amber-100/50 hover:border-amber-200">
                    <div className="flex items-start gap-4">
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="text-4xl"
                      >
                        {step.icon}
                      </motion.div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                            DAY {step.day}
                          </span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-2">
                          {step.affirmation}
                        </h3>

                        <p className="text-gray-600 font-light mb-3">
                          {step.title}
                        </p>

                        <AnimatePresence>
                          {isExpanded ? (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <p className="text-gray-700 leading-relaxed pt-3 border-t border-amber-100">
                                {step.description}
                              </p>
                              <button className="mt-4 text-sm text-amber-600 hover:text-amber-700 font-medium">
                                ✕ Close
                              </button>
                            </motion.div>
                          ) : (
                            <motion.button
                              whileHover={{ x: 5 }}
                              className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                            >
                              ↓ Expand to read more
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6 font-light">Ready to begin your journey?</p>
          <motion.a
            href="#product"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-4 text-white font-medium shadow-xl hover:shadow-2xl transition-all"
          >
            Start My Ritual Journey →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
