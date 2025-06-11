// app/page.tsx
"use client";

import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import LojaCard from "./components/LojaCard";
import { listarLojas, Loja } from "./fakeDB";

export default function HomePage() {
  const { user } = useAuth();
  const lojas = listarLojas();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 p-4 max-w-6xl mx-auto w-full">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Bem-vindo à Plataforma Artesanal
        </h1>
        <section className="mb-6 text-center">
          {user ? (
            <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded">
              Logado como: <strong>{user.nome}</strong> ({user.tipo})
            </span>
          ) : (
            <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded">
              Você não está logado.
            </span>
          )}
        </section>
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {lojas.length > 0 ? (
              lojas.map((loja) => <LojaCard key={loja.id} loja={loja} />)
            ) : (
              <div className="col-span-full text-center text-gray-500">
                Nenhuma loja encontrada.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
