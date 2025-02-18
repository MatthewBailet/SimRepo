"use client"

import React, { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/molecules/shadcn/button"
import { AspectRatio } from "../molecules/shadcn/aspect-ratio"
import { Card, CardContent } from "../molecules/shadcn/card"
import { Layers, ArrowRight } from "lucide-react"

// ------------------- Global (Background) Wave Shaders -------------------
const vertexShader = `
  uniform float uTime;
  uniform float uFade;
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
    newPosition.z += displacement * uFade;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    gl_PointSize = 1.3;
  }
`

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

    vec2 centeredUv = vUv - vec2(0.5);
    float edgeDist = max(abs(centeredUv.x), abs(centeredUv.y));
    float roundedMask = 1.0 - smoothstep(0.48, 0.5, edgeDist);

    float finalAlpha = circle * roundedMask;
    gl_FragColor = vec4(baseColor, finalAlpha * uFade);
  }
`

// ------------------- Engine (Card) Wave Shaders -------------------
const engineFragmentShader = `
  uniform float uTime;
  uniform float uFade;
  uniform vec3 uHighlightColor;
  varying vec2 vUv;
  varying float vDisplacement;
  varying float vRand;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    float circle = smoothstep(0.5, 0.45, dist);

    vec3 baseColor = mix(vec3(0.95), vec3(1.0), vUv.y);
    baseColor *= 1.0 - vDisplacement * 0.1;

    float gridX = smoothstep(0.48, 0.5, abs(fract(vUv.x * 90.0) - 0.5));
    float gridY = smoothstep(0.48, 0.5, abs(fract(vUv.y * 50.0) - 0.5));
    float gridPattern = max(gridX, gridY);
    baseColor -= gridPattern * 0.00;

    if (vRand < 0.3) {
      float pulse = abs(sin(uTime * 2.0 + vRand * 100.0));
      float mixFactor = smoothstep(0.4, 0.9, pulse);
      baseColor = mix(baseColor, uHighlightColor, mixFactor);
    }

    vec2 centeredUv = vUv - vec2(0.5);
    float edgeDist = max(abs(centeredUv.x), abs(centeredUv.y));
    float roundedMask = 3.0 - smoothstep(0.48, 0.5, edgeDist);

    float finalAlpha = circle * roundedMask;
    gl_FragColor = vec4(baseColor, finalAlpha * uFade);
  }
`

// ------------------- Background Wave Scene -------------------
function BackgroundWavePoints() {
  const matRef = useRef(null)

  useFrame((state) => {
    if (matRef.current) {
      const elapsed = state.clock.getElapsedTime()
      matRef.current.uniforms.uTime.value = elapsed
      let fade = 0
      if (elapsed > 0.1) {
        fade = Math.min((elapsed - 0) / 1, 1)
      }
      matRef.current.uniforms.uFade.value = fade
    }
  })

  const planeGeom = new THREE.PlaneGeometry(18, 21, 688, 328)
  const waveMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: backgroundFragmentShader,
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

function BackgroundWaveScene() {
  return (
    <Canvas style={{ width: "100%", height: "100%", background: "white" }}>
      <ambientLight intensity={0.3} />
      <group rotation={[-Math.PI / 0.43, 0.1, 0.1]}>
        <BackgroundWavePoints />
      </group>
    </Canvas>
  )
}

// ------------------- Engine Wave Scene (for Card) -------------------
function EngineWavePoints({ hovered, defaultHighlightColor, hoverHighlightColor }) {
  const matRef = useRef(null)

  useFrame((state) => {
    if (matRef.current) {
      const elapsed = state.clock.getElapsedTime()
      matRef.current.uniforms.uTime.value = elapsed
      let fade = 0
      if (elapsed > 0.1) {
        fade = Math.min((elapsed - 0) / 1, 1)
      }
      matRef.current.uniforms.uFade.value = fade

      // Smoothly interpolate the highlight color based on hover state.
      matRef.current.uniforms.uHighlightColor.value.lerp(
        hovered ? hoverHighlightColor : defaultHighlightColor,
        0.05
      )
    }
  })

  const planeGeom = new THREE.PlaneGeometry(18, 21, 688, 328)
  const engineMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: engineFragmentShader,
    uniforms: {
      uTime: { value: 0.2 },
      uFade: { value: 0.0 },
      uHighlightColor: { value: new THREE.Color(defaultHighlightColor.getStyle()) },
    },
    transparent: true,
  })

  return (
    <points geometry={planeGeom}>
      <primitive object={engineMaterial} ref={matRef} attach="material" />
    </points>
  )
}

function EngineWaveScene({
  hovered = false,
  rotation = [-Math.PI / 3, 0.2, 0.2],
  defaultHighlightColor = new THREE.Color("rgb(111,127,242)"),
  hoverHighlightColor = new THREE.Color("rgb(173,216,230)")
}) {
  return (
    <Canvas style={{ width: "100%", height: "100%", background: "white" }}>
      <ambientLight intensity={0.3} />
      <group rotation={rotation}>
        <EngineWavePoints
          hovered={hovered}
          defaultHighlightColor={defaultHighlightColor}
          hoverHighlightColor={hoverHighlightColor}
        />
      </group>
    </Canvas>
  )
}

// ------------------- Hero Section -------------------
export default function Hero() {
  const [cardHovered, setCardHovered] = useState(false)

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Global 3D wave background (behind content) */}
      <div className="absolute inset-0 -z-10">
        <BackgroundWaveScene />
      </div>

      {/* Hero content */}
      {/* On mobile, margin-top is removed; from md and up, mt-40 is applied */}
      <div className="lg:mt-40 sm:mt-5 md:mt-5">
        <div className="container mx-auto px-4 md:px-6 lg:px-6">
          <div className="grid  gap-8 md:grid-cols-1">
            {/* Left Column: Text & CTA */}
            <div className="space-y-6">
              <h1 className="text-3xl text-center font tracking-tight sm:text-6xl md:text-7xl lg:text-5xl">
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

            {/* Right Column: Engine Card as a link */}
            <div className="md:block sm:block">
              <Link legacyBehavior href="#">
                <a
                  onMouseEnter={() => setCardHovered(true)}
                  onMouseLeave={() => setCardHovered(false)}
                  className="block group"
                >
                  <Card className="lg:aspect-[3/1] sm:aspect-[4/3] md:aspect-[4/3] relative overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    {/* Card Background: Engine Wave scene */}
                    <div className="absolute inset-0">
                      <EngineWaveScene
                        hovered={cardHovered}
                        rotation={[-Math.PI / 2.0, 2.9, 4]}
                        defaultHighlightColor={new THREE.Color("rgb(111,127,242)")}
                        hoverHighlightColor={new THREE.Color("rgb(173,216,230)")}
                      />
                    </div>
                    {/* New arrow in a 50% opacity white circle in the top right */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-white opacity-50 rounded-full p-2 transition-transform duration-300 group-hover:scale-110">
                        <ArrowRight className="w-4 h-4 text-black" />
                      </div>
                    </div>
                    <CardContent className="relative flex flex-col items-center justify-center h-full">
                      <div className="transform -translate-y-4 flex flex-col items-center transition-transform duration-300 group-hover:scale-110">
                        {/* White circle with the Layers icon */}
                        <div className="bg-white opacity-75 rounded-full p-6">
                          <Layers className="w-10 h-10 text-[rgb(111,127,242)] transition-colors duration-300 group-hover:text-[rgb(173,216,230)]" />
                        </div>
                        <h3 className="mt-4 text-lg font">Meet our Engine</h3>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
