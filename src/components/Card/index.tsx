import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useDrag } from "react-dnd";
import { formatedDueDate } from "@/utils/formatedDueDate";
import { useCards } from "../Board";

export interface CardProps {
  _id: string;
  title: string;
  status: string;
  code: string;
  estimated: number;
  dueDate: Date;
}

const cardDefault = {
  _id: "",
  title: "",
  status: "",
  code: "",
  estimated: 0,
  dueDate: new Date(),
}

export function Card({ _id }: CardProps) {
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
      setNewDueDate(value)
      updateDueDate(id, new Date(value));
    } else if (field === "estimated") {
      setNewEstimated(Number(value))
      updateEstimate(id, Number(value));
    } else if (field === "status") {
      setNewStatus(value)
      updateStatus(id, value);
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
          onChange={(e) => handleFieldChange(e, "status")}
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
