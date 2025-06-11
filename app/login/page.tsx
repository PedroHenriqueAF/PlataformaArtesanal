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
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-2">
      <div className="relative bg-white/90 shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-xs sm:max-w-md border border-blue-200 backdrop-blur-md">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 shadow-lg">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-white">
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" fill="currentColor"/>
          </svg>
        </div>
        <Link
          href="/"
          className="inline-block mb-4 text-blue-600 hover:underline font-medium text-sm sm:text-base"
        >
          ← Voltar para a página principal
        </Link>
        <div className="flex mb-6 rounded-lg overflow-hidden border border-blue-200">
          <button
            className={`flex-1 py-2 text-xs sm:text-base font-semibold transition ${
              tab === "cliente"
                ? "bg-blue-500 text-white shadow"
                : "bg-white text-blue-700 hover:bg-blue-50"
            }`}
            onClick={() => {
              setTab("cliente");
              setNome("");
            }}
          >
            Cliente
          </button>
          <button
            className={`flex-1 py-2 text-xs sm:text-base font-semibold transition ${
              tab === "vendedor"
                ? "bg-blue-700 text-white shadow"
                : "bg-white text-blue-700 hover:bg-blue-50"
            }`}
            onClick={() => {
              setTab("vendedor");
              setNome("");
            }}
          >
            Vendedor
          </button>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-blue-600 drop-shadow">
          Login {tab === "cliente" ? "de Cliente" : "de Vendedor"}
        </h2>
        <input
          type="text"
          placeholder={
            tab === "cliente"
              ? "Nome do cliente"
              : "Nome do vendedor"
          }
          className="w-full border-2 border-blue-200 focus:border-blue-400 rounded-lg px-4 py-2 mb-4 text-sm sm:text-base outline-none transition shadow-sm bg-white/80"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold hover:scale-105 hover:shadow-lg transition text-sm sm:text-base"
        >
          Entrar
        </button>
        <div className="mt-8 text-xs sm:text-sm text-gray-500 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold mr-1">
            Dica:
          </span>
          Cliente = <b>Maria Cliente</b> <br />
          Vendedor = <b>João Artesão</b>
        </div>
      </div>
    </div>
  );
}