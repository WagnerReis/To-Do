import { CardProps } from "@/components/Card";
import { CardsContext } from "@/context/CardsProvider";
import { useContext } from "react";

interface UseCardsPorps {
  cards: CardProps[];
  updateCompleteCard: (id: CardProps["_id"], value: CardProps) => void,
  updateStatus: (id: CardProps["_id"], status: CardProps["status"]) => void;
  updateEstimate: (
    id: CardProps["_id"],
    status: CardProps["estimated"]
  ) => void;
  updateDueDate: (id: CardProps["_id"], status: CardProps["dueDate"]) => void;
  updateCards: (value: CardProps[]) => void;
}

export function useCards(): UseCardsPorps {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error("useCards must be inside a CardsProvider");
  }
  return context;
}
