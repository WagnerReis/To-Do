import React, { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";
import "../../app/globals.scss";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import logo from "../../../public/assets/icon.png";

interface IResponse {
  data: {
    access_token: string;
  };
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    const payload = {
      email,
      password,
    };

    try {
      const { data }: IResponse = await axios.post(
        "http://localhost:3000/auth/login",
        payload
      );

      setErrorLogin(false);

      Cookies.set("user_token", data.access_token, { expires: 7, path: "/" });

      router.push("/");
    } catch (error) {
      setErrorLogin(true);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.main}>
        <Image className={styles.logo} src={logo} alt="logo" />

        <input
          className={styles.email}
          type="text"
          placeholder="Email"
          onChange={handleEmail}
        />
        <input
          className={styles.password}
          type="password"
          placeholder="Password"
          onChange={handlePassword}
        />

        <div className={styles.buttons}>
          <Link className={styles.forgotPassword} href="/">
            Forgot password?
          </Link>
          {errorLogin && (
            <p style={{ color: "red" }}>Email or password invalid</p>
          )}
          <button className={styles.login} onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </main>
  );
}
