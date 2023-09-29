import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useDrag } from "react-dnd";
import { formatedDueDate } from "@/utils/formatedDueDate";
import { api, getConfig } from "@/api";

export interface CardProps {
  _id: string;
  title: string;
  status: string;
  code: string;
  estimated: number;
  dueDate: Date;
}

export function Card({
  _id,
  title,
  status,
  code,
  estimated,
  dueDate,
}: CardProps) {
  const [newDueDate, setDueDate] = useState(formatedDueDate(dueDate));
  const [newEstimate, setEstimate] = useState(estimated);
  const [selectedOption, setSelectedOption] = useState(status);

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
      setDueDate(value);
    } else if (field === "estimated") {
      setEstimate(Number(value));
    } else if (field === "status") {
      setSelectedOption(value);
    }

    const dataToUpdate = { [field]: value };
    api.patch(`/cards/update${field}/${id}`, dataToUpdate, getConfig());
  };

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
          value={selectedOption}
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
            value={newEstimate}
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
