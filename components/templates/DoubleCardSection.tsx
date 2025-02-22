"use client";

import React from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ArrowRight, Briefcase, Code, Layers } from "lucide-react";
import { Button } from "../molecules/shadcn/button";
import { Badge } from "../molecules/shadcn/badge";
import BlueWaveScene from "@/components/Ui Components/BlueWaveScene";

export default function DoubleCardSection() {
  const [ref, isSectionInView] = useIntersectionObserver(0.1);

  return (
    <section
      ref={ref}
      className="relative pt-24 pb-4 bg-white text-bold overflow-hidden"
    >
      <div className="container lg:px-14 px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr] gap-6">
          {/* Consultation Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="absolute top-4 right-4">
              <div className="rounded-full bg-gray-50 p-2 transition-all duration-300 group-hover:bg-gray-100">
                <ArrowRight className="h-4 w-4 text-gray-600" />
              </div>
            </div>
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center space-x-2">
                <div className="rounded-lg bg-blue-50 p-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100">
                  Enterprise
                </Badge>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Business Consultation
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed max-w-lg">
                  Expert guidance on implementing AI solutions in your business workflow. 
                  Our consultants help optimize your processes and maximize ROI through 
                  data-driven strategies.
                </p>
              </div>
              <Button className="bg-gray-900 hover:bg-gray-800">
                Schedule Consultation
              </Button>
            </div>
          </div>

          {/* API Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
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
          </div>

          {/* Platform Card */}
          <div className="group relative col-span-full overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-600 p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
            {isSectionInView && (
              <div className="absolute inset-0 opacity-50">
                <BlueWaveScene
                  rotation={[-Math.PI / 3, 0.1, 4.2]}
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
                  <Layers className="h-5 w-5 text-white" />
                </div>
                <Badge variant="outline" className="bg-white/5 text-white border-white/20">
                  Platform
                </Badge>
              </div>
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold text-white">
                  Enterprise Platform
                </h2>
                <p className="mt-4 text-gray-100 leading-relaxed">
                  Access our complete suite of AI-powered tools and services. 
                  Transform your business operations with advanced analytics, 
                  automated workflows, and real-time insights.
                </p>
              </div>
              <Button className="bg-white text-gray-900 hover:bg-gray-100">
                Request Access
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


