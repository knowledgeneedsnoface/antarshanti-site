"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useScroll } from "framer-motion";

// Slower, smoother noise for "breathing" liquid
const noiseFunction = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
`;

export default function FluidMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const materialRef = useRef<any>(null);

  // Track scroll velocity manually since we are outside React Context for Lenis sometimes
  const lastScroll = useRef(0);
  const velocity = useRef(0);

  useFrame((state, delta) => {
    // 1. Calculate Scroll Velocity
    const currentScroll = window.scrollY;
    const deltaScroll = Math.abs(currentScroll - lastScroll.current);
    const instantVelocity = deltaScroll * 0.01; // Scale down

    // Smooth the velocity (Lerp)
    velocity.current += (instantVelocity - velocity.current) * 0.1;
    lastScroll.current = currentScroll;

    // 2. Uniforms Update
    if (materialRef.current && materialRef.current.userData.shader) {
      materialRef.current.userData.shader.uniforms.uTime.value = state.clock.getElapsedTime();

      // Pass velocity to shader if needed, or just use it for material props below
    }

    // 3. Dynamic Material Properties based on Velocity
    if (materialRef.current) {
      // Distortion increases with speed (0.5 -> 1.5)
      const targetDistortion = 0.5 + Math.min(velocity.current * 2, 1.0);
      materialRef.current.distortionScale = targetDistortion;

      // Chromatic Aberration increases significantly (0.05 -> 0.3)
      // This causes the colors to "tear" apart when moving fast
      const targetAbberation = 0.05 + Math.min(velocity.current * 0.5, 0.25);
      materialRef.current.chromaticAberration = targetAbberation;
    }

    // 4. Mesh Movement based on Scroll (Parallax)
    // We want the mesh to feel like it's dragging behind
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.02;
      // meshRef.current.position.y = -window.scrollY * 0.001; // Optional: move mesh up/down
    }
  });

  const onBeforeCompile = (shader: any) => {
    shader.uniforms.uTime = { value: 0 };

    // Inject GLSL
    shader.vertexShader = `
      uniform float uTime;
      ${noiseFunction}
      ${shader.vertexShader}
    `;

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
        #include <begin_vertex>
        
        float noiseFreq = 0.3;
        float noiseAmp = 0.8;
        vec2 noisePos = vec2(position.x * noiseFreq + uTime * 0.1, position.y * noiseFreq);
        float elevation = snoise(noisePos) * noiseAmp;
        
        float detailFreq = 1.2;
        float detailAmp = 0.2;
        float detail = snoise(vec2(position.x * detailFreq - uTime * 0.2, position.y * detailFreq)) * detailAmp;

        transformed.z += elevation + detail;
        
        vNormal = normalize(vec3(elevation, elevation, 1.0));
      `
    );

    if (materialRef.current) {
      materialRef.current.userData.shader = shader;
    }
  };

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]}>
      <planeGeometry args={[viewport.width * 1.5, viewport.height * 1.5, 256, 256]} />

      <MeshTransmissionMaterial
        ref={materialRef}
        onBeforeCompile={onBeforeCompile}

        transmission={1}
        thickness={1.5}
        roughness={0.2}
        chromaticAberration={0.05} // Dynamic
        anisotropy={0.5}

        color="#fbbf24"
        resolution={1024}
        samples={10}
        distortion={0.5} // Dynamic
        distortionScale={0.5}
        temporalDistortion={0.1}
      />
    </mesh>
  );
}
