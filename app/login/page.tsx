// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { getUsuarioPorNome } from "@/app/fakeDB";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<"cliente" | "vendedor">("cliente");
  const [nome, setNome] = useState("");

  const handleLogin = () => {
    const user = getUsuarioPorNome(nome);
    if (user && user.tipo === tab) {
      login(user);
      router.push("/");
    } else {
      alert("Usuário não encontrado ou tipo incorreto");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2">
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-8 w-full max-w-xs sm:max-w-md">
        <Link
          href="/"
          className="inline-block mb-4 text-blue-600 hover:underline font-medium text-sm sm:text-base"
        >
          ← Voltar para a página principal
        </Link>
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 rounded-l text-xs sm:text-base ${
              tab === "cliente"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => {
              setTab("cliente");
              setNome("");
            }}
          >
            Cliente
          </button>
          <button
            className={`flex-1 py-2 rounded-r text-xs sm:text-base ${
              tab === "vendedor"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => {
              setTab("vendedor");
              setNome("");
            }}
          >
            Vendedor
          </button>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Login {tab === "cliente" ? "de Cliente" : "de Vendedor"}
        </h2>
        <input
          type="text"
          placeholder={
            tab === "cliente"
              ? "Nome do cliente"
              : "Nome do vendedor"
          }
          className="w-full border rounded px-3 py-2 mb-4 text-sm sm:text-base"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm sm:text-base"
        >
          Entrar
        </button>
        <div className="mt-6 text-xs sm:text-sm text-gray-500 text-center">
          Dica: Cliente = <b>Maria Cliente</b> <br />
          Vendedor = <b>João Artesão</b>
        </div>
      </div>
    </div>
  );
}