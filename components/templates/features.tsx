"use client";

import React from "react";
import { BarChart2, Scan, Umbrella, Wallet } from "lucide-react";
import Card from "@/components/Ui Components/Card"; // Adjust path as needed
import SectionTitle from "@/components/Ui Components/SectionTitle"; // Adjust path as needed
import InteractiveGrid from "@/components/Ui Components/InteractiveGrid"; // new component
import "./features.css";

export default function Features() {
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
    <section className="relative pb-40 md:pb-44 bg-white text-bold overflow-hidden">
      <div className="container lg:px-20 md:px-6 lg:px-8 pt-20">
        {/* Top Section: Title + Interactive Animation */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between  gap-8">
          {/* Left: Section Title */}
          <div className="flex-1">
            <SectionTitle
              title="Smarter Decisions, Better Outcomes"
              subtitle="Unlock the power of AI-driven simulations"
              description="Leverage predictive analytics and market forecasting for confident, data-driven decisions. Optimize processes, cut costs, and fine-tune strategies without costly experimentation—keeping your business ahead."
            />
          </div>

          {/* Right: Interactive Grid */}
          <div className="flex-1 flex items-center justify-center md:justify-end">
            <InteractiveGrid />
          </div>
        </div>

        {/* 2×2 Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 px-3 lg:px-20">
          {cardsData.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
