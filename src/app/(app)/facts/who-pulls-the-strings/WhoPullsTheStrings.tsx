"use client";

import React from "react";
import Link from "next/link";
import { SourceLink } from "../SourceLink";

export const WhoPullsTheStrings: React.FC = () => {
  return (
    <main className="min-h-screen">
      {/* ========== HERO ========== */}
      <section className="bg-black text-white px-6 md:px-10 pt-28 md:pt-36 pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm uppercase tracking-wider text-white/40 mb-3">
            <Link
              href="/facts"
              className="hover:text-white transition"
            >
              The Facts
            </Link>
          </p>
          <p className="text-sm uppercase tracking-wider text-[#DC2626] mb-2">
            Delaware North &amp; the Jacobs family
          </p>
          <h1 className="font-black text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-6">
            Who Pulls the Strings
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-2xl">
            The building is named after them. Their global headquarters sits
            directly above the ICE offices. They are among the most powerful
            political donors in the region.
          </p>
        </div>
      </section>

      {/* ========== NAV ========== */}
      <div className="bg-white border-b border-black/10 px-6 md:px-10 py-4">
        <div className="max-w-3xl mx-auto flex justify-between text-sm">
          <Link
            href="/facts/who-pays"
            className="text-black/40 hover:text-[#DC2626] transition"
          >
            &larr; Previous: Who Pays
          </Link>
          <Link
            href="/facts"
            className="text-black/40 hover:text-[#DC2626] transition"
          >
            Back to The Facts
          </Link>
        </div>
      </div>

      {/* ========== CONTENT ========== */}
      <section className="bg-white text-black px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-5 text-base md:text-lg leading-relaxed text-black/70 mb-14">
            <p>
              Directly above the ICE offices sit the global headquarters of{" "}
              <strong className="text-black">Delaware North</strong> — a $3
              billion hospitality company owned by the Jacobs family. Jeremy
              Jacobs Sr. also owns the Boston Bruins and chairs the NHL Board of
              Governors.
            </p>
            <p>
              The building at 250 Delaware Avenue bears their name. It was built
              for them. They are its anchor tenant — the reason it exists.
              Uniland developed it; Delaware North occupies it. The ICE lease
              fills the floors they don&apos;t use.
            </p>
            <p>
              Delaware North received{" "}
              <SourceLink
                href="https://investigativepost.org/2013/11/26/delaware-norths-endless-subsidies/"
                label="millions in public subsidies"
              />{" "}
              to build and occupy this building — while ICE operates hold rooms
              and coordinates mass deportations from the same address.
            </p>
            <p>
              Delaware North does a significant amount of business with the
              federal government, operating hospitality concessions at many
              national parks and stadiums — making them reliant on government
              contracts and subsidies.
            </p>
          </div>

          {/* Trump donations */}
          <div className="bg-black text-white p-6 md:p-8 mb-14">
            <h2 className="font-black text-xl md:text-2xl text-[#DC2626] mb-4">
              $65,000 to Trump
            </h2>
            <div className="space-y-4 text-base md:text-lg leading-relaxed text-white/80">
              <p>
                Buffalo&apos;s billionaire Jacobs family donated at least{" "}
                <strong className="text-[#FFD600]">$65,000</strong> to President
                Donald Trump&apos;s transition team, according to a filing
                released by the{" "}
                <SourceLink
                  href="https://littlesis.org"
                  label="Center for Public Integrity"
                />
                .
              </p>
              <p>
                Eleven Jacobs family members donated the maximum allowable to
                Trump — including Jeremy Jacobs Sr., the chairman of Delaware
                North and owner of the Boston Bruins, and many of his children
                and their spouses.
              </p>
              <p>
                Maximum donations also came from the family&apos;s business
                enterprises: Patina Restaurant Group, which operates the Patina
                250 restaurant in the Delaware North headquarters at 250
                Delaware, and the holding company Delaware North Companies,
                where three of Jacobs&apos; sons are executives.
              </p>
            </div>
            <div className="mt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/jacobs-trump-donations.svg"
                alt="Network map showing eleven Jacobs family members and Delaware North entities that donated to Trump for America"
                className="w-full h-auto"
              />
              <p className="text-xs text-white/40 mt-2">
                Source:{" "}
                <SourceLink
                  href="https://littlesis.org"
                  label="LittleSis"
                />
              </p>
            </div>
          </div>

          <p className="font-black text-xl md:text-2xl leading-tight text-black mb-14">
            They have the power to demand change. They have chosen silence.
          </p>
        </div>
      </section>

      {/* ========== LETTER CTA ========== */}
      <section className="bg-[#DC2626] text-white px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-black text-3xl md:text-4xl leading-[0.95] mb-4">
            Tell Delaware North to take a stand.
          </h2>
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-lg mx-auto">
            They sit directly above the ICE offices. They have the power to
            demand change. Make them hear you.
          </p>
          <Link
            href="/letters/delaware-north"
            className="bg-white text-black font-black text-base uppercase tracking-wider px-10 py-5 border-2 border-white hover:opacity-80 hover:border-black transition cursor-pointer inline-block"
          >
            Sign the letter &rarr;
          </Link>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="bg-black text-white px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-black text-3xl md:text-4xl leading-[0.95] mb-4">
            Now you know the facts.
          </h2>
          <p className="text-base md:text-lg text-white/60 mb-8 max-w-lg mx-auto">
            The lease expires March 31, 2027. The pressure is ours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events"
              className="bg-[#FFD600] text-black font-black text-sm uppercase tracking-wider px-8 py-4 border-2 border-[#FFD600] hover:opacity-80 transition cursor-pointer text-center"
            >
              Show up
            </Link>
            <Link
              href="/#join"
              className="bg-white text-black font-black text-sm uppercase tracking-wider px-8 py-4 border-2 border-white hover:opacity-80 transition cursor-pointer text-center"
            >
              Join the coalition
            </Link>
          </div>
        </div>
      </section>

      {/* ========== BOTTOM NAV ========== */}
      <div className="bg-white border-t border-black/10 px-6 md:px-10 py-4">
        <div className="max-w-3xl mx-auto flex justify-between text-sm">
          <Link
            href="/facts/who-pays"
            className="text-black/40 hover:text-[#DC2626] transition"
          >
            &larr; Previous: Who Pays
          </Link>
          <Link
            href="/facts"
            className="text-black/40 hover:text-[#DC2626] transition"
          >
            Back to The Facts
          </Link>
        </div>
      </div>
    </main>
  );
};
