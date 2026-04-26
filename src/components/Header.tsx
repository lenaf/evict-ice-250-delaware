"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

function getDaysLeft() {
  const diff = new Date("2027-03-31T00:00:00").getTime() - Date.now();
  if (diff <= 0) return 0;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function Header() {
  const [visible, setVisible] = useState(true);
  const [pastHero, setPastHero] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const [days, setDays] = useState(getDaysLeft());
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      setPastHero(currentY > 300);
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

  useEffect(() => {
    const id = setInterval(() => setDays(getDaysLeft()), 60000);
    return () => clearInterval(id);
  }, []);

  const textColor = "text-[#1E3A8A] hover:text-[#DC2626]";

  const bannerHeight = bannerOpen ? 40 : 0;

  return (
    <>
      {/* Red countdown banner — sticky at very top */}
      {bannerOpen && (
        <div className="sticky top-0 z-[60] bg-[#DC2626] text-center py-2 px-4">
          <p className="text-sm md:text-base font-semibold tracking-wide">
            <span className="text-[#FFD600] font-black text-lg md:text-xl tracking-[0.08em]">
              {days}
            </span>
            <span className="text-white/90">
              DAYS UNTIL THE DHS LEASE EXPIRES
            </span>
          </p>
          <button
            onClick={() => setBannerOpen(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
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

      {/* Nav — overlays hero at top, becomes solid sticky when scrolled */}
      <header
        className={`sticky z-50 bg-[#FFD600] transition-all duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        } ${pastHero ? "shadow-md" : ""}`}
        style={{ top: visible ? bannerHeight : 0 }}
      >
        {isHome && !pastHero && !menuOpen && <div className="-mb-[52px]" />}
        <div className="px-4 md:px-10 py-3 flex items-center gap-4 md:gap-8">
          {/* Logo — always visible on subpages, fade in on homepage after scroll */}
          <Link
            href="/"
            className={`transition-all duration-300 ${!isHome || pastHero ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}
          >
            <Image
              src="/logo-transparent.png"
              alt="Evict ICE from 250 Delaware"
              width={160}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="ml-auto hidden md:flex items-center gap-8">
            <Link
              href="/facts"
              className={`font-black text-lg tracking-wide transition-colors ${textColor}`}
            >
              THE FACTS
            </Link>
            <Link
              href="#join"
              className={`font-black text-lg tracking-wide transition-colors ${textColor}`}
            >
              JOIN US
            </Link>
            <Link
              href="/show-up"
              className={`font-black text-lg tracking-wide transition-colors ${textColor}`}
            >
              SHOW UP
            </Link>
            <a
              href="https://www.instagram.com/evictice250delaware/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${textColor}`}
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            {/* Language selector — re-enable when Spanish is ready
            <div className="relative">
              <button
                className={`font-black text-lg tracking-wide transition-colors flex items-center gap-1 ${textColor}`}
              >
                EN
              </button>
            </div>
            */}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-auto md:hidden text-[#1E3A8A]"
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
          <div className="md:hidden bg-[#FFD600] border-t-2 border-[#1E3A8A]/20 px-4 pb-4">
            <nav className="flex flex-col gap-1">
              <Link
                href="/show-up"
                onClick={() => setMenuOpen(false)}
                className={`font-black text-xl tracking-wide py-3 border-b border-[#1E3A8A]/10 transition-colors ${textColor}`}
              >
                SHOW UP
              </Link>
              <Link
                href="/facts"
                onClick={() => setMenuOpen(false)}
                className={`font-black text-xl tracking-wide py-3 border-b border-[#1E3A8A]/10 transition-colors ${textColor}`}
              >
                THE FACTS
              </Link>
              <Link
                href="#join"
                onClick={() => setMenuOpen(false)}
                className={`font-black text-xl tracking-wide py-3 border-b border-[#1E3A8A]/10 transition-colors ${textColor}`}
              >
                JOIN US
              </Link>
              <a
                href="https://www.instagram.com/evictice250delaware/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 font-black text-xl tracking-wide py-3 transition-colors ${textColor}`}
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
}
