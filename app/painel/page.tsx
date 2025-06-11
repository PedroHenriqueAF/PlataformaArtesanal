"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProdutoCard from "../components/ProdutoCard";

export default function PainelPage() {
  const { user } = useAuth();

  const [loja, setLoja] = useState({ nome: "", descricao: "" });
  const [produtos, setProdutos] = useState<any[]>([]);
  const [novoProduto, setNovoProduto] = useState({ nome: "", preco: "", imagem: "" });

  const handleAdicionarProduto = () => {
    if (!novoProduto.nome || !novoProduto.preco || !novoProduto.imagem) return;
    setProdutos([...produtos, { ...novoProduto, id: Date.now(), preco: Number(novoProduto.preco) }]);
    setNovoProduto({ nome: "", preco: "", imagem: "" });
  };

  if (!user || user.tipo !== "vendedor") {
    return <p className="p-6 text-red-600">Acesso restrito a vendedores.</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 min-h-screen rounded-xl shadow-2xl">
      <h1 className="text-3xl font-extrabold mb-6 text-white drop-shadow-lg text-center tracking-tight">
        Painel do Vendedor
      </h1>

      {/* Formulário da Loja */}
      <section className="mb-10 bg-blue-800 bg-opacity-80 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-100">Perfil da Loja</h2>
        <input
          type="text"
          placeholder="Nome da loja"
          className="border-2 border-blue-400 focus:border-blue-300 bg-blue-900 text-blue-100 rounded px-3 py-2 mb-3 w-full placeholder-blue-300 transition"
          value={loja.nome}
          onChange={(e) => setLoja({ ...loja, nome: e.target.value })}
        />
        <textarea
          placeholder="Descrição da loja"
          className="border-2 border-blue-400 focus:border-blue-300 bg-blue-900 text-blue-100 rounded px-3 py-2 w-full placeholder-blue-300 transition"
          value={loja.descricao}
          onChange={(e) => setLoja({ ...loja, descricao: e.target.value })}
        />
      </section>

      {/* Formulário de Produto */}
      <section className="mb-10 bg-blue-800 bg-opacity-80 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-100">Cadastrar Produto</h2>
        <input
          type="text"
          placeholder="Nome do produto"
          className="border-2 border-blue-400 focus:border-blue-300 bg-blue-900 text-blue-100 rounded px-3 py-2 mb-3 w-full placeholder-blue-300 transition"
          value={novoProduto.nome}
          onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
        />
        <input
          type="number"
          placeholder="Preço (R$)"
          className="border-2 border-blue-400 focus:border-blue-300 bg-blue-900 text-blue-100 rounded px-3 py-2 mb-3 w-full placeholder-blue-300 transition"
          value={novoProduto.preco}
          onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL da imagem"
          className="border-2 border-blue-400 focus:border-blue-300 bg-blue-900 text-blue-100 rounded px-3 py-2 mb-3 w-full placeholder-blue-300 transition"
          value={novoProduto.imagem}
          onChange={(e) => setNovoProduto({ ...novoProduto, imagem: e.target.value })}
        />
        <button
          onClick={handleAdicionarProduto}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-blue-800 transition"
        >
          Adicionar Produto
        </button>
      </section>

      {/* Lista de Produtos */}
      <section className="bg-blue-800 bg-opacity-80 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-blue-100">Produtos Cadastrados</h2>
        {produtos.length === 0 ? (
          <p className="text-blue-200">Nenhum produto cadastrado.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {produtos.map((produto) => (
              <div key={produto.id} className="bg-blue-900 rounded-lg shadow-lg p-3">
                <ProdutoCard produto={produto} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
