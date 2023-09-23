"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useDrag } from 'react-dnd'

export interface CardProps {
  id: string;
  title: string;
  status: string;
  estimate: number;
  date: Date;
}

export function Card({ id, title, status, estimate, date }: CardProps) {
  const [data, setData] = useState(date.toLocaleDateString());
  const [newEstimate, setEstimate] = useState('');

  const [, ref] = useDrag({
    type: 'CARD',
    item: { id, targetColumn: status },
  })

  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value);
  };

  const handleEstimateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEstimate(event.target.value);
  };

  return (
    <main className={styles.container} ref={ref}>
      <strong>{title}</strong>
      <div>
        <select name="status" id="pet-select">
          <option value="">new</option>
          <option value="doing">doing</option>
          <option value="done">done</option>
        </select>

        <input
          className={styles.estimate}
          type="text"
          pattern="[0-9]*"
          value={newEstimate}
          onChange={handleEstimateChange}
        />
      </div>
      <input
        className={styles.date}
        type="date"
        value={data}
        onChange={handleDataChange}
      />
    </main>
  );
}
