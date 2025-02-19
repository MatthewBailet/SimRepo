"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/molecules/shadcn/card";
import { ArrowRight, Plane } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// --------------------
// Vertex Shader
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

// --------------------
// Fragment Shader for Engine Wave Scene
// --------------------
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
    float circle = smoothstep(0.3, 2.45, dist);

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
// Optimized EngineWavePoints Component
// --------------------
function EngineWavePoints({
  hovered,
  defaultHighlightColor,
  hoverHighlightColor,
}: {
  hovered: boolean;
  defaultHighlightColor: THREE.Color;
  hoverHighlightColor: THREE.Color;
}) {
  const matRef = useRef<THREE.ShaderMaterial | null>(null);

  // Use a moderately subdivided plane for performance vs detail trade-off.
  const geometry = useMemo(
    () => new THREE.PlaneGeometry(18, 21, 300, 150),
    []
  );

  // Memoize the shader material so it doesn't recreate on every render.
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: engineFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uFade: { value: 0 },
        // Clone the default color so we can lerp on it.
        uHighlightColor: { value: defaultHighlightColor.clone() },
      },
      transparent: true,
    });
  }, [defaultHighlightColor]);

  useFrame((state, delta) => {
    if (matRef.current) {
      // Increase fade value over time (once per scene mount)
      let fade = matRef.current.uniforms.uFade.value;
      fade = Math.min(fade + delta, 1);
      matRef.current.uniforms.uFade.value = fade;
      // Accumulate time for continuous animation
      matRef.current.uniforms.uTime.value += delta;
      // Smoothly update the highlight color based on hover state.
      matRef.current.uniforms.uHighlightColor.value.lerp(
        hovered ? hoverHighlightColor : defaultHighlightColor,
        0.05
      );
    }
  });

  return (
    <points geometry={geometry}>
      <primitive object={material} ref={matRef} attach="material" />
    </points>
  );
}

// --------------------
// Optimized EngineWaveScene Component
// --------------------
interface EngineWaveSceneProps {
  hovered?: boolean;
  rotation?: [number, number, number];
  defaultHighlightColor?: THREE.Color;
  hoverHighlightColor?: THREE.Color;
}

function EngineWaveScene({
  hovered = false,
  rotation = [-Math.PI / 3, 0.2, 0.2],
  defaultHighlightColor = new THREE.Color("rgb(255,255,255)"),
  hoverHighlightColor = new THREE.Color("rgb(59,206,255)"),
}: EngineWaveSceneProps) {
  // Memoize rotation to avoid unnecessary re-renders.
  const rotationMemo = useMemo(() => rotation, [rotation]);
  return (
    <Canvas
      style={{
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(165deg, rgb(156,168,255), rgb(159,231,255))",
      }}
    >
      <ambientLight intensity={0.3} />
      <group rotation={rotationMemo}>
        <EngineWavePoints
          hovered={hovered}
          defaultHighlightColor={defaultHighlightColor}
          hoverHighlightColor={hoverHighlightColor}
        />
      </group>
    </Canvas>
  );
}

// --------------------
// Optimized EngineCard Component
// --------------------
type EngineCardProps = {
  renderWave?: boolean;
};

const EngineCard: React.FC<EngineCardProps> = ({ renderWave = true }) => {
  const [cardHovered, setCardHovered] = useState(false);

  // Memoize default and hover colors so they are not re-created on each render.
  const defaultColor = useMemo(() => new THREE.Color("rgb(255,255,255)"), []);
  const hoverColor = useMemo(() => new THREE.Color("rgb(59,206,255)"), []);
  // Memoize the rotation for the wave scene.
  const waveRotation = useMemo(() => [-Math.PI / 2.0, 2.9, 0.1] as [number, number, number], []);

  // Memoize the EngineWaveScene so that changes in hover state update uniforms only.
  const waveScene = useMemo(() => {
    return (
      <EngineWaveScene
        hovered={cardHovered}
        rotation={waveRotation}
        defaultHighlightColor={defaultColor}
        hoverHighlightColor={hoverColor}
      />
    );
  }, [cardHovered, waveRotation, defaultColor, hoverColor]);

  return (
    <Link legacyBehavior href="#">
      <a
        onMouseEnter={() => setCardHovered(true)}
        onMouseLeave={() => setCardHovered(false)}
        className="block group"
      >
        <Card className="lg:aspect-[4/1] aspect-[4/3] rounded-lg px-10 py-0 sm:py-8 relative overflow-hidden transition-transform duration-300 group-hover:scale-[105%] hover:shadow-xl">
          {renderWave && <div className="absolute inset-0">{waveScene}</div>}
          {/* Top Right Arrow */}
          <div className="absolute top-4 right-4">
            <div className="bg-white opacity-50 rounded-full p-2 transition-transform duration-300 group-hover:scale-110">
              <ArrowRight className="w-4 h-4 text-black" />
            </div>
          </div>
          {/* Card Content */}
          <CardContent className="relative flex flex-col items-center mt-6 justify-center h-full">
            <div className="transform -translate-y-4 flex flex-col items-center transition-transform duration-300 group-hover:scale-110">
              {/* Icon Circle */}
              <div className="bg-white opacity-[.8] rounded-full p-6">
                <Plane className="w-10 h-10 text-[rgb(111,127,242)] transition-colors duration-300 group-hover:text-[rgb(177,235,255)]" />
              </div>
              <h3 className="mt-4 text-sm text-white font-medium">
                Join our Pilot Program
              </h3>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};

export default EngineCard;
