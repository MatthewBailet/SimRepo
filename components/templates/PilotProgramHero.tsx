"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Reuse the same shaders from EngineCard
const vertexShader = `
  uniform float uTime;
  uniform float uFade;
  varying vec2 vUv;
  varying float vDisplacement;
  varying float vRand;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(1.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vUv = uv;
    vRand = random(position.xy);
    float wave = sin(position.x * 0.5 + uTime * 0.8) * 0.2;
    vDisplacement = wave;
    vec3 newPosition = position;
    newPosition.z += wave * uFade;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    gl_PointSize = 1.2;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uFade;
  varying vec2 vUv;
  varying float vDisplacement;
  varying float vRand;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    float circle = smoothstep(0.3, 2.45, dist);
    vec3 baseColor = vec3(1.0);
    float finalAlpha = circle * (1.0 - vDisplacement) * uFade * 0.5;
    gl_FragColor = vec4(baseColor, finalAlpha);
  }
`;

function WavePoints() {
  const matRef = React.useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(() => new THREE.PlaneGeometry(25, 25, 200, 200), []);
  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uFade: { value: 0 },
    },
    transparent: true,
  }), []);

  useFrame((state, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
      matRef.current.uniforms.uFade.value = Math.min(matRef.current.uniforms.uFade.value + delta, 1);
    }
  });

  return (
    <points geometry={geometry}>
      <primitive object={material} ref={matRef} attach="material" />
    </points>
  );
}

export default function PilotProgramHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-8" style={{
        background: "linear-gradient(165deg, rgb(74,0,18), rgb(15,10,63))"
      }}>
        <Canvas style={{ width: "100%", height: "100%" }}>
          <ambientLight intensity={0.3} />
          <group rotation={[-Math.PI / 2.0, 2.9, 0.1]}>
            <WavePoints />
          </group>
        </Canvas>
      </div>
      
      <div className="container mx-auto px-6 absolute z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-7 pt-3 md:pt-28 pb-10  lg:px-12 md:px-5"
        >
          <h2 className="text-md font-semibold tracking-tight text-2s md:text-md text-[rgb(111,127,242)]">
            Pilot Program
          </h2>
          <h3 className="lg:text-6xl text-5xl max-w-md font-semibold text-white tracking-tight">
            Shape the Future of AI Business Simulations
          </h3>
          <p className="text-white/80 max-w-lg text-md leading-relaxed">
            Join our exclusive pilot program and help us refine our AI-driven platform. Get free access while contributing valuable feedback to improve our service.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 