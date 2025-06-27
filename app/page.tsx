// app/page.tsx
"use client";

import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import LojaCard from "./components/LojaCard";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from "react";

type Loja = {
  id: number;
  nome: string;
  imagem: string;
  avaliacao?: number;
  descricao?: string;
  categoria?: string; // Certifique-se que o backend retorna esse campo
  // Outros campos conforme o backend
};

export default function HomePage() {
  const { user, login } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("auth") : null
  );
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [loadingLojas, setLoadingLojas] = useState(true);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("");

  // Atualiza token ao mudar no localStorage (logout/login)
  useEffect(() => {
    const onStorage = () => setToken(localStorage.getItem("auth"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

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
            setProfile(data.user || data);
            if (data.user) login(data.user);
          } else {
            setProfile(null);
          }
        } catch {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, login]);

  // Buscar lojas do backend
  useEffect(() => {
    const fetchLojas = async () => {
      setLoadingLojas(true);
      try {
        const res = await fetch("http://localhost:3000/lojas");
        if (res.ok) {
          const data = await res.json();
          setLojas(data.lojas || data);
        } else {
          setLojas([]);
        }
      } catch {
        setLojas([]);
      }
      setLoadingLojas(false);
    };
    fetchLojas();
  }, []);

  // Filtrar lojas por categoria selecionada
  const lojasFiltradas = categoriaSelecionada
    ? lojas.filter((loja) => loja.categoria === categoriaSelecionada)
    : lojas;

  // Gerar lista de categorias únicas
  const categorias = Array.from(new Set(lojas.map((loja) => loja.categoria).filter(Boolean)));

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

        <SearchBar />

        {/* Filtro de categoria */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            className={`px-4 py-2 rounded ${!categoriaSelecionada ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} font-semibold`}
            onClick={() => setCategoriaSelecionada("")}
          >
            Todas as categorias
          </button>
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded ${categoriaSelecionada === cat ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} font-semibold`}
              onClick={() => setCategoriaSelecionada(cat!)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {loadingLojas ? (
            <div className="col-span-3 text-center text-blue-700">Carregando lojas...</div>
          ) : lojasFiltradas.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">Nenhuma loja encontrada.</div>
          ) : (
            lojasFiltradas.map((loja) => (
              <LojaCard
                key={loja.id}
                loja={{
                  ...loja,
                  avaliacao: loja.avaliacao ?? 0, // Garante que avaliacao nunca será undefined
                }}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
