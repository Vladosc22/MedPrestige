"use client";
import { createContext, useState, useEffect, useMemo, useContext, useSyncExternalStore } from 'react'

const ThemeConext = createContext(null);

export function useTheme() {
    const ctx = useContext(ThemeConext);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
}

export default function ThemeContext({ children }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") return "light";
      
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") return saved;
      
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      });
      
    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const value = useMemo(
        () => ({
            theme,
            mounted,
            setTheme,
            toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")),
        }),
        [theme, mounted]
    );

    return <ThemeConext.Provider value = { value } > { children }</ThemeConext.Provider>;
}
