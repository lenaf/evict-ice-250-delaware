"use client";

import React from "react";
import Link from "next/link";
import { Section } from "@/components/Section";

export const Facts: React.FC = () => {
  return (
    <main className="min-h-screen">
      {/* ========== HERO ========== */}
      <Section variant="blue" hero>
        <h1 className="font-black text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-4 md:mb-6">
          The Facts
        </h1>
        <p className="text-base md:text-lg text-white max-w-2xl">
          <b>The Delaware North Building is ICE Headquarters</b> for all of New
          York State outside of NYC.
        </p>
      </Section>

      {/* ========== Featured (full-width band) ========== */}
      <Section
        variant="black"
        href="/facts/what-happens-inside"
        className="group hover:opacity-90 transition-opacity"
      >
        <p className="font-light text-sm uppercase tracking-wider text-white mb-2">
          Read now
        </p>
        <h2 className="font-black text-3xl md:text-4xl lg:text-5xl text-white leading-[0.95] mb-4">
          What Happens Inside
        </h2>
        <p className="font-light text-base md:text-lg text-white max-w-2xl mb-6">
          Holding cells. Raids. Surveillance. Prolonged detention in inhuman
          conditions. Deportations. This is what the federal government runs out
          of a building in downtown Buffalo.
        </p>
        <span className="font-bold text-sm uppercase tracking-wider text-white">
          Read &rarr;
        </span>
      </Section>

      {/* ========== Coming soon ========== */}
      <Section variant="white" innerClassName="grid md:grid-cols-3 gap-8">
        <div className="opacity-40">
          <p className="text-xs uppercase tracking-wider text-black mb-1">
            Uniland &amp; the Montante family
          </p>
          <h2 className="font-black text-xl text-black leading-tight mb-2">
            Who Profits
          </h2>
          <p className="text-sm text-black mb-4">
            $2 million a year to one family for housing ICE.
          </p>
          <span className="font-black text-xs uppercase tracking-wider text-black">
            Coming soon
          </span>
        </div>
        <div className="opacity-40">
          <p className="text-xs uppercase tracking-wider text-black mb-1">
            Delaware North &amp; the Jacobs family
          </p>
          <h2 className="font-black text-xl text-black leading-tight mb-2">
            Who Pulls the Strings
          </h2>
          <p className="text-sm text-black mb-4">
            A $3 billion company. A billionaire family above the ICE offices.
          </p>
          <span className="font-black text-xs uppercase tracking-wider text-black">
            Coming soon
          </span>
        </div>
        <div className="opacity-40">
          <p className="text-xs uppercase tracking-wider text-black mb-1">
            Taxpayer subsidies
          </p>
          <h2 className="font-black text-xl text-black leading-tight mb-2">
            Who Pays
          </h2>
          <p className="text-sm text-black mb-4">
            $10.6 million in tax breaks. A quarter century of public subsidy.
          </p>
          <span className="font-black text-xs uppercase tracking-wider text-black">
            Coming soon
          </span>
        </div>
      </Section>

      {/* ========== CTA ========== */}
      <Section
        variant="white"
        className="border-t-2 border-black"
        innerClassName="text-center"
      >
        <h2 className="font-black text-3xl md:text-4xl leading-[0.95] mb-4">
          The lease expires March 31, 2027.
        </h2>
        <p className="text-base md:text-lg text-black mb-8 max-w-lg mx-auto">
          The decision is Uniland&apos;s. But the pressure is ours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/events"
            className="bg-[#DC2626] text-white font-black text-sm uppercase tracking-wider px-8 py-4 border-2 border-[#DC2626] hover:opacity-80 transition cursor-pointer text-center"
          >
            Show up
          </Link>
          <Link
            href="/#join"
            className="bg-black text-white font-black text-sm uppercase tracking-wider px-8 py-4 border-2 border-black hover:opacity-80 transition cursor-pointer text-center"
          >
            Join the coalition
          </Link>
        </div>
      </Section>
    </main>
  );
};
