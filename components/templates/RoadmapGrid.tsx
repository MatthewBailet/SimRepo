"use client";

import { motion } from "framer-motion";

const roadmapItems = [
  {
    title: "Advanced Simulation Engine",
    category: "Technology",
    description: "Enhanced core simulation capabilities with multi-agent modeling and real-time processing.",
    progress: 75,
    daysLeft: 15,
    raised: 7500,
    goal: 10000
  },
  {
    title: "Industry Data Integration",
    category: "Technology",
    description: "Expanding our data sources with real-time industry feeds and market indicators.",
    progress: 60,
    daysLeft: 20,
    raised: 3200,
    goal: 5000
  },
  {
    title: "Collaborative Workspace",
    category: "Community",
    description: "Building tools for team collaboration and shared simulation environments.",
    progress: 80,
    daysLeft: 10,
    raised: 6000,
    goal: 8000
  },
  {
    title: "AI Model Marketplace",
    category: "Technology",
    description: "Platform for sharing and monetizing custom AI simulation models.",
    progress: 45,
    daysLeft: 25,
    raised: 9000,
    goal: 15000
  },
  {
    title: "Enterprise Dashboard",
    category: "Business",
    description: "Comprehensive analytics and reporting for enterprise users.",
    progress: 90,
    daysLeft: 5,
    raised: 4500,
    goal: 12000
  },
  {
    title: "API Enhancement Suite",
    category: "Development",
    description: "Expanding API capabilities for deeper integration and customization.",
    progress: 30,
    daysLeft: 30,
    raised: 3500,
    goal: 7000
  }
];

export default function RoadmapGrid() {
  return (
    <section className="pb-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roadmapItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 rounded-lg p-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-blue-400">
                  {item.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {item.description}
              </p>
              <div className="space-y-3">
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    ${item.raised.toLocaleString()} raised
                  </span>
                  <span className="text-gray-400">
                    ${item.goal.toLocaleString()} goal
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {item.daysLeft} days left
                  </span>
                  <button className="text-sm text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Support This Project
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 