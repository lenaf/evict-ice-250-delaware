"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const FACTS_ITEMS = [
  { label: "What Happens Inside", href: "/facts/what-happens-inside" },
  { label: "Who Profits", href: "/facts/who-profits" },
  { label: "Who Pulls the Strings", href: "/facts/who-pulls-the-strings" },
];

interface HeaderProps {
  daysLeft: number;
}

export const Header: React.FC<HeaderProps> = ({ daysLeft }) => {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(true);

  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      if (currentY < 100) {
        setVisible(true);
      } else if (currentY < lastScrollY.current) {
        setVisible(true);
      } else if (!menuOpen) {
        setVisible(false);
        setMenuOpen(false);
      }
      lastScrollY.current = currentY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = "text-white hover:text-[#FFD600]";
  const bannerHeight = bannerOpen ? 40 : 0;

  return (
    <>
      {/* Red countdown banner — sticky at the very top, dismissible */}
      {bannerOpen && (
        <div className="sticky top-0 z-[60] bg-[#FFD600] text-center py-2 px-4">
          <p className="text-sm md:text-base font-semibold tracking-wide">
            <span className="text-[#DC2626] font-black text-lg md:text-xl tracking-[0.08em] mr-2">
              {daysLeft}
            </span>
            <span className="text-black">DAYS UNTIL THE LEASE EXPIRES</span>
          </p>
          <button
            onClick={() => setBannerOpen(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-[#DC2626] transition"
            aria-label="Dismiss banner"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={3}
            >
              <path strokeLinecap="square" d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Nav — sticks below the banner, hides on scroll-down */}
      <header
        className={`sticky z-50 bg-black border-b-2 border-[#DC2626] px-6 md:px-10 transition-all duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ top: visible ? bannerHeight : 0 }}
      >
        <div className="max-w-6xl mx-auto py-3 md:py-4 flex items-center gap-4 md:gap-10">
          {/* Logo — always visible */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logos/evict-ice/logo-yellow-250.png"
              alt="Evict ICE from 250 Delaware"
              width={220}
              height={55}
              className="h-9 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="ml-auto hidden md:flex items-center gap-10">
            {/* THE FACTS dropdown */}
            <div className="relative group">
              <button
                className={`font-black text-xl tracking-wide transition flex items-center gap-1 ${textColor}`}
              >
                THE FACTS <span className="text-sm">▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block pt-3 z-50">
                <div className="bg-black border-2 border-[#DC2626] min-w-[260px]">
                  {FACTS_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-5 py-3.5 font-black text-sm uppercase tracking-wider text-white hover:bg-[#DC2626] transition whitespace-nowrap border-b-2 border-white/10 last:border-b-0"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/events"
              className={`font-black text-xl tracking-wide transition ${textColor}`}
            >
              EVENTS
            </Link>
            <Link
              href="/#join"
              className={`font-black text-xl tracking-wide transition ${textColor}`}
            >
              JOIN US
            </Link>
            <a
              href="https://www.instagram.com/evictice250delaware/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition ${textColor}`}
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <Link
              href="/donate"
              className="bg-[#DC2626] hover:opacity-80 text-white font-black text-xl tracking-wide px-5 py-2 transition"
            >
              DONATE
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-auto md:hidden text-white"
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              {menuOpen ? (
                <path strokeLinecap="square" d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path strokeLinecap="square" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-black border-t-2 border-[#DC2626] max-w-6xl mx-auto px-6 pb-4">
            <nav className="flex flex-col gap-1">
              <Link
                href="/donate"
                onClick={() => setMenuOpen(false)}
                className="font-black text-xl tracking-wide py-3 border-b border-white/10 text-[#DC2626] hover:text-white transition"
              >
                DONATE
              </Link>
              <Link
                href="/#join"
                onClick={() => setMenuOpen(false)}
                className={`font-black text-xl tracking-wide py-3 border-b border-white/10 transition ${textColor}`}
              >
                JOIN US
              </Link>
              {/* THE FACTS group with nested sub-items */}
              <div className="py-3 border-b border-white/10">
                <div className="font-black text-xl tracking-wide text-white/50">
                  THE FACTS
                </div>
                <div className="flex flex-col mt-1">
                  {FACTS_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`font-black text-sm uppercase tracking-wider py-2.5 pl-4 transition ${textColor}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/events"
                onClick={() => setMenuOpen(false)}
                className={`font-black text-xl tracking-wide py-3 border-b border-white/10 transition ${textColor}`}
              >
                EVENTS
              </Link>
              <a
                href="https://www.instagram.com/evictice250delaware/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 font-black text-xl tracking-wide py-3 transition ${textColor}`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                INSTAGRAM
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
