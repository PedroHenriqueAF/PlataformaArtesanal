import Image from "next/image";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
};

export default function ProdutoCard({ produto }: { produto: Produto }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white transition-transform hover:scale-105 hover:shadow-lg">
      <div className="relative w-full h-40">
        <Image
          src={produto.imagem}
          alt={produto.nome}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-200"
          sizes="(max-width: 640px) 100vw, 400px"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold truncate" title={produto.nome}>
          {produto.nome}
        </h3>
        <p className="text-green-700 font-bold text-base">
          R$ {produto.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
}
