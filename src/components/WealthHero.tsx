"use client";

import React from "react";
import { DollarBill } from "./MoneyTree";

export interface HeroPerson {
  name: string;
  title: string;
  photo: string;
}

interface WealthHeroProps {
  question: string; // e.g. "Who Profits?"
  family: string; // e.g. "The Montante Family"
  lede: React.ReactNode; // summary with key numbers highlighted inline
  people: HeroPerson[];
}

// Opening hero: the question, the family, a summary, and the family's faces
// sitting over a soft bed of money bags.
export const WealthHero: React.FC<WealthHeroProps> = ({
  question,
  family,
  lede,
  people,
}) => (
  <div>
    <h1 className="type-hero text-white leading-[0.95]">{question}</h1>
    <h2 className="type-hero text-[#DC2626] leading-[0.95] mb-8">{family}</h2>

    <div className="text-lg md:text-2xl leading-relaxed text-white/80 mb-14">
      {lede}
    </div>

    {/* A row of money bags above the family */}
    <div className="pt-2">
      <div className="flex flex-nowrap justify-center gap-4 md:gap-6 mb-5 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="w-6 md:w-7 shrink-0">
            <DollarBill />
          </div>
        ))}
      </div>

      <div className="relative grid grid-cols-4 gap-2 md:gap-6">
        {people.map((p) => (
          <div key={p.name}>
            <div className="aspect-square overflow-hidden bg-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.photo}
                alt={p.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <p className="mt-2 md:mt-3 font-black text-[11px] md:text-sm text-white leading-tight">
              {p.name}
            </p>
            <p className="mt-0.5 text-[10px] md:text-xs text-white/50 leading-snug">
              {p.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
