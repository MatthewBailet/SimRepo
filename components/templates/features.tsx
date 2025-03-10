"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart2, Scan, Umbrella, Wallet, Activity, Database, Globe, Sparkles, FileText, Image, Table, Server, Calendar, Users, CheckCircle, Layers, Cloud, Glasses, ArrowRight, Code2, LineChart } from "lucide-react";
import DashboardPreview2 from "@/components/Ui Components/DashboardPreview";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Badge } from "@/components/molecules/shadcn/badge";
import EngineCard from "@/components/Ui Components/EngineCard";
import { Card } from "@/components/molecules/shadcn/card";
import { Gradient } from "whatamesh";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/molecules/shadcn/accordion";
import BlueWaveScene from "../Ui Components/BlueWaveScene";


const Ernst1: React.FC = () => {
  const [cardHovered, setCardHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Add required CSS variables
    const style = document.createElement('style');
    style.textContent = `
      #ernst1 {
        --gradient-color-1: #c3e4ff;
        --gradient-color-2: #6ec3f4;
        --gradient-color-3: #eae2ff;
        --gradient-color-4: #b9beff;
      },
      #ernst2 {
        --gradient-color-1: #c3e4ff;
        --gradient-color-2: #6ec3f4;
        --gradient-color-3: #eae2ff;
        --gradient-color-4: #b9beff;
      },

    `;
    document.head.appendChild(style);
    

    // Initialize gradient after a small delay to ensure CSS is applied
    const timer = setTimeout(() => {
      if (canvasRef.current) {
        const gradient = new Gradient();
        gradient.initGradient('#ernst1');

      }
      
      
    }, 100);

    return () => {
      document.head.removeChild(style);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Add required CSS variables
    const style = document.createElement('style');
    style.textContent = `
      #ernst2 {
        --gradient-color-1: #c3e4ff;
        --gradient-color-2: #6ec3f4;
        --gradient-color-3: #eae2ff;
        --gradient-color-4: #b9beff;
      },

    `;
    document.head.appendChild(style);

    // Initialize gradient after a small delay to ensure CSS is applied
    const timer = setTimeout(() => {
      if (canvasRef.current) {
        const gradient = new Gradient();
        gradient.initGradient('#ernst2');
      }
    }, 100);

    return () => {
      document.head.removeChild(style);
      clearTimeout(timer);
    };
  }, []);







  return (
    <div>
      {/* Component content */}
    </div>
  );
};






const featureCards = [

  


  {
    icon: <Database className="h-6 w-6" />,
    title: "Seamless Data Integration", 
    subtitle: "Seamless system connectivity",
    description: "Comprehensive data parsing and integration capabilities that connect with your existing systems while maintaining data integrity and security.",
    details: [
      "Multi-format data processing",
      "Automated ETL pipelines",
      "Real-time synchronization"
    ]
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Real-time Industry Intelligence",
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
    icon: <Sparkles className="h-6 w-6" />,
    title: "Co-Create Parameters",
    subtitle: "Work ",
    description: "Advanced AI-driven simulations that process vast amounts of market data to generate precise business scenarios and strategic insights.",
    details: [
      "Real-time market condition analysis",
      "Predictive modeling & forecasting", 
      "Risk assessment & mitigation strategies"
    ]
  },
];

// Animation components
const IndustryIntelligenceAnimation: React.FC = () => {
  const [currentSite, setCurrentSite] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const sites = [
    { url: "Bloomberg.com", type: "Financial" },
    { url: "Reuters.com", type: "News" },
    { url: "Harvard.edu", type: "Academic" },
    { url: "JSTOR.org", type: "Research" },
    { url: "ScienceDirect.com", type: "Scientific" },
    { url: "MarketWatch.com", type: "Markets" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        setIsComplete(true);
        
        setTimeout(() => {
          setIsComplete(false);
          setCurrentSite((prev) => (prev + 1) % sites.length);
        }, 2500);
      }, 2000);
    }, 4000);

    return () => clearInterval(interval);
  }, [sites.length]);

  return (
    <div className="relative h-32 select-none pt-6  mx-[15vw] md:mx-[25vw] lg:mx-[7vw]">
      {/* Vertical Carousel */}
      <div className="absolute left-0 top-10 -translate-y-1/2 px-40">
        {[-1, 0, 1].map((offset) => {
          const index = (currentSite + offset + sites.length) % sites.length;
          return (
            <motion.div
              key={`${sites[index].url}-${offset}`}
              className={`absolute left-0 h-8 w-40 ${
                offset === 0 ? 'z-10' : 'z-0'
              }`}
              initial={offset === 0 ? { y: 40, opacity: 0 } : { y: offset * 40 }}
              animate={{ 
                y: offset * 35,
                opacity: offset === 0 ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className={`
                bg-white/80 backdrop-blur-sm rounded-lg px-5 py-2
                border border-slate-200 shadow-sm
                flex items-center justify-between
                ${offset === 0 ? 'scale-105' : 'scale-95'}
              `}>
                <span className="text-sm font-medium text-slate-700">{sites[index].url}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Connecting Line */}
      <motion.div 
        className="absolute left-40 ml-1 top-1/2 w-12 h-[2px] -z-100"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          backgroundColor: isProcessing ? "#60A5FA" : (isComplete ? "#34D399" : "#94A3B8")
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Icon Circle */}
      <div className="absolute top-1/2 -translate-y-1/2 pl-48">
        <motion.div 
          className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center"
          animate={{
            scale: isProcessing ? 1.1 : 1,
            borderColor: isProcessing ? "#60A5FA" : (isComplete ? "#34D399" : "#E2E8F0")
          }}
        >
          {isProcessing ? (
            <motion.div 
              className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : isComplete ? (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: 1,
                opacity: 1
              }}
              transition={{ 
                type: "spring",
                stiffness: 400,
                damping: 15,
                duration: 0.4
              }}
              className="relative"
            >
              <motion.div
                initial={{ strokeDashoffset: 20, opacity: 0 }}
                animate={{ 
                  strokeDashoffset: 0,
                  opacity: 1,
                  pathLength: 1
                }}
                transition={{
                  delay: 0.1,
                  type: "tween",
                  ease: "easeOut",
                  duration: 0.3
                }}
              >
                <CheckCircle className="w-5 h-5 text-emerald-500" strokeWidth={3} />
              </motion.div>
            </motion.div>
          ) : (
            <Glasses className="w-5 h-5 text-slate-600" />
          )}
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
  
  const queries = useMemo(() => [
    "How will market trends affect revenue?",
    "What if we increase prices by 10%?", 
    "Best expansion regions for Q3 2024?",
    "Competitor response to our new product?",
    "Customer churn prediction next quarter",
    "Supply chain optimization strategies",
    "Marketing budget allocation ROI",
    "Employee retention impact analysis",
    "New product launch timing simulation"
  ], []);

  useEffect(() => {
    const currentQuery = queries[currentIndex];
    
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
      }, isDeleting ? 1500 : 12000); // Much longer pauses
      
      return () => clearTimeout(pauseTimeout);
    }
    
    let timer;
    
    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % queries.length);
        return;
      }
      
      timer = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
      }, 50); // Slower deletion for smoothness
    } else {
      if (text === currentQuery) {
        setIsPaused(true);
        setIsDeleting(true);
        return;
      }
      
      const randomDelay = 40; // Slower typing (60-90ms)
      timer = setTimeout(() => {
        setText(currentQuery.slice(0, text.length + 1));
      }, randomDelay);
    }
    
    return () => clearTimeout(timer);
  }, [text, isDeleting, currentIndex, isPaused, queries]);

  return (
    <div className="h-24 mt-6 mb-6 pt-4 select-none" style={{ userSelect: 'none' }}>
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  // Fixed sequence of data types
  const dataTypes = [
    { icon: <FileText className="h-5 w-5" /> },
    { icon: <Database className="h-5 w-5" /> },
    { icon: <Image className="h-5 w-5" aria-label="Image" /> },
    { icon: <Table className="h-5 w-5" /> },
    { icon: <Server className="h-5 w-5" /> },
    { icon: <Calendar className="h-5 w-5" /> },
    { icon: <Users className="h-5 w-5" /> },
    { icon: <Cloud className="h-5 w-5" /> },
  ];
  
  // Handle the animation sequence with slower timing
  useEffect(() => {
    // Start processing
    setProcessing(true);
    
    // After 1.5 seconds, mark as completed
    const processTimer = setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      
      // After 0.8 seconds, move to next icon
      const completeTimer = setTimeout(() => {
        setCompleted(false);
        setCurrentIndex((prev) => (prev + 1) % dataTypes.length);
      }, 2500);
      
      return () => clearTimeout(completeTimer);
    }, 1500);
    
    return () => clearTimeout(processTimer);
  }, [currentIndex, dataTypes.length]);
  
  // Get visible items in fixed sequence
  const getVisibleItems = () => {
    const items = [];
    const len = dataTypes.length;
    
    // Add 5 items centered around currentIndex, maintaining order
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + len) % len;
      items.push({
        ...dataTypes[index],
        position: i
      });
    }
    
    return items;
  };
  
  return (
    <div className="h-32 mt-4 mb-0 relative select-none" style={{ userSelect: 'none' }}>
      {/* App icon at the top */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shadow-sm">
          <Layers className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      
      {/* Connection line */}
      <motion.div 
        className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 bg-blue-400"
        initial={{ height: 0 }}
        animate={{ 
          height: processing || completed ? 24 : 0,
          opacity: processing || completed ? 1 : 0
        }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Data type carousel */}
      <div className="absolute bottom-0 w-full">
        <div className="relative h-16 mx-auto flex items-center justify-center">
          {getVisibleItems().map((item, idx) => {
            const { position } = item;
            const isCenter = position === 0;
            
            // Calculate opacity based on position
            let opacity = 1;
            let scale = 1;
            
            if (Math.abs(position) === 2) {
              opacity = 0.3;
              scale = 0.8;
            } else if (Math.abs(position) === 1) {
              opacity = 0.7;
              scale = 0.9;
            }
            
            return (
              <motion.div
                key={`${idx}-${currentIndex}`}
                className="absolute"
                animate={{ 
                  x: position * 60, 
                  opacity, 
                  scale,
                  y: isCenter && (processing || completed) ? -4 : 0
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, // Reduced for smoother motion
                  damping: 25 
                }}
              >
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm
                  ${isCenter && completed ? "bg-blue-50 text-blue-600" : "bg-white text-gray-600"}`}
                >
                  {isCenter && processing ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="text-blue-500"
                    >
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" strokeDasharray="40" strokeDashoffset="10" />
                      </svg>
                    </motion.div>
                  ) : isCenter && completed ? (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ 
                        scale: 1,
                        opacity: 1
                      }}
                      transition={{ 
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                        duration: 0.4
                      }}
                      className="relative"
                    >
                      <motion.div
                        initial={{ strokeDashoffset: 20, opacity: 0 }}
                        animate={{ 
                          strokeDashoffset: 0,
                          opacity: 1,
                          pathLength: 1
                        }}
                        transition={{
                          delay: 0.1,
                          type: "tween",
                          ease: "easeOut",
                          duration: 0.3
                        }}
                      >
                        <CheckCircle className="w-5 h-5 text-emerald-500" strokeWidth={3} />
                      </motion.div>
                    </motion.div>
                  ) : (
                    item.icon
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function Features() {
  const [ref, isInView] = useIntersectionObserver(0.1);
  const [activeCard, setActiveCard] = useState(0);
  const [pulseIndex, setPulseIndex] = useState(-1);
  const [currentSite, setCurrentSite] = useState(0);
  
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

  const sites = [
    {
      title: "Data Collection",
      description: "Automated data collection from various sources including web, APIs, and databases.",
      icon: <Database className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Industry Webscraping",
      description: "Real-time market data collection from industry-specific sources.",
      icon: <Globe className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Integrations",
      description: "Seamless connection with your existing tools and platforms.",
      icon: <Code2 className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Reporting",
      description: "Comprehensive insights and analytics dashboards.",
      icon: <BarChart2 className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Forecasting",
      description: "AI-powered predictive analytics for business planning.",
      icon: <LineChart className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Collaboration",
      description: "Team-based workflows and shared insights.",
      icon: <Users className="h-6 w-6 text-blue-500" />,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSite((prev) => (prev + 1) % sites.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [sites.length]);

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
            Model with Simulations
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-600 text-center justify-center max-w-2xl mx-auto pd-12">
            Transform your business intelligence with our AI-powered platform, delivering 
            actionable insights through advanced analytics and real-time data processing.
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row mt-5">
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
                      <div className="rounded-lg bg-blue-50 p-2 w-fit mb-4 flex items-center justify-center">
                        <div className="h-5 w-5 text-blue-600 flex items-center justify-center">
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
                      {index === 1 && <IndustryIntelligenceAnimation />}
                      {index === 2 && <CaseSimulationAnimation />}
                      {index === 0 && <IntegrationAnimation />}
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
          <div className="lg:w-1/2 relative mt-12 lg:mt-0 hidden lg:block">
            <div className="absolute left-0 right-[-50vw]">
              <DashboardPreview2 />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}