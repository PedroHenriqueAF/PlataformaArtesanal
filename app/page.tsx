// app/page.tsx
"use client";

import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import LojaCard from "./components/LojaCard";
import { listarLojas, Loja } from "./fakeDB";

export default function HomePage() {
  const { user } = useAuth();

  const lojas: Loja[] = listarLojas(); // ← pegando do "fakeDB"

  return (
    <div>
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          Bem-vindo à Plataforma Artesanal
        </h1>
        {user ? (
          <p className="mb-4">
            Logado como: {user.nome} ({user.tipo})
          </p>
        ) : (
          <p className="mb-4">Você não está logado.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lojas.map((loja) => (
            <LojaCard key={loja.id} loja={loja} />
          ))}
        </div>
      </main>
    </div>
  );
}
