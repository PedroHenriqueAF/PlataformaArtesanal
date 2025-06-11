import Image from "next/image";

type Loja = {
  children?: React.ReactNode;
  id: number;
  nome: string;
  imagem: string;
  avaliacao: number;
};

export default function LojaCard({ loja }: { loja: Loja }) {
  return (
    <a
      href={`/loja/${loja.id}`}
      className="block border rounded-xl shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
      aria-label={`Ver detalhes da loja ${loja.nome}`}
    >
      <div className="relative w-full h-40">
        <Image
          src={loja.imagem}
          alt={loja.nome}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-200 hover:scale-105"
          priority
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{loja.nome}</h2>
        <div className="flex items-center mt-1">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="text-sm text-gray-700">{loja.avaliacao.toFixed(1)} / 5</span>
        </div>
      </div>
    </a>
  );
}
