import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useDrag } from "react-dnd";
import { formatedDueDate } from "@/utils/formatedDueDate";
import { useCards } from "@/hooks/useCards";

export interface CardProps {
  _id: string;
  title: string;
  status: string;
  code: string;
  estimated: number;
  dueDate: Date;
}

interface ICard {
  _id: string;
}

const cardDefault = {
  _id: "",
  title: "",
  status: "",
  code: "",
  estimated: 0,
  dueDate: new Date(),
}

export function Card({ _id }: ICard) {
  const { cards, updateDueDate, updateEstimate, updateStatus } = useCards();
  const card: CardProps = cards.find((c: CardProps) => c._id === _id) || cardDefault

  const { dueDate, estimated, status, code, title } = card;
  const [newEstimated, setNewEstimated] = useState(estimated)
  const [newDueDate, setNewDueDate] = useState(formatedDueDate(dueDate))
  const [newStatus, setNewStatus] = useState(status)

  const [, ref] = useDrag({
    type: "CARD",
    item: { id: _id, targetColumn: status },
  });

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    const { id, value } = event.target;

    if (field === "dueDate") {
      const date = new Date(`${value}T03:00:00Z`)
      updateDueDate(id, new Date(date));
      setNewDueDate(value)
    } else if (field === "estimated") {
      updateEstimate(id, Number(value));
      setNewEstimated(Number(value))
    } else if (field === "status") {
      updateStatus(id, value);
      setNewStatus(value)
    }
  }

  return (
    <main ref={ref} className={styles.container}>
      <div className={styles.title}>
        {code}: {title}
      </div>
      <div className={styles.statusEstimate}>
        <select
          className={styles.select}
          name="status"
          id={_id}
          value={newStatus}
          onChange={(e) => {
            handleFieldChange(e, "status")
          }}
        >
          {createOptions(styles.option)}
        </select>
        <div className={styles.effort}>
          <label htmlFor="effort">Estimate:</label>
          <input
            className={styles.estimate}
            type="text"
            name="effort"
            id={_id}
            value={newEstimated === 0 ? "" : newEstimated}
            onChange={(e) => handleFieldChange(e, "estimated")}
          />
        </div>
      </div>
      <div className={styles.dueDate}>
        <label htmlFor="estimate">Due Date:</label>
        <input
          className={styles.date}
          type="date"
          id={_id}
          name="dueDate"
          value={newDueDate}
          onChange={(e) => handleFieldChange(e, "dueDate")}
        />
      </div>
    </main>
  );
}

function createOptions(styles: string) {
  const status: string[] = ["new", "doing", "validation", "done"];
  return status.map((st) => (
    <option key={st} className={styles} value={st}>
      {st}
    </option>
  ));
}
