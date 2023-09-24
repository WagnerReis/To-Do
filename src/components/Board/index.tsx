'use client'
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Column } from "../Column";
import { CardProps } from "../Card";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getColumns } from "@/utils/getColumns";

const columns = getColumns();

interface CardInterface {
  cards: CardProps[];
}

export async function Board() {
  const [cards, setCards] = useState<CardProps[]>([
    {
      id: "1",
      title: "fazer algo",
      status: "new",
      estimate: 2,
      date: new Date("01/01/2023"),
    },
    {
      id: "2",
      title:
        "fazer outra coisa fazer outra coisa fazer outra coisa fazer outra coisa ",
      status: "doing",
      estimate: 2,
      date: new Date("01/01/2023"),
    },
  ]);

  const handleCardDrop = (cardId: string, targetColumn: string) => {
    const cardIndex = cards.findIndex((c) => c.id === cardId);
    if (cardIndex !== -1) {
      const updatedCard = { ...cards[cardIndex], status: targetColumn };
      const updatedCards = [...cards];
      updatedCards[cardIndex] = updatedCard;
      setCards(updatedCards);
    }
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <section className={styles.container}>
          <input type="text" className={styles.filter} />
        </section>

        <main className={styles.board}>
          {columns.map((column) => (
            <Column
              key={column.id}
              status={column.status}
              title={column.title}
              color={column.color}
              cards={data}
              onCardDrop={handleCardDrop}
            />
          ))}
        </main>
      </DndProvider>
    </>
  );
}
