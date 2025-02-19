"use client";

import React, { useRef, useState, useEffect } from "react";
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
    return fract(sin(dot(st.xy, vec2(1.9898,78.233))) * 83758.5453123);
  }

  void main() {
    vUv = uv;
    vRand = random(position.xy);

    float wave1 = sin(position.x * 0.5 + uTime * 0.8);
    float wave2 = sin(position.y * 0.7 + uTime * 0.6);
    float wave3 = sin((position.x + position.y) * 0.3 + uTime * 0.3);
    float pulsation = 0.02 * sin(uTime * 1.0);

    float displacement = (wave1 + wave2 + wave3) * 0.2 + pulsation;
    vDisplacement = displacement;

    vec3 newPosition = position;
    newPosition.z += displacement * uFade;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    gl_PointSize = 0.4;
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
    float circle = smoothstep(0.2, 4.45, dist);

    vec3 baseColor = mix(vec3(0.0), vec3(1.0), vUv.y);
    baseColor *= 5.0 - vDisplacement * 2.1;

    float gridX = smoothstep(0.48, 0.5, abs(fract(vUv.x * 50.0) - 0.5));
    float gridY = smoothstep(0.48, 0.5, abs(fract(vUv.y * 50.0) - 0.5));
    float gridPattern = max(gridX, gridY);
    baseColor -= gridPattern * 0.0;

    if (vRand < 0.99) {
      float pulse = abs(sin(uTime * 1.0 + vRand * 10.0));
      float mixFactor = smoothstep(0.02, 0.2, pulse);
      baseColor = mix(baseColor, vec3(0.6, 0.8, 1.0), mixFactor);
    }

    vec2 centeredUv = vUv - vec2(0.5);
    float edgeDist = max(abs(centeredUv.x), abs(centeredUv.y));
    float roundedMask = 1.0 - smoothstep(0.48, 0.9, edgeDist);

    float finalAlpha = circle * roundedMask;
    gl_FragColor = vec4(baseColor, finalAlpha * uFade);
  }
`;

function BackgroundWavePoints() {
  const matRef = useRef<THREE.ShaderMaterial | null>(null);
  // Accumulate fade value using delta time
  const fadeRef = useRef(0);

  useFrame((state, delta) => {
    if (matRef.current) {
      fadeRef.current = Math.min(fadeRef.current + delta, 1); // fade in over ~1 second
      matRef.current.uniforms.uFade.value = fadeRef.current;
      // Update uTime by accumulating delta (for continuous animation)
      matRef.current.uniforms.uTime.value += delta;
    }
  });

  const planeGeom = new THREE.PlaneGeometry(18, 21, 688, 328);
  const waveMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: backgroundFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uFade: { value: 0 },
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
// Hero Section with Lazy and Fading Wave Rendering
// --------------------
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [isHeroInView, setIsHeroInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsHeroInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Global 3D Wave Background: only render if hero is in view */}
      {isHeroInView && (
        <div className="absolute inset-0 -z-10 py-3">
          <BackgroundWaveScene />
        </div>
      )}

      <div className="lg:mt-64 mt-8 sm:mt-20 md:mt-5">
        <div className="container mx-auto px-4 md:px-6 lg:px-6">
          <div className="grid gap-8 md:grid-cols-1">
            {/* Left Column: Text & CTA */}
            <div className="space-y-6 mb-0 lg:mb-20">
              <h1 className="text-4xl mt-20 lg:mt-0 text-center font tracking-tight md:text-7xl lg:text-5xl">
                Powering Better Decisions with AI Based Simulations
              </h1>
              <p className="text-m text-center text-gray-600 dark:text-gray-400">
                Providing fine-tuned AI models paired with realtime industry data to produce accurate, intelligent business forecasting.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button variant="default">Request Early Access</Button>
                <Button variant="secondary">Book a Consultation</Button>
              </div>
            </div>
            {/* Right Column: Engine Card */}
            <div className="md:block sm:block mt-10 lg:mt-1">
              {/* Pass the flag to EngineCard so it too can disable its wave scene */}
              <EngineCard renderWave={isHeroInView} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
