"use client";

import React from "react";

export interface CycleBar {
  cycle: string; // election cycle / year label, e.g. "2016"
  amount: number; // dollars
}

interface GivingTimelineProps {
  bars: CycleBar[];
  caption: React.ReactNode; // what the series is — e.g. "Delaware North PAC receipts by cycle"
  note?: React.ReactNode; // scope / caveats — e.g. "Federal only · state pending"
  source?: { href: string; label: string };
}

const MAX_BAR_PX = 200;

function fmtAmount(n: number): string {
  if (n >= 1000) return `$${Math.round(n / 1000)}k`;
  return `$${n}`;
}

// Bar chart of political giving across election cycles.
export const GivingTimeline: React.FC<GivingTimelineProps> = ({
  bars,
  caption,
  note,
  source,
}) => {
  const max = Math.max(...bars.map((b) => b.amount), 1);

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-widest text-[#FFD600] mb-5">
        {caption}
      </p>

      <div className="overflow-x-auto pb-2">
        <div className="flex items-end gap-1.5 md:gap-2 min-w-max">
          {bars.map((b) => {
            const h = Math.max((b.amount / max) * MAX_BAR_PX, 3);
            return (
              <div
                key={b.cycle}
                className="flex flex-col items-center justify-end gap-1.5 w-9 md:w-11"
              >
                <span className="text-[9px] md:text-[10px] font-black text-white/50 tabular-nums leading-none">
                  {fmtAmount(b.amount)}
                </span>
                <div
                  className="w-full bg-[#FFD600]"
                  style={{ height: `${h}px` }}
                />
                <span className="text-[9px] md:text-[10px] font-black text-white/40 tabular-nums leading-none">
                  {b.cycle}
                </span>
              </div>
            );
          })}
        </div>
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
