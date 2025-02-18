"use client";

import React from "react";

interface MyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function MyButton({ children, onClick }: MyButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        inline-flex items-center justify-center
        rounded-md border border-transparent
        bg-[rgb(111,127,242)] px-4 py-2
        text-sm font-medium text-white
        hover:opacity-90
        transition-opacity duration-200
      "
    >
      {children}
    </button>
  );
}
