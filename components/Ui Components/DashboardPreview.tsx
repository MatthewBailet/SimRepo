"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BarChart2, Settings, Users, Database, 
  Activity, Layers, Bell, Sun, ChevronDown,
  CreditCard, Home, DollarSign, Send, Search,
  LineChart, PieChart, TrendingUp, Menu, Filter
} from "lucide-react";
import { Progress } from "@/components/molecules/shadcn/progress";

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

export default function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mx-auto mt-12 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
    >
      {/* Top Navigation Bar */}
      <div className="w-full bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Menu className="h-5 w-5 text-gray-500" />
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-gray-50 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="h-5 w-5 text-gray-500" />
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
            JD
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Enhanced Sidebar */}
        <div className="w-64 bg-gray-50 p-4 hidden md:block border-r border-gray-100">
          <div className="space-y-6">
            {sidebarItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 5 }}
                className={`flex items-center justify-between rounded-lg p-3 cursor-pointer transition-all duration-150 ${
                  index === 0 ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Business Metrics Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {businessMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Revenue Trend</h3>
                <LineChart className="h-4 w-4 text-gray-400" />
              </div>
              <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                <span className="text-sm text-gray-400">Chart Preview</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Customer Distribution</h3>
                <PieChart className="h-4 w-4 text-gray-400" />
              </div>
              <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                <span className="text-sm text-gray-400">Chart Preview</span>
              </div>
            </div>
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
              <div className="space-y-4">
                {transactions.map((tx, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium">{tx.name}</div>
                      <div className="text-sm text-gray-500">{tx.date}</div>
                    </div>
                    <div className="text-red-500">{tx.amount}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Bill Pay</h3>
              <div className="space-y-4">
                {bills.map((bill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium">{bill.name}</div>
                      <div className="text-sm text-gray-500">Due: {bill.dueDate}</div>
                    </div>
                    <button className="px-4 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                      Pay {bill.amount}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 