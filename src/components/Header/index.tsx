import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { getUser } from "@/api";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.title}>My Board</div>
      <Link href="/login" className={styles.login}>
        Login
      </Link>
    </header>
  );
}
