"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    avatar: "👩‍💼",
    name: "Priya",
    role: "Marketing Manager",
    age: 32,
    rating: 5,
    quote: "I stopped doomscrolling every morning. Instead, I sit with my diya and breathe. My anxiety has decreased noticeably.",
  },
  {
    avatar: "👨‍💻",
    name: "Arjun",
    role: "Software Engineer",
    age: 28,
    rating: 5,
    quote: "First ritual that actually calmed me down. I was skeptical at first, but now I look forward to my 10 minutes of peace.",
  },
  {
    avatar: "👩‍🏫",
    name: "Meera",
    role: "Teacher",
    age: 55,
    rating: 5,
    quote: "Feels like a return to myself. In our busy world, this ritual reminds me who I am beneath all the noise.",
  },
];

export default function VoicesOfPeace() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevious = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-amber-50/30 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-20 w-72 h-72 bg-amber-300 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-orange-300 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            Voices of Peace
          </h2>
          <p className="text-lg text-gray-600 font-light">
            Real people, real transformation.
          </p>
        </motion.div>

        {/* Desktop: 3 cards visible */}
        <div className="hidden md:block max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const itemRef = useRef(null);
              const itemInView = useInView(itemRef, { once: true, margin: "-50px" });

              return (
                <motion.div
                  key={index}
                  ref={itemRef}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={itemInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-amber-100/50 hover:border-amber-200 h-full flex flex-col">
                    {/* Avatar */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                      className="text-6xl mb-6"
                    >
                      {testimonial.avatar}
                    </motion.div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={itemInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: index * 0.2 + i * 0.05 }}
                          className="text-amber-400 text-xl"
                        >
                          ⭐
                        </motion.span>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-gray-700 leading-relaxed mb-6 flex-1 italic">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="border-t border-amber-100 pt-4">
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}, {testimonial.age}
                      </p>
                      <p className="text-sm text-gray-600 font-light">
                        {testimonial.role}
                      </p>
                    </div>

                    {/* Hover line */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      className="h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mt-4"
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden relative">
          <div className="max-w-md mx-auto relative h-[450px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0"
              >
                <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-amber-200 h-full flex flex-col">
                  {/* Avatar */}
                  <div className="text-6xl mb-6 text-center">
                    {testimonials[activeIndex].avatar}
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4 justify-center">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-xl">
                        ⭐
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-700 leading-relaxed mb-6 flex-1 italic text-center">
                    "{testimonials[activeIndex].quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="border-t border-amber-100 pt-4 text-center">
                    <p className="font-semibold text-gray-900">
                      {testimonials[activeIndex].name}, {testimonials[activeIndex].age}
                    </p>
                    <p className="text-sm text-gray-600 font-light">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={handlePrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-white shadow-lg border-2 border-amber-200 flex items-center justify-center text-amber-600 hover:bg-amber-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'w-8 bg-gradient-to-r from-amber-400 to-orange-500' 
                      : 'bg-amber-200'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-white shadow-lg border-2 border-amber-200 flex items-center justify-center text-amber-600 hover:bg-amber-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-amber-100"
          >
            <span className="text-2xl">🛡️</span>
            <span className="text-sm font-medium text-gray-700">7-Day Peace Guarantee</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-amber-100"
          >
            <span className="text-2xl">🚚</span>
            <span className="text-sm font-medium text-gray-700">Free Delivery</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-amber-100"
          >
            <span className="text-2xl">💳</span>
            <span className="text-sm font-medium text-gray-700">COD Available</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
