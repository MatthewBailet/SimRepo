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
    <div className="space-y-7 px-3 lg:px-12 md:px-5 text-[rgb(111,127,242)]">
      <h2 className="text-md font-semibold tracking-tight text-2s md:text-md">
        {title}
      </h2>
      <h3 className="lg:text-5xl text-4xl max-w-md font-semibold text-slate-800 tracking-tight">
        {subtitle}
      </h3>
      <p className="text-gray-700 max-w-lg  text-md leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default SectionTitle;
