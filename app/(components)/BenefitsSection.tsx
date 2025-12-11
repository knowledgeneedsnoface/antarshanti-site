"use client";
import { motion } from "framer-motion";
import { Sparkles, Flame, Heart, Brain, Shield, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";

const benefits = [
  {
    number: "1",
    title: "Instant Calm the Moment You Open the Box",
    hook: "A grounding message greets you: "Zyada sochne se pehle… bas khud se shuru karna zaroori hai."",
    tagline: "It breaks the mental noise and shifts you into presence.",
    benefits: [
      "Stops overthinking",
      "Creates emotional stillness",
      "Helps you enter the ritual mindfully"
    ],
    icon: Sparkles,
    gradient: "from-amber-400 to-orange-500"
  },
  {
    number: "2",
    title: "A Candle That Becomes Your Focus Point",
    hook: "Lighting the candle on its bamboo stand creates a sacred pause.",
    benefits: [
      "Mind naturally slows down",
      "Body relaxes within seconds",
      "Flame acts like a visual mantra"
    ],
    icon: Flame,
    gradient: "from-orange-400 to-amber-500"
  },
  {
    number: "3",
    title: "Fragrance That Softens Your Inner World",
    hook: "Agarbatti connects directly with memory and emotional centers.",
    benefits: [
      "Reduces stress instantly",
      "Brings comfort and nostalgia",
      "Marks the transition from "outside world" to "inner self""
    ],
    icon: Leaf,
    gradient: "from-amber-500 to-orange-400"
  },
  {
    number: "4",
    title: "A Daily Mantra That Clears Your Mind",
    hook: "Repeating the mantra 3 times isn't tradition — it's neuroscience.",
    benefits: [
      "Better focus and attention",
      "Stronger mental clarity",
      "A calm, centered start to your day"
    ],
    icon: Brain,
    gradient: "from-orange-500 to-amber-400"
  },
  {
    number: "5",
    title: "Simple Meanings That Make Spirituality Accessible",
    hook: "No heavy shlokas. No complex language.",
    benefits: [
      "You instantly understand the message",
      "It feels relevant, not intimidating",
      "The mantra becomes personally meaningful"
    ],
    icon: Heart,
    gradient: "from-amber-400 to-orange-500"
  },
  {
    number: "6",
    title: "Speaking Your Manifestation Builds Inner Strength",
    hook: "Your voice becomes your intention.",
    benefits: [
      "Boosts confidence",
      "Rewires negative self-talk",
      "Sets the emotional tone for your entire day"
    ],
    icon: Shield,
    gradient: "from-orange-400 to-amber-500"
  },
  {
    number: "7",
    title: "Flame Meditation That Anyone Can Do",
    hook: "2–3 minutes of simply watching the flame.",
    benefits: [
      "Slows thoughts naturally",
      "Reduces anxiety",
      "Creates effortless mindfulness (even for beginners)"
    ],
    special: "Most users say: "This part becomes addictive."",
    icon: Flame,
    gradient: "from-amber-500 to-orange-400"
  },
  {
    number: "8",
    title: "A Gentle Closing That Anchors Gratitude",
    hook: "One deep breath. One soft "thank you." Ritual complete.",
    benefits: [
      "Ends your practice with peace",
      "Builds emotional resilience",
      "Leaves you grounded for the rest of the day"
    ],
    icon: Heart,
    gradient: "from-orange-500 to-amber-400"
  }
];

export default function BenefitsSection() {
  const router = useRouter();

  const scrollToProduct = () => {
    const productSection = document.getElementById("product-reveal");
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-white via-orange-50/20 to-white">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-50/40 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20 max-w-4xl mx-auto"
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
            <span className="text-sm font-medium text-amber-900 tracking-wide">DAILY TRANSFORMATION</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight leading-tight">
            Why 10 Minutes Can Change<br />Your Entire Day
          </h2>
          
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            A simple daily ritual that brings you back to yourself.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.number}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative h-full bg-white rounded-3xl p-8 shadow-sm border border-amber-100/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Number Badge */}
                <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br ${benefit.gradient} shadow-lg flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{benefit.number}</span>
                </div>

                {/* Icon */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-md`}>
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-medium text-gray-900 leading-tight mb-3">
                      {benefit.title}
                    </h3>
                  </div>
                </div>

                {/* Hook */}
                <p className="text-base text-gray-700 mb-4 leading-relaxed font-light">
                  {benefit.hook}
                </p>

                {/* Tagline (if exists) */}
                {benefit.tagline && (
                  <p className="text-sm text-amber-700 italic mb-4 font-light">
                    {benefit.tagline}
                  </p>
                )}

                {/* Benefits List */}
                <div className="space-y-2 mb-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">Benefits:</p>
                  <ul className="space-y-2">
                    {benefit.benefits.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1 flex-shrink-0">•</span>
                        <span className="text-sm text-gray-600 font-light leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Special Note (if exists) */}
                {benefit.special && (
                  <div className="mt-4 pt-4 border-t border-amber-100">
                    <p className="text-sm text-amber-800 italic font-light">
                      {benefit.special}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 rounded-3xl p-12 md:p-16 shadow-xl border border-amber-200/50 overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-200/30 via-transparent to-transparent" />
            
            <div className="relative text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Leaf className="w-6 h-6 text-amber-600" />
              </div>

              <h3 className="text-3xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
                Ready to Begin Your<br />10-Minute Reset?
              </h3>
              
              <p className="text-lg text-gray-700 mb-8 font-light leading-relaxed">
                Give yourself the pause your mind has been asking for.
              </p>

              <motion.button
                onClick={scrollToProduct}
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Get Your 30-Day Ritual Kit Now</span>
                <span className="text-xl">→</span>
              </motion.button>

              <p className="text-sm text-gray-600 mt-6 italic font-light">
                *Because before the world takes your time, you deserve these 10 minutes for yourself.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
