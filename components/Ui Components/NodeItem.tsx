"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/molecules/shadcn/tooltip";

// Color mapping for different node types
const colorMap = {
  Databook: "rgb(242, 111, 153)", // blue-500
  Parser: "rgb(85, 112, 247)",   // purple-500
  Webscraper: "rgb(234, 179, 8)", // yellow-500
  Engine: "rgb(111,127,242)",    // green-500
  Plugins: "rgb(95, 248, 128)",  // orange-500
  Summary: "rgb(91, 214, 254)",   // red-500
};

// First, let's define gradient pairs for each type
const gradientMap = {
  Databook: {
    color1: "rgb(242, 111, 153)",
    color2: "rgb(255, 0, 76)"
  },
  Parser: {
    color1: "rgb(85, 112, 247)",
    color2: "rgb(75, 150, 255)"
  },
  Webscraper: {
    color1: "rgb(234, 179, 8)",
    color2: "rgb(255, 170, 33)"
  },
  Engine: {
    color1: "rgb(111,127,242)",
    color2: "rgb(0, 255, 213)"
  },
  Plugins: {
    color1: "rgb(0, 255, 38)",
    color2: "rgb(123, 255, 126)"
  },
  Summary: {
    color1: "rgb(91, 214, 254)",
    color2: "rgb(150, 97, 255)"
  }
};

type NodeItemProps = {
  icon: ReactNode;
  label: string;
  isVisible: boolean;
  finalPop: boolean;
};

export default function NodeItem({ icon, label, isVisible, finalPop }: NodeItemProps) {
  const [isColorPop, setIsColorPop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only do initial pop animation if it's not the Summary node
    if (isVisible && label !== "Summary") {
      setIsColorPop(true);
      const timer = setTimeout(() => {
        setIsColorPop(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, label]);

  // Final pop animation for Summary node only
  useEffect(() => {
    if (finalPop && label === "Summary") {
      setIsColorPop(true);
      const timer = setTimeout(() => {
        setIsColorPop(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [finalPop, label]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 0.8,
            }}
            transition={{ duration: 0.5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.div
              className="w-16 h-16 flex items-center justify-center shadow-sm hover:shadow-md relative rounded-md bg-white"
              animate={{
                scale: isColorPop || isHovered ? 1.3 : 1,
                backgroundColor: isColorPop || isHovered 
                  ? colorMap[label as keyof typeof colorMap] 
                  : "white",
              }}
              transition={{ duration: 0.1 }}
              style={{
                border: '2px solid transparent',
                backgroundClip: 'padding-box',
                position: 'relative',
              }}
            >
              {/* Gradient Border */}
              <div
                className="absolute inset-0 rounded-md -z-10"
                style={{
                  margin: '-2px',
                  background: `linear-gradient(45deg, 
                    ${gradientMap[label as keyof typeof gradientMap].color1}, 
                    ${gradientMap[label as keyof typeof gradientMap].color2})`,
                  backgroundSize: '200% 200%',
                  animation: 'gradient 2s ease infinite',
                }}
              />
              
              {/* Icon with gradient */}
              <div 
                className="relative z-10"
                style={{
                  color: isColorPop || isHovered 
                    ? 'white' 
                    : 'rgb(30,41,59)',
                  background: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {icon}
              </div>
            </motion.div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="bg-white text-slate-800">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
