"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header
      className="py-4 px-6 flex justify-between items-center shadow-sm"
      style={{ backgroundColor: "rgb(107, 122, 140)" }}
    >
      <Link
        href="/"
        className="text-xl font-bold"
        style={{ color: "white" }}
      >
        Plataforma Artesanal
      </Link>
      <nav className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-white">Olá, {user.nome}</span>
            {user.tipo === "vendedor" && (
              <Link href="/painel" className="text-sm text-white hover:underline">
                Painel
              </Link>
            )}
            <button onClick={logout} className="text-sm text-red-200 hover:underline">
              Sair
            </button>
          </>
        ) : (
          <Link href="/login" className="text-sm text-white hover:underline">
            Entrar
          </Link>
        )}
      </nav>
    </header>
  );
}