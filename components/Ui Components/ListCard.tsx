"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../molecules/shadcn/button";

export type ListCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

/**
 * Renders a single card with an icon, a title, and a description.
 * It also displays a top-right arrow icon that scales slightly on hover.
 */
export default function ListCard({
  icon,
  title,
  description,
}: ListCardProps) {
  return (
    <div className="relative group rounded-lg border border-gray-200 bg-white px-6 pt-6 pb-6 shadow-md transition-transform duration-300 hover:scale-105">
      {/* Top Right Arrow */}
      <div className="absolute top-4 right-4">
        <div className="bg-white opacity-50 rounded-full p-2 transition-transform duration-300 group-hover:scale-[103%]">
          <ArrowRight className="w-4 h-4 text-black" />
        </div>
      </div>
      {/* Top Row: Icon */}
      <div className="flex items-center mb-2 space-x-2">
        {icon && <div className="text-[rgb(84,104,255)]">{icon}</div>}
      </div>
      <h3 className="text-sm mt-8 font-semibold text-[#0a2540]">{title}</h3>
      <p className="text-sm text-gray-600 mt-3 leading-relaxed">{description}</p>
    </div>
  );
}
