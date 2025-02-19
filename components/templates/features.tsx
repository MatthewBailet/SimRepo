"use client";

import React, { useRef, useState, useEffect } from "react";

import { BarChart2, Scan, Umbrella, Wallet } from "lucide-react";
import Card from "@/components/Ui Components/Card"; // Adjust path as needed
import SectionTitle from "@/components/Ui Components/SectionTitle"; // Adjust path as needed
import InteractiveGrid from "@/components/Ui Components/InteractiveGrid"; // new component
import { AspectRatio } from "@/components/molecules/shadcn/aspect-ratio"; // ShadCN's AspectRatio component
import "./features.css";
import { Separator } from "../molecules/shadcn/separator";
import ColoredBackgroundWaveScene2 from "@/components/Ui Components/ColoredBackgroundWaveScene2"; // Adjust path as needed


export default function Features() {

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
  

  // Updated card data with Lucide icons
  const cardsData = [
    {
      icon: <BarChart2 className="h-6 w-6 text-[rgb(111,127,242)]" />,
      title: "Predictive Analysis & Forecasting",
      description:
        "Gain data-driven insights with AI-powered predictive analysis and forecasting. Identify trends, anticipate outcomes, and make smarter business decisions with confidence.",
      learnMoreText: "Learn about Prediction & Forecasting",
      linkHref: "#",
    },
    {
      icon: <Scan className="h-6 w-6 text-[rgb(111,127,242)]" />,
      title: "Market Forecasting",
      description:
        "Stay ahead of the competition with AI-driven market forecasting. Analyze trends, predict demand, and make informed business decisions with data-backed insights.",
      learnMoreText: "Learn about Market Forecasting",
      linkHref: "#",
    },
    {
      icon: <Umbrella className="h-6 w-6 text-[rgb(111,127,242)]" />,
      title: "Risk Reduction",
      description:
        "Minimize uncertainty with AI-powered risk reduction. Identify potential threats, test scenarios, and make data-driven decisions to safeguard your business.",
      learnMoreText: "Learn about Risk Management",
      linkHref: "#",
    },
    {
      icon: <Wallet className="h-6 w-6 text-[rgb(111,127,242)]" />,
      title: "Optimization",
      description:
        "Maximize efficiency with AI-driven optimization. Fine-tune parameters, streamline processes, and achieve peak performance with data-backed insights.",
      learnMoreText: "Learn about Operational Efficiency",
      linkHref: "#",
    },
  ];

  return (
    <section
    ref={sectionRef} className="relative bg-white text-bold overflow-hidden">
       {/* Background Wave (only render when in view) */}
            {isSectionInView && (
              <div className="absolute inset-0 -z-8 -mt-96 lg:mt-0">
                <ColoredBackgroundWaveScene2 color="rgb(255,22,112)" />
              </div>
            )}
      
      <div className="container relative z-10  lg:px-20 md:px-6 pt-20 lg:mt-20 mt-5">
        {/* Top Section: Title + Interactive Animation */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          {/* Left: Section Title */}
          <div className="flex-1 mb-5 lg:mb-20">
            <SectionTitle
              title="Smarter Decisions, Better Outcomes"
              subtitle="AI-Powered Solutions for Better Predictions and Risk-Free Decisions"
              description="Leverage predictive analytics and market forecasting for confident, data-driven decisions. Optimize processes, cut costs, and fine-tune strategies without costly experimentation—keeping your business ahead."
            />

          <Separator className=" mt-8 visible lg:hidden"/>
        
          </div>

          {/* Right: AspectRatio Placeholder */}
          <div className="flex">
           
          </div>
        </div>

        {/* 2×2 Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-0 lg:mt-24 px-3 lg:px-12 py-2">
          {cardsData.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
