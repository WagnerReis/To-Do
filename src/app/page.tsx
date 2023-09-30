"use client";
import { Header } from "../components/Header";
import { Board } from "../components/Board";
import { api, getConfig } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CardsProvider } from "@/context/CardsProvider";

export default function Home() {
  const router = useRouter();
  const { isLoading, data } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        const response = await api.get("/auth/profile", getConfig());
        return response;
      } catch {
        router.push("/login");
        throw new Error("Usuário não autenticado");
      }
    },
  });

  useEffect(() => {
    if (!isLoading && !data) {
      router.push("/login");
    }
  }, [isLoading, data, router]);

  if (isLoading) {
    return (
      <main
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
      </main>
    );
  }

  return (
    <>
      <Header />
      <CardsProvider>
        <Board />
      </CardsProvider>
    </>
  );
}
