// app/login/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { getUsuarioPorNome } from "@/app/fakeDB";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (nome: string) => {
    const user = getUsuarioPorNome(nome);
    if (user) {
      login(user);
      router.push("/");
    } else {
      alert("Usuário não encontrado");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <button
        onClick={() => handleLogin("João Artesão")}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Entrar como Vendedor
      </button>
      <button
        onClick={() => handleLogin("Maria Cliente")}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Entrar como Cliente
      </button>
    </div>
  );
}