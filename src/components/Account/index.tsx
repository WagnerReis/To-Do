import Image from "next/image";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import logo from "../../../public/assets/icon.png";
import Link from "next/link";

interface AccountProps {
  createAccountOrlogin: string;
  handleSubmit: any;
  onSubmit: any;
  register: any;
  errors: any;
  errorLogin: any;
  setError: any;
  clearErrors: any;
  watch: any;
}

export default function Account({
  createAccountOrlogin,
  handleSubmit,
  onSubmit,
  register,
  errors,
  errorLogin,
  setError,
  clearErrors,
  watch,
}: AccountProps) {
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
    } else {
      clearErrors("confirmPassword");
    }
  }, [password, confirmPassword, setError, clearErrors]);

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
          {createAccountOrlogin === "create" && (
            <input
              className={styles.name}
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
            />
          )}
          {errors.name && (
            <span className={styles.warning}>This field is required</span>
          )}
          <input
            className={styles.email}
            type="text"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className={styles.warning}>This field is required</span>
          )}
          <input
            className={styles.password}
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className={styles.warning}>This field is required</span>
          )}
          {createAccountOrlogin === "create" && (
            <input
              className={styles.password}
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword", { required: true })}
            />
          )}
          {errors.confirmPassword && <span className={styles.warning}>{errors.confirmPassword.message}</span>}

          <div className={styles.buttons}>
            {errorLogin && (
              <p style={{ color: "red" }}>Email or password invalid</p>
            )}
            <input
              className={styles.login}
              type="submit"
              value={
                createAccountOrlogin === "login" ? "Login" : "Create Account"
              }
            />
          </div>
        </form>
        {createAccountOrlogin === "login" && (
          <Link className={styles.account} href="/account">
            Create account
          </Link>
        )}
      </div>
    </main>
  );
}
