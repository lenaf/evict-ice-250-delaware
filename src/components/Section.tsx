import React from "react";

export type SectionVariant = "black" | "blue" | "yellow" | "white" | "red";

interface SectionProps {
  variant: SectionVariant;
  children: React.ReactNode;
  /** Additional classes — use to override padding or add scroll-mt etc. */
  className?: string;
  id?: string;
}

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
  className = "",
  id,
}) => {
  const { classes, highlight } = variantConfig[variant];

  return (
    <section
      id={id}
      className={`${classes} px-6 md:px-10 py-14 md:py-20 ${className}`}
      style={{ "--section-highlight": highlight } as React.CSSProperties}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
};
