"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header
      className="py-4 px-8 flex justify-between items-center shadow-lg bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500"
    >
      <Link
        href="/"
        className="text-2xl font-extrabold tracking-tight flex items-center gap-2"
        style={{ color: "white" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-yellow-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v18m9-9H3" />
        </svg>
        Plataforma Artesanal
      </Link>
      <nav className="flex items-center gap-6">
        {user ? (
          <>
            <span className="text-base text-white bg-blue-800 px-3 py-1 rounded-full shadow">
              Olá, <span className="font-semibold">{user.nome}</span>
            </span>
            {user.tipo === "vendedor" && (
              <Link
                href="/painel"
                className="text-base text-yellow-200 hover:text-yellow-300 font-medium transition"
              >
                Painel
              </Link>
            )}
            <button
              onClick={logout}
              className="text-base text-red-200 hover:text-red-400 font-medium transition px-3 py-1 rounded hover:bg-red-900/30"
            >
              Sair
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="text-base text-yellow-200 hover:text-yellow-300 font-medium transition px-4 py-1 rounded bg-blue-800 hover:bg-blue-900 shadow"
          >
            Entrar
          </Link>
        )}
      </nav>
    </header>
  );
}