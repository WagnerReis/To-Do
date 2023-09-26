"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useDrag } from "react-dnd";

export interface CardProps {
  _id: string;
  title: string;
  status: string;
  code: string;
  estimate: number;
  dueDate: Date;
}

export function Card({ _id, title, status, code, estimate, dueDate }: CardProps) {
  const [newDueDate, setDueDate] = useState(dueDate);
  const [newEstimate, setEstimate] = useState(estimate);
  const [selectedOption, setSelectedOption] = useState(status)

  const [, ref] = useDrag({
    type: "CARD",
    item: { id: _id, targetColumn: status },
  });

  const handleDataChange = (event: React.ChangeEvent<HTMLDataElement>) => {
    setDueDate(new Date(event.target.value));
    console.log(newDueDate)
  };

  const handleEstimateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEstimate(Number(event.target.value));
  };

  const handleSelectedOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  }

  return (
    <main className={styles.container} ref={ref}>
      <div className={styles.title}>{code}: {title}</div>
      <div className={styles.statusEstimate}>
        <select className={styles.select} name="status" value={selectedOption} onChange={handleSelectedOptionChange}>
          <option className={styles.option} value={status}>
            new
          </option>
          <option className={styles.option} value="doing">
            doing
          </option>
          <option className={styles.option} value="done">
            done
          </option>
        </select>

        <div className={styles.effort}>
          <label htmlFor="effort">Estimate:</label>
          <input
            className={styles.estimate}
            type="text"
            pattern="[0-9]*"
            name="effort"
            value={newEstimate || ''}
            onChange={handleEstimateChange}
          />
        </div>
      </div>
      <div className={styles.dueDate}>
        <label htmlFor="estimate">Due Date:</label>
        <input
          className={styles.date}
          type="date"
          name="dueDate"
          onChange={handleDataChange}
        />
      </div>
    </main>
  );
}
