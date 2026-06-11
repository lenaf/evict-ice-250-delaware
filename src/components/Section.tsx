import React from "react";
import Link from "next/link";

export type SectionVariant = "black" | "blue" | "yellow" | "white" | "red";

interface SectionProps {
  variant: SectionVariant;
  children: React.ReactNode;
  /** Top-of-page section: adds padding to clear the sticky header. */
  hero?: boolean;
  /** "compact" for short accent bands; defaults to full content padding. */
  pad?: "default" | "compact";
  /** Renders the whole band as a clickable link. */
  href?: string;
  /** Additional classes on the outer band (borders, hover, scroll-mt, etc.). */
  className?: string;
  /** Additional classes on the inner max-width container (grid, text-center). */
  innerClassName?: string;
  id?: string;
}

// One source of truth for section gutters + width across the app.
const GUTTER = "px-6 md:px-10";
const BODY_PAD = "py-14 md:py-20";
const COMPACT_PAD = "py-10 md:py-14"; // short accent bands
const HERO_PAD = "pt-28 md:pt-32 pb-14 md:pb-20"; // clears the sticky header

const variantConfig: Record<
  SectionVariant,
  { classes: string; highlight: string }
> = {
  black:  { classes: "bg-black text-white",                              highlight: "#DC2626" },
  blue:   { classes: "bg-[#1E3A8A] text-white",                         highlight: "#FFD600" },
  yellow: { classes: "bg-[#FFD600] text-black border-y-2 border-black", highlight: "#DC2626" },
  white:  { classes: "bg-white text-black",                              highlight: "#DC2626" },
  red:    { classes: "bg-[#DC2626] text-white border-y-2 border-black", highlight: "#FFD600" },
};

/**
 * Section — full-width colored section with standard padding and max-width container.
 *
 * Each variant sets the background, base text color, and a `--section-highlight`
 * CSS custom property consumed by the `.highlight` utility class in globals.css.
 *
 * Color schema:
 *   black  → bg-black,       text-white, highlights red
 *   blue   → bg-[#1E3A8A],   text-white, highlights yellow
 *   yellow → bg-[#FFD600],   text-black, highlights red   (+ border-y)
 *   white  → bg-white,       text-black, highlights red
 *   red    → bg-[#DC2626],   text-white, highlights yellow (+ border-y)
 */
export const Section: React.FC<SectionProps> = ({
  variant,
  children,
  hero = false,
  pad = "default",
  href,
  className = "",
  innerClassName = "",
  id,
}) => {
  const { classes, highlight } = variantConfig[variant];
  const verticalPad = hero
    ? HERO_PAD
    : pad === "compact"
      ? COMPACT_PAD
      : BODY_PAD;
  const band = `${classes} ${GUTTER} ${verticalPad} ${className}`;
  const style = { "--section-highlight": highlight } as React.CSSProperties;
  const inner = (
    <div className={`max-w-6xl mx-auto ${innerClassName}`}>{children}</div>
  );

  if (href) {
    return (
      <Link href={href} id={id} className={`block ${band}`} style={style}>
        {inner}
      </Link>
    );
  }
  return (
    <section id={id} className={band} style={style}>
      {inner}
    </section>
  );
};
