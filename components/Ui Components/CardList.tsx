"use client";

import React from "react";
import ListCard from "./ListCard";

type CardItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass?: string;
};

type CardListProps = {
  items: CardItem[];
};

/**
 * Displays a row of ListCards with a small colored divider between them.
 */
export default function CardList({ items }: CardListProps) {
  return (
    <div className="flex items-start justify-start divide-x divide-gray-200 px-12">
      {items.map((item, idx) => (
        <div key={idx} className="px-8">
          <ListCard
            icon={item.icon}
            title={item.title}
            description={item.description}

          />
        </div>
      ))}
    </div>
  );
}
