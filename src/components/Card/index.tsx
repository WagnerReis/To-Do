"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useDrag } from "react-dnd";

export interface CardProps {
  id: string;
  title: string;
  status: string;
  estimate: number;
  date: Date;
}

export function Card({ id, title, status, estimate, date }: CardProps) {
  const [data, setData] = useState(date.toLocaleDateString());
  const [newEstimate, setEstimate] = useState(String(estimate));
  const [newTitle, setTitle] = useState(title);
  const [selectedOption, setSelectedOption] = useState(status)

  const [, ref] = useDrag({
    type: "CARD",
    item: { id, targetColumn: status },
  });

  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value);
  };

  const handleEstimateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEstimate(event.target.value);
  };

  const handleSelectedOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  }

  return (
    <main className={styles.container} ref={ref}>
      <div className={styles.title}>123456: {newTitle}</div>
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
            value={newEstimate}
            onChange={handleEstimateChange}
          />
        </div>
      </div>
      <div className={styles.dueDate}>
        <label htmlFor="estimate">Due Date:</label>
        <input
          className={styles.date}
          type="date"
          value={data}
          name="estimate"
          onChange={handleDataChange}
        />
      </div>
    </main>
  );
}
