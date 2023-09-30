import React, {
  ChangeEvent,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./styles.module.scss";
import { Column } from "../Column";
import { CardProps } from "../Card";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getColumns } from "@/utils/getColumns";
import { TaskModal } from "../TaskModal";
import { api, getConfig } from "@/api";
import { debounce } from "lodash";

const columns = getColumns();

interface UseCardsPorps {
  cards: CardProps[],
  // completeCard: (id: CardProps["_id"], value: CardProps) => void,
  updateStatus: (id: CardProps["_id"], status: CardProps["status"]) => void,
  updateEstimate: (id: CardProps["_id"], status: CardProps["estimated"]) => void,
  updateDueDate: (id: CardProps["_id"], status: CardProps["dueDate"]) => void,
}

const initialContextValue: UseCardsPorps = {
  cards: [],
  // completeCard: (id, value) => {},
  updateStatus: (id, status) => {},
  updateEstimate: (id, estimated) => {},
  updateDueDate: (id, dueDate) => {},
};

const CardsContext = createContext<UseCardsPorps>(initialContextValue);

export function Board() {
  const config = getConfig();

  const [cards, setCards] = useState<CardProps[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // const completeCard = (cardId: CardProps["_id"]) => {};

  const updateStatus = async (cardId: CardProps["_id"], newStatus: CardProps["status"]) => {
    const dataToUpdate = { status: newStatus };
    await api.patch(`/cards/updateStatus/${cardId}`, dataToUpdate, getConfig());
  };

  const updateEstimate = async (cardId: CardProps["_id"], newEstimate: CardProps["estimated"]) => {
    const dataToUpdate = { estimated: newEstimate };
    await api.patch(`/cards/updateEstimated/${cardId}`, dataToUpdate, getConfig());
  };

  const updateDueDate = async (cardId: CardProps["_id"], newDueDate: CardProps["dueDate"]) => {
    const dataToUpdate = { dueDate: newDueDate };
    await api.patch(`/cards/updateDueDate/${cardId}`, dataToUpdate, getConfig());
  };

  const fetchCards = async () => {
    try {
      const obj = await api.get<CardProps[]>("/cards", config);
      setCards(obj.data);
    } catch (error) {
      console.error("Erro ao buscar cartões:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    (async () => {
      const obj = await api.get<CardProps[]>("/cards", config);
      setCards(obj.data);
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
        setCards(response.data);
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

      setCards(updatedCards);
      await api.patch(
        `/cards/updateStatus/${updatedCards[cardIndex]._id}`,
        { status: targetColumn },
        config
      );
    }
  };

  const contextValue = useMemo(() => {
    return {
      cards,
      // completeCard,
      updateStatus,
      updateEstimate,
      updateDueDate,
    };
  }, [cards]);

  return (
    <DndProvider backend={HTML5Backend}>
      <section className={styles.container}>
        <div onClick={openModal} className={styles.plus}>
          +
        </div>
        <input type="text" className={styles.filter} onChange={handleFilter} />
      </section>

      <TaskModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        cards={cards}
        setCards={setCards}
      />

      <main className={styles.board}>
        <CardsContext.Provider
          value={contextValue}
        >
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
        </CardsContext.Provider>
      </main>
    </DndProvider>
  );
}

interface UseCardsPorps {
  cards: CardProps[],
  // completeCard: (id: CardProps["_id"], value: CardProps) => void,
  updateStatus: (id: CardProps["_id"], status: CardProps["status"]) => void,
  updateEstimate: (id: CardProps["_id"], status: CardProps["estimated"]) => void,
  updateDueDate: (id: CardProps["_id"], status: CardProps["dueDate"]) => void,
}

export function useCards(): UseCardsPorps {
  return useContext<UseCardsPorps>(CardsContext);
}
