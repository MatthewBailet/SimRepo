"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { 
  Search, 
  Home,
  FolderTree,
  FileText,
  Database,
  Settings,
  Users,
  Bell,
  ChevronDown,
  ChevronRight,
  LogOut,
  Sun,
  Moon,
  Upload,
  Play,
  History,
  AlertCircle,
  CheckCircle,
  Folder,
  FileJson,
  FileSpreadsheet,
  Link as LinkIcon,
  Plus,
  Send,
  X,
  MessageSquare,
  GripVertical,
  LayoutDashboard,
  Code,
  BarChart2,
  User,
  Pause
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/molecules/shadcn/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/molecules/shadcn/dropdown-menu";
import { Input } from "@/components/molecules/shadcn/input";
import { Button } from "@/components/molecules/shadcn/button";
import { Progress } from "@/components/molecules/shadcn/progress";

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AppPreviewLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeOrg, setActiveOrg] = useState("Acme Corp");
  const [darkMode, setDarkMode] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isResizingChat, setIsResizingChat] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Example data structures
  const organizations = [
    { id: 1, name: "Acme Corp", initial: "A" },
    { id: 2, name: "Globex Inc", initial: "G" },
    { id: 3, name: "Stark Industries", initial: "S" }
  ];

  const orgProjects = [
    {
      id: "proj1",
      name: "Supply Chain Optimization",
      type: "folder",
      items: [
        { 
          id: "sim1",
          name: "Q4 Disruption Analysis",
          type: "simulation",
          status: "success",
          lastRun: "2h ago"
        },
        {
          id: "sim2",
          name: "Inventory Forecast",
          type: "simulation",
          status: "running",
          progress: 80
        }
      ]
    },
    {
      id: "proj2",
      name: "Market Analysis",
      type: "folder",
      items: [
        {
          id: "sim3",
          name: "Competitor Impact Study",
          type: "simulation",
          status: "failed",
          lastRun: "1d ago"
        }
      ]
    }
  ];

  const personalSims = [
    {
      id: "personal1",
      name: "My Test Projects",
      type: "folder",
      items: [
        {
          id: "psim1",
          name: "New Algorithm Test",
          type: "simulation",
          status: "draft"
        }
      ]
    }
  ];

  const dataSources = [
    {
      id: "ds1",
      name: "sales_data.csv",
      type: "file",
      icon: <FileSpreadsheet size={16} />
    },
    {
      id: "ds2",
      name: "Customer Database",
      type: "database",
      icon: <Database size={16} />
    },
    {
      id: "ds3",
      name: "Market API",
      type: "api",
      icon: <LinkIcon size={16} />
    }
  ];

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={14} className="text-green-500" />;
      case 'failed':
        return <AlertCircle size={14} className="text-red-500" />;
      case 'running':
        return <Play size={14} className="text-blue-500" />;
      default:
        return <FileText size={14} className="text-gray-400" />;
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I understand you\'re asking about the simulation. Let me analyze that for you...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div 
        className={`
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
          border-r flex flex-col transition-all duration-300 overflow-y-auto scrollbar-hide
          ${sidebarOpen ? 'w-[350px]' : 'w-[80px]'}
        `}
      >
        {/* Organization Switcher */}
        <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={`w-full flex items-center justify-between p-2 ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                } rounded-md`}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-md bg-blue-600 text-white flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-lg font-medium">{activeOrg.charAt(0)}</span>
                  </div>
                  {sidebarOpen && (
                    <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {activeOrg}
                    </span>
                  )}
                </div>
                {sidebarOpen && <ChevronDown size={16} />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {organizations.map(org => (
                <DropdownMenuItem 
                  key={org.id}
                  onClick={() => setActiveOrg(org.name)}
                  className="cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center mr-2">
                    {org.initial}
                  </div>
                  <span>{org.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search Bar */}
        <div className={`px-4 pt-4 pb-2 ${!sidebarOpen ? 'hidden' : ''}`}>
          <div className={`relative ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search..." 
              className={`pl-9 h-9 ${
                darkMode ? 'bg-gray-700 border-gray-600 placeholder:text-gray-400' : 'bg-gray-50 border-gray-200'
              }`}
            />
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Organization Section */}
          <div className="p-4">
            {sidebarOpen && (
              <h2 className={`text-sm font-medium mb-3 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Organization
              </h2>
            )}
            
            <div className="space-y-1">
              {/* Overview */}
              <button className={`w-full flex items-center px-3 py-2 rounded-md ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}>
                <LayoutDashboard size={sidebarOpen ? 18 : 22} className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                } ${!sidebarOpen ? 'mx-auto' : ''}`} />
                {sidebarOpen && (
                  <span className={`ml-3 text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Overview
                  </span>
                )}
              </button>
              
              {/* Playground */}
              <button className={`w-full flex items-center px-3 py-2 rounded-md ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}>
                <Code size={sidebarOpen ? 18 : 22} className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                } ${!sidebarOpen ? 'mx-auto' : ''}`} />
                {sidebarOpen && (
                  <span className={`ml-3 text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Playground
                  </span>
                )}
              </button>
              
              {/* Reports */}
              <button className={`w-full flex items-center px-3 py-2 rounded-md ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}>
                <BarChart2 size={sidebarOpen ? 18 : 22} className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                } ${!sidebarOpen ? 'mx-auto' : ''}`} />
                {sidebarOpen && (
                  <span className={`ml-3 text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Reports
                  </span>
                )}
              </button>
              
              {/* Projects */}
              <div className="mt-2">
                {/* Project 1: Supply Chain Optimization */}
                <div className="mb-1">
                  <button
                    onClick={() => toggleFolder('proj1')}
                    className={`w-full flex items-center px-3 py-2 rounded-md ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    {sidebarOpen ? (
                      <ChevronRight 
                        size={18} 
                        className={`transform transition-transform ${
                          expandedFolders.includes('proj1') ? 'rotate-90' : ''
                        } ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                      />
                    ) : (
                      <Folder size={22} className={`${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      } mx-auto`} />
                    )}
                    
                    {sidebarOpen && (
                      <>
                        <Folder size={18} className={`ml-1 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <span className={`ml-2 text-sm ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Projects
                        </span>
                      </>
                    )}
                  </button>
                  
                  {/* Project Items */}
                  {expandedFolders.includes('proj1') && sidebarOpen && (
                    <div className="ml-7 mt-1 space-y-1">
                      {/* Overview */}
                      <button
                        className={`w-full flex items-center px-3 py-1.5 rounded-md ${
                          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        <LayoutDashboard size={16} className={`${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <span className={`ml-2 text-sm ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Overview
                        </span>
                      </button>
                      
                      {/* Supply Chain Optimization */}
                      <div className="mb-1">
                        <button
                          onClick={() => toggleFolder('supply-chain')}
                          className={`w-full flex items-center px-3 py-1.5 rounded-md ${
                            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                          }`}
                        >
                          <ChevronRight 
                            size={16} 
                            className={`transform transition-transform ${
                              expandedFolders.includes('supply-chain') ? 'rotate-90' : ''
                            } ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                          />
                          <Folder size={16} className={`ml-1 ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                          <span className={`ml-2 text-sm ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Supply Chain Optimization
                          </span>
                        </button>
                        
                        {expandedFolders.includes('supply-chain') && (
                          <div className="ml-7 mt-1 space-y-1">
                            <button
                              className={`w-full flex items-center px-3 py-1.5 rounded-md ${
                                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                              }`}
                            >
                              <CheckCircle size={16} className="text-green-500" />
                              <span className={`ml-2 text-sm ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                Q4 Disruption Analysis
                              </span>
                            </button>
                            
                            <button
                              className={`w-full flex items-center px-3 py-1.5 rounded-md ${
                                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                              }`}
                            >
                              <Play size={16} className="text-blue-500" />
                              <span className={`ml-2 text-sm ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                Inventory Forecast
                              </span>
                            </button>
                            
                            <button
                              className={`w-full flex items-center px-3 py-1.5 rounded-md ${
                                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                              }`}
                            >
                              <FileText size={16} className="text-gray-400" />
                              <span className={`ml-2 text-sm ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                Supplier Risk Assessment
                              </span>
                            </button>
                            
                            <button
                              className={`w-full flex items-center px-3 py-1.5 rounded-md ${
                                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                              }`}
                            >
                              <CheckCircle size={16} className="text-green-500" />
                              <span className={`ml-2 text-sm ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                Logistics Optimization
                              </span>
                            </button>
                            
                            <button
                              className={`w-full flex items-center px-3 py-1.5 rounded-md ${
                                darkMode ? 'hover:bg-gray-700 text-blue-400' : 'hover:bg-gray-100 text-blue-600'
                              }`}
                            >
                              <Plus size={16} />
                              <span className="ml-2 text-sm">Add</span>
                            </button>
                          </div>
                        )}
                      </div>
                      
                      {/* Market Analysis */}
                      <div className="mb-1">
                        <button
                          onClick={() => toggleFolder('market-analysis')}
                          className={`w-full flex items-center px-3 py-1.5 rounded-md ${
                            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                          }`}
                        >
                          <ChevronRight 
                            size={16} 
                            className={`transform transition-transform ${
                              expandedFolders.includes('market-analysis') ? 'rotate-90' : ''
                            } ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                          />
                          <Folder size={16} className={`ml-1 ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                          <span className={`ml-2 text-sm ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Market Analysis
                          </span>
                        </button>
                        
                        {expandedFolders.includes('market-analysis') && (
                          <div className="ml-7 mt-1 space-y-1">
                            <button
                              className={`w-full flex items-center px-3 py-1.5 rounded-md ${
                                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                              }`}
                            >
                              <AlertCircle size={16} className="text-red-500" />
                              <span className={`ml-2 text-sm ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                Competitor Impact Study
                              </span>
                            </button>
                            
                            <button
                              className={`w-full flex items-center px-3 py-1.5 rounded-md ${
                                darkMode ? 'hover:bg-gray-700 text-blue-400' : 'hover:bg-gray-100 text-blue-600'
                              }`}
                            >
                              <Plus size={16} />
                              <span className="ml-2 text-sm">Add</span>
                            </button>
                          </div>
                        )}
                      </div>
                      
                      {/* Financial Forecasting */}
                      <div className="mb-1">
                        <button 
                          onClick={() => toggleFolder('financial-forecasting')}
                          className={`w-full flex items-center px-3 py-1.5 rounded-md ${
                            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                          }`}
                        >
                          <ChevronRight 
                            size={16} 
                            className={`transform transition-transform ${
                              expandedFolders.includes('financial-forecasting') ? 'rotate-90' : ''
                            } ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                          />
                          <Folder size={16} className={`ml-1 ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                          <span className={`ml-2 text-sm ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Product idea Validation
                          </span>
                        </button>
                        
                        {expandedFolders.includes('financial-forecasting') && (
                          <div className="ml-7 mt-1 space-y-1">
                            <button
                              className={`w-full flex items-center px-3 py-1.5 rounded-md ${
                                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                              }`}
                            >
                              <CheckCircle size={16} className="text-green-500" />
                              <span className={`ml-2 text-sm ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                Q1 Revenue Projection
                              </span>
                            </button>
                            
                            <button
                              className={`w-full flex items-center px-3 py-1.5 rounded-md ${
                                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                              }`}
                            >
                              <FileText size={16} className="text-gray-400" />
                              <span className={`ml-2 text-sm ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                Budget Scenario Planning
                              </span>
                            </button>
                            
                            <button
                              className={`w-full flex items-center px-3 py-1.5 rounded-md ${
                                darkMode ? 'hover:bg-gray-700 text-blue-400' : 'hover:bg-gray-100 text-blue-600'
                              }`}
                            >
                              <Plus size={16} />
                              <span className="ml-2 text-sm">Add</span>
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <button
                        className={`w-full flex items-center px-3 py-1.5 rounded-md ${
                          darkMode ? 'hover:bg-gray-700 text-blue-400' : 'hover:bg-gray-100 text-blue-600'
                        }`}
                      >
                        <Plus size={16} />
                        <span className="ml-2 text-sm">Add Project</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Data Sources */}
          <div className="p-4 mt-2">
            {sidebarOpen && (
              <h2 className={`text-sm font-medium mb-3 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Data Sources
              </h2>
            )}
            
            <div className="space-y-1">
              <button
                className={`w-full flex items-center px-3 py-2 rounded-md ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <FileSpreadsheet size={sidebarOpen ? 18 : 22} className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                } ${!sidebarOpen ? 'mx-auto' : ''}`} />
                {sidebarOpen && (
                  <span className={`ml-3 text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    sales_data.csv
                  </span>
                )}
              </button>
              
              <button
                className={`w-full flex items-center px-3 py-2 rounded-md ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <Database size={sidebarOpen ? 18 : 22} className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                } ${!sidebarOpen ? 'mx-auto' : ''}`} />
                {sidebarOpen && (
                  <span className={`ml-3 text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Customer Database
                  </span>
                )}
              </button>
              
              <button
                className={`w-full flex items-center px-3 py-2 rounded-md ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <LinkIcon size={sidebarOpen ? 18 : 22} className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                } ${!sidebarOpen ? 'mx-auto' : ''}`} />
                {sidebarOpen && (
                  <span className={`ml-3 text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Market API
                  </span>
                )}
              </button>
              
              <button
                className={`w-full flex items-center px-3 py-2 rounded-md ${
                  darkMode ? 'hover:bg-gray-700 text-blue-400' : 'hover:bg-gray-100 text-blue-600'
                }`}
              >
                <Plus size={sidebarOpen ? 18 : 22} className={!sidebarOpen ? 'mx-auto' : ''} />
                {sidebarOpen && <span className="ml-3 text-sm">Add Data Source</span>}
              </button>
            </div>
          </div>

          {/* Separator between org and personal */}
          <div className={`mx-4 my-6 h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>

          {/* My Sims */}
          <div className="p-4">
            {sidebarOpen && (
              <h2 className={`text-sm font-medium mb-3 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                My Sims
              </h2>
            )}
            
            <div className="space-y-1">
              <button
                onClick={() => toggleFolder('personal1')}
                className={`w-full flex items-center px-3 py-2 rounded-md ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                {sidebarOpen ? (
                  <ChevronRight 
                    size={18} 
                    className={`transform transition-transform ${
                      expandedFolders.includes('personal1') ? 'rotate-90' : ''
                    } ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                  />
                ) : (
                  <Folder size={22} className={`${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  } mx-auto`} />
                )}
                
                {sidebarOpen && (
                  <>
                    <Folder size={18} className={`ml-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <span className={`ml-2 text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      My Test Projects
                    </span>
                  </>
                )}
              </button>
              
              {expandedFolders.includes('personal1') && sidebarOpen && (
                <div className="ml-7 mt-1 space-y-1">
                  <button
                    className={`w-full flex items-center px-3 py-1.5 rounded-md ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <FileText size={16} className="text-gray-400" />
                    <span className={`ml-2 text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      New Algorithm Test
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* My Data Sources */}
          <div className="p-4 mt-2">
            {sidebarOpen && (
              <h2 className={`text-sm font-medium mb-3 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                My Data Sources
              </h2>
            )}
            
            <div className="space-y-1">
              <button
                className={`w-full flex items-center px-3 py-2 rounded-md ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <FileSpreadsheet size={sidebarOpen ? 18 : 22} className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                } ${!sidebarOpen ? 'mx-auto' : ''}`} />
                {sidebarOpen && (
                  <span className={`ml-3 text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    sales_data.csv
                  </span>
                )}
              </button>
              
              <button
                className={`w-full flex items-center px-3 py-2 rounded-md ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <Database size={sidebarOpen ? 18 : 22} className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                } ${!sidebarOpen ? 'mx-auto' : ''}`} />
                {sidebarOpen && (
                  <span className={`ml-3 text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Customer Database
                  </span>
                )}
              </button>
              
              <button
                className={`w-full flex items-center px-3 py-2 rounded-md ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <LinkIcon size={sidebarOpen ? 18 : 22} className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                } ${!sidebarOpen ? 'mx-auto' : ''}`} />
                {sidebarOpen && (
                  <span className={`ml-3 text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Market API
                  </span>
                )}
              </button>
              
              <button
                className={`w-full flex items-center px-3 py-2 rounded-md ${
                  darkMode ? 'hover:bg-gray-700 text-blue-400' : 'hover:bg-gray-100 text-blue-600'
                }`}
              >
                <Plus size={sidebarOpen ? 18 : 22} className={!sidebarOpen ? 'mx-auto' : ''} />
                {sidebarOpen && <span className="ml-3 text-sm">Add Data Source</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className={`p-4 border-t mt-auto ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-md ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                {darkMode ? (
                  <Sun size={20} className="text-gray-400" />
                ) : (
                  <Moon size={20} className="text-gray-600" />
                )}
              </button>
            )}
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} ${sidebarOpen ? '' : 'mx-auto'}`}
            >
              <ChevronRight 
                size={22} 
                className={`transform transition-transform ${
                  !sidebarOpen ? 'rotate-180' : ''
                }`}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Top Navigation */}
        <div className={`border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <h1 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Supply Chain Optimization/ Q4 Disruption Analysis
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setChatOpen(!chatOpen)}
                className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}
              >
                <MessageSquare size={20} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatar.png" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Main Content with Chat */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <div className={`flex-1 overflow-auto p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* Empty Metric Cards */}
              {[1, 2, 3].map((_, i) => (
                <div 
                  key={i} 
                  className={`rounded-lg p-6 ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } border shadow-sm h-40`}
                />
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Empty Chart Cards */}
              {[1, 2].map((_, i) => (
                <div 
                  key={i} 
                  className={`rounded-lg p-6 ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } border shadow-sm h-80`}
                />
              ))}
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {/* Empty Table Card */}
              <div 
                className={`rounded-lg p-6 ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } border shadow-sm h-96`}
              />
            </div>
          </div>

          {/* Chat Panel - Integrated into layout */}
          <div
            className={`border-l flex flex-col ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } transition-all duration-300`}
            style={{ 
              width: chatOpen ? '320px' : '0px',
              opacity: chatOpen ? 1 : 0,
              visibility: chatOpen ? 'visible' : 'hidden'
            }}
          >
            {/* Chat Header */}
            <div className={`p-4 border-b flex items-center justify-between ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <h2 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Chat
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setChatOpen(false)}
                className={darkMode ? 'text-gray-400' : 'text-gray-600'}
              >
                <X size={20} />
              </Button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-[80%] rounded-lg p-3
                    ${message.role === 'user' 
                      ? darkMode 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-500 text-white'
                      : darkMode
                        ? 'bg-gray-700 text-gray-200'
                        : 'bg-gray-100 text-gray-800'
                    }
                  `}>
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className={`p-4`}>
              <div className="flex items-center space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type a message..."
                  className={darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button size="icon" className="shrink-0" onClick={handleSendMessage}>
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Simulation Progress Bar */}
        <div className={`px-6 py-2 flex items-center space-x-4 border-t ${
          darkMode ? 'bg-gray-750 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex-1 flex items-center space-x-3">
            <div className="w-32">
              <span className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Simulation Progress
              </span>
            </div>
            <div className="flex-1">
              <Progress value={45} className="h-2" />
            </div>
            <div>
              <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Processing data (45%)
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              variant="outline" 
              className={`h-8 px-2 ${
                darkMode 
                  ? 'border-gray-600 hover:bg-gray-600 text-gray-300 bg-gray-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <Pause size={16} className="mr-1" />
              <span className="text-xs">Pause</span>
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className={`h-8 w-8 p-0 ${
                darkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <FileText size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPreviewLayout;