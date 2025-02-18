"use client";

import React, { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/molecules/shadcn/tooltip"; // Adjust path as needed

type NodeItemProps = {
  icon: ReactNode;   // The icon to display
  label: string;     // Tooltip label
};

export default function NodeItem({ icon, label }: NodeItemProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="rounded-lg border border-gray-200 bg-white w-16 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-sm">
            {icon}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
