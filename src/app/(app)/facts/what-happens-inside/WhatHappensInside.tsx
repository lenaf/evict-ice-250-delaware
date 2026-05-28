"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { SourceLink } from "../SourceLink";

export const WhatHappensInside: React.FC = () => {
  return (
    <main className="min-h-screen">
      {/* ========== HERO ========== */}
      {/* Custom padding + layout — not using Section wrapper */}
      <section
        className="bg-black"
        style={{ "--section-highlight": "#DC2626" } as React.CSSProperties}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-10 md:pb-16">
          <h1 className="type-hero text-white mb-6">
            What Happens Inside
          </h1>
          <p className="text-lg md:text-xl font-normal text-white leading-snug mb-2 highlight">
            This isn&apos;t just an office building.
          </p>
          <p className="text-base md:text-lg text-white leading-relaxed mb-10">
            From 250 Delaware Avenue in downtown Buffalo, ICE runs the{" "}
            <strong className="">machinery of terror</strong>{" "}
            across all of western and upstate New York.
          </p>
          <div className="flex justify-between text-sm border-t border-white/20 pt-6">
            <Link
              href="/facts"
              className="uppercase tracking-wider font-light text-white hover:text-[#DC2626] transition-colors"
            >
              &larr; The Facts
            </Link>
            <Link
              href="/facts/who-profits"
              className="uppercase tracking-wider font-light text-white hover:text-[#DC2626] transition-colors"
            >
              Next: Who Profits &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ========== COMMAND CENTER ========== */}
      <Section variant="blue">
        <h2 className="type-section mb-6">The Command Center</h2>
        <div className="md:flex md:gap-14 md:items-start">
          <div className="md:flex-1">
            <p className="text-base md:text-lg leading-relaxed mb-4">
              250 Delaware is one of only{" "}
              <strong>25 ICE field offices</strong>{" "}
              nationwide. It controls everything that happens in upstate and
              Western New York, every region outside of NYC.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Sub-offices in Albany, Syracuse, Batavia, and Champlain all
              take orders from here.
            </p>
          </div>
          <div className="mt-8 md:mt-0 md:w-[260px] lg:w-[300px] shrink-0">
            <div className="bg-white p-3 border-2 border-white">
              <Image
                src="/nys-ero-map.png"
                alt="Map of New York State showing the Buffalo ERO field office and its four sub-field offices in Albany, Syracuse, Batavia, and Champlain"
                width={680}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <p className="font-light text-xs text-white mt-2 leading-snug">
              Buffalo field office and sub-offices.
            </p>
          </div>
        </div>
        <p className="font-light text-xs text-white mt-10 pt-4 border-t border-white/20">
          Source:{" "}
          <SourceLink
            href="https://www.ice.gov/contact/field-offices"
            label="ICE.gov"
          />
        </p>
      </Section>

      {/* ========== THE SCALE ========== */}
      <Section variant="black">
        <h2 className="type-section mb-6">The scale</h2>
        <p className="text-base md:text-lg leading-relaxed mb-4">
          In 2025 alone:{" "}
          <strong className="highlight">
            7,258 people were taken into custody
          </strong>{" "}
          across upstate and Western New York.
        </p>
        <p className="text-base md:text-lg leading-relaxed mb-4">
          Every arrest. Every raid. Every deportation order.
        </p>
        <p className="font-black text-lg md:text-xl leading-relaxed">
          All coordinated from 250 Delaware Avenue.
        </p>
      </Section>

      {/* ========== WHAT HAPPENS BEHIND CLOSED DOOR ========== */}
      <Section variant="yellow">
        <h2 className="type-section mb-4">What Happens Behind Closed Door</h2>
        <p className="text-base md:text-lg leading-relaxed">
          Based on limited information from{" "}
          <SourceLink
            href="https://www.ice.gov/ero"
            label="ICE's own published structure"
          />
          , supplemented by accounts from advocates and journalists, here is
          what we know happens inside this building.
        </p>
      </Section>

      {/* ========== HOLDING CELLS ========== */}
      <Section variant="white">
        <h2 className="type-section mb-6">Holding cells</h2>
        <p className="text-base md:text-lg leading-relaxed mb-6">
          People are detained inside this building&mdash;including children.{" "}
          According to the 245 days of data available collected by the
          Deportation Data Project (June 2025 - February 2026):
        </p>
        <ul className="space-y-3 text-base md:text-lg leading-relaxed mb-8 pl-4">
          <li className="flex gap-3 items-start">
            <span className="inline-block w-2 h-2 bg-[#DC2626] shrink-0 mt-[0.4em]" aria-hidden="true" />
            <span>
              <strong>233 people were detained</strong>{" "}
              at the facility. That is{" "}
              <strong className="highlight">
                nearly one new person captured and held each day.
              </strong>
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="inline-block w-2 h-2 bg-[#DC2626] shrink-0 mt-[0.4em]" aria-hidden="true" />
            <span>
              <strong>32 children</strong> abducted from their families were
              held here,{" "}
              <strong className="highlight">including a 2-year-old.</strong>
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="inline-block w-2 h-2 bg-[#DC2626] shrink-0 mt-[0.4em]" aria-hidden="true" />
            <span>Over half detained longer than 24 hours</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="inline-block w-2 h-2 bg-[#DC2626] shrink-0 mt-[0.4em]" aria-hidden="true" />
            <span>Nearly a third held more than 3 days</span>
          </li>
        </ul>
        <p className="text-base md:text-lg leading-relaxed mb-8">
          Then most are transferred thousands of miles away&mdash;to
          Louisiana, Texas, Ohio, Florida&mdash;far from families, lawyers,
          and communities.
        </p>
        <p className="font-light text-xs text-black mt-10 pt-4 border-t border-black/20">
          Source:{" "}
          <SourceLink
            href="https://deportationdata.org"
            label="Deportation Data Project"
          />
        </p>
      </Section>

      {/* ========== RAID COORDINATION ========== */}
      <Section variant="black">
        <h2 className="type-section mb-4">Raid Coordination</h2>
        <p className="text-base md:text-lg leading-relaxed mb-6">
          From this building, ICE plans and executes raids across the entire
          region. Recent operations coordinated from 250 Delaware that has
          attacked our own community:
        </p>
        <ul className="space-y-3 text-base md:text-lg mb-8 pl-4">
          <li className="flex gap-3 items-start">
            <span className="inline-block w-2 h-2 bg-[#DC2626] shrink-0 mt-[0.4em]" aria-hidden="true" />
            <span>
              <strong>5 Buffalo Bills stadium construction workers</strong>{" "}
              detained
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="inline-block w-2 h-2 bg-[#DC2626] shrink-0 mt-[0.4em]" aria-hidden="true" />
            <span>
              Popular <strong>Western New York supermarket</strong> raided
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="inline-block w-2 h-2 bg-[#DC2626] shrink-0 mt-[0.4em]" aria-hidden="true" />
            <span>
              <strong>Farm workers targeted</strong> during landmark
              unionization effort
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="inline-block w-2 h-2 bg-[#DC2626] shrink-0 mt-[0.4em]" aria-hidden="true" />
            <span>
              Dozens arrested in <strong>coordinated WNY sweeps</strong>
            </span>
          </li>
        </ul>
        <p className="font-light text-xs text-white mt-10 pt-4 border-t border-white/20">
          Source:{" "}
          <SourceLink
            href="https://investigativepost.org/2026/04/14/upstate-ny-ice-arrests-surge-under-trump/"
            label="Investigative Post"
          />
        </p>
      </Section>

      {/* ========== ARRESTS-BY APPOINTMENT + DOLORES ========== */}
      <Section variant="white">
        <h2 className="type-section mb-4">Arrests-by Appointment</h2>
        <p className="text-base md:text-lg leading-relaxed mb-12">
          ICE orders people to appear for &ldquo;routine check-ins&rdquo; at
          250 Delaware, then{" "}
          <strong className="highlight">arrests them when they show up.</strong>
        </p>

        <h3 className="font-bold text-base md:text-lg text-[#1E3A8A] mb-4">
          Dolores Bustamante Romero&apos;s story
        </h3>
        <p className="text-base md:text-lg leading-relaxed mb-6">
          In April 2026, Dolores, a 54-year-old farmworker advocate and asylum
          seeker who came to the US in 2003, was arrested at a check-in
          appointment at 250 Delaware.
        </p>
        <p className="font-black text-lg md:text-xl leading-relaxed text-[#1E3A8A] mb-6">
          &ldquo;I will go to my check-in because I have tried to do things
          the right way. I have been in court for more than 10 years, trying
          to navigate my case the right way. I pay my taxes, and I contribute
          to this community&apos;s economy. I have committed no
          crimes.&rdquo;
        </p>
        <p className="text-base md:text-lg leading-relaxed mb-8">
          <strong>She was transferred the same day.</strong> First to Ohio,
          then Louisiana, before a court order mandated her return to New York. 
          After more than a month in detention a federal judge ordered her release, 
          ruling that ICE had violated her due process rights.
        </p>
        <p className="font-light text-xs text-black mt-10 pt-4 border-t border-black/20">
          Sources:{" "}
          <SourceLink
            href="https://www.nytimes.com/2025/02/15/us/ice-check-ins-arrests.html"
            label="ICE now targeting Afghans, rule followers"
          />
          {", "}
          <SourceLink
            href="https://investigativepost.org/2026/04/14/upstate-ny-ice-arrests-surge-under-trump/"
            label="ICE seizes advocate for migrant farmworkers"
          />
        </p>
      </Section>

      {/* ========== DETENTION & DISAPPEARANCE ========== */}
      <Section variant="blue">
        <h2 className="type-section mb-2">
          Detention &amp; Disappearance
        </h2>
        <p className="font-black text-lg md:text-xl highlight mb-6">
          From 250 Delaware, ICE makes people disappear.
        </p>
        <p className="text-base md:text-lg leading-relaxed mb-8">
          Detention orders are issued. Secret charter flights are booked.
          Families and lawyers are left in the dark.
        </p>

        <h3 className="text-base md:text-lg uppercase tracking-wider font-black mb-3">
          Where people go
        </h3>
        <p className="text-base md:text-lg leading-relaxed mb-4">
          Most are sent to the Buffalo Federal Detention Facility in Batavia,
          a facility criticized for cruel, inhumane conditions:
        </p>
        <ul className="space-y-3 text-base md:text-lg mb-6 pl-4">
          <li className="flex gap-3 items-start">
            <span className="inline-block w-2 h-2 bg-[#FFD600] shrink-0 mt-[0.4em]" aria-hidden="true" />
            <span>Over capacity since June 2025</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="inline-block w-2 h-2 bg-[#FFD600] shrink-0 mt-[0.4em]" aria-hidden="true" />
            <span>
              Detainees spend{" "}
              <strong className="highlight">18 hours a day in cells</strong>
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="inline-block w-2 h-2 bg-[#FFD600] shrink-0 mt-[0.4em]" aria-hidden="true" />
            <span>Inadequate medical treatment</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="inline-block w-2 h-2 bg-[#FFD600] shrink-0 mt-[0.4em]" aria-hidden="true" />
            <span>
              June 2024:{" "}
              <strong className="highlight">
                ~40 detainees staged hunger strike
              </strong>{" "}
              over conditions
            </span>
          </li>
        </ul>
        <p className="text-base md:text-lg leading-relaxed mb-8">
          Others are transferred thousands of miles away to Texas, Louisiana,
          Ohio, and Florida&mdash;severing them from their support systems.
        </p>
        <p className="font-light text-xs text-white mt-10 pt-4 border-t border-white/20">
          Sources:{" "}
          <SourceLink
            href="https://www.ice.gov/remove/removal"
            label="ICE Removal Operations"
          />
          {", "}
          <SourceLink
            href="https://kennedyhumanrights.org/report/buffalo-federal-detention-facility-abuses-people-for-exercising-first-amendment-rights-complaint-to-the-office-for-civil-rights-and-civil-liberties/"
            label="Kennedy Human Rights (Batavia facility)"
          />
          {", "}
          <SourceLink
            href="https://www.democracynow.org/2024/6/17/batavia_ice_detention_hunger_strike"
            label="Democracy Now (hunger strike)"
          />
        </p>
      </Section>

      {/* ========== SURVEILLANCE ========== */}
      <Section variant="black">
        <h2 className="type-section mb-6">Surveillance</h2>
        <p className="text-base md:text-lg leading-relaxed mb-3">
          Every member of the community is being watched.
        </p>
        <p className="text-base md:text-lg leading-relaxed mb-6">
          Your movements are being tracked and it all feeds back to 250
          Delaware.
        </p>
        <p className="text-base md:text-lg font-black mb-3">
          ICE&apos;s surveillance tools:
        </p>
        <ul className="space-y-3 text-base md:text-lg mb-8 pl-4">
          <li className="flex gap-3 items-start">
            <span className="inline-block w-2 h-2 bg-[#DC2626] shrink-0 mt-[0.4em]" aria-hidden="true" />
            <span>
              License plate reader networks (including Flock Safety cameras in
              Buffalo, Amherst, and Cheektowaga)
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="inline-block w-2 h-2 bg-[#DC2626] shrink-0 mt-[0.4em]" aria-hidden="true" />
            <span>Social media monitoring</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="inline-block w-2 h-2 bg-[#DC2626] shrink-0 mt-[0.4em]" aria-hidden="true" />
            <span>Location data purchased from commercial brokers</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="inline-block w-2 h-2 bg-[#DC2626] shrink-0 mt-[0.4em]" aria-hidden="true" />
            <span>
              App data, utility records, driver&apos;s license databases
            </span>
          </li>
        </ul>
        <p className="font-black text-lg md:text-xl uppercase tracking-wide mb-6">
          Everything collected. Everything analyzed. All from this address.
        </p>
        <p className="font-light text-xs text-white mt-10 pt-4 border-t border-white/20">
          Sources:{" "}
          <SourceLink href="https://www.404media.co" label="404 Media" />
          {", "}
          <SourceLink
            href="https://www.law.vanderbilt.edu/clinics/civil-rights/surveillance/"
            label="Vanderbilt Law"
          />
        </p>
      </Section>

      {/* ========== CLOSING ========== */}
      <Section variant="yellow">
        <h2 className="type-section mb-4">This Building Is the Problem</h2>
        <h3 className="text-[clamp(1.5rem,4vw,2.5rem)] font-black normal-case mb-4">
          250 Delaware Avenue isn&apos;t just where ICE has offices.
        </h3>
        <p className="text-lg md:text-xl font-black mb-4">
          It&apos;s the nerve center for a system of terror that reaches every
          corner of upstate New York.
        </p>
        <p className="font-black text-2xl md:text-3xl mb-2">
          The lease expires March 2027.
        </p>
        <p className="font-black text-2xl md:text-3xl highlight">
          We can end this.
        </p>
      </Section>

      {/* ========== CTA ========== */}
      <Section variant="black">
        <h2 className="text-3xl md:text-4xl lg:text-5xl normal-case mb-3">
          The lease expires March 2027.
        </h2>
        <p className="text-base md:text-lg mb-8">
          The decision is Uniland&apos;s. But the pressure is ours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/show-up"
            className="bg-[#DC2626] text-white font-black text-sm uppercase tracking-wider px-8 py-4 border-2 border-[#DC2626] hover:bg-white hover:text-black hover:border-white transition-colors cursor-pointer text-center"
          >
            Show up
          </Link>
          <Link
            href="/#join"
            className="bg-transparent text-white font-black text-sm uppercase tracking-wider px-8 py-4 border-2 border-white hover:bg-white hover:text-black transition-colors cursor-pointer text-center"
          >
            Join the coalition
          </Link>
        </div>
      </Section>
    </main>
  );
};
