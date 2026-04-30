"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SourceLink } from "../SourceLink";

export const WhatHappensInside: React.FC = () => {
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
            250 Delaware Avenue, Buffalo NY
          </p>
          <h1 className="font-black text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-6">
            What Happens Inside
          </h1>
          <div className="text-base md:text-lg text-white/70 max-w-2xl space-y-1">
            <p>
              This isn&apos;t just an office. From this building in downtown
              Buffalo, ICE runs the machinery that terrorizes communities across
              upstate New York.
            </p>
          </div>
        </div>
      </section>

      {/* ========== NAV ========== */}
      <div className="bg-white border-b border-black/10 px-6 md:px-10 py-4">
        <div className="max-w-3xl mx-auto flex justify-between text-sm">
          <Link
            href="/facts"
            className="text-black/40 hover:text-[#DC2626] transition-colors"
          >
            &larr; Back to The Facts
          </Link>
          <Link
            href="/facts/who-profits"
            className="text-black/40 hover:text-[#DC2626] transition-colors"
          >
            Next: Who Profits &rarr;
          </Link>
        </div>
      </div>

      {/* ========== CONTENT ========== */}
      <section className="bg-white text-black px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          {/* ——— WHAT IS THIS BUILDING ——— */}
          <h2 className="font-black text-2xl md:text-3xl leading-tight mb-6">
            250 Delaware Ave: A regional field office
          </h2>
          <div className="md:flex md:gap-10 md:items-start mb-14">
            <div className="space-y-5 text-base md:text-lg leading-relaxed text-black/70 md:flex-1">
              <p>
                ICE operates 25 field offices nationwide, each with jurisdiction
                over its own region of the country. 250 Delaware Ave is that
                field office for the region of upstate and western NY — all of
                NY outside of NYC.
              </p>
              <p>
                Sub-offices in Albany, Syracuse, Batavia, and Champlain all take
                direction from this address.
              </p>
            </div>
            <div className="mt-6 md:mt-0 md:w-[240px] lg:w-[280px] shrink-0">
              <div className="border-2 border-black p-2">
                <Image
                  src="/nys-ero-map.png"
                  alt="Map of New York State showing the Buffalo ERO field office and its four sub-field offices in Albany, Syracuse, Batavia, and Champlain"
                  width={680}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-xs text-black/40 mt-2 leading-snug">
                Buffalo field office and sub-offices.{" "}
                <SourceLink
                  href="https://www.ice.gov/doclib/about/offices/ero/pdf/eroFieldOffices.pdf"
                  label="ICE.gov"
                />
              </p>
            </div>
          </div>

          {/* ——— WHAT IS A FIELD OFFICE — black highlight ——— */}
          <div className="border-2 border-[#1E3A8A] p-6 md:p-8 mb-14">
            <h2 className="font-black text-lg md:text-xl text-[#1E3A8A] mb-3">
              What is an ERO field office?
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-black/70">
              <SourceLink
                href="https://www.ice.gov/ero"
                label="Enforcement and Removal Operations (ERO)"
              />{" "}
              is the division of ICE that manages all aspects of immigration
              enforcement: identification, arrest, detention, and removal.
              ERO&apos;s Field Operations Division coordinates activities across
              25 field offices nationwide. Each field office is where
              headquarters policy becomes ground-level enforcement — where
              &ldquo;guidance&rdquo; becomes raids, arrests, and deportation
              flights. From here, federal immigration policy is translated into
              action.
            </p>
          </div>

          {/* ——— WHAT HAPPENS HERE ——— */}
          <h2 className="font-black text-2xl md:text-3xl leading-tight mb-4 text-[#DC2626]">
            What happens here
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-black/70 mb-10">
            Based on limited information from{" "}
            <SourceLink
              href="https://www.ice.gov/ero"
              label="ICE's own published structure"
            />
            , supplemented by accounts from advocates and journalists, here is
            what we know happens inside this building:
          </p>

          {/* — HOLDING CELLS — */}
          <div className="bg-[#DC2626] text-white p-6 md:p-8 mb-10">
            <h3 className="font-black text-xl md:text-2xl mb-4">
              Holding cells
            </h3>
            <div className="space-y-4 text-base md:text-lg leading-relaxed text-white/90">
              <p>
                People are detained inside this building. According to data
                collected by the{" "}
                <SourceLink
                  href="https://deportationdata.org"
                  label="Deportation Data Project"
                />
                , 233 people were booked into a facility coded
                &ldquo;BUFHOLD&rdquo; — lining up with accounts from advocates
                who have documented detention at 250 Delaware. 123 were held for
                more than 24 hours, 72 for more than three days. The median stay
                was 39 hours. Book-out times clustering at 6am suggest people
                sleeping in a facility designed for processing, not overnight
                detention.
              </p>
              <p>
                32 children passed through this hold room, including a
                2-year-old. Most were quickly transferred to family detention
                centers in Texas, where children spent an average of 17 days in
                custody — one child for 82 days.
              </p>
              <p>
                Nearly all detainees were then transferred to longer-term
                facilities in Louisiana and Texas — thousands of miles from
                their families, lawyers, and communities.
              </p>
            </div>
            <p className="text-xs text-white/50 mt-4">
              Data:{" "}
              <SourceLink
                href="https://deportationdata.org"
                label="Deportation Data Project"
              />
            </p>
          </div>

          {/* — RAIDS & ARRESTS — */}
          <div className="mb-10">
            <h3 className="font-black text-xl md:text-2xl mb-4">
              Raids &amp; arrests
            </h3>
            <div className="space-y-5 text-base md:text-lg leading-relaxed text-black/70">
              <p>
                From 250 Delaware, ICE coordinates arrests across the entire
                region — at workplaces, on the street, at traffic stops, and
                inside this building itself. Nearly three-quarters of Western
                New York arrests happen in{" "}
                <SourceLink
                  href="https://investigativepost.org/2026/04/14/upstate-ny-ice-arrests-surge-under-trump/"
                  label="raids or on the street"
                />
                , often involving agents in unmarked vehicles. Between January
                2025 and January 2026, arrests across upstate New York jumped
                from 787 to{" "}
                <strong className="text-black">3,722</strong> — more than
                quadruple the prior year.{" "}
                <strong className="text-black">
                  79% of those arrested had no criminal history.
                </strong>
              </p>
              <p>
                No location has been off limits. Agents raided the Asia Food
                Market in Amherst. They arrested construction workers at the
                Bills stadium. They targeted Iranian asylum seekers on
                Buffalo&apos;s West Side. And they arrest people inside this
                building — at routine check-in appointments people are legally
                required to attend.
              </p>
              <p>
                Dolores Bustamante Romero, a 54-year-old grandmother and
                farmworker advocate who had lived and worked in upstate New York
                since 2003, was arrested at a check-in appointment at 250
                Delaware on April 22, 2026. She had no criminal record. She had
                attended four previous appointments without incident. She came
                because, as she said herself, &ldquo;I have tried to do things
                the right way.&rdquo;
              </p>
              <p>
                She was transferred to a detention center in Ohio the same day.
              </p>
            </div>
            <p className="text-xs text-black/30 mt-4">
              Source:{" "}
              <SourceLink
                href="https://investigativepost.org/2026/04/14/upstate-ny-ice-arrests-surge-under-trump/"
                label="Investigative Post"
              />
            </p>
          </div>

          {/* — DEPORTATIONS — */}
          <div className="mb-10">
            <h3 className="font-black text-xl md:text-2xl mb-4">
              Deportations
            </h3>
            <div className="space-y-5 text-base md:text-lg leading-relaxed text-black/70">
              <p>
                From this building, ICE coordinates the{" "}
                <SourceLink
                  href="https://www.ice.gov/remove/removal"
                  label="removal of people from the country"
                />{" "}
                — arranging travel documents with foreign embassies, booking
                chartered flights, and transferring detainees to facilities
                across the country before deportation. Two-thirds of those
                arrested in Western New York have already been{" "}
                <SourceLink
                  href="https://investigativepost.org/2026/04/14/upstate-ny-ice-arrests-surge-under-trump/"
                  label="deported"
                />
                .
              </p>
              <p>
                A federal lawsuit filed in 2026 describes what this process
                looks like up close: a woman detained at 250 Delaware was
                transferred to Louisiana, where she contracted COVID-19 and was
                denied a change of clothes for three days. Her husband was told
                he would only receive his thyroid medication if he agreed to be
                deported. Both had active asylum cases. Neither had a warrant
                for their arrest.
              </p>
              <p>
                And when the machinery releases someone, the consequences
                don&apos;t end. Nurul Amin Shah Alam, a nearly blind Rohingya
                refugee from Burma who spoke no English, was picked up by Border
                Patrol and dropped off at a coffee shop on Niagara Street — 5
                miles from his home on the East Side. His family was not
                notified. He was found dead five days later.
              </p>
            </div>
            <p className="text-xs text-black/30 mt-4">
              Source:{" "}
              <SourceLink
                href="https://investigativepost.org/2026/04/14/upstate-ny-ice-arrests-surge-under-trump/"
                label="Investigative Post"
              />
            </p>
          </div>

          {/* — SURVEILLANCE — */}
          <div className="border-2 border-[#1E3A8A] p-6 md:p-8">
            <h3 className="font-black text-xl md:text-2xl text-[#1E3A8A] mb-4">
              Surveillance
            </h3>
            <div className="space-y-4 text-base md:text-lg leading-relaxed text-black/70">
              <p>
                Surveillance of our communities is coordinated from this
                building. ICE and Border Patrol are using license plate reader
                networks — including Flock Safety cameras installed across
                Buffalo, Amherst, and Cheektowaga — to track vehicles across the
                region. Social media is monitored. Location data purchased from
                commercial data brokers gives ICE the ability to locate most
                adults using app data, utility records, and driver&apos;s
                license databases.
              </p>
              <p>
                Plainclothes ICE agents have been observed stationed outside the
                downtown Buffalo immigration court, watching who enters and
                exits — arresting people after their hearings.
              </p>
              <p>
                Nearly all of upstate New York falls within the federal 100-mile
                border zone, where surveillance authorities are dramatically
                expanded. Everything collected feeds back to this address.
              </p>
            </div>
            <p className="text-xs text-black/40 mt-4">
              Sources:{" "}
              <SourceLink
                href="https://www.eff.org/pages/street-level-surveillance"
                label="EFF Street Level Surveillance"
              />
              {", "}
              <SourceLink
                href="https://www.law.georgetown.edu/privacy-technology-center/publications/american-dragnet-data-driven-immigration-enforcement/"
                label="Georgetown Law &ldquo;American Dragnet&rdquo;"
              />
              {", "}
              <SourceLink
                href="https://investigativepost.org/2026/04/14/upstate-ny-ice-arrests-surge-under-trump/"
                label="Investigative Post"
              />
            </p>
          </div>
        </div>
      </section>

      {/* ========== BOTTOM NAV ========== */}
      <div className="bg-white border-t border-black/10 px-6 md:px-10 py-4">
        <div className="max-w-3xl mx-auto flex justify-between text-sm">
          <Link
            href="/facts"
            className="text-black/40 hover:text-[#DC2626] transition-colors"
          >
            &larr; Back to The Facts
          </Link>
          <Link
            href="/facts/who-profits"
            className="text-black/40 hover:text-[#DC2626] transition-colors"
          >
            Next: Who Profits &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
};
