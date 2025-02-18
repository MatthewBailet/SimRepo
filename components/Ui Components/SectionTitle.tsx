"use client";

import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle: string;
  description: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  description,
}) => {
  return (
    <div className="space-y-7 max-w-3xl px-3 lg:px-20 md:px-5 text-[rgb(111,127,242)]">
      <h2 className="text-md font-semibold tracking-tight text-2s md:text-md">
        {title}
      </h2>
      <h3 className="text-4xl font-semibold text-black leading-[1.2]">
        {subtitle}
      </h3>
      <p className="text-gray-600 text-md leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default SectionTitle;
