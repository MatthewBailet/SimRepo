"use client";

import React from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ArrowRight, Briefcase, Code, Layers } from "lucide-react";
import { Button } from "../molecules/shadcn/button";
import { Badge } from "../molecules/shadcn/badge";
import BlueWaveScene from "@/components/Ui Components/BlueWaveScene";

export default function DoubleCardSection() {
  const [ref, isSectionInView] = useIntersectionObserver(0.1);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section
      ref={ref}
      className="relative pt-8 pb-4 bg-white text-bold overflow-hidden"
    >
      <div className="container lg:px-9 px-6">
        <motion.div 
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr] gap-6"
        >
          {/* Consultation Card */}
          <motion.div 
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300"
          >
            <div className="absolute top-4 right-4">
              <div className="rounded-full bg-gray-50 p-2 transition-all duration-300 group-hover:bg-gray-100">
                <ArrowRight className="h-4 w-4 text-gray-600" />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2">
                <div className="rounded-lg bg-blue-50 p-2">
                  <Briefcase className="h-5 w-5 text-blue-500" />
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-500 border-blue-200">
                  Business
                </Badge>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Strategic Consultation
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Work with our team of strategic consultants to analyze your market 
                  position and develop actionable intelligence for your business.
                </p>
              </div>
              <Button className="bg-blue-500 hover:bg-blue-600">
                Book a Call
              </Button>
            </div>
          </motion.div>

          {/* API Card */}
          <motion.div 
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-lg transition-all duration-300"
          >
            {isSectionInView && (
              <div className="absolute inset-0">
                <BlueWaveScene
                  rotation={[-Math.PI / 3, 2.2, 7.2]}
                  enabled={isSectionInView}
                />
              </div>
            )}
            <div className="absolute top-4 right-4">
              <div className="rounded-full bg-white/10 p-2 transition-all duration-300 group-hover:bg-white/20">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center space-x-2">
                <div className="rounded-lg bg-white/10 p-2">
                  <Code className="h-5 w-5 text-blue-400" />
                </div>
                <Badge variant="outline" className="bg-white/5 text-blue-400 border-blue-400/20">
                  Developer
                </Badge>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  API Access
                </h2>
                <p className="mt-4 text-gray-300 leading-relaxed">
                  Integrate our powerful AI capabilities directly into your applications 
                  with our comprehensive API suite.
                </p>
              </div>
              <Button variant="outline" className="text-gray-300 border-gray-700 hover:bg-gray-800">
                Coming Soon
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


