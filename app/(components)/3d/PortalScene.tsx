"use client";

import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshPortalMaterial, CameraControls, Text, Environment, Sparkles, Float } from '@react-three/drei'
import { easing } from 'maath'

export default function PortalScene() {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 35 }}>
        <fog attach="fog" args={['#0a0502', 0, 20]} />
        <Frame id="01" name="PEACE" author="AntarShanti" bg="#0a0502" position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <ambientLight intensity={1} />
          <Environment preset="sunset" />

          {/* Inner World Content */}
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <InnerGeometry />
          </Float>
          <Sparkles count={50} scale={4} size={4} speed={0.4} opacity={0.5} color="#fbbf24" />
        </Frame>
        {/* Rig creates a slight parallax effect based on mouse position */}
        <Rig />
      </Canvas>
    </div>
  )
}

function Frame({ id, name, author, bg, width = 1, height = 1.61803398875, children, ...props }: any) {
  const portal = useRef<any>(null)
  const [hovered, hover] = useState(false)
  useCursor(hovered)

  useFrame((state, dt) => {
    // Smooth opening effect or blend (optional, currently keeping it fully open acting as a window)
    easing.damp(portal.current, 'blend', 1, 0.2, dt)
  })

  return (
    <group {...props}>
      {/* The Portal Geometry - A rounded window into the soul */}
      <mesh
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <circleGeometry args={[2.5, 64]} />
        {/* The Portal Material is the key lusion effect */}
        {/* @ts-ignore */}
        <MeshPortalMaterial ref={portal} events={hovered}>
            <color attach="background" args={[bg]} />
            {children}
        </MeshPortalMaterial>
      </mesh>

      {/* Outer Glow Ring */}
      <mesh position={[0, 0, -0.01]}>
        <circleGeometry args={[2.6, 64]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function InnerGeometry() {
    return (
        <group>
             {/* A central calming object inside the portal */}
            <mesh>
                <icosahedronGeometry args={[0.8, 1]} />
                <meshStandardMaterial color="#fbbf24" wireframe />
            </mesh>
            <mesh>
                <icosahedronGeometry args={[0.8, 1]} />
                <meshStandardMaterial color="#fbbf24" transparent opacity={0.1} />
            </mesh>
        </group>
    )
}

function Rig({ position = new THREE.Vector3(0, 0, 10), focus = new THREE.Vector3(0, 0, 0) }) {
  useFrame((state, dt) => {
    // Moves the camera slightly based on mouse position to create parallax looking INTO the portal
    const { pointer } = state
    easing.damp3(state.camera.position, [-(pointer.x * 2), -(pointer.y * 2), 10], 0.2, dt)
    state.camera.lookAt(focus)
  })
  return null
}
