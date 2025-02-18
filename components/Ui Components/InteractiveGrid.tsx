"use client";

import React from "react";
import {
  Book,
  Camera,
  BookOpenCheck,
  SearchCheck,
  Blocks,
  FileText,
  Layers
} from "lucide-react";

// Shadcn tooltip imports (adjust paths as needed)
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/molecules/shadcn/tooltip";



export default function InteractiveGrid() {
  return (
    <TooltipProvider>
      <div className="relative w-full max-w-md lg:max-w-lg">

        <div className="grid grid-cols-5 grid-rows-5 gap-5 lg:gap-4 w-full h-full px-0 sm:px-2 lg:pr-28">
          {/* Node #1: Book (row1, col1) */}
          <div className="col-start-1 row-start-1 flex items-center justify-center">
            <Tooltip>
              <TooltipTrigger>
                <div className="rounded-lg border border-gray-200 bg-white w-16 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-sm">
                  <Book className="text-gray-400" size={24} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Book 1</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Node #2: Book (row1, col2) */}
          <div className="col-start-2 row-start-1 flex items-center justify-center">
            <Tooltip>
              <TooltipTrigger>
                <div className="rounded-lg border border-gray-200 bg-white w-16 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-sm">
                  <Book className="text-gray-400" size={24} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Book 2</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Node #3: Blocks (row2, col3) */}
          <div className="col-start-3 row-start-2 flex items-center justify-center">
            <Tooltip>
              <TooltipTrigger>
                <div className="rounded-lg border border-gray-200 bg-white w-16 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-sm">
                  <Blocks className="text-gray-400" size={24} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Blocks</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Node #4: BookOpenCheck (row3, col2) */}
          <div className="col-start-2 row-start-3 flex items-center justify-center">
            <Tooltip>
              <TooltipTrigger>
                <div className="rounded-lg border border-gray-200 bg-white w-16 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-sm">
                  <BookOpenCheck className="text-gray-400" size={24} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Checked Book</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Node #5: Camera (row3, col3) */}
          <div className="col-start-3 row-start-3 flex items-center justify-center">
            <Tooltip>
              <TooltipTrigger>
                <div className="rounded-lg border border-gray-200 bg-white w-16 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-sm">
                  <Layers className="text-gray-400" size={24} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Camera</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Node #6: FileText (row3, col5) */}
          <div className="col-start-5 row-start-3 flex items-center justify-center">
            <Tooltip>
              <TooltipTrigger>
                <div className="rounded-lg border border-gray-200 bg-white w-16 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-sm">
                  <FileText className="text-gray-400" size={24} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Document</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Node #7: SearchCheck (row4, col1) */}
          <div className="col-start-1 row-start-4 flex items-center justify-center">
            <Tooltip>
              <TooltipTrigger>
                <div className="rounded-lg border border-gray-200 bg-white w-16 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-sm">
                  <SearchCheck className="text-gray-400" size={24} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search Check 1</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Node #8: BookOpenCheck (row4, col3) */}
          <div className="col-start-3 row-start-4 flex items-center justify-center">
            <Tooltip>
              <TooltipTrigger>
                <div className="rounded-lg border border-gray-200 bg-white w-16 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-sm">
                  <BookOpenCheck className="text-gray-400" size={24} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Checked Book 2</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Node #9: SearchCheck (row5, col1) */}
          <div className="col-start-1 row-start-5 flex items-center justify-center">
            <Tooltip>
              <TooltipTrigger>
                <div className="rounded-lg border border-gray-200 bg-white w-16 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-sm">
                  <SearchCheck className="text-gray-400" size={24} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search Check 2</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/*
          ABSOLUTELY POSITIONED SVG LINES:
          Each <svg> is placed so that it encloses a path from node A to node B.
          The "path" can be curved using M/L/Q or M/C.

          Tweak (left, top, width, height) and d="..." for each line
          so it lines up precisely with your cards.
        */}

        {/* Example line #1: Book (row1,col1) => BookOpenCheck (row3,col2) */}
       

        {/* Repeat for each connection you want */}
        {/* ... */}
      </div>
    </TooltipProvider>
  );
}
