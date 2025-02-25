"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Gradient } from "whatamesh";

export default function PilotProgramHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      #gradient-canvas-hero {
        --gradient-color-1: #c3e4ff;
        --gradient-color-2: #6ec3f4;
        --gradient-color-3: #eae2ff;
        --gradient-color-4: #b9beff;
      }
    `;
    document.head.appendChild(style);

    const timer = setTimeout(() => {
      if (canvasRef.current) {
        const gradient = new Gradient();
        gradient.initGradient('#gradient-canvas-hero');
      }
    }, 100);

    return () => {
      document.head.removeChild(style);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative md:min-h-[55vh] min-h-[70vh]  flex items-center justify-center overflow-hidden">
      <canvas
        id="gradient-canvas-hero"
        ref={canvasRef}
        className="absolute inset-0 w-full h-full "
      />
      
      <div className="container mx-auto relative z-10 px-6 md:px-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-5 max-w-4xl mx-auto text-center"
        >
          <h2 className="text-sm font-semibold tracking-wider text-blue-700 uppercase pt-16">
            Pilot Program
          </h2>
          <h1 className="text-5xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900">
            Shape the Future of AI Business Simulation
          </h1>
          <p className="text-slate-800 text-md md:text-md max-w-2xl mx-auto leading-relaxed">
            Join our exclusive pilot program and help us refine our AI-driven platform. Get early access while contributing valuable feedback to shape the future.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 