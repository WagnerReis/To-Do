"use client";
import React from "react";
import styles from "./styles.module.scss";
import { Card } from "../Card";
import { useDrop } from "react-dnd";
import { useCards } from "../Board";

interface ColumnProps {
  title: string;
  color: string;
  status: string;
  onCardDrop: any;
}

export function Column({
  title,
  status,
  color,
  onCardDrop,
}: ColumnProps) {
  const [, ref] = useDrop({
    accept: "CARD",
    drop: (item: any) => {
      onCardDrop(item.id, status);
    },
  });

  const { cards } = useCards();

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
          estimated={card.estimated}
          dueDate={card.dueDate}
        />
      ))}
    </main>
  );
}
