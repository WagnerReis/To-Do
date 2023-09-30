import { api, getConfig } from "@/api";
import { CardProps } from "@/components/Card";
import React, { ReactNode, createContext, useMemo, useState } from "react";

interface UseCardsPorps {
  cards: CardProps[],
  updateCompleteCard: (id: CardProps["_id"], value: CardProps) => void,
  updateStatus: (id: CardProps["_id"], status: CardProps["status"]) => void,
  updateEstimate: (id: CardProps["_id"], status: CardProps["estimated"]) => void,
  updateDueDate: (id: CardProps["_id"], status: CardProps["dueDate"]) => void,
  updateCards: (values: CardProps[]) => void,
}

const initialContextValue: UseCardsPorps = {
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

export const CardsContext = createContext<UseCardsPorps>(initialContextValue);

export function CardsProvider({ children }: CardsProviderProps ) {
  const [cards, setCards] = useState<CardProps[]>([]);

  const updateCards = (updatedCards: CardProps[]) => {
    setCards(updatedCards);
  };

  const updateCompleteCard = async (cardId: CardProps["_id"], value: CardProps) => {
    await api.patch(`/cards/${cardId}`, value, getConfig());
    const response = await api.get<CardProps[]>('/cards', getConfig())
    setCards(response.data)
  };

  const updateStatus = async (
    cardId: CardProps["_id"],
    newStatus: CardProps["status"]
  ) => {
    const dataToUpdate = { status: newStatus };
    await api.patch(`/cards/updateStatus/${cardId}`, dataToUpdate, getConfig());
    const response = await api.get<CardProps[]>('/cards', getConfig())
    setCards(response.data)
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
      updateCards
    };
  }, [cards]);

  return (
    <CardsContext.Provider value={contextValue}>
      {children}
    </CardsContext.Provider>
  );
}
