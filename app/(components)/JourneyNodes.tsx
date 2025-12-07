"use client";
import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture, Html } from "@react-three/drei";
import * as THREE from "three";

interface NodeData {
  id: string;
  type: "intro" | "benefit" | "product" | "checkout";
  position: [number, number, number];
  title: string;
  subtitle?: string;
  description: string;
  icon?: string;
  color: string;
  image?: string;
}

interface JourneyNodesProps {
  nodes: NodeData[];
  visitedNodes: Set<string>;
  onNodeClick: (node: NodeData) => void;
}

function Node({
  node,
  isVisited,
  isHovered,
  onClick,
  onHover,
  onUnhover
}: {
  node: NodeData;
  isVisited: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: () => void;
  onUnhover: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  // Load texture if available
  const texture = node.image ? useTexture(node.image) : null;
  if (texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
  }

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Make node face camera
    meshRef.current.lookAt(camera.position);

    // Hover animations
    if (isHovered) {
      meshRef.current.scale.setScalar(1.1 + Math.sin(time * 8) * 0.05);
      if (glowRef.current) {
        glowRef.current.scale.setScalar(1.3 + Math.sin(time * 6) * 0.1);
        const material = glowRef.current.material as THREE.MeshBasicMaterial;
        material.opacity = 0.4 + Math.sin(time * 4) * 0.2;
      }
    } else {
      meshRef.current.scale.setScalar(1);
      if (glowRef.current) {
        glowRef.current.scale.setScalar(1.1);
        const material = glowRef.current.material as THREE.MeshBasicMaterial;
        material.opacity = 0.2;
      }
    }

    // Idle floating animation
    meshRef.current.position.y = node.position[1] + Math.sin(time * 2 + node.position[0]) * 0.03;

    // Gentle rotation for benefits
    if (node.type === "benefit") {
      meshRef.current.rotation.z = Math.sin(time * 0.5 + node.position[0]) * 0.05;
    }
  });

  const getNodeSize = () => {
    switch (node.type) {
      case "intro": return [1.2, 1.6];
      case "benefit": return [1.4, 1.8];
      case "product": return [1.6, 2.0];
      case "checkout": return [1.3, 1.7];
      default: return [1.2, 1.6];
    }
  };

  const [width, height] = getNodeSize();

  return (
    <group position={node.position}>
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <planeGeometry args={[width * 1.4, height * 1.4]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main node */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          onHover();
        }}
        onPointerOut={(e) => {
          document.body.style.cursor = "";
          onUnhover();
        }}
      >
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          color={isVisited ? node.color : "#8B4513"}
          transparent
          opacity={0.9}
          map={texture}
        />
      </mesh>

      {/* Icon overlay for non-image nodes */}
      {!texture && node.icon && (
        <Html
          position={[0, 0, 0.01]}
          center
          style={{
            pointerEvents: "none",
            fontSize: node.type === "benefit" ? "3rem" : "2.5rem",
            color: "white",
            textShadow: "0 0 10px rgba(0,0,0,0.5)",
            filter: "drop-shadow(0 0 8px rgba(0,0,0,0.3))"
          }}
        >
          {node.icon}
        </Html>
      )}

      {/* Title label */}
      <Html
        position={[0, -height/2 - 0.3, 0]}
        center
        style={{
          pointerEvents: "none",
          width: "200px",
          textAlign: "center",
          fontFamily: "serif",
          fontSize: "14px",
          color: "#F4E4BC",
          textShadow: "0 2px 4px rgba(0,0,0,0.7)",
          fontWeight: "600"
        }}
      >
        {node.title}
      </Html>

      {/* Visited indicator */}
      {isVisited && (
        <mesh position={[width/2 - 0.1, height/2 - 0.1, 0.01]}>
          <circleGeometry args={[0.08, 16]} />
          <meshBasicMaterial color="#4CAF50" />
        </mesh>
      )}
    </group>
  );
}

export default function JourneyNodes({ nodes, visitedNodes, onNodeClick }: JourneyNodesProps) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  return (
    <>
      {nodes.map((node) => (
        <Node
          key={node.id}
          node={node}
          isVisited={visitedNodes.has(node.id)}
          isHovered={hoveredNodeId === node.id}
          onClick={() => onNodeClick(node)}
          onHover={() => setHoveredNodeId(node.id)}
          onUnhover={() => setHoveredNodeId(null)}
        />
      ))}
    </>
  );
}
