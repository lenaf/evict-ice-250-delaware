import React from "react";
import type { PressItem } from "@/lib/payload";
import { formatPressDate } from "@/lib/format";

interface PressListProps {
  items: PressItem[];
}

// The divided list of press coverage and press releases (logo, headline, date,
// "Read"/"PDF" link), shared by the homepage "In the News" section and the full
// /news page. Publication logos render as plain <img> — they're a handful of tiny files, so serving them
// directly is cheaper than an optimizer transformation and needs no variants.
export const PressList: React.FC<PressListProps> = ({ items }) => (
  <ul className="w-full border-t border-black">
    {items.map((a) => (
      <li key={a.url}>
        <a
          href={a.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 md:gap-6 py-3 md:py-3.5 border-b border-black cursor-pointer"
        >
          {a.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={a.logo}
              alt={a.outlet}
              loading="lazy"
              decoding="async"
              className="h-10 w-10 md:h-12 md:w-12 object-contain shrink-0"
            />
          ) : a.kind === "release" ? (
            // Red tile the size of a logo so the label never runs into the headline.
            <span className="h-10 w-10 md:h-12 md:w-12 shrink-0 flex items-center justify-center bg-[#DC2626] text-white font-black uppercase text-[8px] md:text-[9px] leading-tight text-center">
              Press
              <br />
              release
            </span>
          ) : (
            <span className="w-10 md:w-12 shrink-0 flex items-center font-black uppercase text-[10px] leading-tight break-words overflow-hidden">
              {a.outlet}
            </span>
          )}
          <span className="flex-1 min-w-0">
            <span className="block font-semibold text-sm md:text-[15px] leading-snug group-hover:text-[#DC2626] transition-colors">
              {a.headline}
            </span>
            {formatPressDate(a.date) && (
              <span className="block md:hidden text-[11px] uppercase tracking-wide text-black/50 mt-0.5">
                {formatPressDate(a.date)}
              </span>
            )}
          </span>
          <span className="hidden md:block shrink-0 w-40 text-right text-xs uppercase tracking-wide text-black/50">
            {formatPressDate(a.date)}
          </span>
          <span className="shrink-0 sm:w-14 flex items-center justify-end gap-1 font-bold text-xs uppercase tracking-wide text-black/55 group-hover:text-[#DC2626] transition-colors">
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
