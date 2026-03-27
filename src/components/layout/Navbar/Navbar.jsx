"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LogoIcon from "../../Icons/LogoIcon";
import "./Navbar.css";
import { useTheme } from "@/components/providers/ThemeContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, mounted, toggleTheme } = useTheme();
  const isDark = mounted ? theme === "dark" : false;
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Doctors", href: "/doctors" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`navbar${isTransparent ? " navbar--transparent" : " navbar--scrolled"}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <LogoIcon />
          <span className="navbar-brand">MedPrestige</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="navbar-link">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth + CTA */}
        <div className="navbar-actions">
          {/* Login button */}
          <Link href="/login" className="navbar-login">
            Login
          </Link>

          {/* CTA */}
          <Link href="/contact" className="navbar-cta">
            Book Now
          </Link>
          <button
            type="button"
            className="navbar-theme-btn"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-menu">
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="navbar-mobile-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile auth buttons */}
          <div className="navbar-mobile-actions">
            <Link
              href="/login"
              className="navbar-login mobile"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>

            <Link
              href="/contact"
              className="navbar-cta mobile"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Now
            </Link>
            <button
              type="button"
              className="navbar-theme-btn mobile"
              onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
