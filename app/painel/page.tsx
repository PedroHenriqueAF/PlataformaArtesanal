"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProdutoCard from "../components/ProdutoCard";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
};

type Loja = {
  nome: string;
  descricao: string;
};

export default function PainelPage() {
  const { user } = useAuth();

  const [loja, setLoja] = useState<Loja>({ nome: "", descricao: "" });
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [novoProduto, setNovoProduto] = useState<Omit<Produto, "id" | "preco"> & { preco: string }>({
    nome: "",
    preco: "",
    imagem: "",
  });
  const [erro, setErro] = useState<string | null>(null);

  const handleAdicionarProduto = () => {
    if (!novoProduto.nome.trim() || !novoProduto.preco.trim() || !novoProduto.imagem.trim()) {
      setErro("Preencha todos os campos do produto.");
      return;
    }
    const precoNum = Number(novoProduto.preco);
    if (isNaN(precoNum) || precoNum <= 0) {
      setErro("Preço inválido.");
      return;
    }
    setProdutos([
      ...produtos,
      { ...novoProduto, id: Date.now(), preco: precoNum },
    ]);
    setNovoProduto({ nome: "", preco: "", imagem: "" });
    setErro(null);
  };

  const handleRemoverProduto = (id: number) => {
    setProdutos(produtos.filter((p) => p.id !== id));
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
        <label className="block mb-1 font-medium" htmlFor="nome-loja">Nome da loja</label>
        <input
          id="nome-loja"
          type="text"
          placeholder="Nome da loja"
          className="border rounded px-3 py-2 mb-2 w-full"
          value={loja.nome}
          onChange={(e) => setLoja({ ...loja, nome: e.target.value })}
        />
        <label className="block mb-1 font-medium" htmlFor="desc-loja">Descrição da loja</label>
        <textarea
          id="desc-loja"
          placeholder="Descrição da loja"
          className="border rounded px-3 py-2 w-full"
          value={loja.descricao}
          onChange={(e) => setLoja({ ...loja, descricao: e.target.value })}
        />
      </section>

      {/* Formulário de Produto */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Cadastrar Produto</h2>
        <label className="block mb-1 font-medium" htmlFor="nome-produto">Nome do produto</label>
        <input
          id="nome-produto"
          type="text"
          placeholder="Nome do produto"
          className="border rounded px-3 py-2 mb-2 w-full"
          value={novoProduto.nome}
          onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
        />
        <label className="block mb-1 font-medium" htmlFor="preco-produto">Preço (R$)</label>
        <input
          id="preco-produto"
          type="number"
          placeholder="Preço (R$)"
          className="border rounded px-3 py-2 mb-2 w-full"
          value={novoProduto.preco}
          onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
        />
        <label className="block mb-1 font-medium" htmlFor="imagem-produto">URL da imagem</label>
        <input
          id="imagem-produto"
          type="text"
          placeholder="URL da imagem"
          className="border rounded px-3 py-2 mb-2 w-full"
          value={novoProduto.imagem}
          onChange={(e) => setNovoProduto({ ...novoProduto, imagem: e.target.value })}
        />
        {erro && <p className="text-red-600 mb-2">{erro}</p>}
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
              <div key={produto.id} className="relative">
                <ProdutoCard produto={produto} />
                <button
                  aria-label={`Remover ${produto.nome}`}
                  onClick={() => handleRemoverProduto(produto.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-700"
                  title="Remover produto"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
