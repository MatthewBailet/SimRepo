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
    threshold: 0.1,
  });

  const [visibleNodes, setVisibleNodes] = useState<boolean[]>(
    new Array(9).fill(false)
  );
  const [pathVisible, setPathVisible] = useState(false);
  const [path2Visible, setPath2Visible] = useState(false);
  const [path3Visible, setPath3Visible] = useState(false);
  const [path4Visible, setPath4Visible] = useState(false);
  const [path5Visible, setPath5Visible] = useState(false);
  const [path6Visible, setPath6Visible] = useState(false);
  const [path7Visible, setPath7Visible] = useState(false);
  const [path8Visible, setPath8Visible] = useState(false);
  const [finalPop, setFinalPop] = useState(false);

  // Add state for the currently animated node
  const [currentAnimatedNode, setCurrentAnimatedNode] = useState<number | null>(null);

  // List of node indices in the order we want to animate them
  const nodeSequence = [7, 3, 8, 4, 0, 2, 5, 1, 6]; 

  useEffect(() => {
    if (inView) {
      const animateConnection = async () => {
        // Reset all states when coming into view
        setVisibleNodes(new Array(9).fill(false));
        setPathVisible(false);
        setPath2Visible(false);
        setPath3Visible(false);
        setPath4Visible(false);
        setPath5Visible(false);
        setPath6Visible(false);
        setPath7Visible(false);
        setPath8Visible(false);
        setFinalPop(false);

        // Show first node (Databook 1)
        setVisibleNodes(prev => {
          const newState = [...prev];
          newState[0] = true;
          return newState;
        });

        // Speed up all timings by reducing delays
        await new Promise(resolve => setTimeout(resolve, 200));
        setPathVisible(true);

        await new Promise(resolve => setTimeout(resolve, 300));
        setVisibleNodes(prev => {
          const newState = [...prev];
          newState[3] = true;
          return newState;
        });

        await new Promise(resolve => setTimeout(resolve, 300));
        setVisibleNodes(prev => {
          const newState = [...prev];
          newState[1] = true;
          return newState;
        });

        await new Promise(resolve => setTimeout(resolve, 200));
        setPath2Visible(true);

        await new Promise(resolve => setTimeout(resolve, 300));
        setVisibleNodes(prev => {
          const newState = [...prev];
          newState[7] = true;
          return newState;
        });

        await new Promise(resolve => setTimeout(resolve, 300));
        setVisibleNodes(prev => {
          const newState = [...prev];
          newState[6] = true;
          return newState;
        });

        await new Promise(resolve => setTimeout(resolve, 200));
        setPath3Visible(true);

        await new Promise(resolve => setTimeout(resolve, 300));
        setVisibleNodes(prev => {
          const newState = [...prev];
          newState[8] = true;
          return newState;
        });

        await new Promise(resolve => setTimeout(resolve, 200));
        setPath4Visible(true);

        await new Promise(resolve => setTimeout(resolve, 300));
        setVisibleNodes(prev => {
          const newState = [...prev];
          newState[2] = true;
          return newState;
        });

        await new Promise(resolve => setTimeout(resolve, 300));
        setVisibleNodes(prev => {
          const newState = [...prev];
          newState[4] = true;
          return newState;
        });

        await new Promise(resolve => setTimeout(resolve, 300));
        setPath5Visible(true);

        await new Promise(resolve => setTimeout(resolve, 300));
        setPath6Visible(true);

        await new Promise(resolve => setTimeout(resolve, 300));
        setPath7Visible(true);

        await new Promise(resolve => setTimeout(resolve, 400));
        setPath8Visible(true);

        await new Promise(resolve => setTimeout(resolve, 300));
        setVisibleNodes(prev => {
          const newState = [...prev];
          newState[5] = true;
          return newState;
        });

        await new Promise(resolve => setTimeout(resolve, 800));
        setFinalPop(true);
      };
      
      animateConnection();
    }
  }, [inView]);

  useEffect(() => {
    if (inView) {
      let currentIndex = 0;
      
      // Start the rotating animation after the initial sequence completes
      const startRotatingAnimation = async () => {
        // Wait for initial animation sequence to complete
        await new Promise(resolve => setTimeout(resolve, 200000));
        
        // Start rotating through nodes
        const interval = setInterval(() => {
          setCurrentAnimatedNode(nodeSequence[currentIndex]);
          
          // Move to next node in sequence
          currentIndex = (currentIndex + 1) % nodeSequence.length;
        }, 6000); // Change node every 3 seconds

        return () => clearInterval(interval);
      };

      startRotatingAnimation();
    } else {
      setCurrentAnimatedNode(null);
    }
  }, [inView]);

  return (
    <div className="w-[500px] h-[500px] relative mx-auto" ref={ref}>
      <svg className="absolute w-[500px] h-[500px] top-0 left-0 pointer-events-none -z-10">
        {/* First path */}
        <path
          d="M 55 60 v 175 q 0 20 20 20 h 50"
          fill="none"
          stroke="rgb(242, 111, 153)"
          strokeWidth="2"
          style={{
            strokeDasharray: '1000',
            strokeDashoffset: pathVisible ? '0' : '1000',
          }}
        />
        {/* Second path */}
        <path
          d="M 153 60 v 175 q 0 20 -20 20 h -10"
          fill="none"
          stroke="rgb(242, 111, 153)"
          strokeWidth="2"
          style={{
            strokeDasharray: '1000',
            strokeDashoffset: path2Visible ? '0' : '1000',
          }}
        />
        {/* Webscraper to Parser */}
        <path
          d="M 55 355 h 175 q 20 0 20 20"
          fill="none"
          stroke="rgb(242, 111, 153)"
          strokeWidth="2"
          style={{
            strokeDasharray: '1000',
            strokeDashoffset: path3Visible ? '0' : '1000',
          }}
        />
        {/* Second Webscraper to Parser */}
        <path
          d="M 65 460 h 165 c 25 0 20 0 20 -80"
          fill="none"
          stroke="rgb(242, 111, 153)"
          strokeWidth="2"
          style={{
            strokeDasharray: '1000',
            strokeDashoffset: path4Visible ? '0' : '1000',
          }}
        />
        {/* Parser 1 to Engine */}
        <path
          d="M 155 255 h 80"
          fill="none"
          stroke="rgb(242, 111, 153)"
          strokeWidth="2"
          style={{
            strokeDasharray: '1000',
            strokeDashoffset: path5Visible ? '0' : '1000',
          }}
        />
        {/* Parser 2 to Engine */}
        <path
          d="M 250 355 v -80 h -20"
          fill="none"
          stroke="rgb(242, 111, 153)"
          strokeWidth="2"
          style={{
            strokeDasharray: '1000',
            strokeDashoffset: path6Visible ? '0' : '1000',
          }}
        />
        {/* Plugins to Engine */}
        <path
          d="M 250 155 v 80"
          fill="none"
          stroke="rgb(242, 111, 153)"
          strokeWidth="2"
          style={{
            strokeDasharray: '1000',
            strokeDashoffset: path7Visible ? '0' : '1000',
          }}
        />
        {/* Engine to Summary path */}
        <path
          d="M 270 255 h 180"
          fill="none"
          stroke="rgb(242, 111, 153)"
          strokeWidth="2"
          style={{
            strokeDasharray: '1000',
            strokeDashoffset: path8Visible ? '0' : '1000',
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
            finalPop={finalPop}
            animateHover={currentAnimatedNode === 0}
          />
        </div>

        {/* Node #2: Book (row1, col2) */}
        <div className="col-start-2 row-start-1 flex items-center justify-center">
          <NodeItem 
            icon={<Book size={24} />} 
            label="Databook" 
            isVisible={visibleNodes[1]}
            finalPop={finalPop}
            animateHover={currentAnimatedNode === 1}
          />
        </div>

        {/* Node #3: Blocks (row2, col3) */}
        <div className="col-start-3 row-start-2 flex items-center justify-center">
          <NodeItem 
            icon={<Blocks size={24} />} 
            label="Plugins" 
            isVisible={visibleNodes[2]}
            finalPop={finalPop}
            animateHover={currentAnimatedNode === 2}
          />
        </div>

        {/* Node #4: BookOpenCheck (row3, col2) */}
        <div className="col-start-2 row-start-3 flex items-center justify-center">
          <NodeItem 
            icon={<BookOpenCheck size={24} />} 
            label="Parser" 
            isVisible={visibleNodes[3]}
            finalPop={finalPop}
            animateHover={currentAnimatedNode === 3}
          />
        </div>

        {/* Node #5: Layers (row3, col3) */}
        <div className="col-start-3 row-start-3 flex items-center justify-center">
          <NodeItem 
            icon={<Layers size={24} />} 
            label="Engine" 
            isVisible={visibleNodes[4]}
            finalPop={finalPop}
            animateHover={currentAnimatedNode === 4}
          />
        </div>

        {/* Node #6: FileText (row3, col5) */}
        <div className="col-start-5 row-start-3 flex items-center justify-center">
          <NodeItem 
            icon={<FileText size={24} />} 
            label="Summary" 
            isVisible={visibleNodes[5]}
            finalPop={finalPop}
            animateHover={currentAnimatedNode === 5}
          />
        </div>

        {/* Node #7: SearchCheck (row4, col1) */}
        <div className="col-start-1 row-start-4 flex items-center justify-center">
          <NodeItem 
            icon={<SearchCheck size={24} />} 
            label="Webscraper" 
            isVisible={visibleNodes[6]}
            finalPop={finalPop}
            animateHover={currentAnimatedNode === 6}
          />
        </div>

        {/* Node #8: BookOpenCheck (row4, col3) */}
        <div className="col-start-3 row-start-4 flex items-center justify-center">
          <NodeItem 
            icon={<BookOpenCheck size={24} />} 
            label="Parser" 
            isVisible={visibleNodes[7]}
            finalPop={finalPop}
            animateHover={currentAnimatedNode === 7}
          />
        </div>

        {/* Node #9: SearchCheck (row5, col1) */}
        <div className="col-start-1 row-start-5 flex items-center justify-center">
          <NodeItem 
            icon={<SearchCheck size={24} />} 
            label="Webscraper" 
            isVisible={visibleNodes[8]}
            finalPop={finalPop}
            animateHover={currentAnimatedNode === 8}
          />
        </div>

        
      </div>

    </div>
  );
}
