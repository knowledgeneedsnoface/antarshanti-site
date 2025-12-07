"use client";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: "woman-30s",
    name: "Priya, 32",
    role: "Marketing Manager",
    quote: "I stopped doomscrolling every morning. Instead, I sit with my diya and breathe. My anxiety has decreased noticeably.",
    image: "👩‍💼",
    rating: 5,
    highlight: "stopped doomscrolling"
  },
  {
    id: "man-20s",
    name: "Arjun, 28",
    role: "Software Engineer",
    quote: "First ritual that actually calmed me down. I was skeptical at first, but now I look forward to my 10 minutes of peace.",
    image: "👨‍💻",
    rating: 5,
    highlight: "actually calmed me"
  },
  {
    id: "woman-50s",
    name: "Meera, 55",
    role: "Teacher",
    quote: "Feels like a return to myself. In our busy world, this ritual reminds me who I am beneath all the noise.",
    image: "👩‍🏫",
    rating: 5,
    highlight: "return to myself"
  }
];

export default function VoicesOfPeace() {
  return (
    <section
      id="voices-of-peace"
      className="py-32 px-6 bg-gradient-to-b from-amber-50/20 to-white"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-light text-amber-900 mb-6">
            Voices of Peace
          </h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto leading-relaxed">
            Real people, real transformation. These are their stories of finding peace.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-amber-100/50 hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                viewport: { once: true }
              }}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              {/* Avatar and rating */}
              <div className="flex items-center justify-between mb-6">
                <motion.div
                  className="text-4xl"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {testimonial.image}
                </motion.div>

                <div className="flex">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-amber-400 text-lg"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-lg text-gray-800 leading-relaxed mb-6 italic">
                "{testimonial.quote.split(testimonial.highlight).map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="font-semibold text-amber-700 not-italic">
                        {testimonial.highlight}
                      </span>
                    )}
                  </span>
                ))}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-amber-200 pt-4">
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-amber-600">{testimonial.role}</div>
              </div>

              {/* Energy particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-300 rounded-full"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: `${10 + Math.random() * 80}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center items-center gap-8 text-amber-600 mb-8">
            <motion.div
              className="flex items-center gap-2"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <span className="text-2xl">🛡️</span>
              <span className="text-sm font-medium">7-Day Peace Guarantee</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-2"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                delay: 0.5,
                repeat: Infinity,
              }}
            >
              <span className="text-2xl">🚚</span>
              <span className="text-sm font-medium">Free Delivery</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-2"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                delay: 1,
                repeat: Infinity,
              }}
            >
              <span className="text-2xl">💳</span>
              <span className="text-sm font-medium">COD Available</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
