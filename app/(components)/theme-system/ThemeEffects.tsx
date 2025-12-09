"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ThemeDefinition } from './themeDefinitions';

interface ThemeEffectsProps {
  theme: ThemeDefinition;
}

function MistEffect({ config }: { config: any }) {
  return (
    <>
      {Array.from({ length: config.layers }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at ${30 + i * 20}% ${40 + i * 15}%, rgba(255, 255, 255, ${config.opacity}) 0%, transparent 60%)`,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

function BeamsEffect({ config }: { config: any }) {
  return (
    <>
      {Array.from({ length: config.count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            width: `${config.width}px`,
            height: '100%',
            left: `${20 + i * 30}%`,
            top: 0,
            background: `linear-gradient(${config.angle}deg, transparent 0%, rgba(255, 255, 255, ${config.opacity}) 50%, transparent 100%)`,
            transform: `rotate(${config.angle}deg)`,
            transformOrigin: 'top center',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            delay: i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

function StarsEffect({ config }: { config: any }) {
  const [shootingStar, setShootingStar] = React.useState<{ x: number; y: number; show: boolean }>({
    x: 0,
    y: 0,
    show: false,
  });

  React.useEffect(() => {
    if (!config.shootingStars) return;

    const interval = setInterval(() => {
      setShootingStar({
        x: Math.random() * 100,
        y: Math.random() * 50,
        show: true,
      });
      setTimeout(() => setShootingStar(prev => ({ ...prev, show: false })), 2000);
    }, config.frequency);

    return () => clearInterval(interval);
  }, [config]);

  return (
    <>
      {shootingStar.show && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: `${shootingStar.x}%`,
            top: `${shootingStar.y}%`,
            width: '2px',
            height: '2px',
            background: 'white',
            boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)',
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: 200, y: 200, opacity: 0, scale: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      )}
    </>
  );
}

function CloudsEffect({ config }: { config: any }) {
  return (
    <>
      {Array.from({ length: config.count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            width: `${200 + i * 50}px`,
            height: '80px',
            top: `${10 + i * 15}%`,
            left: '-20%',
            background: `radial-gradient(ellipse at center, rgba(255, 255, 255, ${config.opacity}) 0%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
          animate={{
            x: ['0%', '120%'],
          }}
          transition={{
            duration: 40 + i * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </>
  );
}

function FlareEffect({ config }: { config: any }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: `${config.size}px`,
        height: `${config.size}px`,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, rgba(255, 255, 255, ${config.opacity}) 0%, transparent 70%)`,
        filter: 'blur(40px)',
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: config.pulseSpeed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function ThemeEffects({ theme }: ThemeEffectsProps) {
  if (!theme.effects) return null;

  const { type, config } = theme.effects;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {type === 'mist' && <MistEffect config={config} />}
      {type === 'beams' && <BeamsEffect config={config} />}
      {type === 'stars' && <StarsEffect config={config} />}
      {type === 'clouds' && <CloudsEffect config={config} />}
      {type === 'flare' && <FlareEffect config={config} />}
    </div>
  );
}
