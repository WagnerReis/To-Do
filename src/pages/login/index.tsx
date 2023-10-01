import React, { useState } from "react";
import "../../app/globals.scss";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useForm, SubmitHandler } from "react-hook-form";

import { api } from "@/api";
import Account from "@/components/Account";

interface IResponse {
  data: {
    access_token: string;
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
    handleSubmit,setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [errorLogin, setErrorLogin] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async ({
    email,
    password,
  }: Inputs) => {
    const payload = {
      email,
      password,
    };

    try {
      const { data }: IResponse = await api.post("/auth/login", payload);

      setErrorLogin(false);

      Cookies.set("user_token", data.access_token, { expires: 7, path: "/" });

      const response = await api.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });
      Cookies.set("user_id", response.data.sub, { expires: 7, path: "/" });

      router.push("/");
    } catch (error) {
      setErrorLogin(true);
    }
  };

  return (
    <Account
      createAccountOrlogin="login"
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      errorLogin={errorLogin}
      setError={setError}
      clearErrors={clearErrors}
      watch={watch}
    />
  );
}
