"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/molecules/shadcn/card";
import { ArrowRight, Rocket } from "lucide-react";
import { Gradient } from "whatamesh";
import { Badge } from "@/components/molecules/shadcn/badge";

const EngineCard3: React.FC = () => {
  const [cardHovered, setCardHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Add required CSS variables
    const style = document.createElement('style');
    style.textContent = `
      #gradient-canvas3 {
        --gradient-color-1: #c3e4ff;
        --gradient-color-2: #6ec3f4;
        --gradient-color-3: #eae2ff;
        --gradient-color-4: #b9beff;
      }
    `;
    document.head.appendChild(style);

    // Initialize gradient after a small delay to ensure CSS is applied
    const timer = setTimeout(() => {
      if (canvasRef.current) {
        const gradient = new Gradient();
        gradient.initGradient('#gradient-canvas3');
      }
    }, 100);

    return () => {
      document.head.removeChild(style);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Link legacyBehavior href="/pilot-program">
      <a
        onMouseEnter={() => setCardHovered(true)}
        onMouseLeave={() => setCardHovered(false)}
        className="block group"
      >
                 <div className="flex items-center">
<h1 className="text-sm font-semibold text-slate-600 pb-1 pr-1">Join Our Pilot Program </h1>
<ArrowRight className="w-5 h-5 text-slate-600 transition-transform duration-300 transform translate-x-0 group-hover:translate-x-1 pb-1" />
         </div>
        <Card className="lg:aspect-[5/1.2] aspect-[5/3] md:aspect-[4/1] rounded-sm py-0 sm:py-8  relative overflow-hidden transition-all duration-300 group-hover:scale-[102%] ">
          <canvas
            id="gradient-canvas3"
            ref={canvasRef}
            className="absolute inset-0 w-full h-full transition-opacity duration-300 rounded-xs "
            style={{ 
              opacity: cardHovered ? 1 : 1,
              '--gradient-color-1': '#c3e4ff',
              '--gradient-color-2': '#6ec3f4',
              '--gradient-color-3': '#eae2ff',
              '--gradient-color-4': '#b9beff'
            } as React.CSSProperties}
          />



          {/* Card Content */}
          <CardContent className="relative flex flex-col items-center mt-6 justify-center h-full">
            <div className="transform -translate-y-4 flex flex-col items-center transition-all duration-300 group-hover:scale-105">
              {/* Icon Circle */}
              <div className="bg-white/50 group-hover:bg-white/90 transition-all duration-300 rounded-full p-6 md:p-6">
                <Rocket className="w-5 h-5 md:w-12 md:h-9 md:w-9 text-sky-400 transition-colors duration-300 group-hover:text-sky-500" />
              </div>
              <div className="flex items-center">

            <Badge className="mt-5 text-xs text-sky-800  bg-white/30 hover:bg-white/35 font-medium tracking-wide gap-1.5">
                Pilot Program • March 2025   
                <ArrowRight className="w-3.5 h-3.5 text-sky-800 transition-transform duration-300 transform translate-x-0 group-hover:translate-x-1" />
              </Badge>

              </div>
  
      
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};

export default EngineCard3;
