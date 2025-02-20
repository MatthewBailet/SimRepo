"use client";

import React from "react";
import { motion } from "framer-motion";
import ColoredBackgroundWaveScene from "@/components/Ui Components/ColoredBackgroundWaveScene";

export default function PilotProgramHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Wave */}
      <div className="absolute inset-0 -z-8">
        <ColoredBackgroundWaveScene color="rgb(111,127,242)" />
      </div>
      
      <div className="container mx-auto relative z-10 px-6 md:px-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-7 pt-3 md:pt-28 pb-10 lg:px-12 md:px-10"
        >
          <h2 className="text-md font-semibold tracking-tight text-2s md:text-md text-[rgb(124, 0, 23)]">
            Pilot Program
          </h2>
          <h3 className="lg:text-6xl text-5xl max-w-md font-semibold tracking-tight bg-clip-text text-transparent bg-[linear-gradient(165deg,rgb(74,0,18),rgb(15,10,63))]">
            Shape the Future of AI Business Simulation
          </h3>
          <p className="text-slate-900 max-w-lg text-md leading-relaxed">
            Join our exclusive pilot program and help us refine our AI-driven platform. Get free access while contributing valuable feedback to improve our service.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 