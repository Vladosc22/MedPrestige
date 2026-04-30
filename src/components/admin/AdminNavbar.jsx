"use client";

import Link from "next/link";
import "./admin-navbar.css";
import { useAuth } from "@/context/AuthContext";

export default function AdminNavbar({ onToggleSidebar, onOpenMobileSidebar }) {
  const { user, logout } = useAuth();

  return (
    <div className="admin-navbar">
      <button className="admin-navbar__burger" onClick={onOpenMobileSidebar} aria-label="Open menu">
        ☰
      </button>

      <button className="admin-navbar__collapse" onClick={onToggleSidebar} aria-label="Toggle sidebar">
        ⫶
      </button>

      <div className="admin-navbar__title">
        <span className="admin-navbar__badge">Admin</span>
        <span>Clinic Dashboard</span>
      </div>

      <div className="admin-navbar__actions">
        {user && (
          <span style={{ fontSize: 14, color: "#4B7A9E" }}>
            {user.Name ?? user.name}
          </span>
        )}

        <Link className="admin-navbar__link" href="/">
          Back to website
        </Link>

        <button className="admin-navbar__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
