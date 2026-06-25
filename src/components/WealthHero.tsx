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

    {/* Faces over a soft money-bag bed (no border) */}
    <div className="relative pt-6 md:pt-10 -mb-4 md:-mb-6">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.18] [mask-image:radial-gradient(ellipse_at_center,black,transparent_85%)]"
        aria-hidden="true"
      >
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(38px, 1fr))" }}
        >
          {Array.from({ length: 240 }).map((_, i) => (
            <DollarBill key={i} />
          ))}
        </div>
      </div>

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
            <p className="mt-3 font-black text-sm text-white leading-tight">
              {p.name}
            </p>
            <p className="mt-0.5 text-xs text-white/50 leading-snug">{p.title}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
