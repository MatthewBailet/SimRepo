"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/molecules/shadcn/card";
import { ArrowRight, Rocket } from "lucide-react";
import { Gradient } from "whatamesh";
import { Badge } from "@/components/molecules/shadcn/badge";

const EngineCard: React.FC = () => {
  const [cardHovered, setCardHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const gradient = new Gradient();
      gradient.initGradient('#gradient-canvas');
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <Link legacyBehavior href="/pilot-program">
      <a
        onMouseEnter={() => setCardHovered(true)}
        onMouseLeave={() => setCardHovered(false)}
        className="block group"
      >
        <Card className="lg:aspect-[5/1] aspect-[4/3] sm:aspect-[4/1] xs:aspect-[4/3] md:aspect-[3/1] rounded-sm px-10 py-0 sm:py-8 relative overflow-hidden transition-all duration-300 group-hover:scale-[102%] hover:shadow-2xl">
          <canvas
            id="gradient-canvas"
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

          {/* Top Right Arrow */}
          <div className="absolute top-5 right-5 hidden md:block">
            <div className="backdrop-blur-sm rounded-full p-2.5 transition-all duration-300 group-hover:scale-105">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Card Content */}
          <CardContent className="relative flex flex-col items-center mt-6 justify-center h-full">
            <div className="transform -translate-y-4 flex flex-col items-center transition-all duration-300 group-hover:scale-105">
              {/* Icon Circle */}
              <div className="bg-white/50 group-hover:bg-white/90 transition-all duration-300 rounded-full p-6 md:p-7">
                <Rocket className="w-12 h-12 md:w-12 md:h-12 text-sky-400 transition-colors duration-300 group-hover:text-sky-500" />
              </div>
              <Badge className="mt-5 text-xs text-sky-800  bg-white/30 hover:bg-white/35 font-medium tracking-wide">
                Pilot Program • March 2025
              </Badge>
      
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};

export default EngineCard;
