"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface BlueWaveSceneProps {
  hovered?: boolean;
  rotation?: [number, number, number];
  enabled?: boolean;
  defaultColor?: THREE.Color;
  hoverColor?: THREE.Color;
}

type BlueWavePointsProps = {
  hovered: boolean;
  defaultColor: THREE.Color;
  hoverColor: THREE.Color;
};

function BlueWavePoints({ hovered, defaultColor, hoverColor }: BlueWavePointsProps) {
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
      // Smoothly interpolate the highlight color based on hover state.
      matRef.current.uniforms.uHighlightColor.value.lerp(
        hovered ? hoverColor : defaultColor,
        0.05
      );
    }
  });

  // Define the plane geometry for the wave.
  const planeGeom = new THREE.PlaneGeometry(18, 21, 688, 328);

  // Vertex shader.
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

  // Fragment shader.
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
      float circle = smoothstep(0.05, 8.45, dist);
      vec3 baseColor = mix(vec3(0.95), vec3(1.0), vUv.y);
      baseColor *= 1.0 - vDisplacement * 0.1;
      float gridX = smoothstep(0.48, 0.5, abs(fract(vUv.x * 90.0) - 0.5));
      float gridY = smoothstep(0.48, 0.5, abs(fract(vUv.y * 50.0) - 0.5));
      float gridPattern = max(gridX, gridY);
      baseColor -= gridPattern * 0.0;
      if (vRand < 0.00) {
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

const BlueWaveScene: React.FC<BlueWaveSceneProps> = ({
  hovered = false,
  rotation = [0, 0, 0],
  enabled = true,
  defaultColor,
  hoverColor,
}) => {
  if (!enabled) return null;
  const defColor = defaultColor ?? new THREE.Color("rgb(119,192,255)");
  const hovColor = hoverColor ?? new THREE.Color("rgb(59,206,255)");
  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={0.3} />
      <group rotation={rotation}>
        <BlueWavePoints hovered={hovered} defaultColor={defColor} hoverColor={hovColor} />
      </group>
    </Canvas>
  );
};

export default BlueWaveScene;
