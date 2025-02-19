"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface ColoredBackgroundWaveSceneProps {
  color?: string; // e.g. "rgb(255,22,112)"
}

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
    gl_PointSize = 0.3;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uFade;
  uniform vec3 uTargetColor;
  varying vec2 vUv;
  varying float vDisplacement;
  varying float vRand;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    float circle = smoothstep(0.1, 9.45, dist);
    vec3 baseColor = mix(vec3(0.0), vec3(1.0), vUv.y);
    baseColor *= 5.0 - vDisplacement * 2.1;
    float gridX = smoothstep(0.48, 0.5, abs(fract(vUv.x * 50.0) - 0.5));
    float gridY = smoothstep(0.48, 0.5, abs(fract(vUv.y * 50.0) - 0.5));
    float gridPattern = max(gridX, gridY);
    baseColor -= gridPattern * 0.0;
    if (vRand < 0.99) {
      float pulse = abs(sin(uTime * 1.0 + vRand * 10.0));
      float mixFactor = smoothstep(0.02, 0.2, pulse);
      baseColor = mix(baseColor, uTargetColor, mixFactor);
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
  const fadeRef = useRef(0);

  useFrame((state, delta) => {
    if (matRef.current) {
      fadeRef.current = Math.min(fadeRef.current + delta, 1);
      matRef.current.uniforms.uFade.value = fadeRef.current;
      matRef.current.uniforms.uTime.value += delta;
    }
  });

  const planeGeom = new THREE.PlaneGeometry(18, 21, 688, 328);
  const waveMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uFade: { value: 0 },
      uTargetColor: { value: new THREE.Color("rgb(97,237,127)") },
    },
    transparent: true,
  });

  return (
    <points geometry={planeGeom}>
      <primitive object={waveMaterial} ref={matRef} attach="material" />
    </points>
  );
}

export default function ColoredBackgroundWaveScene({
  color = "rgb(97,237,127)",
}: ColoredBackgroundWaveSceneProps) {
  // Update target color based on prop.
  const targetColor = new THREE.Color(color);

  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={0.3} />
      <group rotation={[-Math.PI / 2, .2, 0]}> 
        {/* Use a simpler rotation for testing */}
        <BackgroundWavePoints />
      </group>
    </Canvas>
  );
}
