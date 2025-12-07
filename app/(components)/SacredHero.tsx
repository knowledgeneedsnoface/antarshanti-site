"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function SacredHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Mandala drawing function
    const drawMandala = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.15;

      // Breathing effect
      const breath = Math.sin(time * 0.002) * 0.1 + 0.9;
      const radius = baseRadius * breath;

      // Draw mandala rings
      for (let ring = 0; ring < 8; ring++) {
        const ringRadius = radius * (1 - ring * 0.1);
        const alpha = 0.1 + (ring * 0.05);

        ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Add subtle rotation
        const rotation = time * 0.0005 * (ring + 1);
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);

        // Draw petals
        for (let petal = 0; petal < 12; petal++) {
          const angle = (petal / 12) * Math.PI * 2;
          const petalX = Math.cos(angle) * ringRadius;
          const petalY = Math.sin(angle) * ringRadius;

          ctx.beginPath();
          ctx.arc(petalX, petalY, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${alpha * 0.5})`;
          ctx.fill();
        }

        ctx.restore();
      }
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      drawMandala(Date.now());
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Saffron gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50/30 to-amber-100/20" />

      {/* Animated mandala canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-30"
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-300 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
            }}
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}
      </div>

      {/* Diya flame animation */}
      <motion.div
        className="absolute"
        style={{
          left: "50%",
          top: "60%",
          transform: "translateX(-50%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          {/* Flame */}
          <motion.div
            className="w-2 h-8 bg-gradient-to-t from-amber-400 to-orange-300 rounded-t-full"
            animate={{
              height: [32, 40, 32],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Wick */}
          <div className="w-0.5 h-2 bg-amber-900 mx-auto" />
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-light text-amber-900 mb-6 leading-tight"
            style={{
              fontFamily: "'Times New Roman', serif",
              letterSpacing: "0.02em",
            }}
            animate={{
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            10 Minutes of Puja.
            <br />
            <span className="text-amber-700">A Whole Day of Inner Peace.</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-amber-800/80 mb-12 font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
          >
            Your daily self-therapy ritual, delivered to your door.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <motion.button
              className="px-12 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById("healing-promise")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              🟠 Start My Healing
            </motion.button>

            <motion.button
              className="px-12 py-4 border-2 border-amber-400 text-amber-700 font-medium rounded-full text-lg bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById("ritual-journey")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              ⚪ How It Works
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-amber-400 rounded-full mt-2"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
