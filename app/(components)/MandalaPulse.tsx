"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function MandalaPulse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to cover the entire viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawMandala = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Breathing effect (3 seconds in, 3 seconds out)
      const breathCycle = (time * 0.001) % 6;
      let breath = 0.3;

      if (breathCycle < 3) {
        // Inhale
        breath = 0.3 + (breathCycle / 3) * 0.7;
      } else {
        // Exhale
        breath = 1 - ((breathCycle - 3) / 3) * 0.7;
      }

      const baseRadius = Math.min(canvas.width, canvas.height) * 0.08 * breath;

      // Draw mandala with pulsing effect
      for (let ring = 0; ring < 6; ring++) {
        const ringRadius = baseRadius * (1 + ring * 0.3);
        const alpha = 0.05 + (ring * 0.02) * breath;

        ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
        ctx.lineWidth = 1 + ring * 0.5;
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Draw rotating petals
        const petalCount = 8 + ring * 2;
        const rotationSpeed = 0.0002 * (ring + 1);

        for (let petal = 0; petal < petalCount; petal++) {
          const angle = (petal / petalCount) * Math.PI * 2 + time * rotationSpeed;
          const petalX = centerX + Math.cos(angle) * ringRadius;
          const petalY = centerY + Math.sin(angle) * ringRadius;

          ctx.beginPath();
          ctx.arc(petalX, petalY, 2 + ring * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${alpha * 0.5})`;
          ctx.fill();
        }
      }

      // Draw central bindu (seed point)
      const binduRadius = baseRadius * 0.1 * breath;
      ctx.beginPath();
      ctx.arc(centerX, centerY, binduRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 158, 11, ${0.8 * breath})`;
      ctx.fill();

      // Draw central glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, binduRadius * 3);
      gradient.addColorStop(0, `rgba(245, 158, 11, ${0.3 * breath})`);
      gradient.addColorStop(1, "rgba(245, 158, 11, 0)");

      ctx.beginPath();
      ctx.arc(centerX, centerY, binduRadius * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    let animationId: number;
    const animate = () => {
      drawMandala(Date.now());
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
      style={{ mixBlendMode: "multiply" }}
    />
  );
}
