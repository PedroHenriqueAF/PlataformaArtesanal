type Produto = {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
};

export default function ProdutoCard({ produto }: { produto: Produto }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow bg-white">
      <img src={produto.imagem} alt={produto.nome} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{produto.nome}</h3>
        <p className="text-green-600 font-bold">R$ {produto.preco.toFixed(2)}</p>
      </div>
    </div>
  );
}
