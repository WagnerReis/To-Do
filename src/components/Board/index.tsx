import React from "react";
import styles from "./styles.module.scss";
import { Column } from "../Column";
import { CardProps } from "../Card";

const colors = ["#B10E5C", "#0047FF", "#0AB061", "#33A1FF"];

const columns = [
  {
    id: 0,
    title: "To Do",
    color: colors[0],
    status: 'new'
  },
  {
    id: 1,
    title: "Doing",
    color: colors[1],
    status: 'doing'
  },
  {
    id: 2,
    title: "Validating",
    color: colors[2],
    status: 'validation'
  },
  {
    id: 3,
    title: "Done",
    color: colors[3],
    status: 'done'
  },
];

const cards: CardProps[] = [
  {
    id: '1',
    title: 'fazer algo',
    status: 'new',
    estimate: 2,
    date: new Date('01/01/2023')
  },
  {
    id: '2',
    title: 'fazer outra coisa',
    status: 'doing',
    estimate: 2,
    date: new Date('01/01/2023')
  }
]

export function Board() {
  return (
    <main className={styles.board}>
      {columns.map((column) => (
        <Column key={column.id} status={column.status} title={column.title} color={column.color} cards={cards} />
      ))}
    </main>
  );
}
