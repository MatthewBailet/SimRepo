"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart2, Settings, Users, Database, 
  Activity, Layers, Bell, Sun, ChevronDown,
  CreditCard, Home, DollarSign, Send, Search,
  LineChart, PieChart, TrendingUp, Menu, Filter,
  User,
  Plus,
  ArrowRight,
  Clock,
  MessageSquare,
  Layout,
  FolderOpen,
  Zap,
  Building2,
  Globe,
  Briefcase,
  FileText,
  AlertCircle,
  ChevronRight
} from "lucide-react";
import { Progress } from "@/components/molecules/shadcn/progress";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const sidebarItems = [
  { icon: <Home size={20} />, label: "Dashboard" },
  { icon: <BarChart2 size={20} />, label: "Analytics" },
  { icon: <Database size={20} />, label: "Projects" },
  { icon: <Activity size={20} />, label: "Transactions" },
  { icon: <CreditCard size={20} />, label: "Payments" },
  { icon: <Users size={20} />, label: "Members" },
];

const quickActions = [
  { label: "Add", icon: <span className="text-lg">+</span> },
  { label: "Send", icon: <Send size={16} /> },
  { label: "Request", icon: <DollarSign size={16} /> },
  { label: "More", icon: <span className="text-lg">•••</span> },
];

const transactions = [
  { name: "Amazon.com", date: "2023-07-15", amount: "-$129.99" },
  { name: "Whole Foods Market", date: "2023-07-10", amount: "-$89.72" },
  { name: "Netflix Subscription", date: "2023-07-05", amount: "-$15.99" },
];

const bills = [
  { name: "Electricity Bill", dueDate: "2023-07-15", amount: "$85" },
  { name: "Internet Service", dueDate: "2023-07-18", amount: "$60" },
  { name: "Credit Card Payment", dueDate: "2023-07-25", amount: "$500" },
  { name: "Water Bill", dueDate: "2023-07-30", amount: "$45" },
];

// Add business metrics data
const businessMetrics = [
  {
    title: "Revenue Growth",
    value: "$100,000",
    target: "75% complete",
    progress: 75,
    status: "On Track",
    statusColor: "text-green-500"
  },
  {
    title: "Customer Acquisition",
    value: "1,000",
    target: "60% complete",
    progress: 60,
    status: "Behind",
    statusColor: "text-red-500"
  },
  {
    title: "Average Order Value",
    value: "$150",
    target: "110% complete",
    progress: 100,
    status: "Ahead",
    statusColor: "text-blue-500"
  }
];

const DashboardPreview = () => {
  const [ref, isVisible] = useIntersectionObserver(0.1);
  const [height, setHeight] = useState(800); // Set a default height

  // Memoize the metrics to prevent unnecessary re-renders
  const memoizedMetrics = useMemo(() => businessMetrics.map((metric, index) => (
    <motion.div
      key={index}
      initial={false}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
        <Filter className="h-4 w-4 text-gray-400" />
      </div>
      <div className="flex items-end justify-between mb-2">
        <span className="text-2xl font-semibold">{metric.value}</span>
        <span className={`text-sm ${metric.statusColor}`}>{metric.status}</span>
      </div>
      <Progress value={metric.progress} className="h-1 mb-2" />
      <span className="text-xs text-gray-500">{metric.target}</span>
    </motion.div>
  )), [isVisible]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-xl bg-white"
      style={{ maxWidth: "1400px", height: "900px" }}
    >
      <div className="flex h-full ">
        {/* Left Sidebar */}
        <div className="w-64 border-r border-gray-200 bg-slate-50 flex flex-col h-full">
         
          
          {/* Organization Selector */}
          <div className="px-3 py-2 border-b border-gray-200">
            <div className="flex items-center justify-between rounded-md bg-white p-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="h-6 w-6 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2">
                  <Building2 size={14} />
                </div>
                <span className="text-sm font-medium text-gray-700">Acme Corp</span>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
          
          {/* Main Navigation */}
          <div className="flex-1 overflow-y-auto py-2 px-3">
            <div className="space-y-1">
              <div className="flex items-center px-2 py-2 text-sm rounded-md bg-blue-50 text-blue-600 font-medium">
                <Home size={16} className="mr-2" />
                <span>Dashboard</span>
              </div>
              
              {/* Projects Section */}
              <div className="mt-6">
                <div className="flex items-center justify-between px-2 py-1.5">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Projects</span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Plus size={14} />
                  </button>
                </div>
                
                <div className="mt-1 space-y-1">
                  <div className="flex items-center justify-between px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                    <div className="flex items-center">
                      <FolderOpen size={15} className="mr-2 text-gray-500" />
                      <span>Market Entry Strategy</span>
                    </div>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600">3</span>
                  </div>
                  
                  <div className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                    <FolderOpen size={15} className="mr-2 text-gray-500" />
                    <span>Competitor Analysis</span>
                  </div>
                  
                  <div className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                    <FolderOpen size={15} className="mr-2 text-gray-500" />
                    <span>Q3 Planning</span>
                  </div>
                </div>
              </div>
              
              {/* Intelligence Section */}
              <div className="mt-6">
                <div className="px-2 py-1.5">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Intelligence</span>
                </div>
                
                <div className="mt-1 space-y-1">
                  <div className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                    <Globe size={15} className="mr-2 text-gray-500" />
                    <span>Industry Monitoring</span>
                  </div>
                  
                  <div className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                    <TrendingUp size={15} className="mr-2 text-gray-500" />
                    <span>Trend Analysis</span>
                  </div>
                  
                  <div className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                    <Briefcase size={15} className="mr-2 text-gray-500" />
                    <span>Competitor Insights</span>
                  </div>
                </div>
              </div>
              
              {/* Simulations Section */}
              <div className="mt-6">
                <div className="px-2 py-1.5">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Simulations</span>
                </div>
                
                <div className="mt-1 space-y-1">
                  <div className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                    <Layers size={15} className="mr-2 text-gray-500" />
                    <span>Market Scenarios</span>
                  </div>
                  
                  <div className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                    <PieChart size={15} className="mr-2 text-gray-500" />
                    <span>Financial Models</span>
                  </div>
                </div>
              </div>
              
              {/* Data Section */}
              <div className="mt-6">
                <div className="px-2 py-1.5">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Data</span>
                </div>
                
                <div className="mt-1 space-y-1">
                  <div className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                    <Database size={15} className="mr-2 text-gray-500" />
                    <span>Integrations</span>
                  </div>
                  
                  <div className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                    <FileText size={15} className="mr-2 text-gray-500" />
                    <span>Reports</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* User Section */}
          <div className="border-t border-gray-200 p-3">
            <div className="flex items-center justify-between hover:bg-gray-100 p-2 rounded-md cursor-pointer">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                  <User size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Alex Morgan</p>
                  <p className="text-xs text-gray-500">Product Manager</p>
                </div>
              </div>
              <Settings size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Top Navigation */}
          <div className="border-b border-gray-200 bg-white py-3 px-4 flex items-center justify-between">
            <div className="flex-1 flex items-center">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full py-1.5 pl-10 pr-4 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <Bell size={18} />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <MessageSquare size={18} />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <Help size={18} />
              </button>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <div className="flex-1 overflow-auto p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-semibold text-gray-900">Market Strategy Dashboard</h1>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">Last updated: 2 hours ago</span>
                <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Run New Simulation
                </button>
              </div>
            </div>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Market Opportunity</span>
                  <div className="p-1.5 rounded-md bg-green-50">
                    <TrendingUp size={16} className="text-green-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-gray-900">$4.2M</span>
                  <span className="ml-2 text-sm font-medium text-green-600">+12.5%</span>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Based on current market conditions
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Competitor Activity</span>
                  <div className="p-1.5 rounded-md bg-yellow-50">
                    <AlertCircle size={16} className="text-yellow-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-gray-900">Medium</span>
                  <span className="ml-2 text-sm font-medium text-yellow-600">3 new players</span>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Based on recent industry reports
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Success Probability</span>
                  <div className="p-1.5 rounded-md bg-blue-50">
                    <PieChart size={16} className="text-blue-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-gray-900">76%</span>
                  <span className="ml-2 text-sm font-medium text-blue-600">+3.2%</span>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Based on multiple scenario models
                </div>
              </div>
            </div>
            
            {/* Main Analytics Area */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="col-span-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-gray-800">Market Trend Analysis</span>
                  <div className="flex items-center space-x-2">
                    <button className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-600">Weekly</button>
                    <button className="text-xs px-2 py-1 rounded text-gray-600">Monthly</button>
                    <button className="text-xs px-2 py-1 rounded text-gray-600">Quarterly</button>
                  </div>
                </div>
                <div className="h-48 border-b border-gray-200 mb-3">
                  {/* Chart Placeholder */}
                  <div className="h-full bg-gradient-to-b from-blue-50 to-transparent rounded relative overflow-hidden">
                    <svg className="absolute bottom-0 left-0 w-full" height="70%" viewBox="0 0 100 20">
                      <path
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="0.5"
                        strokeLinejoin="round"
                        d="M0,10 Q10,15 15,10 T30,10 T45,2 T60,10 T75,8 T100,12"
                      />
                      <path
                        fill="rgba(59, 130, 246, 0.1)"
                        stroke="none"
                        d="M0,20 L0,10 Q10,15 15,10 T30,10 T45,2 T60,10 T75,8 T100,12 L100,20 Z"
                      />
                    </svg>
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                      <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-gray-800">Competitive Landscape</span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ChevronRight size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm">Your Position</span>
                    </div>
                    <span className="text-sm font-medium">32%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: "32%" }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                      <span className="text-sm">Competitor A</span>
                    </div>
                    <span className="text-sm font-medium">27%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-gray-400 h-full rounded-full" style={{ width: "27%" }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                      <span className="text-sm">Competitor B</span>
                    </div>
                    <span className="text-sm font-medium">21%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-gray-300 h-full rounded-full" style={{ width: "21%" }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-gray-200 rounded-full mr-2"></div>
                      <span className="text-sm">Others</span>
                    </div>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-gray-200 h-full rounded-full" style={{ width: "20%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Activities */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-gray-800">Recent Activities</span>
                <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
                  View all <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                    <FileText size={15} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-800">New market report processed</p>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock size={12} className="mr-1" /> 35m ago
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">System automatically analyzed Q2 financial reports from 14 sources</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                    <Users size={15} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-800">Team collaboration update</p>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock size={12} className="mr-1" /> 2h ago
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Sarah shared a new simulation model with the marketing team</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mr-3">
                    <AlertCircle size={15} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-800">Competitor alert detected</p>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock size={12} className="mr-1" /> 5h ago
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Competitor XYZ has launched a new service in the European market</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Missing icon definition
const Help = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export default DashboardPreview; 