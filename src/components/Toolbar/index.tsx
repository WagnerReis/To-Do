import React from 'react'
import styles from './styles.module.scss'

export function Toolbar() {
  return (
    <main className={styles.container}>
        <input type="text" className={styles.filter} />
        <button className={styles.addCollumn}>Add Column</button>
    </main>
  )
}
