"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface AmbientSoundToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export default function AmbientSoundToggle({ enabled, onToggle }: AmbientSoundToggleProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Persistent audio context + chant loop
  const audioCtxRef = useRef<AudioContext | null>(null);
  const chantTimerRef = useRef<any>(null);

  // ---- REAL WORKING OM CHANT (inside click) ----
  const startOM = () => {
    // Create AudioContext ONLY inside user gesture
    const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
    const audioCtx = new AC();
    audioCtxRef.current = audioCtx;

    const playSingleOM = () => {
      const t = audioCtx.currentTime;

      // Master gain
      const master = audioCtx.createGain();
      master.gain.setValueAtTime(0, t);
      master.gain.linearRampToValueAtTime(0.3, t + 1.2);
      master.connect(audioCtx.destination);

      // --- "Ooooo" part ---
      const oscO = audioCtx.createOscillator();
      const gainO = audioCtx.createGain();
      oscO.type = "sine";
      oscO.frequency.setValueAtTime(136.1, t);

      gainO.gain.setValueAtTime(0, t);
      gainO.gain.linearRampToValueAtTime(0.3, t + 1.2);
      gainO.gain.linearRampToValueAtTime(0.1, t + 1.8);
      gainO.gain.linearRampToValueAtTime(0, t + 2.2);

      oscO.connect(gainO);
      gainO.connect(master);

      // --- "Mmmmm" part ---
      const oscM = audioCtx.createOscillator();
      const gainM = audioCtx.createGain();
      oscM.type = "triangle";
      oscM.frequency.setValueAtTime(136.1, t);

      gainM.gain.setValueAtTime(0, t + 1.6);
      gainM.gain.linearRampToValueAtTime(0.25, t + 2.2);
      gainM.gain.linearRampToValueAtTime(0, t + 3.5);

      oscM.connect(gainM);
      gainM.connect(master);

      // Start oscillators
      oscO.start(t);
      oscM.start(t);
      oscO.stop(t + 3.5);
      oscM.stop(t + 3.5);
    };

    // First chant — plays immediately
    playSingleOM();

    // Repeat every 3.6 sec
    chantTimerRef.current = setInterval(() => {
      playSingleOM();
    }, 3600);
  };

  const stopOM = () => {
    if (chantTimerRef.current) clearInterval(chantTimerRef.current);
    chantTimerRef.current = null;

    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch {}
    }
    audioCtxRef.current = null;
  };

  // CLICK HANDLER — STARTS AUDIO RELIABLY
  const handleClick = async () => {
    if (!enabled) {
      await startOM();   // MUST start from click
    } else {
      stopOM();
    }

    onToggle(); // update UI state
  };

  // ---------------- UI ----------------

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.button
        className={`w-14 h-14 rounded-full shadow-lg backdrop-blur-sm border border-purple-300/40 flex items-center justify-center transition-all duration-300 ${
          enabled ? "bg-purple-600/30" : "bg-white/20"
        }`}
        onClick={handleClick}  // 🔥 audio starts here
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {enabled ? "🕉️" : "🔇"}
      </motion.button>

      {isHovered && (
        <motion.div
          className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-black/80 text-white text-sm rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          OM Chanting
        </motion.div>
      )}
    </motion.div>
  );
}
