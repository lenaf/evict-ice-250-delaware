"use client";

import React from "react";
import type { WealthRef } from "@/types/affiliation";

export interface MoneySource {
  amount: string;
  label: string;
  payer: string; // who the public money comes from
  bags: number; // visual magnitude — number of money bags
  recurring?: boolean; // true = per year
  source?: { href: string; label: string };
}

export interface MoneyPerson {
  id: string;
  name: string;
  title: string;
  photo: string;
  // Short, sourced wealth or property reference shown under the photo.
  wealth?: WealthRef;
  meta?: React.ReactNode;
}

export interface MoneyHeadline {
  amount: string;
  text: string;
}

interface MoneyTreeProps {
  sources: MoneySource[];
  people?: MoneyPerson[];
  entityName?: string;
  headlines?: MoneyHeadline[];
}

// Inline money bag — green outline sack with a $
export function DollarBill() {
  const C = "#5CC95C"; // bright money green
  return (
    <svg viewBox="0 0 32 32" className="w-full h-auto block" fill="none" aria-hidden="true">
      <path
        d="M12 3 H20 L17.5 8 H14.5 Z"
        fill="none"
        stroke={C}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 8 C8 11.5 4.5 18 5.5 23 C6.5 28 11 30 16 30 C21 30 25.5 28 26.5 23 C27.5 18 24 11.5 17.5 8 Z"
        fill="none"
        stroke={C}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <text
        x="16"
        y="25"
        textAnchor="middle"
        fontSize="13"
        fontWeight="900"
        fontFamily="Inter, sans-serif"
        fill={C}
      >
        $
      </text>
    </svg>
  );
}

// Circular repeat icon — marks money that recurs every year
function RepeatIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12 a8 8 0 0 1 13.5 -5.8 M20 4 v4 h-4"
        stroke="#FFD600"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M20 12 a8 8 0 0 1 -13.5 5.8 M4 20 v-4 h4"
        stroke="#FFD600"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function BagRow({ count }: { count: number }) {
  // bags reflow to fill the available width — denser on small screens, looser on wide
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(18px, 1fr))" }}>
      {Array.from({ length: count }).map((_, i) => (
        <DollarBill key={i} />
      ))}
    </div>
  );
}

// Bold diverging streams to each person
export const MoneyTree: React.FC<MoneyTreeProps> = ({ sources, people, entityName, headlines }) => {
  const p = people?.length ?? 0;

  return (
    <div>
      {/* Headline summary — the two buckets of public money */}
      {headlines && headlines.length > 0 && (
        <div className="grid gap-px mb-10" style={{ gridTemplateColumns: `repeat(${headlines.length}, 1fr)` }}>
          {headlines.map((h) => (
            <div key={h.text} className="bg-white/5 p-5 md:p-6">
              <div className="font-black text-4xl md:text-5xl text-[#FFD600] leading-none mb-3">
                {h.amount}
              </div>
              <p className="text-sm md:text-base text-white/70 leading-snug">{h.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Where the money comes from */}
      <p className="text-xs font-black uppercase tracking-widest text-[#FFD600] mb-4 text-center">
        Public money in
      </p>

      {/* Money sources — subgrid keeps bags / amount / label / payer aligned across columns */}
      <div
        className="grid gap-x-6 md:gap-x-10"
        style={{ gridTemplateColumns: `repeat(${sources.length}, 1fr)`, gridTemplateRows: "repeat(4, auto)" }}
      >
        {sources.map((s) => (
          <div key={s.label} className="grid grid-rows-subgrid row-span-4 gap-2 items-end">
            <BagRow count={s.bags} />
            <div className="flex items-center gap-2">
              <span className="font-black text-3xl md:text-4xl text-[#FFD600] leading-none">
                {s.amount}
              </span>
              {s.recurring && (
                <span className="inline-flex items-center gap-1" title="Every year">
                  <RepeatIcon size={32} />
                  <span className="text-xs font-black text-[#FFD600]/80 uppercase tracking-wider leading-none">
                    every
                    <br />
                    year
                  </span>
                </span>
              )}
            </div>
            <div className="font-black text-xs text-white uppercase tracking-wider leading-snug">
              {s.label}
            </div>
            <div className="text-xs text-white/40 leading-snug">
              {s.payer}
              {s.source && (
                <>
                  {" "}
                  <a
                    href={s.source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 underline underline-offset-2 hover:text-white transition cursor-pointer whitespace-nowrap"
                  >
                    {s.source.label} &rarr;
                  </a>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Who pockets it */}
      {people && people.length > 0 && (
      <>
      <p className="text-xs font-black uppercase tracking-widest text-[#FFD600] mt-16 mb-4 text-center">
        Into the pockets of {entityName}
      </p>

      {/* Person photos — full color */}
      <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${p}, 1fr)` }}>
        {people.map((person) => (
          <div key={person.id}>
            <div className="aspect-square overflow-hidden bg-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={person.photo} alt={person.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-3 bg-white/5">
              <div className="font-black text-white text-xs leading-tight">{person.name}</div>
              <div className="text-white/40 text-[10px] mt-0.5 leading-tight">{person.title}</div>
              {person.wealth && (
                <div className="mt-1.5 text-[11px] font-black leading-tight text-[#FFD600]">
                  {person.wealth.label}
                  {person.wealth.href && (
                    <>
                      {" "}
                      <a
                        href={person.wealth.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-normal text-white/40 underline underline-offset-2 hover:text-white transition cursor-pointer"
                      >
                        src
                      </a>
                    </>
                  )}
                </div>
              )}
              {person.meta}
            </div>
          </div>
        ))}
      </div>
      </>
      )}
    </div>
  );
};
