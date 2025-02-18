"use client";

import React from "react";
import MyButton from "@/components/Ui Components/MyButton"; // Adjust path as needed
import { Button } from "../molecules/shadcn/button";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// --------------------
// Shaders
// --------------------

// Vertex shader (shared)
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

// Fragment shader (modified for blue wave)
const blueWaveFragmentShader = `
  uniform float uTime;
  uniform float uFade;
  uniform vec3 uHighlightColor;
  varying vec2 vUv;
  varying float vDisplacement;
  varying float vRand;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    float circle = smoothstep(0.05, 2.45, dist);
    vec3 baseColor = mix(vec3(0.95), vec3(1.0), vUv.y);
    baseColor *= 1.0 - vDisplacement * 0.1;
    float gridX = smoothstep(0.48, 0.5, abs(fract(vUv.x * 90.0) - 0.5));
    float gridY = smoothstep(0.48, 0.5, abs(fract(vUv.y * 50.0) - 0.5));
    float gridPattern = max(gridX, gridY);
    baseColor -= gridPattern * 0.0;
    if (vRand < 0.15) {
      float pulse = abs(sin(uTime * 2.0 + vRand * 200.0));
      float mixFactor = smoothstep(0.4, 0.9, pulse);
      baseColor = mix(baseColor, uHighlightColor, mixFactor);
    }
    vec2 centeredUv = vUv - vec2(0.5);
    float edgeDist = max(abs(centeredUv.x), abs(centeredUv.y));
    float roundedMask = 1.0 - smoothstep(0.48, 0.5, edgeDist);
    float finalAlpha = circle * roundedMask;
    gl_FragColor = vec4(baseColor, finalAlpha * uFade);
  }
`;

// --------------------
// BlueWavePoints Component
// --------------------
function BlueWavePoints({
  hovered,
  defaultColor,
  hoverColor,
}: {
  hovered: boolean;
  defaultColor: THREE.Color;
  hoverColor: THREE.Color;
}) {
  const matRef = React.useRef<THREE.ShaderMaterial | null>(null);

  useFrame((state) => {
    if (matRef.current) {
      const elapsed = state.clock.getElapsedTime();
      matRef.current.uniforms.uTime.value = elapsed;
      let fade = 0;
      if (elapsed > 0.1) {
        fade = Math.min((elapsed - 0) / 1, 1);
      }
      matRef.current.uniforms.uFade.value = fade;
      matRef.current.uniforms.uHighlightColor.value.lerp(
        hovered ? hoverColor : defaultColor,
        0.05
      );
    }
  });

  const planeGeom = new THREE.PlaneGeometry(18, 21, 688, 328);
  const waveMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: blueWaveFragmentShader,
    uniforms: {
      uTime: { value: 0.2 },
      uFade: { value: 0.0 },
      uHighlightColor: { value: new THREE.Color(defaultColor.getStyle()) },
    },
    transparent: true,
  });

  return (
    <points geometry={planeGeom}>
      <primitive object={waveMaterial} ref={matRef} attach="material" />
    </points>
  );
}

// --------------------
// BlueWaveScene Component with customizable colors
// --------------------
interface BlueWaveSceneProps {
  hovered?: boolean;
  rotation?: [number, number, number];
  enabled?: boolean;
  defaultColor?: THREE.Color;
  hoverColor?: THREE.Color;
}
function BlueWaveScene({
  hovered = false,
  rotation = [0, 0, 0],
  enabled = true,
  defaultColor,
  hoverColor,
}: BlueWaveSceneProps) {
  if (!enabled) return null;
  const defColor = defaultColor ?? new THREE.Color("rgb(111,127,242)");
  const hovColor = hoverColor ?? new THREE.Color("rgb(59,206,255)");
  return (
    <Canvas
      style={{
        width: "100%",
        height: "100%",

      }}
    >
      <ambientLight intensity={0.3} />
      <group rotation={rotation}>
        <BlueWavePoints hovered={hovered} defaultColor={defColor} hoverColor={hovColor} />
      </group>
    </Canvas>
  );
}

// --------------------
// Helper: Random Rotation Generator
// --------------------
function randomRotation(): [number, number, number] {
  const randAngle = () => (Math.random() - 0.5) * (Math.PI / 3);
  return [randAngle(), randAngle(), randAngle()];
}

// --------------------
// DoubleCardSection Component
// --------------------
export default function DoubleCardSection() {
  // Toggle for wave backgrounds
  const showWave = true;

  return (
    <section className="relative pb-10 md:pb-24 bg-white text-bold overflow-hidden">
      <div className="container lg:px-20 px-3 md:px-8 pt-28">
        {/* Grid: Top row (65%/35%) and bottom row (full width) */}
        <div className="grid grid-cols-1 md:grid-cols-[65%_35%] grid-rows-[auto_auto] gap-5 px-3 pr-5">
          {/* Card #1 (top-left, 65%) */}
          <div className="relative rounded-lg border border-gray-200 bg-white py-12 px-12 transform hover:scale-105 transition-transform duration-300 shadow-sm">
            {showWave && (
              <div className="absolute inset-0">
                <BlueWaveScene 
                  rotation={[-Math.PI / 2.4, 3.2, 3.2]} 
                  enabled={showWave}
                  defaultColor={new THREE.Color("rgb(254, 125, 56)")} 
                  hoverColor={new THREE.Color("rgb(59,206,255)")}
                />
              </div>
            )}
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold text-[#0a2540] mt-12">
                Consulting
              </h2>
              <p className="mt-4 text-md text-gray-600 w-96">
                Form your new business from anywhere. Atlas sets up your US legal
                entity and tax ID, issues stock, and offers special benefits to
                kickstart growth.
              </p>
              <div className="mt-6 mb-8">
                <MyButton>Learn more</MyButton>
              </div>
            </div>
          </div>

                   {/* Card #2 (top-right, 35%) */}
                   <div className="relative rounded-lg border border-gray-200 bg-slate-900 py-12 px-12 transform hover:scale-105 transition-transform duration-300 shadow-sm">
            {showWave && (
              <div className="absolute inset-0">
                <BlueWaveScene rotation={[-Math.PI / 3, 2.2, 7.2]} enabled={showWave} />
              </div>
            )}
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold text-white mt-12">API</h2>
              <p className="mt-4 text-md text-gray-300 w-80 pr-6">
                Integrate with our flexible API to manage business operations,
                launch new revenue models, and stay ahead in a rapidly changing
                market.
              </p>
              <div className="mt-6">
                <Button
                  className="bg-gray-200 text-gray-800 cursor-not-allowed"
                  variant={"outline"}
                >
                  Coming soon
                </Button>
              </div>
            </div>
          </div>
          {/* Card #3 (bottom row, full width) */}
          <div className="relative col-span-1 md:col-span-2 rounded-lg border border-gray-200 bg-white py-12 px-12 transform hover:scale-105 transition-transform duration-300 shadow-sm">
            {showWave && (
              <div className="absolute inset-0">
                <BlueWaveScene 
                  rotation={randomRotation()} 
                  enabled={showWave}
                  defaultColor={new THREE.Color("rgb(111,127,242)")} 
                  hoverColor={new THREE.Color("rgb(59,206,255)")}
                />
              </div>
            )}
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold text-[#0a2540] mt-12">
                Platform (Full Width)
              </h2>
              <p className="mt-4 text-md text-gray-600 w-96">
                Form your new business from anywhere. Atlas sets up your US legal
                entity and tax ID, issues stock, and offers special benefits to
                kickstart growth.
              </p>
              <div className="mt-6 mb-8">
                <Button>Request Access</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
