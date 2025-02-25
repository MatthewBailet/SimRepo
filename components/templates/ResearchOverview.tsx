"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/molecules/shadcn/card";
import { Microscope, BookOpen, Lightbulb, Users } from "lucide-react";

export default function ResearchOverview() {
  const areas = [
    {
      icon: <Microscope className="h-6 w-6 text-blue-500" />,
      title: "AI Model Development",
      description: "Creating specialized AI models for business forecasting and market analysis with unprecedented accuracy."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      title: "Industry Data Analysis",
      description: "Developing methodologies to extract meaningful insights from complex industry datasets."
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-blue-500" />,
      title: "Innovation Lab",
      description: "Experimental projects pushing the boundaries of what's possible in business intelligence."
    },
    {
      icon: <Users className="h-6 w-6 text-blue-500" />,
      title: "Academic Partnerships",
      description: "Collaborating with leading universities and research institutions to advance the field."
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-2xl text-slate-900 font-medium mb-4">
              Research Initiatives
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto  text-md  leading-relaxed">
              Our dedicated research division focuses on advancing the science of business intelligence through cutting-edge AI and data science.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {areas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="rounded-sm p-8 h-full bg-white border-slate-200 hover:shadow-lg transition-all duration-300 hover:border-slate-300">
                  <div className="flex flex-col items-start gap-6">
                    <div className="p-3 rounded-lg bg-slate-100 border border-slate-200">
                      {area.icon}
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-md text-slate-900 font-medium">{area.title}</h3>
                      <div className="w-12 h-0.5 bg-blue-500"></div>
                      <p className="text-slate-600 leading-relaxed text-sm">{area.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 