"use client";

import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle: string;
  description: string;
}

const SectionTitle2: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  description,
}) => {
  return (
    <div className="space-y-7 px-0 md:px-3 lg:px-20 md:px-5 pt-20 text-[rgb(202,14,73)]">
      <h2 className="text-md font-semibold tracking-tight text-2s">
        {title}
      </h2>
      <h3 className="text-4xl max-w-lg font-semibold text-gray-50 leading-[1.2]">
        {subtitle}
      </h3>
      <p className="text-gray-400 max-w-lg  text-md leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default SectionTitle2;
