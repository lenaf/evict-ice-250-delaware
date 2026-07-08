"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { SponsorItem } from "@/lib/payload";

// Assumed content width for the first (server + hydration) paint, before the
// ResizeObserver measures the real container. Matches the max-w-6xl content box.
const DEFAULT_WIDTH = 1152;
// Fallback aspect ratio for a logo whose real dimensions aren't known yet
// (no CMS width/height and image not loaded) — a typical landscape wordmark.
const DEFAULT_AR = 2.6;
// Width is allocated by aspect^AREA_EXP rather than aspect, so logos land at
// roughly equal visual AREA instead of equal height: wide wordmarks letterbox
// to a shorter height and square marks fill the height, so a square logo no
// longer reads as tiny next to a wide one. 1 = equal height; 0.5 = equal area.
const AREA_EXP = 0.65;
// Clamp how wide any single logo is treated as being when allocating row width.
// A very wide wordmark (e.g. aspect 7+) would otherwise hog a whole row and
// over-pack it; capping keeps rows balanced. The image still renders at its
// true ratio via object-contain (letterboxed in its box), never distorted.
const AR_CAP = 5.5;
// On phones the full wall is ~15 rows; cap it to this many by default and reveal
// the rest on tap, so the coalition's full breadth is one tap away without a
// long default scroll. Tablet/desktop always show everything.
const MOBILE_MAX = 640;
const COLLAPSED_ROWS = 5;

interface Row {
  items: Array<SponsorItem & { boxWidth: number }>;
  height: number;
  fill: boolean; // true = row stretched to full width; false = short last row
}

// Responsive packing targets derived from the measured width. Mobile uses a
// taller target so rows hold fewer, larger, legible logos (a small target packs
// too many tiny logos per row); desktop packs more per row.
function targetsFor(width: number) {
  if (width < 640) return { rowHeight: 88, gap: 12, maxHeight: 132, minHeight: 60 };
  if (width < 1024) return { rowHeight: 96, gap: 18, maxHeight: 150, minHeight: 66 };
  return { rowHeight: 104, gap: 22, maxHeight: 168, minHeight: 74 };
}

// Justified-rows packer. Every row is scaled to fill the width exactly (gap-free);
// `scale` and aspect^AREA_EXP set how much horizontal space each logo's box
// claims, and the image stays object-contain inside (undistorted).
//
// Row breaks are chosen OPTIMALLY, not greedily: a dynamic program picks the set
// of breaks that minimizes the total squared deviation of row heights from the
// target (the Knuth–Plass idea used for justified text). This keeps the CMS
// order intact while making row heights far more even than a greedy pass —
// especially on mobile, where greedy leaves a ragged rhythm. The trailing row is
// allowed to be "short" (rendered at the target height and centered) at no cost.
function packRows(items: SponsorItem[], arOf: (s: SponsorItem) => number, width: number): Row[] {
  const { rowHeight, gap, maxHeight, minHeight } = targetsFor(width);
  const weightOf = (s: SponsorItem) => Math.pow(Math.min(arOf(s), AR_CAP), AREA_EXP) * (s.scale || 1);
  const n = items.length;
  if (!n) return [];

  const w = items.map(weightOf);
  const prefix = [0];
  for (let i = 0; i < n; i++) prefix.push(prefix[i] + w[i]);
  // Filled height of the row spanning items [i, j).
  const heightOf = (i: number, j: number) =>
    (width - gap * (j - i - 1)) / (prefix[j] - prefix[i]);

  // cost[j] = min total badness to lay out the first j logos; par[j] = the start
  // index of the last row in that optimal solution.
  const cost = new Array(n + 1).fill(Infinity);
  const par = new Array(n + 1).fill(0);
  cost[0] = 0;
  for (let j = 1; j <= n; j++) {
    for (let i = j - 1; i >= 0; i--) {
      const h = heightOf(i, j);
      if (h < minHeight) break; // more items only shrink the row further
      const isLast = j === n;
      // A short trailing row (taller than target) is free — it renders centered
      // at the target height rather than stretched.
      const bad = isLast && h >= rowHeight ? 0 : (h - rowHeight) ** 2;
      if (cost[i] + bad < cost[j]) {
        cost[j] = cost[i] + bad;
        par[j] = i;
      }
    }
  }

  // Walk the breaks back into row spans (front to back).
  const spans: Array<[number, number]> = [];
  for (let j = n; j > 0; j = par[j]) spans.unshift([par[j], j]);

  return spans.map(([i, j], idx) => {
    const raw = heightOf(i, j);
    const isLast = idx === spans.length - 1;
    const fill = !(isLast && raw > rowHeight);
    // Clamp only DOWN (maxHeight): clamping a row's height up would widen its
    // boxes past the container and clip a logo. A short row is fine; overflow
    // is not. A short trailing row renders at the target height, centered.
    const h = fill ? Math.min(raw, maxHeight) : Math.min(rowHeight, maxHeight);
    return {
      items: items.slice(i, j).map((s) => ({ ...s, boxWidth: weightOf(s) * h })),
      height: h,
      fill,
    };
  });
}

// A responsive, gap-free wall of partner logos. Rows fill the full content
// width; the last row centers. Aspect ratios come from the CMS when known and
// are refined from each image's natural dimensions once it loads.
export const JustifiedLogoWall: React.FC<{ logos: SponsorItem[] }> = ({ logos }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  // name -> measured natural aspect ratio (overrides the CMS/default value).
  const naturalAr = useRef<Map<string, number>>(new Map());
  const [, bump] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth || DEFAULT_WIDTH);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onImgLoad = useCallback(
    (name: string) => (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      if (img.naturalWidth && img.naturalHeight) {
        const ar = img.naturalWidth / img.naturalHeight;
        if (naturalAr.current.get(name) !== ar) {
          naturalAr.current.set(name, ar);
          bump((n) => n + 1); // recompute layout with the true ratio
        }
      }
    },
    [],
  );

  const arOf = useCallback(
    (s: SponsorItem) => naturalAr.current.get(s.name) ?? s.aspectRatio ?? DEFAULT_AR,
    [],
  );

  const { gap } = targetsFor(width);
  const rows = packRows(logos, arOf, width);

  // On phones, collapse to the first few rows with a "show all" toggle.
  const capped = width < MOBILE_MAX && !expanded && rows.length > COLLAPSED_ROWS;
  const shownRows = capped ? rows.slice(0, COLLAPSED_ROWS) : rows;
  const canToggle = width < MOBILE_MAX && rows.length > COLLAPSED_ROWS;

  return (
    <div ref={containerRef} className="w-full">
      {shownRows.map((row, i) => (
        <div
          key={i}
          className="flex"
          style={{
            gap,
            marginBottom: i < shownRows.length - 1 ? gap : 0,
            justifyContent: row.fill ? "flex-start" : "center",
          }}
        >
          {row.items.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={item.name}
              className="flex items-center justify-center shrink-0 p-1.5 md:p-3 hover:opacity-70 transition-opacity"
              style={{ width: item.boxWidth, height: row.height }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.logo}
                alt={item.name}
                loading="lazy"
                decoding="async"
                onLoad={onImgLoad(item.name)}
                className="w-full h-full object-contain"
              />
            </a>
          ))}
        </div>
      ))}

      {canToggle && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="border-2 border-black px-6 py-2.5 font-black uppercase tracking-wider text-xs hover:bg-[#DC2626] hover:text-white hover:border-[#DC2626] transition cursor-pointer"
          >
            {expanded ? "Show fewer" : `Show all ${logos.length} partners`}
          </button>
        </div>
      )}
    </div>
  );
};
