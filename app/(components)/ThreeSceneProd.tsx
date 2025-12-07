"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Html } from "@react-three/drei";
import * as THREE from "three";

/**
 * ANTARSHANTI - SEMI-FPV SHOWROOM EXPERIENCE
 * User stands in center, pans camera left/right to view nodes in semi-circle
 */

// Node configuration - arranged in 180° semi-circle
const JOURNEY_NODES = [
  {
    id: "brand-intro",
    angle: -75,
    radius: 8,
    height: 1.5,
    type: "shrine",
    title: "Welcome to AntarShanti",
    subtitle: "A 10-minute daily ritual for inner peace",
    description:
      "Discover how ancient puja rituals become modern self-therapy. Experience grounding, peace, and clarity through conscious daily practice.",
    image: "/hero.jpg",
    color: "#d97706",
  },
  {
    id: "what-is-puja",
    angle: -55,
    radius: 8,
    height: 1.5,
    type: "shrine",
    title: "Puja as Meditation",
    subtitle: "Sacred practice, modern approach",
    description:
      "Puja isn't about religion—it's about presence. Light incense, arrange sacred items, and create 10 minutes of pure mindfulness each day.",
    image: "/lifestyle.jpg",
    color: "#ea580c",
  },
  {
    id: "how-it-works",
    angle: -35,
    radius: 8,
    height: 1.5,
    type: "shrine",
    title: "Your 30-Day Journey",
    subtitle: "Day 1 → Day 30: Transform your mornings",
    description:
      "Start with 5 minutes, build to 10. Each day, the ritual deepens. By day 30, this becomes your anchor of calm.",
    image: "/flatlay.jpg",
    color: "#f59e0b",
  },
  {
    id: "benefit-anxiety",
    angle: -15,
    radius: 8,
    height: 1.5,
    type: "benefit",
    title: "Reduce Anxiety",
    subtitle: "Calm your nervous system",
    description:
      "Sacred rituals activate your parasympathetic nervous system, reducing cortisol and bringing immediate calm to your mind and body.",
    image: "/benefit1.jpg",
    color: "#fb923c",
  },
  {
    id: "benefit-focus",
    angle: 0,
    radius: 8,
    height: 1.5,
    type: "benefit",
    title: "Daily Focus",
    subtitle: "Start with clarity & intention",
    description:
      "Morning rituals prime your mind for the day ahead. Build mental clarity, sharpen focus, and set powerful daily intentions.",
    image: "/benefit2.jpg",
    color: "#fbbf24",
  },
  {
    id: "benefit-pause",
    angle: 15,
    radius: 8,
    height: 1.5,
    type: "benefit",
    title: "Screen-Free Pause",
    subtitle: "Digital detox, daily reset",
    description:
      "Create a sacred offline moment. Disconnect from screens and notifications. Reconnect with your deepest self through tangible, sensory practice.",
    image: "/benefit3.jpg",
    color: "#f59e0b",
  },
  {
    id: "product-reveal",
    angle: 40,
    radius: 8,
    height: 1.5,
    type: "product",
    title: "Your Complete Ritual Kit",
    subtitle: "Everything you need for 30 days",
    description:
      "Premium incense sticks, brass holder, sacred items, and a guided practice journal. Eco-friendly, handcrafted, ready to begin.",
    image: "/packet.jpg",
    color: "#d97706",
  },
  {
    id: "checkout",
    angle: 65,
    radius: 8,
    height: 1.5,
    type: "checkout",
    title: "Begin Your Journey",
    subtitle: "₹1,299 • 30 Days • Free Delivery",
    description:
      "Start your transformation today. Cash on delivery available. Feel the difference within 7 days, or your money back.",
    image: "/unbox.jpg",
    color: "#16a34a",
  },
];

// Convert angle to 3D position
function angleToPosition(angle: number, radius: number, y: number): THREE.Vector3 {
  const rad = (angle * Math.PI) / 180;
  return new THREE.Vector3(Math.sin(rad) * radius, y, -Math.cos(rad) * radius);
}

// Horizontal pan camera controller
function SemiCircleCamera({ onNodeFocus }: { onNodeFocus: (nodeId: string | null) => void }) {
  const { camera } = useThree();
  const mouseX = useRef(0);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);

  useEffect(() => {
    camera.position.set(0, 1.6, 0); // Fixed position - user standing still
    camera.rotation.order = "YXZ";

    const handleMouseMove = (e: MouseEvent) => {
      // Map mouse X position to rotation (-45° to +45°)
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      targetRotation.current = normalizedX * (Math.PI / 4); // ±45 degrees
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [camera]);

  useFrame(() => {
    // Smooth camera rotation
    currentRotation.current += (targetRotation.current - currentRotation.current) * 0.08;
    camera.rotation.y = currentRotation.current;

    // Gentle idle sway
    const time = Date.now() * 0.0003;
    const sway = Math.sin(time) * 0.005;
    camera.rotation.y += sway;

    // Detect which node is in focus (camera pointing at it)
    const cameraAngle = (currentRotation.current * 180) / Math.PI;
    let closestNode: string | null = null;
    let smallestDiff = Infinity;

    JOURNEY_NODES.forEach((node) => {
      const diff = Math.abs(cameraAngle - node.angle);
      if (diff < smallestDiff && diff < 8) {
        // Within 8° = "focused"
        smallestDiff = diff;
        closestNode = node.id;
      }
    });

    onNodeFocus(closestNode);
  });

  return null;
}

// Individual spiritual node/shrine
function SpiritualNode({
  data,
  onClick,
  isFocused,
}: {
  data: typeof JOURNEY_NODES[0];
  onClick: () => void;
  isFocused: boolean;
}) {
  const groupRef = useRef<THREE.Group | null>(null);
  const texture = useTexture(data.image);
  // ensure correct color space if using newer three versions
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    texture.colorSpace = THREE.SRGBColorSpace;
  } catch {
    // ignore if property doesn't exist in older three versions
  }

  const position = angleToPosition(data.angle, data.radius, data.height);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle float
      const float = Math.sin(state.clock.elapsedTime * 0.4 + data.angle) * 0.03;
      groupRef.current.position.y = position.y + float;

      // Pulse when focused
      const scale = isFocused ? 1.05 + Math.sin(state.clock.elapsedTime * 2) * 0.02 : 1;
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Wooden post */}
      <mesh position={[0, -0.8, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1.6, 16]} />
        <meshStandardMaterial color="#5d4037" roughness={0.9} />
      </mesh>

      {/* Brass top ornament */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#b8860b" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Main shrine/board */}
      <mesh
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "")}
      >
        <boxGeometry args={[2.5, 1.8, 0.15]} />
        <meshStandardMaterial
          color={isFocused ? "#fffbeb" : "#fef3c7"}
          emissive={data.color}
          emissiveIntensity={isFocused ? 0.4 : 0.1}
          roughness={0.3}
        />
      </mesh>

      {/* Photo/image */}
      <mesh position={[0, 0.2, 0.08]}>
        <planeGeometry args={[2.2, 1.3]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Colored accent bar */}
      <mesh position={[0, -0.7, 0.08]}>
        <boxGeometry args={[2.2, 0.25, 0.02]} />
        <meshStandardMaterial color={data.color} roughness={0.2} metalness={0.6} />
      </mesh>

      {/* Warm glow - diya-like */}
      <pointLight position={[0, 0, 0.4]} intensity={isFocused ? 1.2 : 0.6} color={data.color} distance={4} />

      {/* Floating label */}
      <Html position={[0, -1.0, 0]} center distanceFactor={10}>
        <div
          style={{
            background: isFocused
              ? `linear-gradient(135deg, ${data.color}ee, #fbbf24ee)`
              : "rgba(254, 243, 199, 0.95)",
            padding: "8px 18px",
            borderRadius: "18px",
            boxShadow: isFocused ? `0 8px 20px ${data.color}88` : "0 4px 12px rgba(0,0,0,0.2)",
            fontFamily: "system-ui, sans-serif",
            fontSize: "14px",
            fontWeight: "700",
            color: isFocused ? "#ffffff" : "#78350f",
            whiteSpace: "nowrap",
            transform: isFocused ? "scale(1.1)" : "scale(1)",
            transition: "all 0.3s ease",
          }}
        >
          {isFocused ? "✨ " : ""}
          {data.title}
          {isFocused ? " ✨" : ""}
        </div>
      </Html>
    </group>
  );
}

// Temple lighting rig
function TempleLighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#fef3c7" />
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.0}
        color="#fbbf24"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-3, 3, -3]} intensity={0.5} color="#fb923c" distance={15} />
      <pointLight position={[3, 3, -3]} intensity={0.5} color="#fbbf24" distance={15} />
      <spotLight position={[0, 5, -8]} angle={Math.PI / 3} intensity={0.6} color="#f59e0b" penumbra={0.5} castShadow />
    </>
  );
}

// Incense smoke particles
function IncenseParticles() {
  const particlesRef = useRef<THREE.Points | null>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;

      const positions = (particlesRef.current.geometry.attributes.position.array as unknown) as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.01; // Rise upward
        if (positions[i + 1] > 4) positions[i + 1] = 0.2; // Reset
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const particles = React.useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        {/* IMPORTANT: use args for BufferAttribute with react-three/fiber v8+ */}
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#fbbf24" transparent opacity={0.25} sizeAttenuation />
    </points>
  );
}

// Sacred ground
function SacredGround() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[15, 64]} />
        <meshStandardMaterial color="#8b7355" roughness={0.95} />
      </mesh>

      {/* Subtle mandala pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[3, 5, 32]} />
        <meshStandardMaterial color="#b8860b" transparent opacity={0.15} roughness={0.4} />
      </mesh>
    </>
  );
}

// Main scene component
function JourneyScene({
  onNodeClick,
  focusedNode,
}: {
  onNodeClick: (node: typeof JOURNEY_NODES[0]) => void;
  focusedNode: string | null;
}) {
  return (
    <>
      <SemiCircleCamera onNodeFocus={() => {}} />
      <TempleLighting />
      <SacredGround />
      <IncenseParticles />

      {JOURNEY_NODES.map((node) => (
        <SpiritualNode key={node.id} data={node} onClick={() => onNodeClick(node)} isFocused={focusedNode === node.id} />
      ))}
    </>
  );
}

// Main component
export default function ThreeSceneProd({ onProceed }: { onProceed?: () => void }) {
  const [started, setStarted] = useState(false);
  const [activeNode, setActiveNode] = useState<typeof JOURNEY_NODES[0] | null>(null);
  const [focusedNode, setFocusedNode] = useState<string | null>(null);
  const [visited, setVisited] = useState<Set<string>>(new Set());

  const handleNodeClick = (node: typeof JOURNEY_NODES[0]) => {
    setActiveNode(node);
    setVisited((prev) => new Set([...prev, node.id]));
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Intro screen */}
      {!started && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-900/95 via-orange-900/95 to-amber-800/95">
          <div className="max-w-2xl text-center p-12 bg-white/95 rounded-3xl shadow-2xl">
            <div className="mb-8">
              <img src="/hero.jpg" alt="AntarShanti" className="w-full h-64 object-cover rounded-2xl shadow-lg" />
            </div>
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Welcome to AntarShanti
            </h1>
            <p className="text-2xl text-gray-700 mb-3 font-light">10 minutes of puja. A whole day of inner peace.</p>
            <p className="text-lg text-gray-600 mb-10">Stand in the center. Move your mouse to look around. Click to explore each sacred node.</p>
            <button
              onClick={() => setStarted(true)}
              className="px-14 py-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-2xl rounded-2xl shadow-xl transition-all hover:scale-105"
            >
              🕉 Enter the Sacred Space
            </button>
          </div>
        </div>
      )}

      {/* HUD */}
      {started && !activeNode && (
        <>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 bg-white/90 backdrop-blur px-8 py-4 rounded-full shadow-lg">
            <span className="text-xl font-semibold text-orange-900">🕉 Move mouse to look around</span>
          </div>
          <div className="absolute top-8 right-8 z-40 bg-orange-100/90 px-6 py-3 rounded-full shadow-lg">
            <span className="font-semibold text-orange-900">{visited.size} / {JOURNEY_NODES.length} explored</span>
          </div>
        </>
      )}

      {/* Modal */}
      {activeNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl">
            <div className="relative h-96">
              <img src={activeNode.image} alt={activeNode.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: activeNode.color }} />
                  <h2 className="text-6xl font-bold text-white drop-shadow-2xl">{activeNode.title}</h2>
                </div>
                <p className="text-2xl text-amber-200 font-light">{activeNode.subtitle}</p>
              </div>
            </div>

            <div className="p-12">
              <p className="text-2xl leading-relaxed mb-10 text-gray-700 font-light">{activeNode.description}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveNode(null)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-10 py-6 rounded-2xl text-xl shadow-lg transition-all hover:scale-105"
                >
                  Return to Sacred Space
                </button>
                {activeNode.type === "checkout" && onProceed && (
                  <button
                    onClick={onProceed}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-10 py-6 rounded-2xl text-xl shadow-lg transition-all hover:scale-105"
                  >
                    Proceed to Checkout 🛕
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3D Canvas */}
      {started && (
        <Canvas camera={{ position: [0, 1.6, 0], fov: 65 }} shadows>
          <color attach="background" args={["#2d1810"]} />
          <fog attach="fog" args={["#2d1810", 5, 20]} />

          <Suspense fallback={null}>
            <JourneyScene onNodeClick={handleNodeClick} focusedNode={focusedNode} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
