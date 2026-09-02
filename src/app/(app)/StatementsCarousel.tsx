"use client";

import React, { useEffect, useState } from "react";
import { SwipeCarousel } from "@/components/SwipeCarousel";
import type { StatementItem } from "@/lib/payload";

interface StatementsCarouselProps {
  statements: StatementItem[];
}

export const StatementsCarousel: React.FC<StatementsCarouselProps> = ({
  statements,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null ? statements[openIndex] : null;

  // While the modal is open: close on Escape and lock background scroll.
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex]);

  return (
    <section className="bg-[#1E3A8A] text-white py-12 md:py-20">
      <SwipeCarousel
        tone="light"
        ariaLabel="Coalition statements"
        gapClassName="gap-4 md:gap-10"
        paddingClassName="px-4 md:px-16"
      >
        {statements.map((statement, i) => (
          <figure
            key={statement.org}
            className="self-start shrink-0 snap-center md:snap-start w-[82vw] md:w-[calc(50%-1.25rem)] px-8 md:px-0 flex flex-col"
          >
            <svg
              aria-hidden
              viewBox="0 0 42 24"
              className="self-start w-7 h-4 md:w-8 md:h-5 fill-white mt-2 mb-3"
            >
              <path d="M0 24C0 13 5 5 16 2L17.5 6C11 8.5 8.5 12 8.5 16H16V24H0ZM24 24C24 13 29 5 40 2L41.5 6C35 8.5 32.5 12 32.5 16H40V24H24Z" />
            </svg>
            <blockquote className="text-lg md:text-xl leading-snug">
              {/* Clamp on an inner div: a base rule forces the blockquote to
                  display:flow-root, which would defeat -webkit-line-clamp. */}
              <div className="line-clamp-[8]">
                {(statement.keyPoint ?? statement.paragraphs[0]).trim()}
              </div>
            </blockquote>
            <div className="mt-5 flex flex-col items-start gap-2">
              {statement.href ? (
                <a
                  href={statement.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-black text-sm uppercase tracking-wider text-[#FFD600] hover:text-white transition"
                >
                  {statement.org}
                </a>
              ) : (
                <span className="font-black text-sm uppercase tracking-wider text-[#FFD600]">
                  {statement.org}
                </span>
              )}
              {statement.keyPoint && (
                <button
                  onClick={() => setOpenIndex(i)}
                  className="text-xs font-bold uppercase tracking-wider text-white/70 underline underline-offset-4 hover:text-[#FFD600] transition cursor-pointer"
                >
                  Read full statement
                </button>
              )}
            </div>
          </figure>
        ))}
      </SwipeCarousel>

      {/* Full-statement modal — matches the section: dark-blue panel, white
          text, quote mark on top, org name below the statement. */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${open.org} full statement`}
        >
          <div className="relative bg-[#1E3A8A] text-white border-2 border-black w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 md:p-10">
            <div className="flex items-start justify-between gap-4 mb-4">
              <svg
                aria-hidden
                viewBox="0 0 42 24"
                className="w-7 h-4 md:w-8 md:h-5 fill-white mt-1"
              >
                <path d="M0 24C0 13 5 5 16 2L17.5 6C11 8.5 8.5 12 8.5 16H16V24H0ZM24 24C24 13 29 5 40 2L41.5 6C35 8.5 32.5 12 32.5 16H40V24H24Z" />
              </svg>
              <button
                onClick={() => setOpenIndex(null)}
                aria-label="Close"
                className="shrink-0 w-9 h-9 flex items-center justify-center border-2 border-white text-white font-black hover:opacity-80 transition cursor-pointer"
              >
                ✕
              </button>
            </div>
            <blockquote className="space-y-4">
              {open.paragraphs.map((p, i) => (
                <p key={i} className="text-base md:text-lg leading-relaxed">
                  {p}
                </p>
              ))}
            </blockquote>
            <div className="mt-6">
              {open.href ? (
                <a
                  href={open.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-black text-sm uppercase tracking-wider text-[#FFD600] hover:text-white transition"
                >
                  {open.org}
                </a>
              ) : (
                <span className="font-black text-sm uppercase tracking-wider text-[#FFD600]">
                  {open.org}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
