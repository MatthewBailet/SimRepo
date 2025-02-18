"use client";

import React from "react";
import { BarChart2, Scan, Umbrella, Wallet } from "lucide-react";
import Card from "@/components/Ui Components/Card"; // Adjust path as needed
import SectionTitle from "@/components/Ui Components/SectionTitle"; // Adjust path as needed
import InteractiveGrid from "@/components/Ui Components/InteractiveGrid"; // new component
import "./features.css";

export default function Explaination() {


  return (
    <section className="relative pb-20 md:pb-12 bg-white text-bold overflow-hidden">
      <div className="container lg:px-20 md:px-6 lg:px-3 pt-8">
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

        </div>

       <InteractiveGrid/>
      </div>
    </section>
  );
}
