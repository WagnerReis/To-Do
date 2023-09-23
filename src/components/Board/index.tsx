"use client"
import React, { useState } from "react"
import styles from "./styles.module.scss"
import { Column } from "../Column"
import { CardProps } from "../Card"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const colors = ["#B10E5C", "#0047FF", "#0AB061", "#33A1FF"]

const columns = [
  {
    id: 0,
    title: "To Do",
    color: colors[0],
    status: "new",
  },
  {
    id: 1,
    title: "Doing",
    color: colors[1],
    status: "doing",
  },
  {
    id: 2,
    title: "Validating",
    color: colors[2],
    status: "validation",
  },
  {
    id: 3,
    title: "Done",
    color: colors[3],
    status: "done",
  },
]

// const cards: CardProps[] = [
//   {
//     id: "1",
//     title: "fazer algo",
//     status: "new",
//     estimate: 2,
//     date: new Date("01/01/2023"),
//   },
//   {
//     id: "2",
//     title: "fazer outra coisa",
//     status: "doing",
//     estimate: 2,
//     date: new Date("01/01/2023"),
//   },
// ]

export function Board() {
  const [cards, setCards] = useState<CardProps[]>([
    {
      id: "1",
      title: "fazer algo",
      status: "new",
      estimate: 2,
      date: new Date("01/01/2023"),
    },
    {
      id: "2",
      title: "fazer outra coisa",
      status: "doing",
      estimate: 2,
      date: new Date("01/01/2023"),
    },
  ])

  const handleCardDrop = (cardId: string, targetColumn: string) => {
    const cardIndex = cards.findIndex((c) => c.id === cardId)
    if (cardIndex !== -1) {
      const updatedCard = { ...cards[cardIndex], status: targetColumn }
      const updatedCards = [...cards]
      updatedCards[cardIndex] = updatedCard
      setCards(updatedCards)
    }
  }  

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.board}>
          {columns.map((column) => (
            <Column
              key={column.id}
              status={column.status}
              title={column.title}
              color={column.color}
              cards={cards}
              onCardDrop={handleCardDrop}
            />
          ))}
        </main>
      </DndProvider>
    </>
  )
}
