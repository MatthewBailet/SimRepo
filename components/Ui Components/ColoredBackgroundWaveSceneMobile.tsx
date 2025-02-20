"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface ColoredBackgroundWaveSceneMobileProps {
  color?: string;
}

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

const mobileFragmentShader = `
  uniform float uTime;
  uniform float uFade;
  uniform vec3 uTargetColor;
  varying vec2 vUv;
  varying float vDisplacement;
  varying float vRand;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    float circle = smoothstep(0.1, 1.45, dist);

    vec3 baseColor = mix(vec3(0.0), vec3(0.7), vUv.y);
    baseColor *= 3.0 - vDisplacement * 1.5;

    float gridX = smoothstep(0.48, 0.5, abs(fract(vUv.x * 70.0) - 0.5));
    float gridY = smoothstep(0.48, 0.5, abs(fract(vUv.y * 70.0) - 0.5));
    float gridPattern = max(gridX, gridY);
    baseColor -= gridPattern * 0.2;

    if (vRand < 0.99) {
      float pulse = abs(sin(uTime * 1.5 + vRand * 15.0));
      float mixFactor = smoothstep(0.02, 0.3, pulse);
      baseColor = mix(baseColor, uTargetColor, mixFactor);
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

  useFrame((state, delta) => {
    if (matRef.current) {
      fadeRef.current = Math.min(fadeRef.current + delta, 1);
      matRef.current.uniforms.uFade.value = fadeRef.current;
      matRef.current.uniforms.uTime.value += delta;
    }
  });

  const planeGeom = new THREE.PlaneGeometry(18, 21, 488, 228);
  const waveMaterial = new THREE.ShaderMaterial({
    vertexShader: mobileVertexShader,
    fragmentShader: mobileFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uFade: { value: 0 },
      uTargetColor: { value: new THREE.Color("rgb(111,127,242)") },
    },
    transparent: true,
  });

  return (
    <points geometry={planeGeom}>
      <primitive object={waveMaterial} ref={matRef} attach="material" />
    </points>
  );
}

export default function ColoredBackgroundWaveSceneMobile({
  color = "rgb(215,38,91)",
}: ColoredBackgroundWaveSceneMobileProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={0.3} />
      <group rotation={[-Math.PI / 2, -.4, 0]}> 
        <BackgroundWavePoints />
      </group>
    </Canvas>
  );
} 