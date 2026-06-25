"use client";

import React, { useState } from "react";

export interface StackSeries {
  key: string;
  label: string;
  color: string;
}

export interface StackDetailRow {
  label: string;
  amount: number;
  sub?: string; // e.g. party / level / source
}

export interface StackDatum {
  period: string; // year label
  values: Record<string, number>; // key -> amount, keyed to StackSeries.key
  detail?: StackDetailRow[]; // shown in tooltip / modal
}

interface StackedBarsProps {
  series: StackSeries[];
  data: StackDatum[];
  caption: React.ReactNode;
  note?: React.ReactNode;
  source?: { href: string; label: string };
}

const MAX_BAR_PX = 220;

function fmt(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}M`;
  if (n >= 1000) return `$${Math.round(n / 1000)}k`;
  return `$${Math.round(n)}`;
}

function total(d: StackDatum, series: StackSeries[]): number {
  return series.reduce((s, k) => s + (d.values[k.key] || 0), 0);
}

// Detail card shared by the desktop tooltip and the mobile modal.
const DetailCard: React.FC<{
  datum: StackDatum;
  series: StackSeries[];
}> = ({ datum, series }) => (
  <div>
    <div className="flex items-baseline justify-between gap-6 mb-3">
      <span className="font-black text-lg text-black">{datum.period}</span>
      <span className="font-black text-lg text-black tabular-nums">
        {fmt(total(datum, series))}
      </span>
    </div>
    <div className="space-y-1.5">
      {series
        .filter((s) => (datum.values[s.key] || 0) > 0)
        .map((s) => (
          <div key={s.key} className="flex items-center gap-2 text-sm">
            <span
              className="inline-block w-3 h-3 shrink-0"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-black/60 flex-1">{s.label}</span>
            <span className="font-black text-black tabular-nums">
              {fmt(datum.values[s.key] || 0)}
            </span>
          </div>
        ))}
    </div>
    {datum.detail && datum.detail.length > 0 && (
      <div className="mt-3 pt-3 border-t border-black/10 space-y-1">
        {datum.detail.map((r, i) => (
          <div key={i} className="flex items-baseline justify-between gap-4 text-xs">
            <span className="text-black/60">
              {r.label}
              {r.sub && <span className="text-black/35"> · {r.sub}</span>}
            </span>
            <span className="font-black text-black/80 tabular-nums shrink-0">
              {fmt(r.amount)}
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
);

// Stacked bar chart — segments colored by series, with a hover tooltip
// (desktop) and a tap-to-open modal (mobile).
export const StackedBars: React.FC<StackedBarsProps> = ({
  series,
  data,
  caption,
  note,
  source,
}) => {
  const [hover, setHover] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);

  const max = Math.max(...data.map((d) => total(d, series)), 1);
  const active = hover ?? pinned;

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-widest text-[#FFD600] mb-4">
        {caption}
      </p>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-5">
        {series.map((s) => (
          <span key={s.key} className="flex items-center gap-1.5 text-[11px] text-white/60">
            <span
              className="inline-block w-3 h-3 shrink-0"
              style={{ backgroundColor: s.color }}
            />
            {s.label}
          </span>
        ))}
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex items-end gap-1.5 md:gap-2 min-w-max relative">
          {data.map((d, i) => {
            const t = total(d, series);
            const barPx = Math.max((t / max) * MAX_BAR_PX, 3);
            return (
              <div
                key={d.period}
                className="flex flex-col items-center justify-end gap-1.5 w-9 md:w-11 cursor-pointer group"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setPinned((p) => (p === i ? null : i))}
              >
                <span className="text-[9px] md:text-[10px] font-black text-white/50 tabular-nums leading-none">
                  {fmt(t)}
                </span>
                {/* stacked segments */}
                <div
                  className="w-full flex flex-col justify-end transition-opacity"
                  style={{ height: `${barPx}px`, opacity: active === null || active === i ? 1 : 0.4 }}
                >
                  {series.map((s) => {
                    const v = d.values[s.key] || 0;
                    if (v <= 0) return null;
                    return (
                      <div
                        key={s.key}
                        style={{ height: `${(v / t) * 100}%`, backgroundColor: s.color }}
                      />
                    );
                  })}
                </div>
                <span className="text-[9px] md:text-[10px] font-black text-white/40 tabular-nums leading-none">
                  {d.period}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail panel — updates on hover (desktop) and tap (mobile). Lives
          outside the scroll container so it is never clipped. */}
      <div className="mt-5 bg-white border-2 border-black p-4 max-w-md min-h-[7rem]">
        {active !== null ? (
          <DetailCard datum={data[active]} series={series} />
        ) : (
          <p className="text-sm text-black/50 font-black">
            Hover a bar (or tap on mobile) to see the breakdown by year.
          </p>
        )}
      </div>

      {(note || source) && (
        <p className="mt-4 text-[11px] text-white/40 leading-snug">
          {note}
          {source && (
            <>
              {" "}
              <span className="text-white/30">Source:</span>{" "}
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-white transition cursor-pointer"
              >
                {source.label} &rarr;
              </a>
            </>
          )}
        </p>
      )}
    </div>
  );
};
