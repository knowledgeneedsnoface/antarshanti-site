"use client";
import { useEffect, useRef, useState } from "react";

export default function AudioManager() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const tanpuraSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const bellBufferRef = useRef<AudioBuffer | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Web Audio API
  useEffect(() => {
    const initAudio = async () => {
      try {
        // Create audio context
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContextClass();

        // Create master gain node
        masterGainRef.current = audioContextRef.current.createGain();
        masterGainRef.current.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
        masterGainRef.current.connect(audioContextRef.current.destination);

        // Generate tanpura drone (synthetic)
        await generateTanpuraDrone();

        // Load bell sound
        await loadBellSound();

        setIsInitialized(true);
      } catch (error) {
        console.warn("Web Audio API not supported or failed to initialize:", error);
      }
    };

    // Initialize on first user interaction
    const handleFirstInteraction = () => {
      if (!isInitialized) {
        initAudio();
      }
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      // Cleanup
      if (tanpuraSourceRef.current) {
        tanpuraSourceRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isInitialized]);

  // Generate synthetic tanpura drone
  const generateTanpuraDrone = async () => {
    if (!audioContextRef.current || !masterGainRef.current) return;

    const ctx = audioContextRef.current;
    const sampleRate = ctx.sampleRate;
    const duration = 4; // 4 seconds loop
    const frameCount = sampleRate * duration;

    // Create buffer for tanpura-like drone
    const buffer = ctx.createBuffer(2, frameCount, sampleRate);

    // Generate tanpura-like sound (combination of fundamental and overtones)
    const fundamentalFreq = 82.41; // Low E (similar to tanpura)
    const overtones = [1, 2, 3, 4, 5, 6]; // Harmonic series
    const amplitudes = [1, 0.5, 0.3, 0.2, 0.1, 0.05];

    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      const channelData = buffer.getChannelData(channel);

      for (let i = 0; i < frameCount; i++) {
        let sample = 0;

        overtones.forEach((harmonic, index) => {
          const frequency = fundamentalFreq * harmonic;
          const amplitude = amplitudes[index];

          // Add some vibrato (pitch modulation)
          const vibrato = 1 + Math.sin(i * 0.01) * 0.002;

          // Generate sine wave with slight envelope
          const envelope = Math.min(i / 1000, 1) * Math.min((frameCount - i) / 1000, 1);
          sample += Math.sin((i / sampleRate) * frequency * 2 * Math.PI * vibrato) * amplitude * envelope;
        });

        // Add some subtle noise for texture
        sample += (Math.random() - 0.5) * 0.01;

        channelData[i] = sample * 0.1; // Lower volume
      }
    }

    // Create source and play
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Add some reverb-like effect
    const convolver = ctx.createConvolver();
    const reverbBuffer = ctx.createBuffer(2, sampleRate * 2, sampleRate);

    // Simple reverb impulse
    for (let channel = 0; channel < reverbBuffer.numberOfChannels; channel++) {
      const channelData = reverbBuffer.getChannelData(channel);
      for (let i = 0; i < reverbBuffer.length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / reverbBuffer.length, 2) * 0.1;
      }
    }

    convolver.buffer = reverbBuffer;

    // Connect: source -> convolver -> gain -> destination
    source.connect(convolver);
    convolver.connect(masterGainRef.current);

    tanpuraSourceRef.current = source;
    source.start();
  };

  // Load bell sound (synthetic for now)
  const loadBellSound = async () => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const sampleRate = ctx.sampleRate;
    const duration = 2; // 2 seconds
    const frameCount = sampleRate * duration;

    const buffer = ctx.createBuffer(2, frameCount, sampleRate);

    // Generate temple bell-like sound
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      const channelData = buffer.getChannelData(channel);

      for (let i = 0; i < frameCount; i++) {
        const t = i / sampleRate;

        // Multiple harmonics for bell-like sound
        let sample = 0;
        const harmonics = [1, 2, 2.5, 3, 4, 5];
        const decays = [1, 0.8, 0.6, 0.4, 0.2, 0.1];

        harmonics.forEach((harmonic, index) => {
          const frequency = 800 * harmonic; // Base frequency around 800Hz
          const decay = decays[index];

          // Envelope with quick attack and slow decay
          const envelope = Math.exp(-t * decay);

          sample += Math.sin(t * frequency * 2 * Math.PI) * envelope;
        });

        channelData[i] = sample * 0.05; // Lower volume
      }
    }

    bellBufferRef.current = buffer;
  };

  // Play bell sound
  const playBell = () => {
    if (!audioContextRef.current || !bellBufferRef.current || !masterGainRef.current) return;

    const ctx = audioContextRef.current;
    const source = ctx.createBufferSource();
    source.buffer = bellBufferRef.current;

    // Add some randomness to pitch
    source.playbackRate.setValueAtTime(0.95 + Math.random() * 0.1, ctx.currentTime);

    source.connect(masterGainRef.current);
    source.start();
  };

  // Play chime sound
  const playChime = () => {
    if (!audioContextRef.current || !masterGainRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Soft chime sound
    oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    oscillator.frequency.exponentialRampToValueAtTime(261.63, ctx.currentTime + 0.5); // C4

    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    oscillator.connect(gainNode);
    gainNode.connect(masterGainRef.current);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.5);
  };

  // Expose audio functions globally for use by other components
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).audioManager = {
        playBell,
        playChime
      };
    }
  }, [isInitialized]);

  return null; // This component doesn't render anything
}
