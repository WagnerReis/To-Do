"use client";
import React from "react";
import styles from "./styles.module.scss";
import { Card } from "../Card";
import { useDrop } from "react-dnd";
import { useCards } from "@/hooks/useCards";

interface ColumnProps {
  title: string;
  color: string;
  status: string;
  onCardDrop: any;
}

export function Column({ title, status, color, onCardDrop }: ColumnProps) {
  const { cards } = useCards();
  
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
        />
      ))}
    </main>
  );
}
