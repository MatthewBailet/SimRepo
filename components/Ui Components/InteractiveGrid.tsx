"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  Book,
  BookOpenCheck,
  Blocks,
  FileText,
  Layers,
  SearchCheck,
} from "lucide-react";

import NodeItem from "./NodeItem";          // Adjust path as needed
import CurvedConnector from "./CurvedConnector"; // Adjust path as needed

export default function InteractiveGrid() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [visibleNodes, setVisibleNodes] = useState<boolean[]>(
    new Array(9).fill(false)
  );
  const [pathVisible, setPathVisible] = useState(false);
  const [path2Visible, setPath2Visible] = useState(false);

  useEffect(() => {
    if (inView) {
      const animateConnection = async () => {
        // Show first node (Databook 1)
        setVisibleNodes(prev => {
          const newState = [...prev];
          newState[0] = true;
          return newState;
        });

        // Start first path animation
        await new Promise(resolve => setTimeout(resolve, 300));
        setPathVisible(true);

        // Show Parser node
        await new Promise(resolve => setTimeout(resolve, 500));
        setVisibleNodes(prev => {
          const newState = [...prev];
          newState[3] = true;
          return newState;
        });

        // Show Databook 2
        await new Promise(resolve => setTimeout(resolve, 400));
        setVisibleNodes(prev => {
          const newState = [...prev];
          newState[1] = true;
          return newState;
        });

        // Start second path animation
        await new Promise(resolve => setTimeout(resolve, 300));
        setPath2Visible(true);
      };
      
      animateConnection();
    }
  }, [inView]);

  return (
    <div className="w-[500px] h-[500px] relative mx-auto" ref={ref}>
      <svg className="absolute w-[500px] h-[500px] top-0 left-0 pointer-events-none -z-10">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgb(242, 111, 153)">
              <animate
                attributeName="offset"
                values="0;0.5;0"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="rgb(85, 112, 247)">
              <animate
                attributeName="offset"
                values="0.5;1;0.5"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          <linearGradient id="gradient2" xlinkHref="#gradient" /> {/* Reuse the same gradient */}
        </defs>
        {/* First path */}
        <path
          d="M 55 60 v 175 q 0 20 20 20 h 50"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="5"
          className={`transition-all duration-1000 ${
            pathVisible ? 'stroke-dashoffset-0' : 'stroke-dashoffset-full'
          }`}
          style={{
            strokeDasharray: '1000',
            strokeDashoffset: pathVisible ? '0' : '1000',
          }}
        />
        {/* Second path */}
        <path
          d="M 153 60 v 175 q 0 20 -20 20 h -10"
          fill="none"
          stroke="url(#gradient2)"
          strokeWidth="5"
          className={`transition-all duration-1000 ${
            path2Visible ? 'stroke-dashoffset-0' : 'stroke-dashoffset-full'
          }`}
          style={{
            strokeDasharray: '1000',
            strokeDashoffset: path2Visible ? '0' : '1000',
          }}
        />
      </svg>

      <div className="grid grid-cols-5 grid-rows-5 w-[500px] h-[500px] gap-4 px-4 relative z-0">
        {/* Node #1: Book (row1, col1) */}
        <div className="col-start-1 row-start-1 flex items-center justify-center">
          <NodeItem 
            icon={<Book size={24} />} 
            label="Databook" 
            isVisible={visibleNodes[0]}
          />
        </div>

        {/* Node #2: Book (row1, col2) */}
        <div className="col-start-2 row-start-1 flex items-center justify-center">
          <NodeItem 
            icon={<Book size={24} />} 
            label="Databook" 
            isVisible={visibleNodes[1]}
          />
        </div>

        {/* Node #3: Blocks (row2, col3) */}
        <div className="col-start-3 row-start-2 flex items-center justify-center">
          <NodeItem 
            icon={<Blocks size={24} />} 
            label="Plugins" 
            isVisible={visibleNodes[2]}
          />
        </div>

        {/* Node #4: BookOpenCheck (row3, col2) */}
        <div className="col-start-2 row-start-3 flex items-center justify-center">
          <NodeItem 
            icon={<BookOpenCheck size={24} />} 
            label="Parser" 
            isVisible={visibleNodes[3]}
          />
        </div>

        {/* Node #5: Layers (row3, col3) */}
        <div className="col-start-3 row-start-3 flex items-center justify-center">
          <NodeItem 
            icon={<Layers size={24} />} 
            label="Engine" 
            isVisible={visibleNodes[4]}
          />
        </div>

        {/* Node #6: FileText (row3, col5) */}
        <div className="col-start-5 row-start-3 flex items-center justify-center">
          <NodeItem 
            icon={<FileText size={24} />} 
            label="Summary" 
            isVisible={visibleNodes[5]}
          />
        </div>

        {/* Node #7: SearchCheck (row4, col1) */}
        <div className="col-start-1 row-start-4 flex items-center justify-center">
          <NodeItem 
            icon={<SearchCheck size={24} />} 
            label="Webscraper" 
            isVisible={visibleNodes[6]}
          />
        </div>

        {/* Node #8: BookOpenCheck (row4, col3) */}
        <div className="col-start-3 row-start-4 flex items-center justify-center">
          <NodeItem 
            icon={<BookOpenCheck size={24} />} 
            label="Parser" 
            isVisible={visibleNodes[7]}
          />
        </div>

        {/* Node #9: SearchCheck (row5, col1) */}
        <div className="col-start-1 row-start-5 flex items-center justify-center">
          <NodeItem 
            icon={<SearchCheck size={24} />} 
            label="Webscraper" 
            isVisible={visibleNodes[8]}
          />
        </div>

        
      </div>

    </div>
  );
}
