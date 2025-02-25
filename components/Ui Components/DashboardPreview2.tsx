"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, stagger } from "framer-motion";
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

// Help icon component
const Help = ({ size, className }: { size: number, className?: string }) => (
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
    className={className || ""}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const DashboardPreview2 = () => {
  const [ref, isVisible] = useIntersectionObserver(0.1);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const memoizedMetrics = useMemo(() => businessMetrics.map((metric, index) => (
    <motion.div
      key={index}
      variants={itemVariants}
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
  )), []);

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full max-w-7xl overflow-hidden rounded-lg border border-gray-200 shadow-xl bg-white"
      style={{height: "900px" }}
    >
      <div className="flex h-full">
        {/* Left Sidebar */}
        <motion.div 
          variants={itemVariants}
          className="w-64 border-r border-gray-200 bg-slate-50 flex flex-col h-full"
        >
          {/* Organization Selector */}
          <motion.div 
            variants={itemVariants}
            className="px-3 py-2 border-b border-gray-200"
          >
            <div className="flex items-center justify-between rounded-md bg-white p-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="h-6 w-6 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2">
                  <Building2 size={14} />
                </div>
                <span className="text-sm font-medium text-gray-700">Acme Corp</span>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </motion.div>

          {/* Main Navigation */}
          <motion.div 
            variants={itemVariants}
            className="flex-1 overflow-y-auto py-2 px-3"
          >
            {/* Navigation content */}
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
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        {/* Main Content */}
        <motion.div 
          variants={itemVariants}
          className="flex-1 flex flex-col h-full overflow-hidden"
        >
          {/* Top Navigation */}
          <motion.div 
            variants={itemVariants}
            className="border-b border-gray-200 bg-white py-3 px-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              <button className="p-1 rounded-md text-gray-500 hover:bg-gray-100">
                <Menu size={20} />
              </button>
              <div className="ml-4 relative">
                <Search className="h-4 w-4 absolute left-2 top-2.5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-1 rounded-md text-gray-500 hover:bg-gray-100">
                <Bell size={18} />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <Help size={18} className="" />
              </button>
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
            </div>
          </motion.div>

          {/* Dashboard Content */}
          <motion.div 
            variants={itemVariants}
            className="flex-1 overflow-auto p-6 bg-gray-50"
          >
            {/* Metrics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {memoizedMetrics}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                    {action.icon}
                  </div>
                  <span className="text-sm text-gray-600">{action.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Transactions & Bills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Transactions */}
              <motion.div
                variants={itemVariants} 
                className="bg-white rounded-lg border border-gray-100 shadow-sm p-4"
              >
                <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                  {transactions.map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{transaction.name}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{transaction.amount}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Upcoming Bills */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-lg border border-gray-100 shadow-sm p-4"
              >
                <h3 className="text-lg font-semibold mb-4">Upcoming Bills</h3>
                <div className="space-y-3">
                  {bills.map((bill, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{bill.name}</p>
                        <p className="text-xs text-gray-500">Due {bill.dueDate}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{bill.amount}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardPreview2;