"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../login/Login.css";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.target);

    if (fd.get("password") !== fd.get("confirmPassword")) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: fd.get("name"),
          Email: fd.get("email"),
          Phone: fd.get("phone"),
          Password: fd.get("password"),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message || "Registration failed. Please try again.");
        return;
      }

      const { token, user } = await res.json();
      login(token, user);
      router.push("/dashboard");
    } catch {
      setError("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="register-title">
        <header className="login-header">
          <h1 id="register-title" className="login-title">Create account</h1>
          <p className="login-subtitle">Fill in your details to get started.</p>
        </header>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 8, padding: "10px 14px", color: "#DC2626", fontSize: 14 }}>
              {error}
            </div>
          )}

          <div className="login-field">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" type="text" placeholder="John Doe" autoComplete="name" required />
          </div>

          <div className="login-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
          </div>

          <div className="login-field">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" placeholder="+40 700 000 000" autoComplete="tel" />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" autoComplete="new-password" required minLength={6} />
          </div>

          <div className="login-field">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" autoComplete="new-password" required minLength={6} />
          </div>

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="login-footer">
            Already have an account?{" "}
            <a className="login-link" href="/login">Log in</a>
          </p>
        </form>
      </section>
    </main>
  );
}
