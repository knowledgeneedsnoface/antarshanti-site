"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface AmbientSoundToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export default function AmbientSoundToggle({ enabled, onToggle }: AmbientSoundToggleProps) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Create simple ambient sound using Web Audio API
    let audioContext: AudioContext | null = null;
    let oscillator: OscillatorNode | null = null;
    let gainNode: GainNode | null = null;

    const startAmbientSound = async () => {
      try {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        oscillator = audioContext.createOscillator();
        gainNode = audioContext.createGain();

        // Create a gentle ambient drone
        oscillator.frequency.setValueAtTime(136.1, audioContext.currentTime); // Low C#
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0.02, audioContext.currentTime); // Very quiet

        // Add subtle vibrato
        const vibrato = audioContext.createOscillator();
        const vibratoGain = audioContext.createGain();

        vibrato.frequency.setValueAtTime(0.5, audioContext.currentTime);
        vibratoGain.gain.setValueAtTime(2, audioContext.currentTime);

        vibrato.connect(vibratoGain);
        vibratoGain.connect(oscillator.frequency);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        vibrato.start();

      } catch (error) {
        console.log("Web Audio not supported");
      }
    };

    const stopAmbientSound = () => {
      if (oscillator) {
        oscillator.stop();
        oscillator = null;
      }
      if (audioContext) {
        audioContext.close();
        audioContext = null;
      }
    };

    if (enabled) {
      startAmbientSound();
    } else {
      stopAmbientSound();
    }

    return () => {
      stopAmbientSound();
    };
  }, [enabled]);

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
    >
      <motion.button
        className={`w-14 h-14 rounded-full shadow-lg backdrop-blur-sm border border-amber-200/50 flex items-center justify-center transition-all duration-300 ${
          enabled ? "bg-amber-500/20" : "bg-white/20"
        }`}
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{
            rotate: enabled ? 360 : 0,
            scale: enabled ? [1, 1.2, 1] : 1,
          }}
          transition={{
            rotate: { duration: 2, repeat: enabled ? Infinity : 0, ease: "linear" },
            scale: { duration: 1, repeat: enabled ? Infinity : 0 },
          }}
        >
          {enabled ? "🎵" : "🔇"}
        </motion.div>
      </motion.button>

      {/* Tooltip */}
      <motion.div
        className={`absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-900/90 text-white text-sm rounded-lg whitespace-nowrap backdrop-blur-sm ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
        }}
        transition={{ duration: 0.2 }}
      >
        {enabled ? "Ambient meditation sounds" : "Play soothing ambience"}
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90"></div>
      </motion.div>

      {/* Sound waves animation */}
      {enabled && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-amber-400/30 rounded-full"
              style={{
                width: 60 + i * 20,
                height: 60 + i * 20,
                left: "50%",
                top: "50%",
                marginLeft: -(30 + i * 10),
                marginTop: -(30 + i * 10),
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
