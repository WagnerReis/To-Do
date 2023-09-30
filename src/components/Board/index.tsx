import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Column } from "../Column";
import { CardProps } from "../Card";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getColumns } from "@/utils/getColumns";
import { TaskModal } from "../TaskModal";
import { api, getConfig } from "@/api";
import { debounce } from "lodash";
import { useCards } from "@/hooks/useCards";

const columns = getColumns();

export function Board() {
  const config = getConfig();

  const { cards, updateCards } = useCards();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchCards = async () => {
    try {
      const response = await api.get<CardProps[]>("/cards", config);
      updateCards(response.data);
    } catch (error) {
      console.error("Erro ao buscar cartões:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await api.get<CardProps[]>("/cards", config);
      updateCards(response.data);
    })();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const debouncedSearch = debounce((searchTerm: string) => {
    api
      .get<CardProps[]>(`/cards?title=${searchTerm}`, config)
      .then((response) => {
        updateCards(response.data);
      });
  }, 1000);

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    debouncedSearch(searchTerm);
  };

  const handleCardDrop = async (cardId: string, targetColumn: string) => {
    const cardIndex = cards.findIndex((c) => c._id === cardId);
    if (cardIndex !== -1) {
      const updatedCard = { ...cards[cardIndex], status: targetColumn };
      const updatedCards = [...cards];
      updatedCards[cardIndex] = updatedCard;

      updateCards(updatedCards);
      await api.patch(
        `/cards/updateStatus/${updatedCards[cardIndex]._id}`,
        { status: targetColumn },
        config
      );
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
        <section className={styles.container}>
          <div onClick={openModal} className={styles.plus}>
            +
          </div>
          <input
            type="text"
            className={styles.filter}
            onChange={handleFilter}
          />
        </section>

        <TaskModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          cards={cards}
          setCards={updateCards}
        />

        <main className={styles.board}>
          {columns.map((column) => (
            <Column
              key={column.id}
              status={column.status}
              title={column.title}
              color={column.color}
              // cards={cards}
              onCardDrop={handleCardDrop}
            />
          ))}
        </main>
    </DndProvider>
  );
}
