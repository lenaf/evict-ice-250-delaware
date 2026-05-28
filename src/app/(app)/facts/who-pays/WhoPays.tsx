"use client";

import React from "react";
import Link from "next/link";
import { SourceLink } from "../SourceLink";

export const WhoPays: React.FC = () => {
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
          <p className="text-sm uppercase tracking-wider text-[#FFD600] mb-2">
            Taxpayer subsidies
          </p>
          <h1 className="font-black text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-6">
            Who Pays
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-2xl">
            A quarter century of public subsidies for private profit. The
            taxpayers of Buffalo and Erie County are paying for the building
            that houses ICE.
          </p>
        </div>
      </section>

      {/* ========== NAV ========== */}
      <div className="bg-white border-b border-black/10 px-6 md:px-10 py-4">
        <div className="max-w-3xl mx-auto flex justify-between text-sm">
          <Link
            href="/facts/who-profits"
            className="text-black/40 hover:text-[#DC2626] transition-colors"
          >
            &larr; Previous: Who Profits
          </Link>
          <Link
            href="/facts/who-pulls-the-strings"
            className="text-black/40 hover:text-[#DC2626] transition-colors"
          >
            Next: Who Pulls the Strings &rarr;
          </Link>
        </div>
      </div>

      {/* ========== CONTENT ========== */}
      <section className="bg-white text-black px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-5 text-base md:text-lg leading-relaxed text-black/70 mb-14">
            <p>
              Before 250 Delaware even existed, Delaware North received{" "}
              <SourceLink
                href="https://investigativepost.org/2013/11/26/delaware-norths-endless-subsidies/"
                label="$4.1 million in tax breaks"
              />{" "}
              at its previous headquarters at Key Center (2000–2015), plus an
              $11.6 million low-interest line of credit from the City of
              Buffalo — using federal anti-poverty funds that HUD later
              recalled.
            </p>
            <p>
              Then, for 250 Delaware, the Erie County Industrial Development
              Agency (ECIDA) approved up to{" "}
              <strong className="text-[#DC2626]">
                $10.6 million in tax breaks
              </strong>{" "}
              for Uniland:
            </p>
            <ul className="space-y-3 pl-1">
              <li className="flex gap-3">
                <span className="text-black shrink-0">&bull;</span>
                <span>$8.4 million in property tax abatements</span>
              </li>
              <li className="flex gap-3">
                <span className="text-black shrink-0">&bull;</span>
                <span>$1.8 million in sales tax exemptions</span>
              </li>
              <li className="flex gap-3">
                <span className="text-black shrink-0">&bull;</span>
                <span>$400,000 in mortgage recording tax waivers</span>
              </li>
            </ul>
            <p>
              Delaware North received an additional $807,000 sales tax waiver
              and applied for $4 million in state tax credits.
            </p>
            <p>
              That property tax abatement is still in effect.{" "}
              <strong className="text-[#DC2626]">
                In 2024 alone, it cost Buffalo and Erie County $791,000.
              </strong>
            </p>
          </div>

          <blockquote className="border-l-2 border-[#DC2626] pl-6 mb-8">
            <p className="text-base md:text-lg italic text-black/80">
              &ldquo;When is enough enough? You can&apos;t be coming back to
              the table for seconds.&rdquo;
            </p>
            <cite className="block mt-2 text-sm text-black/50 not-italic">
              — Assemblyman Sean Ryan (
              <SourceLink
                href="https://investigativepost.org/2013/11/26/delaware-norths-endless-subsidies/"
                label="Investigative Post, 2013"
              />
              )
            </cite>
          </blockquote>

          <blockquote className="border-l-2 border-[#DC2626] pl-6 mb-14">
            <p className="text-base md:text-lg italic text-black/80">
              &ldquo;It is morally reprehensible that real estate developers
              and corporate elites are, once again, choosing profits over
              people.&rdquo;
            </p>
            <cite className="block mt-2 text-sm text-black/50 not-italic">
              — Harper Bishop, Our City Buffalo (
              <SourceLink
                href="https://investigativepost.org/2026/02/20/landlords-earn-millions-from-immigration-leases/"
                label="Investigative Post"
              />
              )
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ========== BOTTOM NAV ========== */}
      <div className="bg-white border-t border-black/10 px-6 md:px-10 py-4">
        <div className="max-w-3xl mx-auto flex justify-between text-sm">
          <Link
            href="/facts/who-profits"
            className="text-black/40 hover:text-[#DC2626] transition-colors"
          >
            &larr; Previous: Who Profits
          </Link>
          <Link
            href="/facts/who-pulls-the-strings"
            className="text-black/40 hover:text-[#DC2626] transition-colors"
          >
            Next: Who Pulls the Strings &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
};
