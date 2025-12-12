"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const ritualSteps = [
  {
    number: 1,
    icon: "🕯️",
    action: "Light the candle",
    description: "The flame becomes your anchor point",
    whyTitle: "Why does this work?",
    whyContent: [
      "Creates visual anchor point",
      "Acts like a visual mantra",
      "Mind naturally slows down",
      "Body relaxes within seconds"
    ]
  },
  {
    number: 2,
    icon: "🪔",
    action: "Light the agarbatti",
    description: "The fragrance is your emotional trigger",
    whyTitle: "Why does this work?",
    whyContent: [
      "Connects directly with memory centers",
      "Reduces stress instantly",
      "Marks the transition to inner self",
      "Creates comfort through scent"
    ]
  },
  {
    number: 3,
    icon: "📿",
    action: "Read the mantra slowly",
    description: "Repeat it 3 times",
    whyTitle: "Why repetition matters",
    whyContent: [
      "Repetition = retention",
      "Brain encodes repeated sound deeper",
      "Mimics childhood learning patterns",
      "Creates cognitive imprinting"
    ]
  },
  {
    number: 4,
    icon: "💭",
    action: "Read the simple Hindi meaning",
    description: "Transform sound into personal relevance",
    whyTitle: "Why translation helps",
    whyContent: [
      "Makes spirituality accessible",
      "Instantly understand the message",
      "Feels relevant, not intimidating",
      "Mantra becomes personally meaningful"
    ]
  },
  {
    number: 5,
    icon: "🗣️",
    action: "Speak manifestation aloud",
    description: "Not in mind — out loud",
    whyTitle: "Why your voice matters",
    whyContent: [
      "Hearing your own voice builds self-belief",
      "Vibration shifts emotional state",
      "Body 'registers' the intention",
      "Rewires negative self-talk"
    ]
  },
  {
    number: 6,
    icon: "🕯️",
    action: "FLAME MEDITATION",
    description: "Heart of the Experience",
    whyTitle: "Why this closes the ritual",
    whyContent: [
      "Gently close eyes for 5 seconds",
      "Take one deep breath",
      "Say 'Thank you' softly",
      "Closes ritual with grounding"
    ],
    isSpecial: true
  }
];

export default function DailyRitualSteps() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white to-amber-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          rotate: { duration: 40, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity }
        }}
        className="absolute top-20 right-10 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-10"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            Daily Ritual
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Your 10-Minute Practice
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Progress line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-amber-300 via-orange-400 to-amber-600 hidden md:block"
          />

          {ritualSteps.map((step, index) => {
            const isExpanded = expandedIndex === index;
            const stepRef = useRef(null);
            const stepInView = useInView(stepRef, { once: true, margin: "-60px" });

            return (
              <motion.div
                key={index}
                ref={stepRef}
                initial={{ opacity: 0, y: 30 }}
                animate={stepInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative mb-8 last:mb-0"
              >
                {/* Step number badge */}
                <div className="hidden md:block absolute left-0 w-12 h-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={stepInView ? { scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                    className="relative w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg flex items-center justify-center text-white font-bold"
                  >
                    {step.number}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }}
                      className="absolute inset-0 rounded-full bg-amber-400 -z-10"
                    />
                  </motion.div>
                </div>

                {/* Step card */}
                <motion.div
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  whileHover={{ scale: 1.01, x: 5 }}
                  className={`ml-0 md:ml-20 cursor-pointer ${
                    step.isSpecial ? 'bg-gradient-to-br from-amber-50 to-orange-50' : 'bg-white'
                  } rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                    isExpanded 
                      ? 'border-amber-300' 
                      : 'border-amber-100/50 hover:border-amber-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Mobile number badge */}
                    <div className="md:hidden flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.4
                      }}
                      className="text-5xl flex-shrink-0"
                    >
                      {step.icon}
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <h3 className={`text-xl md:text-2xl font-semibold mb-2 ${
                        step.isSpecial ? 'text-amber-700' : 'text-gray-900'
                      }`}>
                        {step.action}
                      </h3>
                      <p className="text-gray-600 font-light mb-3">
                        {step.description}
                      </p>

                      {/* Expand button */}
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedIndex(isExpanded ? null : index);
                        }}
                        className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 font-medium"
                      >
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                        {step.whyTitle}
                      </motion.button>
                    </div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pt-6 border-t border-amber-200 ml-0 md:ml-16">
                          <div className="space-y-3">
                            {step.whyContent.map((point, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-3"
                              >
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
                                  <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                <span className="text-gray-700 leading-relaxed">{point}</span>
                              </motion.div>
                            ))}
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-6 text-sm text-amber-600 hover:text-amber-700 font-medium"
                          >
                            ✓ Got it
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
