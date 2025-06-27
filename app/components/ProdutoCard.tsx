type Produto = {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
};

export default function ProdutoCard({ produto }: { produto: Produto }) {
  return (
    <div className="border rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-white via-gray-50 to-gray-100 hover:shadow-2xl transition-shadow duration-300 max-w-xs mx-auto">
      <div className="relative">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow">
          Novo
        </span>
      </div>
      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-xl font-bold text-gray-800 truncate">{produto.nome}</h3>
        <p className="text-green-600 font-extrabold text-lg">
          R$ {produto.preco.toFixed(2)}
        </p>
        <button className="mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg shadow transition-colors duration-200">
          Ver detalhes
        </button>
      </div>
    </div>
  );
}
