"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-100 py-4 px-6 flex justify-between items-center shadow-sm">
      <Link href="/" className="text-xl font-bold text-gray-800">
        Plataforma Artesanal
      </Link>
      <nav className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm">Olá, {user.nome}</span>
            {user.tipo === "vendedor" && (
              <Link href="/painel" className="text-sm text-blue-600 hover:underline">
                Painel
              </Link>
            )}
            <button onClick={logout} className="text-sm text-red-500 hover:underline">
              Sair
            </button>
          </>
        ) : (
          <Link href="/login" className="text-sm text-blue-600 hover:underline">
            Entrar
          </Link>
        )}
      </nav>
    </header>
  );
}