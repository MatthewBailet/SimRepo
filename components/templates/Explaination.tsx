"use client";

import React, { useRef, useState, useEffect } from "react";
import SectionTitle2 from "@/components/Ui Components/SectionTitle2"; // Adjust path as needed
import InteractiveGrid from "@/components/Ui Components/InteractiveGrid"; // Adjust path as needed
import CardList from "@/components/Ui Components/CardList"; // Adjust path as needed
import ColoredBackgroundWaveScene from "@/components/Ui Components/ColoredBackgroundWaveScene"; // Adjust path as needed

import { Book, BarChart2, Globe, DollarSign } from "lucide-react";

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

  // Sample data for the four cards
  const cardItems = [
    {
      icon: <Book size={24} />,
      title: "Launch in weeks",
      description:
        "Use hosted or embedded functionality for rapid setup, so you can focus on building your product—not on payment complexities.",
      colorClass: "bg-blue-500",
    },
    {
      icon: <BarChart2 size={24} />,
      title: "Manage payments at scale",
      description:
        "Leverage robust tooling, advanced analytics, and global payment methods to streamline operations and scale seamlessly.",
      colorClass: "bg-green-500",
    },
    {
      icon: <Globe size={24} />,
      title: "Grow globally",
      description:
        "Reach new markets worldwide with local payment methods and the ability to easily onboard new customers.",
      colorClass: "bg-purple-500",
    },
    {
      icon: <DollarSign size={24} />,
      title: "Build new lines of revenue",
      description:
        "Monetize more effectively by collecting fees on each transaction. Expand with financing, expense cards, and more.",
      colorClass: "bg-pink-500",
    },
  ];

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

      <div className="container relative z-10 md:px-6 lg:px-12 pt-8 pb-20">
        {/* Top Section: Title + Interactive Animation */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left: Section Title */}
          <div className="flex-1">
            <SectionTitle2
              title="Built for Precision"
              subtitle="Reliable AI-Driven Processing, From Data to Decision"
              description="Our AI-powered platform transforms complex data into actionable insights through automated parsing, pattern recognition, and predictive modeling—empowering confident decision-making."
            />
          </div>
          {/* Right: Interactive Grid */}
          <div className="flex-1">
            <InteractiveGrid />
          </div>
        </div>

        {/* Card List Section (the four cards in a row) */}
        <div className="mt-40">
          <CardList items={cardItems} />
        </div>
      </div>
    </section>
  );
}
