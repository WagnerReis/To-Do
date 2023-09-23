import React from 'react'
import styles from './styles.module.scss'
import { Card, CardProps } from '../Card'

interface ColumnProps {
    title: string,
    color: string,
    status: string,
    cards: CardProps[]
} 

export function Column({ title, status, color, cards }: ColumnProps) {
  const filteredCards = cards.filter(card => card.status === status)
  
  return (
    <main className={styles.container}>
      <header className={styles.header}  style={{ color }}>{title}</header>
      {filteredCards.map(card => (
        <Card 
          key={card.id} 
          id={card.id}
          title={card.title}
          status={card.status}
          estimate={card.estimate}
          date={card.date}
        />
      ))}
    </main>
  )
}
