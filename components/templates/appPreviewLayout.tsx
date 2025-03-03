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
  GripVertical
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
  const [chatOpen, setChatOpen] = useState(true);
  const [chatWidth, setChatWidth] = useState(400);
  const [messages, setMessages] = useState<ChatMessage[]>([

  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isResizing, setIsResizing] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
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

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (isResizing && chatContainerRef.current) {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth > 300 && newWidth < 800) {
        setChatWidth(newWidth);
      }
    }
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResizing);
    }
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

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
          ${sidebarOpen ? 'w-72' : 'w-16'} 
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
          border-r flex flex-col transition-all duration-300
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
                  <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center mr-3">
                    {activeOrg.charAt(0)}
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
            <DropdownMenuContent 
              align="start" 
              className={`w-56 ${darkMode ? 'bg-gray-800 text-gray-200' : ''}`}
            >
              <DropdownMenuLabel>Switch Organization</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {organizations.map(org => (
                <DropdownMenuItem 
                  key={org.id}
                  onClick={() => setActiveOrg(org.name)}
                  className="flex items-center cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center mr-3">
                    {org.initial}
                  </div>
                  <span>{org.name}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Plus size={16} className="mr-2" />
                <span className="text-blue-600">Add Organization</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Organization Projects */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h2 className={`text-sm font-semibold mb-3 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            } ${!sidebarOpen && 'sr-only'}`}>
              Organization Projects
            </h2>
            
            {/* Project Tree */}
            <div className="space-y-1">
              {orgProjects.map(project => (
                <div key={project.id}>
                  <button
                    onClick={() => toggleFolder(project.id)}
                    className={`w-full flex items-center px-2 py-1.5 rounded-md ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <ChevronRight 
                      size={16} 
                      className={`transform transition-transform ${
                        expandedFolders.includes(project.id) ? 'rotate-90' : ''
                      } ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    />
                    <Folder size={16} className={`ml-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    {sidebarOpen && (
                      <span className={`ml-2 text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {project.name}
                      </span>
                    )}
                  </button>
                  
                  {/* Project Items */}
                  {expandedFolders.includes(project.id) && sidebarOpen && (
                    <div className="ml-6 mt-1 space-y-1">
                      {project.items.map(item => (
                        <button
                          key={item.id}
                          className={`w-full flex items-center px-2 py-1.5 rounded-md ${
                            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                          }`}
                        >
                          {getStatusIcon(item.status)}
                          <span className={`ml-2 text-sm ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {item.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Personal Sims */}
          <div className="p-4 border-t border-gray-200">
            <h2 className={`text-sm font-semibold mb-3 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            } ${!sidebarOpen && 'sr-only'}`}>
              My Sims
            </h2>
            
            <div className="space-y-1">
              {personalSims.map(project => (
                <div key={project.id}>
                  <button
                    onClick={() => toggleFolder(project.id)}
                    className={`w-full flex items-center px-2 py-1.5 rounded-md ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <ChevronRight 
                      size={16} 
                      className={`transform transition-transform ${
                        expandedFolders.includes(project.id) ? 'rotate-90' : ''
                      } ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    />
                    <Folder size={16} className={`ml-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    {sidebarOpen && (
                      <span className={`ml-2 text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {project.name}
                      </span>
                    )}
                  </button>
                  
                  {expandedFolders.includes(project.id) && sidebarOpen && (
                    <div className="ml-6 mt-1 space-y-1">
                      {project.items.map(item => (
                        <button
                          key={item.id}
                          className={`w-full flex items-center px-2 py-1.5 rounded-md ${
                            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                          }`}
                        >
                          {getStatusIcon(item.status)}
                          <span className={`ml-2 text-sm ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {item.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Data Sources */}
          <div className="p-4 border-t border-gray-200">
            <h2 className={`text-sm font-semibold mb-3 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            } ${!sidebarOpen && 'sr-only'}`}>
              Data Sources
            </h2>
            
            <div className="space-y-1">
              {dataSources.map(source => (
                <button
                  key={source.id}
                  className={`w-full flex items-center px-2 py-1.5 rounded-md ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  {source.icon}
                  {sidebarOpen && (
                    <span className={`ml-2 text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {source.name}
                    </span>
                  )}
                </button>
              ))}
              
              <button
                className={`w-full flex items-center px-2 py-1.5 rounded-md ${
                  darkMode ? 'hover:bg-gray-700 text-blue-400' : 'hover:bg-gray-100 text-blue-600'
                }`}
              >
                <Plus size={16} />
                {sidebarOpen && <span className="ml-2 text-sm">Add Data Source</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
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
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={darkMode ? 'text-gray-400' : 'text-gray-600'}
            >
              <ChevronRight 
                size={20} 
                className={`transform transition-transform ${
                  !sidebarOpen ? 'rotate-180' : ''
                }`}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className={`
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
          border-b py-4 px-6 flex items-center justify-between
        `}>
          {/* Breadcrumb / Current View */}
          <div className={`text-lg font-semibold ${
            darkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            Supply Chain Optimization / Q4 Disruption Analysis
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              className={darkMode ? 'border-gray-600 text-gray-300' : ''}
            >
              <History size={16} className="mr-2" />
              Version History
            </Button>
            <Button size="sm">
              <Play size={16} className="mr-2" />
              Run Simulation
            </Button>
          </div>
        </header>

        {/* Main Content Area with Chat */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Content */}
          <main className={`flex-1 overflow-auto p-6 ${
            darkMode ? 'bg-gray-900' : 'bg-gray-50'
          }`}>
            <div className="max-w-7xl mx-auto">
              {/* Simulation Status */}
              <div className={`
                mb-6 p-4 rounded-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } border ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }
              `}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className={`text-xl font-semibold ${
                      darkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      Q4 Disruption Analysis
                    </h2>
                    <p className={`mt-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Last run: 2 hours ago • Status: Complete
                    </p>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle size={20} className="text-green-500 mr-2" />
                    <span className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Success
                    </span>
                  </div>
                </div>
                
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className={`p-4 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <h3 className={`text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Risk Score
                    </h3>
                    <div className={`text-2xl font-bold ${
                      darkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>
                      15%
                    </div>
                    <p className="text-green-500 text-sm mt-1">Low Risk</p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <h3 className={`text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Expected Impact
                    </h3>
                    <div className={`text-2xl font-bold ${
                      darkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>
                      $2.4M
                    </div>
                    <p className="text-yellow-500 text-sm mt-1">Moderate</p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <h3 className={`text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Time to Recovery
                    </h3>
                    <div className={`text-2xl font-bold ${
                      darkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>
                      4.5 days
                    </div>
                    <p className="text-blue-500 text-sm mt-1">Within Target</p>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className={`
                mb-6 p-4 rounded-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } border ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }
              `}>
                <h2 className={`text-lg font-semibold mb-4 ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  AI Insights
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <AlertCircle size={16} className="text-yellow-500 mt-1 mr-2" />
                    <p className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      20% probability of minor supply chain disruption in Week 4
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2" />
                    <p className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Current inventory levels sufficient to handle projected demand
                    </p>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle size={16} className="text-blue-500 mt-1 mr-2" />
                    <p className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Recommend increasing safety stock by 15% for critical components
                    </p>
                  </li>
                </ul>
              </div>

              {/* Simulation Details */}
              <div className={`
                grid grid-cols-2 gap-6
              `}>
                {/* Parameters */}
                <div className={`
                  p-4 rounded-lg ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  } border ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }
                `}>
                  <h2 className={`text-lg font-semibold mb-4 ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    Simulation Parameters
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Time Horizon
                      </label>
                      <Input 
                        value="12 weeks"
                        readOnly
                        className={darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : ''}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Confidence Level
                      </label>
                      <Input 
                        value="95%"
                        readOnly
                        className={darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : ''}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Scenario Type
                      </label>
                      <Input 
                        value="Monte Carlo"
                        readOnly
                        className={darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : ''}
                      />
                    </div>
                  </div>
                </div>

                {/* Data Sources */}
                <div className={`
                  p-4 rounded-lg ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  } border ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }
                `}>
                  <h2 className={`text-lg font-semibold mb-4 ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    Connected Data Sources
                  </h2>
                  <div className="space-y-3">
                    {dataSources.map(source => (
                      <div 
                        key={source.id}
                        className={`flex items-center p-3 rounded-md ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-50'
                        }`}
                      >
                        {source.icon}
                        <span className={`ml-3 ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {source.name}
                        </span>
                        <CheckCircle size={14} className="ml-auto text-green-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Resizable Chat Panel */}
          {chatOpen && (
            <div 
              ref={chatContainerRef}
              className={`flex flex-col border-l ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
              style={{ width: chatWidth }}
            >
              {/* Chat Header */}
              <div className={`p-4 border-b flex items-center justify-between ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex items-center">
                  <MessageSquare size={20} className={
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  } />
                  <span className={`ml-2 font-medium ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                   
                  </span>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className={`p-1 rounded-md ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <X size={16} className={
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  } />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? darkMode 
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-500 text-white'
                        : darkMode
                          ? 'bg-gray-700 text-gray-200'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <span className={`text-xs mt-1 block ${
                        message.role === 'user'
                          ? 'text-blue-100'
                          : darkMode
                            ? 'text-gray-400'
                            : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className={`p-4 border-t ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex items-center space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className={darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : ''}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className={darkMode ? 'bg-blue-600 hover:bg-blue-700' : ''}
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>

              {/* Resize Handle */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize ${
                  darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-300'
                }`}
                onMouseDown={startResizing}
              />
            </div>
          )}

          {/* Chat Toggle Button (when chat is closed) */}
          {!chatOpen && (
            <button
              onClick={() => setChatOpen(true)}
              className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg ${
                darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
              }`}
            >
              <MessageSquare size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppPreviewLayout; 