"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

type UserProfile = {
  id: number;
  nome: string;
  tipo: "cliente" | "vendedor";
  // Adicione outros campos conforme o backend retornar
};

type Loja = {
  id: number;
  nome: string;
  imagem?: string;
  avaliacao?: number;
  descricao?: string;
  // Adicione outros campos conforme o backend retornar
};

export default function PainelPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loja, setLoja] = useState<Loja | null>(null);
  const [loadingLoja, setLoadingLoja] = useState(false);

  // Pegue o token do localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("auth") : null;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("http://localhost:3000/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setProfile(data.user || data);
        }
      } catch {
        // erro ao buscar perfil
      }
      setLoading(false);
    };
    fetchProfile();
  }, [token]);

  // Busca loja se for vendedor
  useEffect(() => {
    const fetchLoja = async () => {
      if (profile && profile.tipo === "vendedor") {
        setLoadingLoja(true);
        try {
          const res = await fetch(`http://localhost:3000/lojas/${profile.id}`);
          if (res.ok) {
            const data = await res.json();
            setLoja(data.loja || data);
          } else {
            setLoja(null);
          }
        } catch {
          setLoja(null);
        }
        setLoadingLoja(false);
      }
    };
    fetchLoja();
  }, [profile]);

  if (!token) {
    return (
      <>
        <Header />
        <div className="p-6 text-red-600">
          Você precisa estar logado para acessar o painel.
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="p-6 text-blue-700">
          Carregando informações do usuário...
        </div>
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <Header />
        <div className="p-6 text-red-600">
          Não foi possível carregar as informações do usuário.
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br bg-white/90">
        <div className="max-w-4xl mx-auto p-4 py-16">
          <div className="flex flex-col md:flex-row gap-8 mb-8 items-center md:items-start bg-blue-800 bg-opacity-90 rounded-2xl shadow-2xl p-6">
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold mb-3 text-white drop-shadow-lg">
                Painel do Usuário
              </h1>
              <div className="mb-2 text-blue-100 text-lg">
                <span className="font-semibold">Nome:</span> {profile.nome}
              </div>
              <div className="mb-2 text-blue-100 text-lg">
                <span className="font-semibold">ID:</span> {profile.id}
              </div>
              <div className="mb-2 text-blue-100 text-lg">
                <span className="font-semibold">Tipo:</span> {profile.tipo}
              </div>
            </div>
          </div>

          {profile.tipo === "vendedor" ? (
            <section className="mb-10 bg-blue-800 bg-opacity-90 rounded-2xl shadow-2xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-white drop-shadow">
                Sua Loja
              </h2>
              {loadingLoja ? (
                <div className="text-blue-200">Carregando loja...</div>
              ) : loja ? (
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <img
                    src={loja.imagem || "/imagens/loja-placeholder.jpg"}
                    alt={loja.nome}
                    className="w-full md:w-64 h-48 object-cover rounded-xl shadow-lg border-4 border-blue-300"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {loja.nome}
                    </h3>
                    <div className="mb-2 text-yellow-200">
                      Avaliação:{" "}
                      <span className="font-semibold">
                        {loja.avaliacao ? loja.avaliacao.toFixed(1) : "N/A"} / 5
                      </span>
                    </div>
                    <p className="text-blue-100">
                      {loja.descricao || "Sem descrição."}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-blue-200">Nenhuma loja encontrada</div>
              )}
            </section>
          ) : (
            <section className="mb-10 bg-green-800 bg-opacity-90 rounded-2xl shadow-2xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-white drop-shadow">
                Bem-vindo, cliente!
              </h2>
              <p className="text-green-100 mb-2">
                Aqui você pode visualizar seus dados e acompanhar seus pedidos.
              </p>
            </section>
          )}
        </div>
      </div>
    </>
  );
}