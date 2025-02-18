"use client";

import React from "react";

interface CardProps {
  imageSection?: React.ReactNode;
  title: string;
  description: string;
  learnMoreText: string;
  linkHref: string;
}

const Card: React.FC<CardProps> = ({
  imageSection,
  title,
  description,
  learnMoreText,
  linkHref,
}) => {
  return (
    <div className="space-y-3">
      {/* Icon or small image (optional) */}
      {imageSection ? (
        <div>{imageSection}</div>
      ) : (
        <div className="h-6 w-6 bg-gray-100 rounded" />
      )}

      {/* Title */}
      <h3 className="text-[#0a2540] text-md font-semibold">
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs text-gray-600 leading-[1.5]">
        {description}
      </p>

      {/* Learn more link */}
      <a
        href={linkHref}
        className="text-xs text-blue-600 hover:underline"
      >
        {learnMoreText}
      </a>
    </div>
  );
};

export default Card;
