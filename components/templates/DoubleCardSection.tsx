"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import MyButton from "@/components/Ui Components/MyButton"; // Adjust path as needed
import { Button } from "../molecules/shadcn/button";
import BlueWaveScene from "@/components/Ui Components/BlueWaveScene"; // Adjust path as needed

export default function DoubleCardSection() {
  const [showWave] = useState(true);

  return (
    <section className="relative pb-10 pt-10 md:pb-24 bg-white text-bold overflow-hidden">
      <div className="container lg:px-20 px-3 md:px-8 pt-3 lg:pt-4">
        {/* Grid: Top row (65%/35%) and bottom row (full width) */}
        <div className="grid grid-cols-1 md:grid-cols-[65%_35%] grid-rows-[auto_auto] gap-5 px-3 pr-5">
          {/* Card #1 (top-left, 65%) */}
          <div className="relative group rounded-lg border border-gray-200 bg-white py-12 px-12 transform hover:scale-105 transition-transform duration-300 shadow-sm">
            {/* (Optional) Background Wave: Add if needed */}
            {showWave && (
              <div className="absolute inset-0">
                {/* You can insert a wave background here if desired */}
              </div>
            )}
            {/* Top Right Arrow */}
            <div className="absolute top-4 right-4">
              <div className="bg-white opacity-50 rounded-full p-2 transition-transform duration-300 group-hover:scale-[103%]">
                <ArrowRight className="w-4 h-4 text-black" />
              </div>
            </div>
            <div className="relative z-10">
              <div className="transform -translate-y-4 transition-transform duration-300 group-hover:scale-[103%]">
                <h2 className="text-2xl font-semibold text-[#0a2540] mt-12">
                  Consultation
                </h2>
                <p className="mt-4 text-md text-gray-600 w-96">
                  Form your new business from anywhere. Atlas sets up your US
                  legal entity and tax ID, issues stock, and offers special
                  benefits to kickstart growth.
                </p>
                <div className="mt-6 mb-8">
                  <MyButton>Learn more</MyButton>
                </div>
              </div>
            </div>
          </div>
          {/* Card #2 (top-right, 35%) */}
          <div className="relative group rounded-lg border border-gray-200 bg-slate-900 py-12 px-12 transform hover:scale-105 transition-transform duration-300 shadow-sm">
            {showWave && (
              <div className="absolute inset-0">
                <BlueWaveScene
                  rotation={[-Math.PI / 3, 2.2, 7.2]}
                  enabled={showWave}
                />
              </div>
            )}
            {/* Top Right Arrow */}
            <div className="absolute top-4 right-4">
              <div className="bg-white opacity-50 rounded-full p-2 transition-transform duration-300 group-hover:scale-[103%]">
                <ArrowRight className="w-4 h-4 text-black" />
              </div>
            </div>
            <div className="relative z-10">
              <div className="transform -translate-y-4 transition-transform duration-300 group-hover:scale-[103%]">
                <h2 className="text-2xl font-semibold text-white mt-12">
                  API
                </h2>
                <p className="mt-4 text-md text-gray-300 w-80 pr-6">
                  Integrate with our flexible API to manage business operations,
                  launch new revenue models, and stay ahead in a rapidly changing
                  market.
                </p>
                <div className="mt-6">
                  <Button
                    className="bg-gray-200 text-gray-800 cursor-not-allowed"
                    variant={"outline"}
                  >
                    Coming soon
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Card #3 (bottom row, full width) */}
          <div className="relative group col-span-1 md:col-span-2 rounded-lg border border-gray-200 bg-gradient-to-r from-[rgb(84,104,255)] to-[rgb(233,216,255)] py-12 px-12 transform hover:scale-105 transition-transform duration-300 shadow-sm">
          {showWave && (
              <div className="absolute inset-0">
                <BlueWaveScene
                  rotation={[-Math.PI / 3, .1, 4.2]}
                  enabled={showWave}
                />
              </div>
            )}
  
            {/* Top Right Arrow */}
            <div className="absolute top-4 right-4">
              <div className="bg-white opacity-50 rounded-full p-2 transition-transform duration-300 group-hover:scale-[103%]">
                <ArrowRight className="w-4 h-4 text-black" />
              </div>
            </div>
            <div className="relative z-10">
              <div className="transform -translate-y-4 transition-transform duration-300 group-hover:scale-[103%]">
                <h2 className="text-2xl font-semibold text-gray-100 mt-12">
                  Platform
                </h2>
                <p className="mt-4 text-md text-gray-300 w-96">
                  Form your new business from anywhere. Atlas sets up your US
                  legal entity and tax ID, issues stock, and offers special
                  benefits to kickstart growth.
                </p>
                <div className="mt-6 mb-8">
                  <Button>Request Access</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
