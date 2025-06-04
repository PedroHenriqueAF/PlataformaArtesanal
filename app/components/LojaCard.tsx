import { ReactNode } from "react"


type Loja = {
  children?: React.ReactNode;
  id: number;
  nome: string;
  imagem: string;
  avaliacao: number;
};

export default function LojaCard({ loja }: { loja: Loja }) {
  return (
    <a href={`/loja/${loja.id}`} className="block border rounded-xl shadow hover:shadow-md overflow-hidden bg-white">
      <img src={loja.imagem} alt={loja.nome} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-[#000000]">{loja.nome}</h2>
        <p className="text-sm text-yellow-600">⭐ {loja.avaliacao.toFixed(1)} / 5</p>
      </div>
    </a>
  );
}
