// app/page.tsx
"use client";

import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import LojaCard from "./components/LojaCard";
import { listarLojas, Loja } from "./fakeDB";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { user, token, login } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Se estiver logado e tiver token, busca o perfil atualizado
    const fetchProfile = async () => {
      if (token) {
        try {
          const res = await fetch("http://localhost:3000/users/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setProfile(data.user || data); // Ajuste conforme resposta do backend
            // Atualiza o contexto se necessário:
            if (data.user) login(data.user, token);
          }
        } catch (err) {
          // Se der erro, não faz nada
        }
      }
    };
    fetchProfile();
  }, [token, login]);

  const lojas: Loja[] = listarLojas(); // ← pegando do "fakeDB"

  return (
    <div>
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          Bem-vindo à Plataforma Artesanal
        </h1>
        {(user || profile) ? (
          <div className="mb-6 flex items-center gap-3 bg-green-100 border border-green-300 rounded-lg px-4 py-3 shadow-sm animate-fade-in">
            <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-green-400 text-white font-bold text-lg shadow">
              {(profile?.nome || user?.nome || "?").charAt(0).toUpperCase()}
            </span>
            <div>
              <p className="font-semibold text-green-900">
                Olá, <span className="underline">{profile?.nome || user?.nome}</span>!
              </p>
              <p className="text-green-700 text-sm">
                Tipo de usuário: <span className="font-medium">{profile?.tipo || user?.tipo}</span>
              </p>
              <p className="text-green-700 text-xs mt-1">
                ID: <span className="font-mono">{profile?.id || user?.id}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-6 flex items-center gap-3 bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-3 shadow-sm animate-fade-in">
            <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold text-lg shadow">
              ?
            </span>
            <div>
              <p className="font-semibold text-yellow-900">
                Você não está logado.
              </p>
              <p className="text-yellow-700 text-sm">
                Faça login para acessar recursos exclusivos!
              </p>
            </div>
          </div>
        )}

        {/* Barra de pesquisa renderiza as lojas */}
        <SearchBar />

        {/*
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lojas.map((loja) => (
            <LojaCard key={loja.id} loja={loja} />
          ))}
        </div>
        */}
        
      </main>
    </div>
  );
}
