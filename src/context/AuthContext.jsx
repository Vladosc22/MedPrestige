"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setLoading(false); return; }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setUser(data);
        } else {
          localStorage.removeItem("token");
          document.cookie = "token=; path=/; max-age=0";
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function login(token, userData) {
    localStorage.setItem("token", token);
    document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`;
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
    setUser(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
