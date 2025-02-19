"use client";

import React from "react";
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
  return (
    <div className=" w-full max-w-md lg:max-w-lg ">
      {/* Example: CurvedConnector behind everything */}
      

      <div className="grid grid-cols-5 grid-rows-5 gap-5 lg:gap-4 w-full h-full px-0 sm:px-2 lg:px-12">
        {/* Node #1: Book (row1, col1) */}
        <div className="col-start-1 row-start-1 flex items-center justify-center">
          <NodeItem icon={<Book size={24} className="text-gray-400 " />} label="Databook" />
        </div>

        {/* Node #2: Book (row1, col2) */}
        <div className="col-start-2 row-start-1 flex items-center justify-center">
          <NodeItem icon={<Book size={24} className="text-gray-400" />} label="Databook" />
        </div>

        {/* Node #3: Blocks (row2, col3) */}
        <div className="col-start-3 row-start-2 flex items-center justify-center">
          <NodeItem icon={<Blocks size={24} className="text-gray-400" />} label="Plugins" />
        </div>

        {/* Node #4: BookOpenCheck (row3, col2) */}
        <div className="col-start-2 row-start-3 flex items-center justify-center">
          <NodeItem icon={<BookOpenCheck size={24} className="text-gray-400" />} label="Parser" />
        </div>

        {/* Node #5: Layers (row3, col3) */}
        <div className="col-start-3 row-start-3 flex items-center justify-center">
          <NodeItem icon={<Layers size={24} className="text-gray-400" />} label="Engine" />
        </div>

        {/* Node #6: FileText (row3, col5) */}
        <div className="col-start-5 row-start-3 flex items-center justify-center">
          <NodeItem icon={<FileText size={24} className="text-gray-400" />} label="Summary" />
        </div>

        {/* Node #7: SearchCheck (row4, col1) */}
        <div className="col-start-1 row-start-4 flex items-center justify-center">
          <NodeItem icon={<SearchCheck size={24} className="text-gray-400" />} label="Webscraper" />
        </div>

        {/* Node #8: BookOpenCheck (row4, col3) */}
        <div className="col-start-3 row-start-4 flex items-center justify-center">
          <NodeItem icon={<BookOpenCheck size={24} className="text-gray-400" />} label="Parser" />
        </div>

        {/* Node #9: SearchCheck (row5, col1) */}
        <div className="col-start-1 row-start-5 flex items-center justify-center">
          <NodeItem icon={<SearchCheck size={24} className="text-gray-400" />} label="Webscraper" />
        </div>

        
      </div>

    </div>
  );
}
