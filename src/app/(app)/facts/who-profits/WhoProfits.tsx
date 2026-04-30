"use client";

import React from "react";
import Link from "next/link";
import { SourceLink } from "../SourceLink";

export const WhoProfits: React.FC = () => {
  return (
    <main className="min-h-screen">
      {/* ========== HERO ========== */}
      <section className="bg-black text-white px-6 md:px-10 pt-28 md:pt-36 pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm uppercase tracking-wider text-white/40 mb-3">
            <Link
              href="/facts"
              className="hover:text-white transition-colors"
            >
              The Facts
            </Link>
          </p>
          <p className="text-sm uppercase tracking-wider text-[#DC2626] mb-2">
            Uniland &amp; the Montante family
          </p>
          <h1 className="font-black text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-6">
            Who Profits
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-2xl">
            The Montante family collects $2 million a year from ICE for housing
            operations at 250 Delaware. The lease is theirs to renew — or
            not.
          </p>
        </div>
      </section>

      {/* ========== NAV ========== */}
      <div className="bg-white border-b border-black/10 px-6 md:px-10 py-4">
        <div className="max-w-3xl mx-auto flex justify-between text-sm">
          <Link
            href="/facts/what-happens-inside"
            className="text-black/40 hover:text-[#DC2626] transition-colors"
          >
            &larr; Previous: What Happens Inside
          </Link>
          <Link
            href="/facts/who-pays"
            className="text-black/40 hover:text-[#DC2626] transition-colors"
          >
            Next: Who Pays &rarr;
          </Link>
        </div>
      </div>

      {/* ========== CONTENT ========== */}
      <section className="bg-white text-black px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-5 text-base md:text-lg leading-relaxed text-black/70 mb-14">
            <p>
              Carl Montante Sr. founded{" "}
              <SourceLink
                href="https://littlesis.org/news/buffalos-immigrant-detention-profiteers/"
                label="Uniland Development"
              />{" "}
              with his brother Thomas in 1974. He remains president and managing
              director, holding 82.99% ownership. Three of his children — Laura
              Zaepfel, Carl Montante Jr., and Michael Montante — are vice
              presidents.
            </p>
            <p>
              Uniland is headquartered in Amherst and is one of the largest
              commercial developers in the Buffalo region. Their federal lease at
              250 Delaware pays them approximately{" "}
              <SourceLink
                href="https://www.usaspending.gov/award/CONT_IDV_GS02B23305_4740"
                label="$2 million per year"
              />{" "}
              from ICE — over{" "}
              <strong className="text-black">$11 million in total</strong> since
              2002. This makes them
              the{" "}
              <SourceLink
                href="https://investigativepost.org/2026/02/20/landlords-earn-millions-from-immigration-leases/"
                label="biggest local profiteer"
              />{" "}
              from immigration enforcement operations in the region.
            </p>
            <p>
              The Montante family sits on the boards of some of the most
              influential institutions in Buffalo — including the Buffalo
              Niagara Partnership, Catholic Health System, and Catholic
              Charities. Their name is on buildings at Canisius College and
              D&apos;Youville University. They are embedded in every power
              center in the region.
            </p>
            <p>
              The ICE lease at 250 Delaware expires{" "}
              <strong className="text-[#DC2626]">March 31, 2027</strong>. The
              decision to renew is Uniland&apos;s alone. No government body can
              force them to keep it. The question is whether they will choose
              profit over people.
            </p>
          </div>

          {/* Power map */}
          <div className="border-2 border-black p-6 md:p-8 mb-14">
            <h2 className="font-black text-2xl md:text-3xl leading-tight mb-3">
              The power map
            </h2>
            <p className="text-base text-black/60 mb-6">
              The Montante family&apos;s connections across Buffalo&apos;s
              institutions — mapped by{" "}
              <SourceLink
                href="https://littlesis.org/oligrapher/11658"
                label="LittleSis"
              />
              .
            </p>
            <a
              href="https://littlesis.org/oligrapher/11658"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/power-map.svg"
                alt="Power map showing the Montante family's connections to Buffalo institutions including Canisius, D'Youville, Roswell Park, Buffalo Niagara Partnership, and ICE/CBP"
                className="w-full h-auto"
              />
            </a>
          </div>

          {/* Other landlords */}
          <div className="bg-black text-white p-6 md:p-8 mb-14">
            <h3 className="font-black text-lg md:text-xl text-[#DC2626] mb-3">
              They&apos;re not alone
            </h3>
            <p className="text-base leading-relaxed text-white/80">
              An{" "}
              <SourceLink
                href="https://investigativepost.org/2026/02/20/landlords-earn-millions-from-immigration-leases/"
                label="Investigative Post investigation"
              />{" "}
              found <strong className="text-[#FFD600]">14 locations</strong> across
              Buffalo and its suburbs leased to immigration agencies —
              generating over{" "}
              <strong className="text-[#FFD600]">$12 million annually</strong> for
              landlords including Larkin Development Group (Zemsky family),
              Ellicott Development (Paladino family), Boyd Waterson, and Iskalo
              Development.
            </p>
          </div>
        </div>
      </section>

      {/* ========== LETTER CTA ========== */}
      <section className="bg-[#DC2626] text-white px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-black text-3xl md:text-4xl leading-[0.95] mb-4">
            Tell the Montante family to end the lease.
          </h2>
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-lg mx-auto">
            The ICE lease at 250 Delaware expires March 31, 2027. The decision
            to renew is Uniland&apos;s alone.
          </p>
          <Link
            href="/letters/uniland"
            className="bg-white text-black font-black text-base uppercase tracking-wider px-10 py-5 border-2 border-white hover:bg-black hover:text-white hover:border-black transition-colors cursor-pointer inline-block"
          >
            Sign the letter &rarr;
          </Link>
        </div>
      </section>

      {/* ========== BOTTOM NAV ========== */}
      <div className="bg-white border-t border-black/10 px-6 md:px-10 py-4">
        <div className="max-w-3xl mx-auto flex justify-between text-sm">
          <Link
            href="/facts/what-happens-inside"
            className="text-black/40 hover:text-[#DC2626] transition-colors"
          >
            &larr; Previous: What Happens Inside
          </Link>
          <Link
            href="/facts/who-pays"
            className="text-black/40 hover:text-[#DC2626] transition-colors"
          >
            Next: Who Pays &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
};
