"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/molecules/shadcn/card";
import { ArrowRight, Rocket, LibraryBig, Microscope } from "lucide-react";
import { Gradient } from "whatamesh";
import { Badge } from "@/components/molecules/shadcn/badge";

const ResearchCard: React.FC = () => {
  const [cardHovered, setCardHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const gradient2 = new Gradient();
      gradient2.initGradient('#gradient-canvas2');
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <Link legacyBehavior href="/">
      <a
        onMouseEnter={() => setCardHovered(true)}
        onMouseLeave={() => setCardHovered(false)}
        className="block group"
      >
         <div className="flex items-center">
<h1 className="text-lg font-semibold text-slate-600 pb-1 pr-1">Research </h1>
<ArrowRight className="w-5 h-5 text-slate-600 transition-transform duration-300 transform translate-x-0 group-hover:translate-x-1 pb-1" />
         </div>
        
        <Card className="lg:aspect-[5/2] aspect-[5/4]  xs:aspect-[5/3] md:aspect-[4/1] rounded-sm px-12 py-0 sm:py-8 relative overflow-hidden transition-all duration-300 group-hover:scale-[102%] hover:shadow-2xl">
          <canvas
            id="gradient-canvas2"
            ref={canvasRef}
            className="absolute inset-0 w-full h-full transition-opacity duration-300 rounded-xs "
            style={{ 
              opacity: cardHovered ? 1 : 1,
              '--gradient-color-1': '#ffc2dc',
              '--gradient-color-2': '#f46cb4',
              '--gradient-color-3': '#ffe0eb',
              '--gradient-color-4': '#ffb8c6'
            } as React.CSSProperties}
          />

          {/* Top Right Arrow */}
          <div className="absolute top-5 right-5 hidden md:block">
            <div className="backdrop-blur-sm bg-white/20 rounded-full p-2.5 transition-all duration-300 group-hover:scale-105">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Card Content */}
          <CardContent className="relative flex flex-col items-center mt-6 justify-center h-full">
            <div className="transform -translate-y-4 flex flex-col items-center transition-all duration-300 group-hover:scale-105">
              {/* Icon Circle */}
              <div className="bg-white/50 group-hover:bg-white/90 transition-all duration-300 rounded-full p-6 md:p-7">
                <Microscope className="w-12 h-12 md:w-12 md:h-12 text-rose-400 transition-colors duration-300 group-hover:text-rose-400" />
              </div>
              <div className="flex items-center">
                <Badge className="mt-5 text-xs text-sky-800 bg-white/30 hover:bg-white/35 font-medium tracking-wide flex items-center gap-1.5">
                  Access Research
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

export default ResearchCard;
