"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Button } from "@/components/molecules/shadcn/button";
import EngineCard from "@/components/Ui Components/EngineCard"; // Adjust path as needed

// --------------------
// Global Background Wave Shaders
// --------------------
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

    float wave1 = sin(position.x * 0.5 + uTime * 0.8);
    float wave2 = sin(position.y * 0.7 + uTime * 0.6);
    float wave3 = sin((position.x + position.y) * 0.3 + uTime * 0.3);
    float pulsation = 0.05 * sin(uTime * 2.0);

    float displacement = (wave1 + wave2 + wave3) * 0.2 + pulsation;
    vDisplacement = displacement;

    vec3 newPosition = position;
    newPosition.z += displacement * uFade;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    gl_PointSize = 1.2;
  }
`;

const backgroundFragmentShader = `
  uniform float uTime;
  uniform float uFade;
  varying vec2 vUv;
  varying float vDisplacement;
  varying float vRand;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    float circle = smoothstep(0.5, 0.45, dist);

    vec3 baseColor = mix(vec3(0.95), vec3(1.0), vUv.y);
    baseColor *= 1.2 - vDisplacement * 0.1;

    float gridX = smoothstep(0.48, 0.5, abs(fract(vUv.x * 50.0) - 0.5));
    float gridY = smoothstep(0.48, 0.5, abs(fract(vUv.y * 50.0) - 0.5));
    float gridPattern = max(gridX, gridY);
    baseColor -= gridPattern * 0.0;

    if (vRand < .99) {
      float pulse = abs(sin(uTime * 1.0 + vRand * 1000.0));
      float mixFactor = smoothstep(0.1, 0.7, pulse);
      baseColor = mix(baseColor, vec3(0.6, 0.8, 1.0), mixFactor);
    }

    vec2 centeredUv = vUv - vec2(0.5);
    float edgeDist = max(abs(centeredUv.x), abs(centeredUv.y));
    float roundedMask = 1.0 - smoothstep(0.48, 0.5, edgeDist);

    float finalAlpha = circle * roundedMask;
    gl_FragColor = vec4(baseColor, finalAlpha * uFade);
  }
`;

function BackgroundWavePoints() {
  const matRef = useRef<THREE.ShaderMaterial | null>(null);

  useFrame((state) => {
    if (matRef.current) {
      const elapsed = state.clock.getElapsedTime();
      matRef.current.uniforms.uTime.value = elapsed;
      let fade = 0;
      if (elapsed > 0.1) {
        fade = Math.min((elapsed - 0) / 1, 1);
      }
      matRef.current.uniforms.uFade.value = fade;
    }
  });

  const planeGeom = new THREE.PlaneGeometry(18, 21, 688, 328);
  const waveMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: backgroundFragmentShader,
    uniforms: {
      uTime: { value: 0.2 },
      uFade: { value: 0.0 },
    },
    transparent: true,
  });

  return (
    <points geometry={planeGeom}>
      <primitive object={waveMaterial} ref={matRef} attach="material" />
    </points>
  );
}

function BackgroundWaveScene() {
  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={0.3} />
      <group rotation={[-Math.PI / 2, 0.1, 0.1]}>
        <BackgroundWavePoints />
      </group>
    </Canvas>
  );
}

// --------------------
// Hero Section
// --------------------
export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Global 3D Wave Background */}
      <div className="absolute inset-0 -z-10">
        <BackgroundWaveScene />
      </div>

      <div className="lg:mt-64 mt-8 sm:mt-20 md:mt-5">
        <div className="container mx-auto px-4 md:px-6 lg:px-6">
          <div className="grid gap-8 md:grid-cols-1">
            {/* Left Column: Text & CTA */}
            <div className="space-y-6 mb-0 lg:mb-20">
              <h1 className="text-4xl mt-20 lg:mt-0 text-center font tracking-tight md:text-7xl lg:text-5xl">
                Powering Smarter Decisions with AI Simulations
              </h1>
              <p className="text-m text-center text-gray-600 dark:text-gray-400">
                Providing fine-tuned AI models paired with realtime industry data to produce accurate, intelligent business forecasting.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button variant="default">Request Access</Button>
                <Button variant="secondary">Book a Consultation</Button>
              </div>
            </div>
            {/* Right Column: Engine Card */}
            <div className="md:block sm:block mt-10 lg:mt-1">
              <EngineCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
