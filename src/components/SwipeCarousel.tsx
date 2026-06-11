"use client";

import React, { useRef } from "react";

interface SwipeCarouselProps {
  children: React.ReactNode;
  /** Accessible label for the scrollable track. */
  ariaLabel: string;
  /** Arrow color: "light" for dark backgrounds, "dark" for light backgrounds. */
  tone?: "light" | "dark";
  /** Gap utility classes between items. */
  gapClassName?: string;
}

// Shared swipeable horizontal strip: native scroll/swipe with prev/next arrows
// pinned to the page edge. The track lines up with the standard max-w-6xl
// content edge; the arrows sit out in the gutter. Used for the partner logos,
// the photo gallery, and the coalition statements.
export const SwipeCarousel: React.FC<SwipeCarouselProps> = ({
  children,
  ariaLabel,
  tone = "dark",
  gapClassName = "gap-4 md:gap-6",
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByItem = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: "smooth" });
  };

  const arrow =
    tone === "light"
      ? "text-white/60 hover:text-white"
      : "text-black/50 hover:text-black";

  return (
    <div className="relative px-6 md:px-10">
      <button
        onClick={() => scrollByItem(-1)}
        aria-label="Previous"
        className={`hidden sm:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center text-4xl md:text-5xl leading-none transition cursor-pointer ${arrow}`}
      >
        ‹
      </button>

      <div className="max-w-6xl mx-auto">
        <div
          ref={trackRef}
          className={`flex ${gapClassName} overflow-x-auto snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
          aria-label={ariaLabel}
        >
          {children}
        </div>
      </div>

      <button
        onClick={() => scrollByItem(1)}
        aria-label="Next"
        className={`hidden sm:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center text-4xl md:text-5xl leading-none transition cursor-pointer ${arrow}`}
      >
        ›
      </button>
    </div>
  );
};
