"use client";

import React, { useRef, useState, useEffect } from "react";
import { BarChart2, Scan, Umbrella, Wallet } from "lucide-react";
import Card from "@/components/Ui Components/Card"; // Adjust path as needed
import SectionTitle2 from "@/components/Ui Components/SectionTitle2"; // Adjust path as needed
import InteractiveGrid from "@/components/Ui Components/InteractiveGrid"; // new component
import "./features.css";
import { Button } from "../molecules/shadcn/button";
import ColoredBackgroundWaveScene from "@/components/Ui Components/ColoredBackgroundWaveScene"; // Adjust path as needed

export default function Explaination() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSectionInView, setIsSectionInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsSectionInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-bold overflow-hidden"
    >
      {/* Background Wave (only render when in view) */}
      {isSectionInView && (
        <div className="absolute inset-0 -z-8">
          <ColoredBackgroundWaveScene color="rgb(255,22,112)" />
        </div>
      )}
      {/* Content container with higher z-index */}
      <div className="container relative z-10 md:px-6 lg:px-3 pt-8 pb-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left: Section Title */}
          <div className="flex-1">
            <SectionTitle2
              title="Built for Precision"
              subtitle="Reliable AI-driven processing, from data to decision"
              description="Our platform ingests, structures, and analyzes complex data with AI-powered parsers, real-time automation, and advanced simulations. By handling the heavy lifting—data integration, pattern recognition, and predictive modeling—we deliver high-accuracy insights, empowering you to make strategic decisions with confidence."
            />
          </div>
          {/* Right: Interactive Grid */}
          <div className="flex-1">
            <InteractiveGrid />
          </div>
        </div>
      </div>
    </section>
  );
}
