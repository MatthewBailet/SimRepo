"use client"

import React, { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { Button } from "@/components/molecules/shadcn/button"
import Image from "next/image"
import { AspectRatio } from "../molecules/shadcn/aspect-ratio"
import { Input } from "../molecules/shadcn/input"

// ------------------- Shaders for the wave background -------------------
const vertexShader = `
  uniform float uTime;
  uniform float uFade; // New uniform for fade-in
  varying vec2 vUv;
  varying float vDisplacement;
  varying float vRand;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vUv = uv;
    vRand = random(position.xy);

    float wave1 = sin(position.x * 0.5 + uTime * 0.8);
    float wave2 = sin(position.y * 0.7 + uTime * 0.6);
    float wave3 = sin((position.x + position.y) * 0.3 + uTime * 0.3);
    float pulsation = 0.1 * sin(uTime * 2.0);

    float displacement = (wave1 + wave2 + wave3) * 0.3 + pulsation;
    vDisplacement = displacement;

    vec3 newPosition = position;
    // Only apply the displacement once uFade ramps up
    newPosition.z += displacement * uFade;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    gl_PointSize = 1.3;
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform float uFade; // New uniform for fade-in
  varying vec2 vUv;
  varying float vDisplacement;
  varying float vRand;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    float circle = smoothstep(0.5, 0.45, dist);

    vec3 baseColor = mix(vec3(0.95), vec3(1.0), vUv.y);
    baseColor *= 1.0 - vDisplacement * 0.1;

    float gridX = smoothstep(0.48, 0.5, abs(fract(vUv.x * 50.0) - 0.5));
    float gridY = smoothstep(0.48, 0.5, abs(fract(vUv.y * 50.0) - 0.5));
    float gridPattern = max(gridX, gridY);
    baseColor -= gridPattern * 0.05;

    // Rare glint (~1%):
    if (vRand < 0.3) {
      float pulse = abs(sin(uTime * 2.0 + vRand * 100.0));
      float mixFactor = smoothstep(0.4, 0.7, pulse);
      baseColor = mix(baseColor, vec3(0.6, 0.8, 1.0), mixFactor);
    }

    // Rounded mask for entire plane
    vec2 centeredUv = vUv - vec2(0.5);
    float edgeDist = max(abs(centeredUv.x), abs(centeredUv.y));
    float roundedMask = 1.0 - smoothstep(0.48, 0.5, edgeDist);

    float finalAlpha = circle * roundedMask;
    // Fade in the points using uFade
    gl_FragColor = vec4(baseColor, finalAlpha * uFade);
  }
`

function WaveValueNoisePoints() {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  // Animate uniforms: update time and gradually increase uFade after 2 seconds
  useFrame((state) => {
    if (matRef.current) {
      const elapsed = state.clock.getElapsedTime()
      matRef.current.uniforms.uTime.value = elapsed

      // Wait 2 seconds, then animate fade in over 1 second
      let fade = 0
      if (elapsed > .1) {
        fade = Math.min((elapsed - 0) / 1, 1)
      }
      matRef.current.uniforms.uFade.value = fade
    }
  })

  // Plane geometry with many subdivisions
  const planeGeom = new THREE.PlaneGeometry(18, 21, 688, 328)
  const waveMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0.2 },
      uFade: { value: 0.0 },
    },
    transparent: true,
  })

  return (
    <points geometry={planeGeom}>
      <primitive object={waveMaterial} ref={matRef} attach="material" />
    </points>
  )
}

function WaveValueNoiseScene() {
  return (
    <Canvas style={{ width: "100%", height: "100%", background: "white" }}>
      <ambientLight intensity={0.3} />
      <group rotation={[-Math.PI / 0.43, 0.1, 0.1]}>
        <WaveValueNoisePoints />
      </group>
    </Canvas>
  )
}

// ------------------- Hero Section -------------------
export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 3D wave background (behind content) */}
      <div className="absolute inset-0 -z-10">
        <WaveValueNoiseScene />
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Left Column: Text & CTA */}
          <div className="space-y-6">
            <h1 className="text-3xl font tracking-tight sm:text-4xl md:text-5xl lg:text-7xl">
              Transforming Decisions with AI-Powered Simulations.
            </h1>
            <p className="text-m text-gray-600 dark:text-gray-400">
              Providing fine-tuned AI models paired with realtime industry data to produce accurate, intelligent business forecasting and analytics.
            </p>
            <div className="flex items-center space-x-4">
              <Button variant="default">Request Access</Button> 
              <Button variant="secondary">Book a Consultation</Button>
            </div>
          </div>

          {/* Right Column: Image (hidden on small screens) */}
          <div className="hidden md:block">
            <AspectRatio ratio={12 / 9}>
              <Image
                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                alt="Image"
                fill
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       33vw"
                priority
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  )
}
