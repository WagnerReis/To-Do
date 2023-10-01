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
import { BiSearch } from "react-icons/bi";

const columns = getColumns();

export function Board() {
  const config = getConfig();

  const { cards, updateCards, updateStatus } = useCards();
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
    const response = await api.get<CardProps[]>('/cards', config)
    const cards = response.data
    const cardIndex = cards.findIndex((c) => c._id === cardId);
    
    if (cardIndex !== -1) {
      const updatedCard = { ...cards[cardIndex], status: targetColumn };
      const updatedCards = [...cards];
      updatedCards[cardIndex] = updatedCard;
      
      updateCards(updatedCards);
      updateStatus(cardId, targetColumn);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
        <section className={styles.container}>
          <span onClick={openModal} className={styles.plus}>
            +
          </span>
          <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search"
            onChange={handleFilter}
          />
            <BiSearch className={styles.searchIcon} />
          </div>
        </section>

        <TaskModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          // cards={cards}
          type="create"
        />

        <main className={styles.board}>
          {columns.map((column) => (
            <Column
              key={column.id}
              status={column.status}
              title={column.title}
              color={column.color}
              onCardDrop={handleCardDrop}
            />
          ))}
        </main>
    </DndProvider>
  );
}
