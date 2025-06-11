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
    <div className="w-full max-w-5xl mx-auto mb-10 px-4">
      {/* Título */}
      <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6 drop-shadow">
        Descubra Lojas Artesanais
      </h2>

      {/* Campo de busca */}
      <div className="flex items-center bg-white shadow-lg rounded-full px-5 py-3 mb-6 border border-blue-100 focus-within:ring-2 focus-within:ring-blue-400 transition">
        <input
          type="text"
          placeholder="Buscar lojas..."
          className="flex-grow bg-transparent outline-none text-gray-800 text-lg placeholder-gray-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg
          className="w-6 h-6 text-blue-500"
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
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSelecionada(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold shadow transition-all duration-200 border ${
              categoriaSelecionada === cat
                ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white border-blue-600 scale-105"
                : "bg-gray-100 text-blue-700 border-gray-200 hover:bg-blue-100 hover:text-blue-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resultado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {lojasFiltradas.length > 0 ? (
          lojasFiltradas.map((loja) => (
            <LojaCard key={loja.id} loja={loja} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center py-12">
            <svg
              className="w-16 h-16 text-blue-200 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 10h.01M15 10h.01M8 15c1.333-1 4.667-1 6 0"
              />
            </svg>
            <p className="text-lg text-blue-500 font-medium">
              Nenhuma loja encontrada.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
