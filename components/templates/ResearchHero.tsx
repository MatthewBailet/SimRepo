"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Gradient } from "whatamesh";
import { Badge } from "@/components/molecules/shadcn/badge";
import { ArrowRight } from "lucide-react";

export default function ResearchHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      #gradient-canvas-research {
        --gradient-color-4: #ffb8c6;
        --gradient-color-1: #ffc2dc;
        --gradient-color-2: #f46cb4;
        --gradient-color-3: #ffe0eb;
      }
    `;
    document.head.appendChild(style);

    const timer = setTimeout(() => {
      if (canvasRef.current) {
        const gradient = new Gradient();
        gradient.initGradient('#gradient-canvas-research');
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
        id="gradient-canvas-research"
        ref={canvasRef}
        className="absolute inset-0 w-full h-full "
      />
      
      <div className="container mx-auto relative z-10 px-6 md:px-20 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-5 max-w-4xl mx-auto text-center"
        >
      
          
      <h1 className="text-5xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900">
            Research & Innovation
          </h1>
          
          <p className="text-slate-800 text-md md:text-md max-w-2xl mx-auto leading-relaxed">
            Exploring the frontiers of AI and business intelligence to develop next-generation solutions for complex business challenges.
          </p>
          
          
        </motion.div>
      </div>
    </section>
  );
} 