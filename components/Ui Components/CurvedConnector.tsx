"use client";

import React from "react";

export default function CurvedConnector() {
  return (
    <svg
      // Position behind nodes
      className="absolute z-[1]"
      // Adjust these width/height or set w-full/h-full if you want
      width="200"
      height="200"
      style={{
        top: "0px",
        left: "0px",
      }}
      fill="none"
    >
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5cc9f0" />
          <stop offset="100%" stopColor="#9f57ff" />
        </linearGradient>
      </defs>

      {/* Example path with a smooth 90° curve.
          Tweak coordinates to connect the exact centers of your NodeItems. */}
      <path
        d="M 50,50
           C 50,150 150,150 150,250"
        stroke="url(#lineGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
