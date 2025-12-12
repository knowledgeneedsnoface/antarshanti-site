"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const benefits = [
  {
    number: 1,
    title: "Instant Calm the Moment You Open the Box",
    shortDesc: "A grounding message breaks mental noise",
    fullDesc: "A grounding message greets you: \"Zyada sochne se pehle… bas khud se shuru karna zaroori hai.\" It breaks mental noise and shifts you into presence.",
    benefits: [
      "Stops overthinking",
      "Creates emotional stillness",
      "Helps you enter ritual mindfully"
    ]
  },
  {
    number: 2,
    title: "A Candle That Becomes Your Focus Point",
    shortDesc: "Creates a sacred pause instantly",
    fullDesc: "Lighting the candle on its bamboo stand creates a sacred pause.",
    benefits: [
      "Mind naturally slows down",
      "Body relaxes within seconds",
      "Flame acts like a visual mantra"
    ]
  },
  {
    number: 3,
    title: "Fragrance That Softens Your Inner World",
    shortDesc: "Directly connects with emotional centers",
    fullDesc: "Agarbatti connects directly with memory and emotional centers.",
    benefits: [
      "Reduces stress instantly",
      "Brings comfort and nostalgia",
      "Marks transition from outside world to inner self"
    ]
  },
  {
    number: 4,
    title: "A Daily Mantra That Clears Your Mind",
    shortDesc: "Repetition is neuroscience, not tradition",
    fullDesc: "Repeating the mantra 3 times isn't tradition — it's neuroscience.",
    benefits: [
      "Better focus and attention",
      "Stronger mental clarity",
      "A calm, centered start to your day"
    ]
  },
  {
    number: 5,
    title: "Simple Meanings That Make Spirituality Accessible",
    shortDesc: "No heavy shlokas. No complex language.",
    fullDesc: "No heavy shlokas. No complex language.",
    benefits: [
      "You instantly understand the message",
      "It feels relevant, not intimidating",
      "The mantra becomes personally meaningful"
    ]
  },
  {
    number: 6,
    title: "Speaking Your Manifestation Builds Inner Strength",
    shortDesc: "Your voice becomes your intention",
    fullDesc: "Your voice becomes your intention.",
    benefits: [
      "Boosts confidence",
      "Rewires negative self-talk",
      "Sets emotional tone for your entire day"
    ]
  },
  {
    number: 7,
    title: "Flame Meditation That Anyone Can Do",
    shortDesc: "2–3 minutes of simply watching the flame",
    fullDesc: "2–3 minutes of simply watching the flame.",
    benefits: [
      "Slows thoughts naturally",
      "Reduces anxiety",
      "Creates effortless mindfulness (even for beginners)"
    ],
    highlight: "Most users say: 'This part becomes addictive.'"
  },
  {
    number: 8,
    title: "A Gentle Closing That Anchors Gratitude",
    shortDesc: "One deep breath. One soft 'thank you.'",
    fullDesc: "One deep breath. One soft 'thank you.' Ritual complete.",
    benefits: [
      "Ends practice with peace",
      "Builds emotional resilience",
      "Leaves you grounded for the rest of the day"
    ]
  }
];

export default function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="benefits" ref={ref} className="py-24 bg-gradient-to-b from-amber-50/30 to-white relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-20 w-96 h-96 bg-amber-300 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-wider text-amber-600 font-medium mb-3">
            DAILY TRANSFORMATION
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            Why 10 Minutes Can Change Your Entire Day
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            A simple ritual that brings you back to yourself.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {benefits.map((benefit, index) => {
            const isExpanded = expandedIndex === index;
            const itemRef = useRef(null);
            const itemInView = useInView(itemRef, { once: true, margin: "-50px" });

            return (
              <motion.div
                key={index}
                ref={itemRef}
                initial={{ opacity: 0, y: 30 }}
                animate={itemInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <motion.div
                  onClick={() => handleToggle(index)}
                  whileHover={{ scale: 1.01 }}
                  className={`cursor-pointer bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ${
                    isExpanded 
                      ? 'border-amber-300 shadow-2xl' 
                      : 'border-amber-100/50 hover:border-amber-200 hover:shadow-xl'
                  }`}
                >
                  {/* Header */}
                  <div className="p-6 md:p-8 flex items-start gap-4">
                    {/* Number badge */}
                    <motion.div
                      animate={{ 
                        scale: isExpanded ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-lg"
                    >
                      {benefit.number}
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 font-light">
                        {benefit.shortDesc}
                      </p>
                    </div>

                    {/* Expand icon */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-6 h-6 text-amber-600" />
                    </motion.div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 border-t border-amber-100">
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <p className="text-gray-700 leading-relaxed mb-4 italic">
                              {benefit.fullDesc}
                            </p>

                            <div className="space-y-3">
                              <p className="text-sm font-semibold text-gray-800">
                                Benefits:
                              </p>
                              {benefit.benefits.map((item, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.2 + i * 0.05 }}
                                  className="flex items-start gap-3"
                                >
                                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
                                    <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </span>
                                  <span className="text-gray-700">{item}</span>
                                </motion.div>
                              ))}
                            </div>

                            {benefit.highlight && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200"
                              >
                                <p className="text-gray-700 italic text-center">
                                  "{benefit.highlight}"
                                </p>
                              </motion.div>
                            )}

                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="mt-6 text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                            >
                              ✓ Got it
                            </motion.button>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6 font-light">
            Ready to Begin Your 10-Minute Reset?
          </p>
          <motion.a
            href="#product"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-4 text-white font-medium shadow-xl hover:shadow-2xl transition-all"
          >
            Get Your 30-Day Ritual Kit Now →
          </motion.a>
          <p className="text-sm text-gray-500 mt-4 italic">
            *Because before the world takes your time, you deserve these 10 minutes for yourself.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
