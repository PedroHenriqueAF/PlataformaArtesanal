"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white py-4 px-6 flex justify-between items-center shadow">
      <Link href="/" className="text-2xl font-extrabold text-gray-900 tracking-tight hover:text-blue-700 transition-colors">
        Plataforma Artesanal
      </Link>
      <nav className="flex items-center gap-6">
        {user ? (
          <>
            <span className="text-sm text-gray-700">Olá, <span className="font-semibold">{user.nome}</span></span>
            {user.tipo === "vendedor" && (
              <Link
                href="/painel"
                className="text-sm text-blue-600 font-medium hover:underline hover:text-blue-800 transition-colors"
              >
                Painel
              </Link>
            )}
            <button
              onClick={logout}
              className="text-sm text-red-500 font-medium hover:underline hover:text-red-700 transition-colors"
              aria-label="Sair"
            >
              Sair
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="text-sm text-blue-600 font-medium hover:underline hover:text-blue-800 transition-colors"
          >
            Entrar
          </Link>
        )}
      </nav>
    </header>
  );
}