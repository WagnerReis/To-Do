import { api } from "@/api";
import Account from "@/components/Account";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../../app/globals.scss";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface IResponse {
  data: {
    access_token: string;
  };
}

export default function CreateAccount() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [errorLogin, setErrorLogin] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async ({
    name,
    email,
    password,
    confirmPassword,
  }: Inputs) => {
    if (password !== confirmPassword) {
      setErrorLogin(true);
      return <strong>The password does not match</strong>;
    }

    const payload = {
      name,
      email,
      password,
    };

    try {
      setErrorLogin(false);

      const { data } = await api.post("/users", payload);

      if (data) {
        Reflect.deleteProperty(payload, "name");
        const { data }: IResponse = await api.post("/auth/login", payload);

        Cookies.set("user_token", data.access_token, {
          expires: 7,
          path: "/",
        });

        const response = await api.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });
        Cookies.set("user_id", response.data.sub, { expires: 7, path: "/" });

        router.push("/");
      }
      return;
    } catch (error) {
      setErrorLogin(true);
      console.error(error);
    }
  };

  return (
    <Account
      createAccountOrlogin="create"
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
