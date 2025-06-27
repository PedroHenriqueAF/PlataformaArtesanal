import Link from "next/link";
import { ReactNode } from "react";

type Loja = {
  children?: React.ReactNode;
  id: number;
  nome: string;
  imagem: string;
  avaliacao: number;
};

export default function LojaCard({ loja }: { loja: Loja }) {
  return (
    <Link
      href={`/loja/${loja.id}`}
      className="group block border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative">
        <img
          src={loja.imagem}
          alt={loja.nome}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-white/80 rounded-full px-3 py-1 flex items-center shadow text-yellow-600 font-semibold text-sm backdrop-blur">
          <span className="mr-1">⭐</span>
          {loja.avaliacao.toFixed(1)}
        </div>
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors duration-200">
          {loja.nome}
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Descubra produtos incríveis nesta loja!
        </p>
      </div>
    </Link>
  );
}
