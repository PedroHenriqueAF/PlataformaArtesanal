// app/loja/[id]/page.tsx
export const dynamic = "force-dynamic";

import { listarLojas, listarProdutosDoVendedor } from "@/app/fakeDB";
import ProdutoCard from "@/app/components/ProdutoCard";
import Header from "@/app/components/Header";

function renderStars(avaliacao: number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (avaliacao >= i) {
      stars.push(<span key={i} className="text-yellow-500 text-xl">★</span>);
    } else if (avaliacao >= i - 0.5) {
      stars.push(<span key={i} className="text-yellow-500 text-xl">☆</span>);
    } else {
      stars.push(<span key={i} className="text-gray-300 text-xl">★</span>);
    }
  }
  return stars;
}

type LojaPageProps = {
  params: {
    id: string;
  };
};

export default async function LojaPage({ params }: LojaPageProps) {
  const lojaId = parseInt(params.id);
  const loja = listarLojas().find((l) => l.id === lojaId);

  if (!loja) {
    return <div className="p-4 text-red-500">Loja não encontrada.</div>;
  }

  const produtos = listarProdutosDoVendedor(loja.vendedorId);

  const descricao =
    "Bem-vindo à nossa loja! Aqui você encontra produtos artesanais feitos com carinho e dedicação. Explore nossos produtos exclusivos e apoie o trabalho local.";

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-4 py-16">
        <div className="flex flex-col md:flex-row gap-6 mb-6 items-center md:items-start">
          <img
            src={loja.imagem}
            alt={loja.nome}
            className="w-full md:w-64 h-48 object-cover rounded-xl shadow"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{loja.nome}</h1>
            <div className="flex items-center mb-2">
              {renderStars(loja.avaliacao)}
              <span className="ml-2 text-yellow-700 font-medium">
                {loja.avaliacao.toFixed(1)} / 5
              </span>
            </div>
            <p className="text-gray-700">{descricao}</p>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-4">Produtos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {produtos.length > 0 ? (
            produtos.map((produto) => (
              <ProdutoCard
                key={produto.id}
                produto={{ ...produto, imagem: produto.imagem || "/imagens/produto-placeholder.jpg" }}
              />
            ))
          ) : (
            <p className="col-span-3 text-gray-500">Nenhum produto cadastrado.</p>
          )}
        </div>
      </div>
    </>
  );
}
