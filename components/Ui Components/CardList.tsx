"use client";

import React from "react";
import ListCard, { ListCardProps } from "./ListCard";

export type CardItem = ListCardProps;

type CardListProps = {
  items: CardItem[];
};

/**
 * Displays a grid of ListCards. On small screens, it displays two columns.
 */
export default function CardList({ items }: CardListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:px-20 px-0">
      {items.map((item, index) => (
        <ListCard key={index} {...item} />
      ))}
    </div>
  );
}
