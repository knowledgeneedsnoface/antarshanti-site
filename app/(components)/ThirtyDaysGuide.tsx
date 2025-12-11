"use client";
import { motion } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";

const weeklyThemes = [
  {
    week: "WEEK 1",
    title: "GROUNDING & CLARITY",
    theme: "Main ruk kar khud se milta hoon.",
    color: "from-amber-100 to-orange-50",
    borderColor: "border-amber-300/40",
    textColor: "text-amber-900",
    accentColor: "text-amber-600"
  },
  {
    week: "WEEK 2",
    title: "CONFIDENCE & INNER DRIVE",
    theme: "Main apni value pe khada hoon.",
    color: "from-orange-100 to-amber-50",
    borderColor: "border-orange-300/40",
    textColor: "text-orange-900",
    accentColor: "text-orange-600"
  },
  {
    week: "WEEK 3",
    title: "HEALING, LETTING GO, EMOTIONAL RELEASE",
    theme: "Jo mere liye nahi hai, main usey shanti se jaane deta hoon.",
    color: "from-amber-50 to-orange-50",
    borderColor: "border-amber-300/40",
    textColor: "text-amber-900",
    accentColor: "text-amber-700"
  },
  {
    week: "WEEK 4",
    title: "PURPOSE, POWER, SELF-BELIEF",
    theme: "Main waise hi kaafi hoon. Main ban raha/rahi hoon jo mujhe banna tha.",
    color: "from-orange-50 to-amber-100",
    borderColor: "border-orange-300/40",
    textColor: "text-orange-900",
    accentColor: "text-orange-700"
  }
];

const ritualSteps = [
  {
    icon: "🕯️",
    title: "Light the candle.",
    description: "The flame becomes your anchor point — like a visual mantra.",
    accent: "amber"
  },
  {
    icon: "🪔",
    title: "Light the agarbatti.",
    description: "The fragrance is the first emotional trigger.",
    accent: "orange"
  },
  {
    icon: "📿",
    title: "Read the mantra slowly.",
    subtitle: "Repeat it 3 times. Why?",
    points: [
      "Repetition = retention",
      "The brain encodes repeated sound deeper",
      "It mimics childhood learning"
    ],
    conclusion: "This step creates cognitive imprinting.",
    accent: "amber"
  },
  {
    icon: "💭",
    title: "Read the simple Hindi meaning on the card.",
    description: "This transforms the mantra from \"sound\" to personal relevance.",
    accent: "orange"
  },
  {
    icon: "🗣️",
    title: "Speak the manifestation line aloud.",
    subtitle: "Not in your mind — out loud. Why?",
    points: [
      "Hearing your own voice builds self-belief",
      "The vibration shifts emotional state",
      "The body \"registers\" the intention"
    ],
    accent: "amber"
  }
];

export default function ThirtyDaysGuide() {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-white via-amber-50/30 to-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(217, 119, 6) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6 px-6 py-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border border-amber-200/50"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-900 tracking-wide">YOUR SACRED PRACTICE</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-4 tracking-tight">
            30 Days Guide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            A gentle unfolding. A daily return to yourself.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT SIDE: 4-Week Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="relative">
              {/* Vertical connecting line */}
              <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-amber-200 via-amber-300 to-amber-200" />
              
              {weeklyThemes.map((week, index) => (
                <motion.div
                  key={week.week}
                  className="relative mb-8 last:mb-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-8 w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg border-4 border-white z-10" />
                  
                  {/* Card */}
                  <motion.div
                    className={`ml-16 bg-gradient-to-br ${week.color} backdrop-blur-sm rounded-2xl p-8 shadow-sm border ${week.borderColor} hover:shadow-md transition-all duration-300`}
                    whileHover={{ y: -4, scale: 1.01 }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-semibold tracking-wider ${week.accentColor}`}>
                          {week.week}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-amber-300/50 to-transparent" />
                      </div>
                      
                      <h3 className={`text-lg font-medium ${week.textColor} tracking-tight leading-tight`}>
                        {week.title}
                      </h3>
                      
                      <div className="pt-2">
                        <p className={`${week.accentColor} text-base italic font-light leading-relaxed`}>
                          "{week.theme}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE: Daily Ritual Steps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-amber-100/50">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-amber-100">
                <Flame className="w-6 h-6 text-amber-600" />
                <h3 className="text-2xl font-light text-gray-900">Daily Ritual</h3>
              </div>

              <div className="space-y-8">
                {ritualSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="group"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 * index }}
                    viewport={{ once: true }}
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-2xl">
                        {step.icon}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <h4 className="text-base font-medium text-gray-900 leading-snug">
                          {step.title}
                        </h4>
                        
                        {step.description && (
                          <p className="text-sm text-gray-600 leading-relaxed font-light">
                            {step.description}
                          </p>
                        )}
                        
                        {step.subtitle && (
                          <p className="text-sm text-gray-700 font-medium mt-3">
                            {step.subtitle}
                          </p>
                        )}
                        
                        {step.points && (
                          <ul className="space-y-1.5 mt-2">
                            {step.points.map((point, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="text-amber-500 mt-0.5">•</span>
                                <span className="font-light">{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        
                        {step.conclusion && (
                          <p className="text-sm text-amber-700 italic mt-2 font-light">
                            {step.conclusion}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Flame Meditation - Special Section */}
                <motion.div
                  className="mt-10 pt-8 border-t border-amber-100"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200/50">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">🕯️</span>
                      <h4 className="text-lg font-medium text-amber-900">
                        FLAME MEDITATION
                      </h4>
                    </div>
                    
                    <p className="text-sm text-amber-800 mb-4 italic">
                      Heart of the Experience
                    </p>
                    
                    <ul className="space-y-2.5">
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="text-amber-500 mt-0.5 flex-shrink-0">•</span>
                        <span className="font-light">Gently close your eyes for 5 seconds</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="text-amber-500 mt-0.5 flex-shrink-0">•</span>
                        <span className="font-light">Take one deep breath</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="text-amber-500 mt-0.5 flex-shrink-0">•</span>
                        <span className="font-light">Say "Thank you" softly</span>
                      </li>
                    </ul>
                    
                    <p className="text-sm text-amber-700 mt-4 font-light italic">
                      This closes the ritual with grounding.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom spacer for breathing room */}
        <div className="h-12" />
      </div>
    </section>
  );
}
