import React from "react";
import type { PressItem } from "@/lib/payload";

const fmtDate = (iso: string): string => {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(d);
};

interface PressListProps {
  items: PressItem[];
  columns?: 1 | 2; // 2 splits the list into two columns on desktop
}

// The divided list of press coverage and press releases (logo, headline, date,
// "Read"/"PDF" link), shared by the homepage "In the News" section and the full
// /news page. Publication logos render as plain <img> — they're a handful of tiny files, so serving them
// directly is cheaper than an optimizer transformation and needs no variants.
export const PressList: React.FC<PressListProps> = ({ items, columns = 1 }) => (
  <ul
    className={
      columns === 2
        ? "grid md:grid-cols-2 md:gap-x-10 border-t border-black"
        : "max-w-3xl border-t border-black"
    }
  >
    {items.map((a) => (
      <li key={a.url}>
        <a
          href={a.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-full items-center gap-3 py-2.5 border-b border-black cursor-pointer"
        >
          {a.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={a.logo}
              alt={a.outlet}
              loading="lazy"
              decoding="async"
              className="h-9 w-9 md:h-10 md:w-10 object-contain shrink-0"
            />
          ) : (
            <span
              className={`w-9 md:w-10 shrink-0 flex items-center font-black uppercase text-[9px] leading-tight ${
                a.kind === "release" ? "text-[#DC2626]" : ""
              }`}
            >
              {a.outlet}
            </span>
          )}
          <span className="flex-1 min-w-0">
            <span className="block font-semibold text-sm md:text-[15px] leading-snug group-hover:text-[#DC2626] transition-colors">
              {a.headline}
            </span>
            {fmtDate(a.date) && (
              <span className="block text-[11px] uppercase tracking-wide text-black/50 mt-0.5">
                {fmtDate(a.date)}
              </span>
            )}
          </span>
          <span className="shrink-0 flex items-center gap-1 font-bold text-xs uppercase tracking-wide text-black/55 group-hover:text-[#DC2626] transition-colors">
            <span className="hidden sm:inline">
              {a.kind === "release" ? "PDF" : "Read"}
            </span>
            <span aria-hidden="true" className="text-base leading-none">
              &#8599;
            </span>
          </span>
        </a>
      </li>
    ))}
  </ul>
);
