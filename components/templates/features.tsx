"use client"

import React, { useRef } from "react"
import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Badge } from "../molecules/shadcn/badge"
import { Check } from "lucide-react"
import "./features.css"

// --------------------
// Wave Background Components
// --------------------
const vertexShader = `
  uniform float uTime;
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
    newPosition.z += displacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    gl_PointSize = 2.0;
  }
`

const fragmentShader = `
  uniform float uTime;
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
    gl_FragColor = vec4(baseColor, finalAlpha);
  }
`

function WaveValueNoisePoints() {
  const matRef = useRef<THREE.ShaderMaterial>(null)
  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
    }
  })
  const planeGeom = new THREE.PlaneGeometry(14, 21, 688, 328)
  const waveMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: { uTime: { value: 0 } },
    transparent: true,
  })
  return (
    <points geometry={planeGeom}>
      <primitive object={waveMaterial} ref={matRef} attach="material" />
    </points>
  )
}

function WaveBackground() {
  return (
    <Canvas style={{ width: "100%", height: "100%", background: "transparent" }}>
      <ambientLight intensity={0.3} />
      <group rotation={[-Math.PI / 0.43, 0.1, 0.1]}>
        <WaveValueNoisePoints />
      </group>
    </Canvas>
  )
}

// --------------------
// Animated Counter Component
// --------------------
interface AnimatedCounterProps {
  end: number | string
  suffix?: string
  label: string
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, suffix, label }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })
  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center bg-transparent w-full h-40 md:h-48 aspect-square"
    >
      <div className="text-8xl font-bold">
        {inView ? (
          typeof end === "number" ? (
            <CountUp start={0} end={end} duration={2.5} suffix={suffix || ""} />
          ) : (
            end
          )
        ) : (
          "0"
        )}
      </div>
      <div className="mt-2 text-xs text-center">{label}</div>
    </div>
  )
}

// --------------------
// Features Section Component
// --------------------
export default function Features() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-black text-white overflow-hidden">
      {/* Understated Wave Background */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <WaveBackground />
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* Left Column: 2x2 Animated Counter Grid */}
          <div className="grid grid-cols-2 gap-8 CounterSizing">
            <AnimatedCounter end={92} suffix="%" label="General use-case simulation accuracy" />
            <AnimatedCounter end={60} suffix="+" label="Fine-Tuned Industry Models" />
            <AnimatedCounter end={0} label="rate limit" />
            <AnimatedCounter end={100} suffix="%" label="User data customizable" />
          </div>
          {/* Right Column: Existing Feature Content */}
          <div className="space-y-6">
            <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
              New Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Elevate your business with our cutting-edge features
            </h2>
            <p className="text-muted-foreground">
              Our platform offers a suite of powerful features to help you streamline your workflows and drive your business forward.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-2">
                <Check className="h-6 w-6 text-white" />
                <div>
                  <h3 className="text-lg font-semibold">Advanced Analytics</h3>
                  <p className="text-muted-foreground">
                    Gain deeper insights into your data with our robust analytics tools.
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-6 w-6 text-white" />
                <div>
                  <h3 className="text-lg font-semibold">Seamless Collaboration</h3>
                  <p className="text-muted-foreground">
                    Empower your team to work together more efficiently with our collaboration features.
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-6 w-6 text-white" />
                <div>
                  <h3 className="text-lg font-semibold">Scalable Infrastructure</h3>
                  <p className="text-muted-foreground">
                    Easily scale your application with our reliable and high-performance infrastructure.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
