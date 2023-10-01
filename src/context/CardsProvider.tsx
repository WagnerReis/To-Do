import { api, getConfig } from "@/api";
import { CardProps } from "@/components/Card";
import React, { ReactNode, createContext, useMemo, useState } from "react";

interface UseCardsProps {
  cards: CardProps[];
  updateCompleteCard: (id: CardProps["_id"], value: CardProps) => void;
  updateStatus: (id: CardProps["_id"], status: CardProps["status"]) => void;
  updateEstimate: (
    id: CardProps["_id"],
    status: CardProps["estimated"]
  ) => void;
  updateDueDate: (id: CardProps["_id"], status: CardProps["dueDate"]) => void;
  updateCards: (values: CardProps[]) => void;
}

const initialContextValue: UseCardsProps = {
  cards: [],
  updateCompleteCard: (id, value) => {},
  updateStatus: (id, status) => {},
  updateEstimate: (id, estimated) => {},
  updateDueDate: (id, dueDate) => {},
  updateCards: (value) => {},
};

interface CardsProviderProps {
  children: ReactNode;
}

export const CardsContext = createContext<UseCardsProps>(initialContextValue);

export function CardsProvider({ children }: CardsProviderProps) {
  const [cards, setCards] = useState<CardProps[]>([]);

  const updateCards = (updatedCards: CardProps[]) => {
    setCards(updatedCards);
  };

  const updateCompleteCard = async (
    cardId: CardProps["_id"],
    value: CardProps
  ) => {
    const updatedCards = cards.map((card) =>
      card._id === cardId ? { ...card, ...value, status: card.status } : card
    );
    setCards(updatedCards);

    api.patch(`/cards/${cardId}`, value, getConfig()).catch((error) => {
      setCards(cards);
      console.error("Erro ao atualizar card:", error);
    });
  };

  const updateStatus = async (
    cardId: CardProps["_id"],
    newStatus: CardProps["status"]
  ) => {
    const dataToUpdate = { status: newStatus };
    await api.patch(`/cards/updateStatus/${cardId}`, dataToUpdate, getConfig());
    const response = await api.get<CardProps[]>("/cards", getConfig());
    setCards(response.data);
  };

  const updateEstimate = async (
    cardId: CardProps["_id"],
    newEstimate: CardProps["estimated"]
  ) => {
    const dataToUpdate = { estimated: newEstimate };
    await api.patch(
      `/cards/updateEstimated/${cardId}`,
      dataToUpdate,
      getConfig()
    );
  };

  const updateDueDate = async (
    cardId: CardProps["_id"],
    newDueDate: CardProps["dueDate"]
  ) => {
    const dataToUpdate = { dueDate: newDueDate };
    await api.patch(
      `/cards/updateDueDate/${cardId}`,
      dataToUpdate,
      getConfig()
    );
  };

  const contextValue = useMemo(() => {
    return {
      cards,
      updateCompleteCard,
      updateStatus,
      updateEstimate,
      updateDueDate,
      updateCards,
    };
  }, [cards]);

  return (
    <CardsContext.Provider value={contextValue}>
      {children}
    </CardsContext.Provider>
  );
}
