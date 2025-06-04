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
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Painel do Vendedor</h1>

      {/* Formulário da Loja */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Perfil da Loja</h2>
        <input
          type="text"
          placeholder="Nome da loja"
          className="border rounded px-3 py-2 mb-2 w-full"
          value={loja.nome}
          onChange={(e) => setLoja({ ...loja, nome: e.target.value })}
        />
        <textarea
          placeholder="Descrição da loja"
          className="border rounded px-3 py-2 w-full"
          value={loja.descricao}
          onChange={(e) => setLoja({ ...loja, descricao: e.target.value })}
        />
      </section>

      {/* Formulário de Produto */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Cadastrar Produto</h2>
        <input
          type="text"
          placeholder="Nome do produto"
          className="border rounded px-3 py-2 mb-2 w-full"
          value={novoProduto.nome}
          onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
        />
        <input
          type="number"
          placeholder="Preço (R$)"
          className="border rounded px-3 py-2 mb-2 w-full"
          value={novoProduto.preco}
          onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL da imagem"
          className="border rounded px-3 py-2 mb-2 w-full"
          value={novoProduto.imagem}
          onChange={(e) => setNovoProduto({ ...novoProduto, imagem: e.target.value })}
        />
        <button
          onClick={handleAdicionarProduto}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar Produto
        </button>
      </section>

      {/* Lista de Produtos */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Produtos Cadastrados</h2>
        {produtos.length === 0 ? (
          <p className="text-gray-500">Nenhum produto cadastrado.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {produtos.map((produto) => (
              <ProdutoCard key={produto.id} produto={produto} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
