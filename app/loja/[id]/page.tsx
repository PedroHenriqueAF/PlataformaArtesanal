// app/loja/[id]/page.tsx
export const dynamic = "force-dynamic";

import { listarLojas, listarProdutosDoVendedor } from "@/app/fakeDB";
import ProdutoCard from "@/app/components/ProdutoCard";
import Header from "@/app/components/Header";

// O tipo para as props é inferido ou pode ser simplificado.
// A definição de LojaPageProps pode ser removida.

function renderStars(avaliacao: number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (avaliacao >= i) {
      stars.push(<span key={i} className="text-yellow-400 text-xl drop-shadow">★</span>);
    } else if (avaliacao >= i - 0.5) {
      // Para meia estrela (opcional, mas visualmente interessante)
      stars.push(<span key={i} className="text-yellow-400 text-xl drop-shadow">☆</span>); // Usando um caractere diferente para meia estrela
    } else {
      stars.push(<span key={i} className="text-blue-200 text-xl">★</span>);
    }
  }
  return stars;
}

// Corrija a tipagem diretamente nos parâmetros da função.
export default function LojaPage({ params }: { params: { id: string } }) {
  const lojaId = parseInt(params.id);
  const loja = listarLojas().find((l) => l.id === lojaId);

  if (!loja) {
    return <div className="p-4 text-red-500">Loja não encontrada.</div>;
  }

  // A busca de produtos deve usar o ID do vendedor associado à loja
  const produtos = listarProdutosDoVendedor(loja.vendedorId);

  const descricao =
    "Bem-vindo à nossa loja! Aqui você encontra produtos artesanais feitos com carinho e dedicação. Explore nossos produtos exclusivos e apoie o trabalho local.";

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br ">
        <div className="max-w-4xl mx-auto p-4 py-16">
          <div className="flex flex-col md:flex-row gap-8 mb-8 items-center md:items-start bg-blue-800 bg-opacity-90 rounded-2xl shadow-2xl p-6">
            <img
              src={loja.imagem}
              alt={loja.nome}
              className="w-full md:w-64 h-48 object-cover rounded-xl shadow-lg border-4 border-blue-300"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold mb-3 text-white drop-shadow-lg">{loja.nome}</h1>
              <div className="flex items-center mb-3">
                {renderStars(loja.avaliacao)}
                <span className="ml-2 text-yellow-200 font-semibold text-lg drop-shadow">
                  {loja.avaliacao.toFixed(1)} / 5
                </span>
              </div>
              <p className="text-blue-100 text-lg">{descricao}</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-5 text-blue-800 drop-shadow">Produtos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {produtos.length > 0 ? (
              produtos.map((produto) => (
                <div
                  key={produto.id}
                  className="bg-white bg-opacity-90 rounded-xl shadow-lg hover:scale-105 transition-transform border-2 border-blue-200"
                >
                  <ProdutoCard
                    produto={{
                      ...produto,
                      imagem: produto.imagem || "/imagens/produto-placeholder.jpg",
                    }}
                  />
                </div>
              ))
            ) : (
              <p className="col-span-3 text-rgb(107, 122, 140) text-center text-lg">Nenhum produto cadastrado.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}