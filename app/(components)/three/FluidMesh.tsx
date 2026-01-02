"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Simple noise function for vertex shader
const noiseGLSL = `
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

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColor1: { value: new THREE.Color("#fcd34d") }, // Amber
            uColor2: { value: new THREE.Color("#f43f5e") }, // Rose
        }),
        []
    );

    useFrame((state) => {
        const { clock } = state;
        if (meshRef.current) {
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime() * 0.4;
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
        }
    });

    const vertexShader = `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;
    
    ${noiseGLSL}

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Fluid displacement
      float noiseFreq = 1.5;
      float noiseAmp = 0.6;
      vec2 noisePos = vec2(pos.x * noiseFreq + uTime, pos.y * noiseFreq + uTime);
      float elevation = snoise(noisePos) * noiseAmp;
      
      pos.z += elevation;
      vElevation = elevation;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

    const fragmentShader = `
    varying vec2 vUv;
    varying float vElevation;
    uniform vec3 uColor1;
    uniform vec3 uColor2;

    void main() {
      // Color mix based on elevation
      float mixStrength = (vElevation + 0.6) * 0.8;
      vec3 color = mix(uColor1, uColor2, mixStrength);
      
      // Shine
      float alpha = 0.8;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

    return (
        // A large plane, heavily subdivided
        <mesh ref={meshRef} rotation={[-Math.PI / 4, 0, 0]}>
            <planeGeometry args={[10, 10, 128, 128]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}
