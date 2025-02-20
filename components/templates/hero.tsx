"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Button } from "@/components/molecules/shadcn/button";
import EngineCard from "@/components/Ui Components/EngineCard"; // Adjust path as needed
import { motion } from "framer-motion";

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

const mobileVertexShader = `
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

    float wave1 = sin(position.x * 0.8 + uTime * 1.2);
    float wave2 = sin(position.y * 1.0 + uTime * 0.9);
    float wave3 = sin((position.x + position.y) * 0.5 + uTime * 0.6);
    float pulsation = 0.04 * sin(uTime * 1.5);

    float displacement = (wave1 + wave2 + wave3) * 0.3 + pulsation;
    vDisplacement = displacement;

    vec3 newPosition = position;
    newPosition.z += displacement * uFade;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    gl_PointSize = 0.6;
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
    float circle = smoothstep(0.1, 3.75, dist);

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

const mobileBackgroundFragmentShader = `
  uniform float uTime;
  uniform float uFade;
  varying vec2 vUv;
  varying float vDisplacement;
  varying float vRand;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    float circle = smoothstep(0.1, 2.45, dist);

    vec3 baseColor = mix(vec3(0.0), vec3(0.7), vUv.y);
    baseColor *= 3.0 - vDisplacement * 1.5;

    float gridX = smoothstep(0.48, 0.5, abs(fract(vUv.x * 70.0) - 0.5));
    float gridY = smoothstep(0.48, 0.5, abs(fract(vUv.y * 70.0) - 0.5));
    float gridPattern = max(gridX, gridY);
    baseColor -= gridPattern * 0.2;

    if (vRand < 0.99) {
      float pulse = abs(sin(uTime * 1.5 + vRand * 15.0));
      float mixFactor = smoothstep(0.02, 0.3, pulse);
      baseColor = mix(baseColor, vec3(0.4, 0.6, 0.8), mixFactor);
    }

    vec2 centeredUv = vUv - vec2(0.5);
    float edgeDist = max(abs(centeredUv.x), abs(centeredUv.y));
    float roundedMask = 1.0 - smoothstep(0.48, 0.9, edgeDist);

    float finalAlpha = circle * roundedMask;
    gl_FragColor = vec4(baseColor, finalAlpha * uFade * 1.5);
  }
`;

function BackgroundWavePoints() {
  const matRef = useRef<THREE.ShaderMaterial | null>(null);
  const fadeRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useFrame((state, delta) => {
    if (matRef.current) {
      fadeRef.current = Math.min(fadeRef.current + delta, 1);
      matRef.current.uniforms.uFade.value = fadeRef.current;
      matRef.current.uniforms.uTime.value += delta;
    }
  });

  const planeGeom = new THREE.PlaneGeometry(18, 21, isMobile ? 488 : 688, isMobile ? 228 : 328);
  const waveMaterial = new THREE.ShaderMaterial({
    vertexShader: isMobile ? mobileVertexShader : vertexShader,
    fragmentShader: isMobile ? mobileBackgroundFragmentShader : backgroundFragmentShader,
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
    const currentRef = heroRef.current; // Store ref value
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsHeroInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) { // Use stored ref value
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Only render the expensive 3D wave background if the hero is in view */}
      {isHeroInView && (
        <div className="absolute -z-8 inset-0 -z-10 py-3 -mt-20">
          <BackgroundWaveScene />
        </div>
      )}

      <div className="lg:mt-12 pt-20 lg:pt-32 mt-8 sm:mt-20 md:mt-5 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid gap-8 md:grid-cols-1"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 mb-0 lg:mb-3"
            >
              <h1 className="lg:text-6xl text-slate-800 text-5xl lg:px-20 font-semibold lg:font-medium  lg:text-center mx-0  lg:mx-auto pl-0 lg:pl-4 pr-12 lg:pr-0 lg:pl-0 mt-0 lg:mt-10 lg:mt-0 text-left tracking-tight md:text-7xl lg:text-5xl w-95 w-[90%] lg:w-[80%]">
                Powering Better Decisions with AI Based Simulations
              </h1>
              <p className="text-m  lg:text-center lg:justify-center  mx-auto text-gray-600 dark:text-gray-400 sm:text-left lg:w-[50%] w-[90]">
                Providing fine-tuned AI models paired with realtime industry data to produce accurate, intelligent business forecasting.
              </p>
              <div className="flex items-center pl-4 pl-0 lg:pl-1 justify-right lg:justify-center mx-0 lg:mx-auto lg:space-x-4 space-x-2">
                <Button className="bg-slate-900 hidden md:block" variant="default" onClick={() => window.location.href = '/early-access'}>
                  Request Early Access
                </Button>
                <Button className="block bg-slate-200  hidden md:block" variant="secondary">
                  Book a Consultation
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:block sm:block mt-3 lg:mt-1 pb-10"
            >
              <EngineCard renderWave={isHeroInView} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
