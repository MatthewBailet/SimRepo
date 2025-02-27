"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Button } from "@/components/molecules/shadcn/button";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Skeleton } from "@/components/molecules/shadcn/skeleton";
import { Gradient } from "whatamesh";
import DashboardPreview from "../Ui Components/DashboardPreview";

const gradient = new Gradient()


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
    float circle = smoothstep(0.05, 5.45, dist);

    vec3 baseColor = mix(vec3(0.0), vec3(0.7), vUv.y);
    baseColor *= 3.0 - vDisplacement * 1.5;

    float gridX = smoothstep(0.48, 0.5, abs(fract(vUv.x * 70.0) - 0.5));
    float gridY = smoothstep(0.48, 0.5, abs(fract(vUv.y * 70.0) - 0.5));
    float gridPattern = max(gridX, gridY);
    baseColor -= gridPattern * 0.2;

    if (vRand < 0.99) {
      float pulse = abs(sin(uTime * 1.5 + vRand * 15.0));
      float mixFactor = smoothstep(0.02, 0.3, pulse);
      baseColor = mix(baseColor, vec3(0.6, 0.8, 0.95), mixFactor);
    }

    vec2 centeredUv = vUv - vec2(0.5);
    float edgeDist = max(abs(centeredUv.x), abs(centeredUv.y));
    float roundedMask = 1.0 - smoothstep(0.48, 0.9, edgeDist);

    float finalAlpha = circle * roundedMask;
    gl_FragColor = vec4(baseColor, finalAlpha * uFade * 1.5);
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
    float circle = smoothstep(0.05, 1.45, dist);

    vec3 baseColor = mix(vec3(0.0), vec3(0.7), vUv.y);
    baseColor *= 3.0 - vDisplacement * 1.5;

    float gridX = smoothstep(0.48, 0.5, abs(fract(vUv.x * 70.0) - 0.5));
    float gridY = smoothstep(0.48, 0.5, abs(fract(vUv.y * 70.0) - 0.5));
    float gridPattern = max(gridX, gridY);
    baseColor -= gridPattern * 0.2;

    if (vRand < 0.99) {
      float pulse = abs(sin(uTime * 1.5 + vRand * 15.0));
      float mixFactor = smoothstep(0.02, 0.3, pulse);
      baseColor = mix(baseColor, vec3(0.6, 0.8, 0.95), mixFactor);
    }

    vec2 centeredUv = vUv - vec2(0.5);
    float edgeDist = max(abs(centeredUv.x), abs(centeredUv.y));
    float roundedMask = 1.0 - smoothstep(0.48, 0.9, edgeDist);

    float finalAlpha = circle * roundedMask;
    gl_FragColor = vec4(baseColor, finalAlpha * uFade * 1.5);
  }
`;

const xlBackgroundFragmentShader = `
  uniform float uTime;
  uniform float uFade;
  varying vec2 vUv;
  varying float vDisplacement;
  varying float vRand;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    float circle = smoothstep(0.1, 3.45, dist);

    vec3 baseColor = mix(vec3(0.0), vec3(0.7), vUv.y);
    baseColor *= 3.0 - vDisplacement * 1.5;

    float gridX = smoothstep(0.48, 0.5, abs(fract(vUv.x * 70.0) - 0.5));
    float gridY = smoothstep(0.48, 0.5, abs(fract(vUv.y * 70.0) - 0.5));
    float gridPattern = max(gridX, gridY);
    baseColor -= gridPattern * 0.2;

    if (vRand < 0.69) {
      float pulse = abs(sin(uTime * 1.5 + vRand * 15.0));
      float mixFactor = smoothstep(0.02, 0.3, pulse);
      baseColor = mix(baseColor, vec3(0.6, 0.8, 0.95), mixFactor);
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
  const [screenType, setScreenType] = useState('default');

  useEffect(() => {
    const checkScreenSize = () => {
      setScreenType(window.innerWidth >= 1280 ? 'xl' : 
                   window.innerWidth < 768 ? 'mobile' : 'default');
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useFrame((state, delta) => {
    if (matRef.current) {
      fadeRef.current = Math.min(fadeRef.current + delta, 1);
      matRef.current.uniforms.uFade.value = fadeRef.current;
      matRef.current.uniforms.uTime.value += delta;
    }
  });

  const planeGeom = new THREE.PlaneGeometry(18, 21, screenType === 'mobile' ? 488 : 688, screenType === 'mobile' ? 228 : 328);
  

  
  let shaderToUse;
  if (screenType === 'xl') {
    shaderToUse = xlBackgroundFragmentShader;
  } else if (screenType === 'mobile') {
    shaderToUse = mobileBackgroundFragmentShader;
  } else {
    shaderToUse = backgroundFragmentShader;
  }

  const waveMaterial = new THREE.ShaderMaterial({
    vertexShader: screenType === 'mobile' ? mobileVertexShader : vertexShader,
    fragmentShader: shaderToUse,
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
  const [ref, isInView] = useIntersectionObserver(0.1);

  return (
    <section
      ref={ref}
      className="relative md:min-h-screen max-h-full flex flex-col justify-between overflow-hidden mt-0 pt-0 "
    >
      {isInView && (
        <>
          <div className="absolute inset-0 -z-20">
            <BackgroundWaveScene />
          </div>
          <div 
            className="absolute inset-0 -z-10 backdrop-blur-[4px]"
            style={{
              WebkitBackfaceVisibility: "hidden",
              WebkitPerspective: "1000",
              WebkitTransform: "translate3d(0,0,0) translateZ(0)",
              backfaceVisibility: "hidden",
              perspective: "1000",
              transform: "translate3d(0,0,0) translateZ(0)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-32 -z-2 hidden md:block"
            style={{
              background: 'linear-gradient(to bottom, transparent, white)',
            }}
          />
        </>
      )}

      {/* Center content */}
      <div className="flex-1 flex justify-center items-center">
        <div className="container mx-auto px-6 mt-0 md:mt-20 ">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 md:grid-cols-1"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="space-y-4 text-center mt-32" 
            >

              

              <h1 className=" w-full lg:text-5xl md:text-6xl text-slate-700 text-5xl font-semibold md:font-medium lg:font-medium mx-auto tracking-tight w-[90%] pt-24 ">
                Start Building <span className="inline-block bg-gradient-to-r from-blue-500 via-sky-300 bg-[length:200%_auto] bg-clip-text text-transparent animate-[gradient_1s_linear_infinite] pb-2">Intelligent </span> Simulations 
              </h1>
              <p className=" text-md md:text-md mx-auto text-gray-800 md:text-gray-600 dark:text-gray-400 lg:w-[50%] ">
                Providing fine-tuned AI models paired with realtime industry data to produce accurate, intelligent business forecasting.
                
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button className="bg-sky-950 hidden md:block" variant="default" onClick={() => window.location.href = '/early-access'}>
                  Request Access
                </Button>
                <Button className="bg-slate-200 hidden md:block" variant="secondary">
                  Book a Demo
                </Button>


              </div>
           
         
            </motion.div>
          </motion.div>
        </div>
      </div>

    {/* Dashboard Preview */}
{/* Dashboard Preview */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative w-full hidden md:block -z-10 mt-0 md:mt-[5vh]"
        style={{
          height: '650px',
          background: 'linear-gradient(to bottom, transparent, white 100%)',
          transform: 'perspective(1000px) rotateX(2deg)',
          transformOrigin: 'center'
        }}
      >
        <div className="container mx-auto px-9 relative h-full min-h-8xl" >
          <div className="relative w-full max-w-8xl mx-auto">
            <div className="bg-white rounded-xl shadow-2xl flex ">
              {/* Sidebar */}
              <div className="w-64 bg-slate-50 p-6 rounded-l-xl border-r">
                <div className="space-y-4">
                  {/* Logo placeholder */}
                  <div className="h-8 bg-slate-200 rounded-md w-24 mb-8" />
                  
                  {/* Nav items */}
                  <div className="space-y-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="h-4 w-4 bg-slate-200 rounded" />
                        <div className="h-4 bg-slate-200 rounded w-32" />
                      </div>
                    ))}
                  </div>

                  {/* Section divider */}
                  <div className="h-px bg-slate-200 my-6" />

                  {/* More nav items */}
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="h-4 w-4 bg-slate-200 rounded" />
                        <div className="h-4 bg-slate-200 rounded w-28" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-8 bg-slate-50">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="h-8 bg-slate-200 rounded w-48" />
                  <div className="h-8 bg-slate-200 rounded w-32" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="h-4 bg-slate-200 rounded w-20 mb-4" />
                      <div className="h-8 bg-slate-200 rounded w-28" />
                    </div>
                  ))}
                </div>

                {/* Chart Area */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <div className="h-[220px] w-full bg-slate-100 rounded-lg" />
                </div>

                {/* Bottom Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="h-[160px] w-full bg-slate-100 rounded-lg" />
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="h-[160px] w-full bg-slate-100 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
