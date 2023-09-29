"use client";
import { Header } from "../components/Header";
import { Board } from "../components/Board";
import { api, getConfig } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isLoading, data } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      return api
        .get("/auth/profile", getConfig())
        .then((response) => response)
        .catch(() => {
          router.push("/login");
          throw new Error("Usuário não autenticado");
        });
    },
  });

  useEffect(() => {
    if (!isLoading && !data) {
      router.push("/login");
    }
  }, [isLoading, data, router]);

  if (isLoading) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Carregando...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <Board />
    </>
  );
}
