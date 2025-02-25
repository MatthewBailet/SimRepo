"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart2, Scan, Umbrella, Wallet, Activity, Database, Globe, Sparkles } from "lucide-react";
import DashboardPreview from "@/components/Ui Components/DashboardPreview";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Badge } from "@/components/molecules/shadcn/badge";
import EngineCard from "@/components/Ui Components/EngineCard";

const featureCards = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Run Case Simulation",
    subtitle: "Fast and accurate market analysis",
    description: "Advanced AI-driven simulations that process vast amounts of market data to generate precise business scenarios and strategic insights.",
    details: [
      "Real-time market condition analysis",
      "Predictive modeling & forecasting", 
      "Risk assessment & mitigation strategies"
    ]
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Industry Intelligence",
    subtitle: "High-precision data collection",
    description: "Enterprise-grade web scraping infrastructure that continuously monitors and analyzes market trends, competitor activities, and industry developments.",
    details: [
      "Automated trend detection",
      "Competitive intelligence gathering",
      "Market sentiment analysis"
    ]
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Seamless Integration", 
    subtitle: "Seamless system connectivity",
    description: "Comprehensive data parsing and integration capabilities that connect with your existing systems while maintaining data integrity and security.",
    details: [
      "Multi-format data processing",
      "Automated ETL pipelines",
      "Real-time synchronization"
    ]
  }
];

export default function Features() {
  const [ref, isInView] = useIntersectionObserver(0.1);

  return (
    <section ref={ref} className="relative bg-white text-bold overflow-hidden pb-8 pt-20">


      <div className="container relative z-10 pt-0 px-3">

        
<div className="mx-auto md:pt-10 mb-28 px-0 md:px-6 ">

          <EngineCard />

        </div>


        <motion.div

          className="text-center mb-24"
        >
          <h2 className="text-4xl font-semibold text-slate-800 mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-600 text-center justify-center max-w-2xl mx-auto pd-12">
            Transform your business intelligence with our AI-powered platform, delivering 
            actionable insights through advanced analytics and real-time data processing.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row">
          {/* Left side: Feature cards */}
          <div className="lg:w-1/2 px-0 md:px-6 lg:pr-8">
            <div className="space-y-6">
              {featureCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="backdrop-blur-sm border border-gray-200 rounded-lg p-6 transition-all duration-300 bg-white">
                    <div className="rounded-lg bg-blue-50 p-2 w-fit mb-4">
                      <div className="h-5 w-5 text-blue-600">
                        {card.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="font-medium text-sm mb-3 text-gray-600">
                      {card.subtitle}
                    </p>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {card.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {card.details.map((detail, i) => (
                        <Badge 
                          key={i}
                          variant="outline"
                          className="bg-blue-50 text-blue-600 border-blue-100"
                        >
                          {detail}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side: Platform preview */}
          <div className="lg:w-1/2 relative mt-12 lg:mt-0">
            <div className="absolute left-0 right-[-50vw]">
              <DashboardPreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
