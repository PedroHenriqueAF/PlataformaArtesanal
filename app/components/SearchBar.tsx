// app/components/SearchBar.tsx
"use client";

import { useState } from "react";
import { Loja, listarLojas } from "../fakeDB";
import LojaCard from "./LojaCard";

const categorias = ["Todos", "Artesanato", "Bijuteria", "Escultura", "Bordado"];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const lojas: Loja[] = listarLojas();

  const lojasFiltradas = lojas.filter((loja) => {
    const correspondeCategoria =
      categoriaSelecionada === "Todos" || loja.categoria === categoriaSelecionada;
    const correspondeBusca = loja.nome.toLowerCase().includes(query.toLowerCase());
    return correspondeCategoria && correspondeBusca;
  });

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      {/* Campo de busca */}
      <div className="flex items-center bg-gray-200 rounded px-3 py-2 mb-4">
        <input
          type="text"
          placeholder="Buscar lojas..."
          className="flex-grow bg-transparent outline-none text-gray-800"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>
      </div>

      {/* Filtros de categoria */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSelecionada(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              categoriaSelecionada === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resultado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lojasFiltradas.length > 0 ? (
          lojasFiltradas.map((loja) => (
            <LojaCard key={loja.id} loja={loja} />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            Nenhuma loja encontrada.
          </p>
        )}
      </div>
    </div>
  );
}
