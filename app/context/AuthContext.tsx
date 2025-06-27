// context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

type User = { id: number; nome: string; tipo: "cliente" | "vendedor" };
type AuthData = { user: User; token: string };

const AuthContext = createContext<{
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Recupera do localStorage ao iniciar
  useEffect(() => {
    const savedToken = localStorage.getItem("auth");
    const savedUser = localStorage.getItem("user");
    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Sempre que user/token mudar, atualiza o localStorage
  useEffect(() => {
    if (token) localStorage.setItem("auth", token);
    if (user) localStorage.setItem("user", JSON.stringify(user));
  }, [user, token]);

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("auth", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
