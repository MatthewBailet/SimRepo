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
  Engine: "rgb(34, 197, 94)",    // green-500
  Plugins: "rgb(249, 115, 22)",  // orange-500
  Summary: "rgb(239, 68, 68)",   // red-500
};

type NodeItemProps = {
  icon: ReactNode;
  label: string;
  isVisible: boolean;
};

export default function NodeItem({ icon, label, isVisible }: NodeItemProps) {
  const [isColorPop, setIsColorPop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsColorPop(true);
      setShowTooltip(true);
      const timer = setTimeout(() => {
        setIsColorPop(false);
        setShowTooltip(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <TooltipProvider>
      <Tooltip open={showTooltip}>
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
              className="rounded-lg border border-gray-200 w-16 h-16 flex items-center justify-center shadow-sm hover:shadow-md"
              animate={{
                scale: isColorPop || isHovered ? 1.3 : 1,
                backgroundColor: isColorPop || isHovered 
                  ? colorMap[label as keyof typeof colorMap] 
                  : "#FFFFFF",
              }}
              transition={{ duration: 0.1 }}
            >
              <div className={`transition-colors duration-300 ${
                isColorPop || isHovered ? "text-white" : "text-gray-600"
              }`}>
                {icon}
              </div>
            </motion.div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="bg-slate-800 text-white">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
