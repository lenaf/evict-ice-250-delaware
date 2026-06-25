"use client";

import React from "react";
import { DollarBill } from "./MoneyTree";

export interface WealthPerson {
  name: string;
  title: string;
  photo: string;
  wealth?: { label: string; href?: string };
}

interface WealthHeroProps {
  title: string; // family name, e.g. "The Montante Family"
  bigStat: { amount: string; label: React.ReactNode };
  lede: React.ReactNode; // copy with the key numbers highlighted inline
  people: WealthPerson[];
  watermark?: string; // optional faint background SVG (e.g. the ICE badge)
}

// Opening section: a big stat, highlighted copy, and the family's faces sitting
// on a bed of money bags. Optional watermark behind it all.
export const WealthHero: React.FC<WealthHeroProps> = ({
  title,
  bigStat,
  lede,
  people,
  watermark,
}) => {
  return (
    <div className="relative">
      {watermark && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={watermark}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 right-0 w-64 md:w-[26rem] opacity-25 invert"
        />
      )}

      <div className="relative">
        <h1 className="type-hero text-white leading-[0.95]">{title}</h1>

        {/* The single huge number */}
        <div className="mt-8 mb-8">
          <div className="font-black text-6xl md:text-8xl text-[#FFD600] leading-none">
            {bigStat.amount}
          </div>
          <div className="mt-3 text-sm md:text-base font-black uppercase tracking-wider text-white/70">
            {bigStat.label}
          </div>
        </div>

        {/* Copy — numbers highlighted inline */}
        <div className="text-lg md:text-2xl leading-relaxed text-white/80 mb-14">
          {lede}
        </div>

        {/* Faces on a bed of money bags */}
        <div className="relative p-6 md:p-10 border-2 border-[#FFD600]/30">
          {/* money-bag bed — clearly visible, surrounding the photos */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden opacity-40"
            aria-hidden="true"
          >
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(34px, 1fr))" }}
            >
              {Array.from({ length: 260 }).map((_, i) => (
                <DollarBill key={i} />
              ))}
            </div>
          </div>

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {people.map((p) => (
              <div key={p.name} className="border-2 border-white/20 bg-black">
                <div className="relative aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.photo}
                    alt={p.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-3">
                  <p className="font-black text-sm leading-tight text-white">
                    {p.name}
                  </p>
                  <p className="text-xs mt-0.5 leading-snug text-white/40">
                    {p.title}
                  </p>
                  {p.wealth && (
                    <p className="mt-2 text-xs font-black leading-snug text-[#FFD600]">
                      {p.wealth.label}
                      {p.wealth.href && (
                        <>
                          {" "}
                          <a
                            href={p.wealth.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-normal text-white/40 underline underline-offset-2 hover:text-white transition cursor-pointer"
                          >
                            src
                          </a>
                        </>
                      )}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
