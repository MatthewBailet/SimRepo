"use client";

import React from "react";

interface CardProps {
  icon: React.ReactNode; // Lucide icon
  title: string;
  description: string;
  learnMoreText: string;
  linkHref: string;
}

const Card: React.FC<CardProps> = ({
  icon,
  title,
  description,
  learnMoreText,
  linkHref,
}) => {
  return (
    <div className="space-y-3 ">
      {/* Icon */}
      <div>{icon}</div>

      {/* Title */}
      <h3 className="text-[#0a2540] text-md font-semibold">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600">
        {description}
      </p>

      {/* Learn more link (no underline) */}
      <a
        href={linkHref}
        className="text-sm text-[rgb(111,127,242)] hover:no-underline"
      >
        {learnMoreText}
      </a>
    </div>
  );
};

export default Card;
