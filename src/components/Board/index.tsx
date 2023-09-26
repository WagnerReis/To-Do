'use client'
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Column } from "../Column";
import { CardProps } from "../Card";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getColumns } from "@/utils/getColumns";
import Cookies from "js-cookie";
import axios from "axios";

const columns = getColumns();

export function Board() {
  const token = Cookies.get("user_token"); 
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  };

  const [cards, setCards] = useState<CardProps[]>([]);

  const handleCardDrop = async (cardId: string, targetColumn: string) => {
    const cardIndex = cards.findIndex((c) => c._id === cardId);
    if (cardIndex !== -1) {
      const updatedCard = { ...cards[cardIndex], status: targetColumn };
      const updatedCards = [...cards];
      updatedCards[cardIndex] = updatedCard;
      
      setCards(updatedCards)
      await axios.patch(
        `http://localhost:3000/cards/updateStatus/${updatedCards[cardIndex]._id}`,
        {status: targetColumn},
        config
      );
    }
  };

  useEffect(() => {
    (async () => {
      const obj = await axios.get<CardProps[]>(
        "http://localhost:3000/cards",
        config
      );
      
      setCards(obj.data);
    })();
  }, []);

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
              cards={cards}
              onCardDrop={handleCardDrop}
            />
          ))}
        </main>
      </DndProvider>
    </>
  );
}
