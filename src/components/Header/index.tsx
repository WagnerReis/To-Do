import React from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'

export function Header() {
  return (
    <header className={styles.header}>
        <div className={styles.title}>To Do</div>
        <Link href='/login' className={styles.login}>Login</Link>
    </header>
  )
}
