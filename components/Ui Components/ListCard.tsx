"use client";

import React from "react";

type ListCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass?: string; // e.g. "bg-blue-500"
};

/**
 * Renders a single card with a small color spacer, an icon, a title, and a description.
 */
export default function ListCard({
  icon,
  title,
  description,
  colorClass = "bg-blue-500",
}: ListCardProps) {
  return (
    <div className="flex flex-col items-start p-0 w-full max-w-2xs text-left max-h-40">
      {/* Top Row: Small color bar + icon + title */}
      <div className="flex items-center mb-2 space-x-2">
        {/* Small color spacer */}

        {/* Icon (if any) */}
        {icon && <div className="text-gray-600 pb-2">{icon}</div>}
        {/* Title */}
        
      </div>
      <h3 className="text-2sm font-medium text-[#0a2540]">{title}</h3>

      {/* Description */}
      <p className="text-xs text-gray-600 mt-3 leading-relaxed">{description}</p>
    </div>
  );
}
