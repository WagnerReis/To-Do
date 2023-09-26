"use client";
import React from "react";
import styles from "./styles.module.scss";
import { Card, CardProps } from "../Card";
import { useDrop } from "react-dnd";

interface ColumnProps {
  title: string;
  color: string;
  status: string;
  cards: CardProps[];
  onCardDrop: any;
}

export function Column({
  title,
  status,
  color,
  cards,
  onCardDrop,
}: ColumnProps) {
  const [, ref] = useDrop({
    accept: "CARD",
    drop: (item: any) => {
      onCardDrop(item.id, status);
    },
  });

  const filteredCards = cards.filter((card) => card.status === status);

  return (
    <main className={styles.container} ref={ref}>
      <header className={styles.header}>
        <div style={{ color }}>{title}</div>
      </header>

      {filteredCards.map((card) => (
        <Card
          key={card._id}
          _id={card._id}
          title={card.title}
          status={card.status}
          code={card.code}
          estimate={card.estimate}
          dueDate={card.dueDate}
        />
      ))}
    </main>
  );
}
