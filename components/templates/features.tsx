"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart2, Scan, Umbrella, Wallet, Activity, Database, Globe, Sparkles, FileText } from "lucide-react";
import DashboardPreview2 from "@/components/Ui Components/DashboardPreview";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Badge } from "@/components/molecules/shadcn/badge";
import EngineCard from "@/components/Ui Components/EngineCard";

const featureCards = [

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
    icon: <Sparkles className="h-6 w-6" />,
    title: "Run Case Simulations",
    subtitle: "Fast and accurate market analysis",
    description: "Advanced AI-driven simulations that process vast amounts of market data to generate precise business scenarios and strategic insights.",
    details: [
      "Real-time market condition analysis",
      "Predictive modeling & forecasting", 
      "Risk assessment & mitigation strategies"
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

// Animation components
const IndustryIntelligenceAnimation = () => {
  const [currentSite, setCurrentSite] = useState(0);
  const websites = [
    "Wikipedia.com",
    "ResearchGate.com",
    "JSTOR.org",
    "ScienceDirect.com",
    "Bloomberg.com",
    "Forbes.com",
    "Reuters.com",
    "MarketWatch.com",
    "Harvard.edu"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSite(prev => (prev + 1) % websites.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-20 mt-4 mb-0 mt-16 select-none" style={{ userSelect: 'none' }}>
      <div className="flex items-center justify-center">
        <motion.div 
          className="absolute left-6 h-8 px-3 py-2 bg-blue-100 rounded-lg flex items-center text-sm"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 30, opacity: 1 }}
          exit={{ x: 140, opacity: 0 }}
          key={websites[currentSite]}
          transition={{ duration: 1.5 }}
        >
          {websites[currentSite]}
        </motion.div>
        <motion.div 
          className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center absolute"
        >
          <div className="text-blue-600">
            <Scan className="h-8 w-8" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const CaseSimulationAnimation = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const queries = [
    "How will market trends affect revenue?",
    "What if we increase prices by 10%?", 
    "Best expansion regions for Q3 2024?",
    "Competitor response to our new product?",
    "Customer churn prediction next quarter",
    "Supply chain optimization strategies",
    "Marketing budget allocation ROI",
    "Employee retention impact analysis",
    "New product launch timing simulation"
  ];

  useEffect(() => {
    const currentQuery = queries[currentIndex];
    
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
      }, isDeleting ? 900 : 8000); // Increased pause times
      
      return () => clearTimeout(pauseTimeout);
    }
    
    let timer;
    
    if (isDeleting) {
      if (text === '') {
        // Move to next query when deletion is complete
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % queries.length);
        return;
      }
      
      timer = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
      }, 35); // Slightly faster deletion
    } else {
      if (text === currentQuery) {
        // Start deleting after typing is complete
        setIsPaused(true);
        setIsDeleting(true);
        return;
      }
      
      const randomDelay = Math.random() * 20 + 25; // Random delay between 25-45ms
      timer = setTimeout(() => {
        setText(currentQuery.slice(0, text.length + 1));
      }, randomDelay); // More natural typing speed with variation
    }
    
    return () => clearTimeout(timer);
  }, [text, isDeleting, currentIndex, isPaused, queries]);

  return (
    <div className="h-24 mt-4 mb-6 select-none" style={{ userSelect: 'none' }}>
      <div className="mx-auto max-w-md">
        <motion.div className="border border-gray-200 rounded-lg p-2 bg-white shadow-sm">
          <div className="relative">
            <motion.div 
              className="h-8 bg-white rounded px-3 py-1 border border-gray-200 flex items-center overflow-hidden"
            >
              <span className="pr-1 text-sm">
                {text}
              </span>
              <motion.span 
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-1 h-4 bg-blue-500 inline-block ml-1"
              />
            </motion.div>
          </div>
          <div className="flex justify-end mt-2 space-x-2">
            <motion.button 
              className="px-3 py-1 text-xs rounded bg-gray-200 text-gray-700"
            >
              Quick run
            </motion.button>
            <motion.button 
              className="px-3 py-1 text-xs rounded bg-blue-500 text-white"
              whileHover={{ scale: 1.05 }}
            >
              Simulate
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const IntegrationAnimation = () => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setChecked(prev => !prev);
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="h-24 mt-4 mb-6 flex items-center justify-center select-none" style={{ userSelect: 'none' }}>
      <motion.div className="relative flex items-center justify-center">
        <motion.div 
          className="w-16 h-20 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center"
          animate={{ rotate: checked ? [0, 5, 0] : 0 }}
          transition={{ duration: 0.3 }}
        >
          {!checked ? (
            <motion.div className="relative text-blue-500">
              <FileText className="h-8 w-8" />
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeDasharray="40" strokeDashoffset="10" />
                </svg>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-green-500"
            >
              <motion.div>
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <motion.path
                    d="M9 12l2 2 4-4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default function Features() {
  const [ref, isInView] = useIntersectionObserver(0.1);
  const [activeCard, setActiveCard] = useState(0);
  const [pulseIndex, setPulseIndex] = useState(-1);

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Cycle through animations only when in view
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % featureCards.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isInView]);

  // Sequential pulse animation
  useEffect(() => {
    if (!isInView) return;
    
    const startSequence = () => {
      // Reset
      setPulseIndex(-1);
      
      // First connector pulse
      setTimeout(() => {
        setPulseIndex(0);
        
        // Second connector pulse
        setTimeout(() => {
          setPulseIndex(1);
          
          // Reset after second pulse
          setTimeout(() => {
            startSequence();
          }, 1000);
        }, 1000);
      }, 500);
    };
    
    startSequence();
    return () => {
      setPulseIndex(-1);
    };
  }, [isInView]);

  return (
    <section ref={ref} className="relative bg-white text-bold overflow-hidden pb-8 pt-20">
      <div className="container relative z-10 pt-0 px-3">
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mx-auto md:pt-10 mb-28 px-0 md:px-6"
        >
          <EngineCard />
        </motion.div>

        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center sm:mb:10 md:mb-24"
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-semibold text-slate-800 mb-4">
            Powerful Features
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-600 text-center justify-center max-w-2xl mx-auto pd-12">
            Transform your business intelligence with our AI-powered platform, delivering 
            actionable insights through advanced analytics and real-time data processing.
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row">
          {/* Left side: Feature cards */}
          <div className="lg:w-1/2 px-0 md:px-6 lg:pr-8">
            <motion.div 
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="space-y-1 relative"
            >
              {featureCards.map((card, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    variants={itemVariants}
                  >
                    <div 
                      className={`backdrop-blur-sm border ${activeCard === index ? 'border-blue-300' : 'border-gray-200'} rounded-lg p-6 transition-all duration-300 bg-white`}
                    >
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
                      
                      {/* Animation component */}
                      {index === 0 && <IndustryIntelligenceAnimation />}
                      {index === 1 && <CaseSimulationAnimation />}
                      {index === 2 && <IntegrationAnimation />}
                    </div>
                  </motion.div>
                  
                  {/* Connector between cards, except after the last one */}
                  {index < featureCards.length - 1 && (
                    <div className="py-4 flex justify-center">
                      <div className="relative">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={isInView ? { height: 40 } : { height: 0 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          className="w-1 bg-blue-200"
                        >
                          {pulseIndex === index && (
                            <motion.div 
                              className="absolute top-0 w-full"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ 
                                height: [0, 40, 40], 
                                opacity: [0, 1, 0],
                                background: [
                                  "linear-gradient(to bottom, rgba(96, 165, 250, 0), rgba(96, 165, 250, 0))",
                                  "linear-gradient(to bottom, rgba(96, 165, 250, 0), rgba(96, 165, 250, 1))",
                                  "linear-gradient(to bottom, rgba(96, 165, 250, 1), rgba(96, 165, 250, 0))"
                                ]
                              }}
                              transition={{ 
                                duration: 1.2,
                                times: [0, 0.7, 1]
                              }}
                            />
                          )}
                        </motion.div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          {/* Right side: Platform preview */}
          <div className="lg:w-1/2 relative mt-12 lg:mt-0">
            <div className="absolute left-0 right-[-50vw]">
              <DashboardPreview2 />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
