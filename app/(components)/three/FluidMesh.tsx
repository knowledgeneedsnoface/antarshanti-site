"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { MeshTransmissionMaterial } from "@react-three/drei";

// Simplex Noise (Standard for smooth undulation)
// Ported from standard GLSL noise algorithms
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
  const { viewport, mouse } = useThree();

  // Custom Shader Material that extends Physical Material? 
  // For simplicity and performance, we stick to vertex displacement on a dense plane
  // but use MeshStandardMaterial or MeshPhysicalMaterial for real lighting interaction.

  // We will manually displace geometry in useFrame for maximum control?
  // No, that's heavy on CPU. Vertex Shader is better.
  // But we want it to look like SILK/GLASS.

  // Solution: modify the onBeforeCompile of a StandardMaterial to invoke the displacement.

  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uHover: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    if (materialRef.current) {
      materialRef.current.userData.shader.uniforms.uTime.value = clock.getElapsedTime();

      // Lerp mouse towards target for smoothness
      const currentMouse = materialRef.current.userData.shader.uniforms.uMouse.value;
      currentMouse.x += (mouse.x * viewport.width / 2 - currentMouse.x) * 0.1;
      currentMouse.y += (mouse.y * viewport.height / 2 - currentMouse.y) * 0.1;
    }
  });

  const onBeforeCompile = (shader: any) => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uMouse = uniforms.uMouse;

    // Inject GLSL
    shader.vertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      ${noiseFunction}
      ${shader.vertexShader}
    `;

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
        #include <begin_vertex>
        
        // Base undulation
        float noiseFreq = 0.5;
        float noiseAmp = 0.5;
        vec2 noisePos = vec2(position.x * noiseFreq + uTime * 0.2, position.y * noiseFreq);
        float elevation = snoise(noisePos) * noiseAmp;
        
        // Mouse Ripple
        // Distance from vertex to mouse
        float dist = distance(position.xy, uMouse);
        float rippleArea = 1.0 - smoothstep(0.0, 3.0, dist);
        
        // Ripple wave
        float ripple = sin(dist * 5.0 - uTime * 2.0) * 0.5 * rippleArea;
        
        transformed.z += elevation + ripple;
        
        // Recalculate normal for lighting!
        // (Approximation for performance)
        vNormal = normalize(vec3(elevation, elevation, 1.0));
      `
    );

    // Store shader ref for updates
    if (materialRef.current) {
      materialRef.current.userData.shader = shader;
    }
  };

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]}>
      <planeGeometry args={[viewport.width * 1.5, viewport.height * 1.5, 128, 128]} />

      {/* 
        This is the "Lusion" look: 
        Dark, high roughness contrast, transmission (glassy)
      */}
      <meshPhysicalMaterial
        ref={materialRef}
        onBeforeCompile={onBeforeCompile}
        color="#1c1917"  // Deep Stone/Black
        roughness={0.4}
        metalness={0.6}
        transmission={0.0} // Keep opaque for performance, rely on shininess
        clearcoat={1.0}    // The "Wet" look
        clearcoatRoughness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
