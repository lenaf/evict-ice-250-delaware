"use client";

import React from "react";
import { DollarBill } from "./MoneyTree";

export interface DonationRecipient {
  name: string;
  detail?: string; // office, party, level of government
  amount: string;
  period: string; // the years/cycle the amount covers — e.g. "2024 cycle", "1998–2018 total"
  bags: number; // visual magnitude
  source?: { href: string; label: string };
}

interface PoliticalDonationsProps {
  intro: React.ReactNode;
  total: string;
  totalCaption: React.ReactNode;
  timeframe: string; // overall window the total spans — e.g. "Cumulative, 1998–2024"
  average?: string; // pace of giving — e.g. "≈ $20,000 per year"
  recipients?: DonationRecipient[];
}

function BagCluster({ count }: { count: number }) {
  return (
    <div
      className="grid gap-0.5 w-20 md:w-24 shrink-0"
      style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <DollarBill key={i} />
      ))}
    </div>
  );
}

// Political giving infographic — money bags flowing to each politician
export const PoliticalDonations: React.FC<PoliticalDonationsProps> = ({
  intro,
  total,
  totalCaption,
  timeframe,
  average,
  recipients,
}) => {
  return (
    <div>
      <div className="text-base md:text-lg leading-relaxed text-white/70 mb-10">
        {intro}
      </div>

      {/* Aggregate headline */}
      <div className="bg-white/5 p-6 md:p-8 mb-10">
        <div className="flex flex-wrap items-end gap-x-8 gap-y-4 mb-4">
          <div>
            <div className="font-black text-5xl md:text-6xl text-[#FFD600] leading-none">
              {total}
            </div>
            <div className="text-[11px] font-black uppercase tracking-widest text-white/40 mt-2">
              {timeframe}
            </div>
          </div>
          {average && (
            <div>
              <div className="font-black text-2xl md:text-3xl text-[#DC2626] leading-none">
                {average}
              </div>
              <div className="text-[11px] font-black uppercase tracking-widest text-white/40 mt-2">
                Pace of giving
              </div>
            </div>
          )}
        </div>
        <p className="text-sm md:text-base text-white/70 leading-snug">
          {totalCaption}
        </p>
      </div>

      {recipients && recipients.length > 0 && (
      <>
      <p className="text-xs font-black uppercase tracking-widest text-[#FFD600] mb-5">
        Who they paid
      </p>

      {/* Recipients — money bags scale with the amount given */}
      <div className="border-t border-white/10">
        {recipients.map((r) => (
          <div
            key={r.name}
            className="flex items-center gap-4 md:gap-6 py-4 border-b border-white/10"
          >
            <BagCluster count={r.bags} />
            <div className="min-w-0 flex-1">
              <div className="font-black text-base md:text-lg text-white leading-tight">
                {r.name}
              </div>
              {r.detail && (
                <div className="text-xs md:text-sm text-white/40 mt-0.5 leading-snug">
                  {r.detail}
                </div>
              )}
              {r.source && (
                <a
                  href={r.source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 text-[11px] text-white/40 underline underline-offset-2 hover:text-white transition cursor-pointer"
                >
                  {r.source.label} &rarr;
                </a>
              )}
            </div>
            <div className="shrink-0 text-right">
              <div className="font-black text-xl md:text-2xl text-[#FFD600] tabular-nums leading-none">
                {r.amount}
              </div>
              <div className="text-[10px] md:text-[11px] font-black uppercase tracking-wider text-white/40 mt-1.5">
                {r.period}
              </div>
            </div>
          </div>
        ))}
      </div>
      </>
      )}
    </div>
  );
};
