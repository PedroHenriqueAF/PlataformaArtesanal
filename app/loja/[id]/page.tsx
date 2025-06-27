"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../components/Header";
import ProdutoCard from "../../components/ProdutoCard";

type Loja = {
  id: number;
  nome: string;
  imagem?: string;
  avaliacao?: number;
  descricao?: string;
  categoria?: string;
};

type Produto = {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  lojaId: number;
};

export default function LojaPage() {
  const params = useParams();
  const lojaId = params?.id;
  const [loja, setLoja] = useState<Loja | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoja = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/lojas/${lojaId}`);
        if (res.ok) {
          const data = await res.json();
          setLoja(data.loja || data);
        } else {
          setLoja(null);
        }
      } catch {
        setLoja(null);
      }
      setLoading(false);
    };
    if (lojaId) fetchLoja();
  }, [lojaId]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const res = await fetch("http://localhost:3000/produtos");
        if (res.ok) {
          const data = await res.json();
          // Filtra produtos da loja atual
          const produtosDaLoja = (data.produtos || data).filter(
            (produto: Produto) => produto.lojaId === Number(lojaId)
          );
          setProdutos(produtosDaLoja);
        } else {
          setProdutos([]);
        }
      } catch {
        setProdutos([]);
      }
    };
    if (lojaId) fetchProdutos();
  }, [lojaId]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="p-8 text-blue-700 text-center">Carregando loja...</div>
      </>
    );
  }

  if (!loja) {
    return (
      <>
        <Header />
        <div className="p-8 text-red-600 text-center">Loja não encontrada.</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-4 py-10">
        <div className="flex flex-col md:flex-row gap-8 bg-blue-800 bg-opacity-90 rounded-2xl shadow-2xl p-6 mb-8 items-center md:items-start">
          <img
            src={loja.imagem || "/imagens/loja-placeholder.jpg"}
            alt={loja.nome}
            className="w-full md:w-64 h-48 object-cover rounded-xl shadow-lg border-4 border-blue-300"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold mb-2 text-white drop-shadow-lg">{loja.nome}</h1>
            <div className="mb-2 text-yellow-200">
              Avaliação:{" "}
              <span className="font-semibold">
                {loja.avaliacao ? loja.avaliacao.toFixed(1) : "N/A"} / 5
              </span>
            </div>
            <div className="mb-2 text-blue-100 text-lg">
              <span className="font-semibold">Categoria:</span> {loja.categoria || "Não informada"}
            </div>
            <p className="text-blue-100">{loja.descricao || "Sem descrição."}</p>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Produtos disponíveis</h2>
          {produtos.length === 0 ? (
            <div className="text-gray-500">Nenhum produto cadastrado nesta loja.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {produtos.map((produto) => (
                <ProdutoCard key={produto.id} produto={produto} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}