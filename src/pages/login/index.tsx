import React, { useState } from "react";
import styles from "./styles.module.scss";
import "../../app/globals.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useForm, SubmitHandler } from "react-hook-form";

import logo from "../../../public/assets/icon.png";
import { api } from "@/api";

interface IResponse {
  data: {
    access_token: string;
  };
}

interface IResponseProfile {
  data: {
    email: string;
    sub: string;
  };
}

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [errorLogin, setErrorLogin] = useState(false);

  const onSubmit: SubmitHandler<Inputs>  = async ({ email, password}: Inputs) => {
    const payload = {
      email,
      password,
    };

    try {
      const { data }: IResponse = await api.post("/auth/login", payload);

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
        <Image
          className={styles.logo}
          src={logo}
          alt="logo"
          priority={true}
          quality={100}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className={styles.email}
            type="text"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <span className={styles.warning}>This field is required</span>}
          <input
            className={styles.password}
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            />
            {errors.password && <span className={styles.warning}>This field is required</span>}

          <div className={styles.buttons}>
            {errorLogin && (
              <p style={{ color: "red" }}>Email or password invalid</p>
            )}
            <input className={styles.login} type="submit" defaultValue="Login"/>
          </div>
        </form>
        <Link className={styles.account} href="/account">Create account</Link>
      </div>
    </main>
  );
}
