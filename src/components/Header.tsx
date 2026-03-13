"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "The Facts", href: "#facts" },
    { title: "Take Action", href: "#action" },
    { title: "Get Involved", href: "#involved" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl text-white shadow-md">
      <div className="container mx-auto max-w-5xl px-6 md:px-12 py-4 flex items-center justify-between gap-8">
        <Link href="/" className="font-extrabold text-lg tracking-tight">
          EVICT <span className="text-cyan-400">ICE!</span>
          <span className="text-xs font-bold block leading-none tracking-widest opacity-70">FROM 250 DELAWARE</span>
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-semibold uppercase tracking-wide">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-cyan-400 transition-colors"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-black/95 border-t border-white/10 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-semibold uppercase tracking-wide hover:text-cyan-400 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
