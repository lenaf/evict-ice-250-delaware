"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

interface SwipeCarouselProps {
  children: React.ReactNode;
  /** Accessible label for the scrollable track. */
  ariaLabel: string;
  /** Arrow color: "light" for dark backgrounds, "dark" for light backgrounds. */
  tone?: "light" | "dark";
  /** Gap utility classes between items. */
  gapClassName?: string;
  /** Max-width utility for the track (default centers at max-w-6xl). Pass
   *  "max-w-none" to let the strip span the full width. */
  maxWidthClassName?: string;
  /** Horizontal padding of the arrow gutter (default "px-10 md:px-16"). */
  paddingClassName?: string;
}

// Shared swipeable horizontal strip: native scroll/swipe with prev/next arrows
// pinned to the page edge and progress dots below. The track lines up with the
// standard max-w-6xl content edge; the arrows sit out in the gutter. Used for
// the partner logos, the photo gallery, and the coalition statements.
export const SwipeCarousel: React.FC<SwipeCarouselProps> = ({
  children,
  ariaLabel,
  tone = "dark",
  gapClassName = "gap-4 md:gap-6",
  maxWidthClassName = "max-w-6xl",
  paddingClassName = "px-10 md:px-16",
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(1);
  const [activePage, setActivePage] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Derive a page model from the native scroll position so the dots reflect how
  // much of the strip is left. Pages are clientWidth-sized chunks of scrollWidth.
  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    const pages = Math.max(1, Math.round(el.scrollWidth / el.clientWidth));
    const active = Math.round(el.scrollLeft / el.clientWidth);
    setPageCount(pages);
    setActivePage(Math.min(active, pages - 1));
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    // Lazy-loaded images start near-zero width, so the strip can measure as a
    // single page at mount; recompute as each child image finishes loading.
    el.addEventListener("load", update, { capture: true });
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      el.removeEventListener("load", update, { capture: true });
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [update]);

  const scrollByDir = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const scrollToPage = (page: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: page * el.clientWidth, behavior: "smooth" });
  };

  const hasPages = pageCount > 1;
  const arrow =
    tone === "light"
      ? "text-white/70 hover:text-white"
      : "text-black/60 hover:text-black";
  const dotActive = tone === "light" ? "bg-white" : "bg-black";
  const dotIdle =
    tone === "light"
      ? "bg-white/30 hover:bg-white/60"
      : "bg-black/25 hover:bg-black/50";

  return (
    <div>
      <div className={`relative ${paddingClassName}`}>
        {hasPages && !atStart && (
          <button
            onClick={() => scrollByDir(-1)}
            aria-label="Previous"
            className={`flex absolute left-2 md:left-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center text-4xl md:text-5xl leading-none transition cursor-pointer ${arrow}`}
          >
            ‹
          </button>
        )}

        <div className={`${maxWidthClassName} mx-auto`}>
          <div
            ref={trackRef}
            className={`flex ${gapClassName} overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
            aria-label={ariaLabel}
          >
            {children}
          </div>
        </div>

        {hasPages && !atEnd && (
          <button
            onClick={() => scrollByDir(1)}
            aria-label="Next"
            className={`flex absolute right-2 md:right-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center text-4xl md:text-5xl leading-none transition cursor-pointer ${arrow}`}
          >
            ›
          </button>
        )}
      </div>

      {hasPages && (
        <div className="flex items-center justify-center gap-2 mt-5">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => scrollToPage(i)}
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === activePage}
              className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                i === activePage ? dotActive : dotIdle
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
