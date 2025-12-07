"use client";
import React, { Suspense, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

// Interactive shrine component
function Shrine({
  position,
  title,
  color,
  onClick,
}: {
  position: [number, number, number];
  title: string;
  color: string;
  onClick: () => void;
}) {
  const groupRef = React.useRef<THREE.Group | null>(null);
  const mainMeshRef = React.useRef<THREE.Mesh | null>(null);
  const glowRef = React.useRef<THREE.Mesh | null>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.1;
    }

    if (mainMeshRef.current) {
      // Slight rotation
      mainMeshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      // Hover scale effect
      const targetScale = isHovered ? 1.1 : 1;
      mainMeshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }

    if (glowRef.current) {
      // Pulsing glow effect
      const glowIntensity = isHovered ? 0.8 : 0.3;
      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = glowIntensity + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.8, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>

      {/* Base pedestal */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.8, 1, 1, 16]} />
        <meshStandardMaterial color="#654321" roughness={0.8} />
      </mesh>

      {/* Main shrine */}
      <mesh
        ref={mainMeshRef}
        onClick={onClick}
        onPointerOver={() => {
          setIsHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setIsHovered(false);
          document.body.style.cursor = "";
        }}
        castShadow
      >
        <boxGeometry args={[1.5, 2, 0.8]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Decorative brass elements */}
      <mesh position={[-0.4, 0.8, 0.45]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
        <meshStandardMaterial color="#B8860B" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh position={[0.4, 0.8, 0.45]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
        <meshStandardMaterial color="#B8860B" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Top ornament */}
      <mesh position={[0, 1.2, 0.45]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Sacred geometry on front */}
      <mesh position={[0, 0, 0.41]}>
        <circleGeometry args={[0.3, 8]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.8} />
      </mesh>

      {/* Title label */}
      <Html position={[0, -1.5, 0]} center>
        <div
          style={{
            background: isHovered
              ? `linear-gradient(135deg, ${color}ee, #fbbf24ee)`
              : "rgba(255, 255, 255, 0.9)",
            padding: "8px 16px",
            borderRadius: "20px",
            boxShadow: isHovered ? `0 8px 20px ${color}88` : "0 4px 12px rgba(0,0,0,0.2)",
            fontSize: "14px",
            fontWeight: "bold",
            color: isHovered ? "#ffffff" : "#92400E",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            transition: "all 0.3s ease",
          }}
        >
          {isHovered ? "✨ " : ""}
          {title}
          {isHovered ? " ✨" : ""}
        </div>
      </Html>
    </group>
  );
}

// Camera controller for horizontal panning
function CameraController() {
  const { camera } = useThree();

  React.useEffect(() => {
    let mouseX = 0;
    let targetRotation = 0;
    let currentRotation = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      // Constrain to -45° to +45° (in radians)
      mouseX = THREE.MathUtils.clamp(x, -0.785, 0.785);
    };

    const animate = () => {
      // Smooth interpolation to target rotation
      targetRotation = mouseX * 0.8; // Slightly dampened
      currentRotation += (targetRotation - currentRotation) * 0.05;

      // Apply rotation to camera
      camera.rotation.y = currentRotation;

      // Add subtle idle sway
      const time = Date.now() * 0.0005;
      camera.rotation.y += Math.sin(time) * 0.02;

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [camera]);

  return null;
}

// Particle system for incense smoke
function IncenseParticles() {
  const particlesRef = React.useRef<THREE.Points | null>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;

      const positions = (particlesRef.current.geometry.attributes.position.array as unknown) as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        // Rise upward slowly
        positions[i + 1] += 0.005;

        // Reset when too high
        if (positions[i + 1] > 6) {
          positions[i + 1] = 0.5;
          positions[i] = (Math.random() - 0.5) * 8; // Random X
          positions[i + 2] = (Math.random() - 0.5) * 8; // Random Z
        }

        // Add subtle drift
        positions[i] += Math.sin(state.clock.elapsedTime + i) * 0.001;
        positions[i + 2] += Math.cos(state.clock.elapsedTime + i) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Create particle positions
  const particleCount = 50;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8; // X
    positions[i * 3 + 1] = Math.random() * 4 + 0.5; // Y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8; // Z
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#D4AF37"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

// Golden sparkle particles
function GoldenSparkles() {
  const sparklesRef = React.useRef<THREE.Points | null>(null);

  useFrame((state) => {
    if (sparklesRef.current) {
      sparklesRef.current.rotation.y = state.clock.elapsedTime * 0.02;

      const positions = (sparklesRef.current.geometry.attributes.position.array as unknown) as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        // Gentle floating motion
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 2 + i) * 0.002;

        // Keep within bounds
        if (positions[i + 1] > 4) positions[i + 1] = 1;
        if (positions[i + 1] < 1) positions[i + 1] = 4;
      }
      sparklesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Create sparkle positions
  const sparkleCount = 30;
  const positions = new Float32Array(sparkleCount * 3);

  for (let i = 0; i < sparkleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10; // X
    positions[i * 3 + 1] = Math.random() * 3 + 1; // Y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z
  }

  return (
    <points ref={sparklesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#FFD700"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// Main 3D scene
function Scene({ onShrineClick }: { onShrineClick: (shrineId: string) => void }) {
  return (
    <>
      {/* Camera Controller */}
      <CameraController />

      {/* Lighting */}
      <ambientLight intensity={0.4} color="#FFF8DC" />
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.2}
        color="#FFE4B5"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3, 3, -3]} intensity={0.6} color="#CD853F" />
      <pointLight position={[3, 3, -3]} intensity={0.6} color="#D4AF37" />

      {/* Atmosphere */}
      <fog attach="fog" args={["#2D1810", 8, 20]} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <circleGeometry args={[12, 32]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>

      {/* Central mandala */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.98, 0]}>
        <ringGeometry args={[2, 3, 32]} />
        <meshStandardMaterial color="#D4AF37" transparent opacity={0.7} />
      </mesh>

      {/* Inner mandala pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.97, 0]}>
        <ringGeometry args={[1, 1.5, 16]} />
        <meshStandardMaterial color="#CD853F" transparent opacity={0.5} />
      </mesh>

      {/* Incense particles */}
      <IncenseParticles />

      {/* Golden sparkles */}
      <GoldenSparkles />

      {/* Journey shrines arranged in semi-circle */}
      <Shrine
        position={[-4, 0, -6]}
        title="Welcome to AntarShanti"
        color="#D4AF37"
        onClick={() => onShrineClick("welcome")}
      />

      <Shrine
        position={[-2, 0, -4]}
        title="Puja as Meditation"
        color="#CD853F"
        onClick={() => onShrineClick("puja")}
      />

      <Shrine
        position={[0, 0, -3]}
        title="Reduce Anxiety"
        color="#DEB887"
        onClick={() => onShrineClick("anxiety")}
      />

      <Shrine
        position={[2, 0, -4]}
        title="Daily Focus"
        color="#F4A460"
        onClick={() => onShrineClick("focus")}
      />

      <Shrine
        position={[4, 0, -6]}
        title="Screen-Free Pause"
        color="#D2691E"
        onClick={() => onShrineClick("screen")}
      />

      <Shrine
        position={[5, 0, -8]}
        title="30-Day Ritual Kit - ₹1299"
        color="#B8860B"
        onClick={() => onShrineClick("product")}
      />
    </>
  );
}

// Modal component
function ShrineModal({ shrine, onClose }: { shrine: any; onClose: () => void }) {
  if (!shrine) return null;

  const getShrineContent = (id: string) => {
    switch (id) {
      case "welcome":
        return {
          title: "Welcome to AntarShanti",
          subtitle: "10 minutes of puja. A whole day of inner peace.",
          description:
            "Discover how ancient puja rituals become modern self-therapy. Experience grounding, peace, and clarity through conscious daily practice.",
          emoji: "🕉",
        };
      case "puja":
        return {
          title: "Puja as Meditation",
          subtitle: "Sacred practice, modern approach",
          description:
            "Puja isn't about religion—it's about presence. Light incense, arrange sacred items, and create 10 minutes of pure mindfulness each day.",
          emoji: "🪔",
        };
      case "anxiety":
        return {
          title: "Reduce Anxiety",
          subtitle: "Calm your nervous system",
          description:
            "Sacred rituals activate your parasympathetic nervous system, reducing cortisol and bringing immediate calm to your mind and body.",
          emoji: "🧘‍♀️",
        };
      case "focus":
        return {
          title: "Daily Focus",
          subtitle: "Start with clarity & intention",
          description:
            "Morning rituals prime your mind for the day ahead. Build mental clarity, sharpen focus, and set powerful daily intentions.",
          emoji: "🎯",
        };
      case "screen":
        return {
          title: "Screen-Free Pause",
          subtitle: "Digital detox, daily reset",
          description:
            "Create a sacred offline moment. Step away from screens and step into presence through mindful rituals.",
          emoji: "📱",
        };
      case "product":
        return {
          title: "Your Complete Ritual Kit",
          subtitle: "₹1299 • 30 Days • Free Shipping",
          description:
            "Premium incense sticks, brass holder, sacred items, and guided practice journal. Eco-friendly, handcrafted, ready to begin.",
          emoji: "🛕",
          cta: true,
        };
      default:
        return {
          title: "Sacred Shrine",
          subtitle: "Wisdom awaits",
          description: "Click to explore this sacred space.",
          emoji: "✨",
        };
    }
  };

  const content = getShrineContent(shrine.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-8">
          <div className="flex items-center gap-4">
            <div className="text-6xl">{content.emoji}</div>
            <div>
              <h2 className="text-3xl font-bold text-amber-900">{content.title}</h2>
              <p className="text-lg text-amber-700 mt-1">{content.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">{content.description}</p>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300"
            >
              Continue Journey →
            </button>

            {content.cta && (
              <button
                onClick={() => (window.location.href = "/checkout")}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300"
              >
                Get My Kit - ₹1299
              </button>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// Main Journey Scene Component
export default function JourneyScene() {
  const [activeShrine, setActiveShrine] = useState<any>(null);
  const [visitedShrines, setVisitedShrines] = useState<Set<string>>(new Set());

  const handleShrineClick = (shrineId: string) => {
    const shrine = { id: shrineId };
    setActiveShrine(shrine);
    setVisitedShrines((prev) => new Set(prev).add(shrineId));
  };

  const handleCloseModal = () => {
    setActiveShrine(null);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900">
      {/* 3D Canvas */}
      <Canvas
        camera={{
          position: [0, 3, 8],
          fov: 60,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: false,
        }}
        shadows
      >
        <Suspense fallback={null}>
          <Scene onShrineClick={handleShrineClick} />
        </Suspense>
      </Canvas>

      {/* UI Overlays */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg">
          <span className="text-xl font-semibold text-amber-900">
            🕉 AntarShanti • {visitedShrines.size} / 6 shrines discovered
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-black/60 backdrop-blur-sm px-6 py-3 rounded-full text-white/90 text-sm font-medium">
          Move your mouse to look around • Click shrines to discover wisdom
        </div>
      </div>

      {/* Modal */}
      {activeShrine && <ShrineModal shrine={activeShrine} onClose={handleCloseModal} />}
    </div>
  );
}
