"use client";

import React from "react";
import "./stripeLine.css"; // We'll put our keyframes in here

/**
 * Example of a single "Stripe-like" line from (roughly) top-right to bottom-left.
 * Adjust the path, positions, and sizes to match your layout.
 */
export default function StripeLikeLine() {
  return (
    <svg
      className="StripeLine absolute"
      // Position & size the SVG so it covers the route between your two nodes
      style={{
        left: "81px",
        top: "257px",
        width: "135px",
        height: "53px",
      }}
      fill="none"
      // The path references our gradient
      stroke="url(#StripeLineGradient)"
      strokeWidth="2"
    >
      {/* Gradient definition */}
      <defs>
        <linearGradient
          className="RotatingGradient"
          id="StripeLineGradient"
          gradientUnits="userSpaceOnUse"
          // these x1,y1,x2,y2 define how the gradient is oriented
          x1="99.74623541247894"
          x2="0.2537645875285648"
          y1="44.96889055115797"
          y2="55.03110944891609"
        >
          <stop offset="0" stopColor="#11EFE3" />
          <stop offset="1" stopColor="#0073E6" />
          {/* OPTIONAL: Animate the gradient's rotation. Comment out if not needed.
              This rotates the gradient center from 180deg to 540deg, repeating infinitely. */}
          <animateTransform
            attributeName="gradientTransform"
            type="rotate"
            from="180 50 50"
            to="540 50 50"
            dur="6s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>

      {/* The path is curved with M / L / Q commands. Tweak as needed. */}
      <path
        d="M134,1
           L134,32
           Q134,52
            114,52
           L1,52"
        // We'll animate the line drawing in CSS:
        // strokeDasharray = total length of the path (approx. 176.465)
        // strokeDashoffset = same initial value => hidden
        // animation => bring offset to 0
        style={{
          strokeDasharray: "176.465px",
          strokeDashoffset: "176.465px",
          animation: "drawLine 2s forwards ease-in-out",
        }}
      />
    </svg>
  );
}