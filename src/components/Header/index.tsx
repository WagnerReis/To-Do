import React from "react";
import styles from "./styles.module.scss";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  function handleLogout() {
    Cookies.remove("user_token");
    router.push("/login");
  }

  return (
    <header className={styles.header}>
      <div className={styles.title}>My Board</div>
      <button onClick={handleLogout} className={styles.logout}>
        Logout
      </button>
    </header>
  );
}
