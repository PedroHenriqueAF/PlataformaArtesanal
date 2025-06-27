// app/login/page.tsx
"use client";

// tentando consertar.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const { login: contextLogin } = useAuth();
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  type User = {
    id: number;
    nome: string;
    tipo: "cliente" | "vendedor";
    // Adicione outros campos conforme necessário
  };

  const login = (user: User, token: string) => {
    contextLogin(user, token);
    localStorage.setItem("auth", token); // Salva só o token
    localStorage.setItem("user", JSON.stringify(user)); // Salva o usuário separado
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        alert(data.message || "Erro ao fazer login");
        setLoading(false);
        return;
      }

      if (data.user && data.token) {
        login(data.user, data.token);
        router.push("/painel"); // Redireciona para o painel do usuário
      } else {
        alert("Usuário ou senha inválidos");
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor");
    }
    setLoading(false);
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
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-blue-600 drop-shadow">
          Login
        </h2>
        <input
          type="text"
          placeholder="Nome do usuário"
          className="w-full border-2 border-blue-200 focus:border-blue-400 rounded-lg px-4 py-2 mb-4 text-sm sm:text-base outline-none transition shadow-sm bg-white/80"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full border-2 border-blue-200 focus:border-blue-400 rounded-lg px-4 py-2 mb-4 text-sm sm:text-base outline-none transition shadow-sm bg-white/80"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold hover:scale-105 hover:shadow-lg transition text-sm sm:text-base"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <div className="mt-8 text-xs sm:text-sm text-gray-500 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold mr-1">
            Dica:
          </span>
          Use seu nome de usuário e senha cadastrados.
        </div>
      </div>
    </div>
  );
}