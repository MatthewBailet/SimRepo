"use client";

import React from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Terminal, Database, Network, Braces } from "lucide-react";
import { Badge } from "@/components/molecules/shadcn/badge";
import { Card } from "@/components/molecules/shadcn/card";
import ColoredBackgroundWaveScene from "@/components/Ui Components/ColoredBackgroundWaveScene";

const features = [
  {
    icon: <Terminal className="h-6 w-6" />,
    title: "Advanced Parser Engine",
    description: "High-performance data extraction with support for complex nested structures and custom formats.",
    techStack: ["Pattern Matching", "Custom DSL", "Streaming"]
  },
  {
    icon: <Braces className="h-6 w-6" />,
    title: "Intelligent Scraping",
    description: "Self-learning data collection system with automatic rate limiting and proxy rotation.",
    techStack: ["ML-Based", "Auto-Scaling", "Distributed"]
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Data Pipeline",
    description: "Real-time data processing with built-in validation and transformation capabilities.",
    techStack: ["Stream Processing", "Schema Validation", "ETL"]
  },
  {
    icon: <Network className="h-6 w-6" />,
    title: "API Framework",
    description: "Enterprise-grade integration layer supporting multiple protocols and data formats.",
    techStack: ["REST", "GraphQL", "WebSocket"]
  }
];

export default function Explanation() {
  const [ref, isInView] = useIntersectionObserver(0.1);

  return (
    <section
      ref={ref}
      className="relative bg-white text-bold overflow-hidden py-12"
    >
      {isInView && (
        <div className="absolute inset-0 -z-8">
          <ColoredBackgroundWaveScene 
            color="rgb(111,127,242)" 
            shouldRasterize={true}
          />
        </div>
      )}

      <div className="container relative z-10 px-6 md:px-6 lg:px-20">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge 
              variant="outline" 
              className="bg-blue-500/5 text-blue-600 border-blue-200 mb-4"
            >
              Technical Architecture
            </Badge>
            <h2 className="text-4xl font-semibold text-slate-900 mb-6">
              Built for Enterprise Scale
            </h2>
            <p className="text-gray-600 text-md max-w-2xl mx-auto">
              Our platform leverages cutting-edge technology to deliver reliable, 
              scalable data processing with enterprise-grade security and performance.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/50 backdrop-blur-sm border-gray-100 p-6 h-full hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/5 rounded-lg text-blue-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-slate-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {feature.techStack.map((tech, i) => (
                        <Badge 
                          key={i} 
                          variant="outline" 
                          className="bg-gray-50 text-gray-600 border-gray-200"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}