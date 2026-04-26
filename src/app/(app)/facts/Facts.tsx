"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface SourceLinkProps {
  href: string;
  label: string;
}

const SourceLink: React.FC<SourceLinkProps> = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:text-[#DC2626] transition-colors"
  >
    {label}
  </a>
);

interface StatCardProps {
  stat: string;
  label: string;
  color?: "red" | "yellow" | "white";
}

const StatCard: React.FC<StatCardProps> = ({
  stat,
  label,
  color = "white",
}) => {
  const bg =
    color === "red"
      ? "bg-[#DC2626] text-white"
      : color === "yellow"
        ? "bg-[#FFD600] text-black"
        : "bg-white text-black";
  return (
    <div className={`${bg} border-2 border-black p-6 md:p-8`}>
      <p className="font-black text-3xl md:text-4xl leading-none mb-2">
        {stat}
      </p>
      <p
        className={`text-sm md:text-base uppercase tracking-wide font-bold ${color === "red" ? "text-white/80" : "text-black/60"}`}
      >
        {label}
      </p>
    </div>
  );
};

export const Facts: React.FC = () => {
  return (
    <main className="min-h-screen">
      {/* ========== HERO ========== */}
      <section className="bg-[#FFD600] relative overflow-hidden">
        <div className="md:hidden px-6 pt-28 pb-10">
          <h1 className="font-black text-4xl leading-[0.95] mb-4">The Facts</h1>
          <p className="text-base text-black/70 max-w-md">
            The Delaware North Building is ICE Headquarters for all of New York
            State outside of NYC. Here are the facts about what happens inside,
            who profits, and how we can fight back.
          </p>
        </div>
        <div className="md:hidden relative w-full h-56">
          <Image
            src="/250-Delaware.png"
            alt="250 Delaware Avenue building in downtown Buffalo, NY"
            fill
            className="object-contain object-bottom"
          />
        </div>
        <div className="hidden md:block relative overflow-hidden">
          <div className="absolute bottom-0 right-[-5%] w-[35%] h-[85%] z-20 pointer-events-none">
            <Image
              src="/250-Delaware.png"
              alt="250 Delaware Avenue building in downtown Buffalo, NY"
              fill
              className="object-contain object-bottom"
            />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-10 pt-36 pb-28 pr-[40%]">
            <h1 className="font-black text-5xl lg:text-6xl leading-[0.95] mb-6">
              The Facts
            </h1>
            <p className="text-lg text-black/70 max-w-lg">
              The Delaware North Building is ICE Headquarters for all of New
              York State outside of NYC. Here are the facts about what happens
              inside, who profits, and how we can fight back.
            </p>
          </div>
        </div>
      </section>

      {/* ========== THE COMMAND CENTER ========== */}
      <section className="bg-[#1E3A8A] text-white px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-2xl md:text-4xl leading-tight mb-4">
            The command center
          </h2>
          <p className="text-base md:text-lg text-white/60 mb-10 max-w-2xl">
            250 Delaware is where ICE operations across all of upstate New York
            are coordinated. This is what happens inside.
          </p>
          <div className="space-y-5 text-base md:text-lg leading-relaxed text-white/80 max-w-3xl mb-14">
            <p>
              Every ICE action across Western New York, Central New York, the
              Finger Lakes, Southern Tier, North Country, Mohawk Valley, Capital
              Region, and Mid-Hudson — roughly 46 counties — is coordinated from
              this building. It is the nerve center for immigration enforcement
              across the entire state outside of NYC.
            </p>
            <p>
              Federal records show the government leases{" "}
              <strong className="text-white">53,314 square feet</strong> at 250
              Delaware — fully occupied, zero available space. ICE Enforcement
              &amp; Removal Operations occupies at least the seventh floor, with
              an executive suite, conference rooms with video teleconferencing,
              a mail room, and even a fitness facility. The office also oversees
              a sub-office in Albany.
            </p>
            <p>
              The Buffalo field office maintains a{" "}
              <strong className="text-white">
                Special Response Team (SRT)
              </strong>{" "}
              — a paramilitary tactical unit with off-site weapons storage in
              Lancaster, NY, contracts for indoor and outdoor firing ranges,
              tactical communication gear, and armored vehicle track systems.
              All coordinated from a building with a fine dining restaurant on
              the first floor.
            </p>
          </div>
          ADD DRAWING OF STATE
          <p className="text-xs text-white/30 mb-14 max-w-xl">
            Federal lease and contract data:{" "}
            <SourceLink
              href="https://www.usaspending.gov/search"
              label="USASpending.gov"
            />
            {", "}
            <SourceLink
              href="https://iolp.gsa.gov/"
              label="GSA Inventory of Owned &amp; Leased Properties"
            />
            {". "}
            Search recipient &ldquo;Uniland Partnership of Delaware&rdquo; or
            PIID GS02B23305 to verify.
          </p>
          <div className="space-y-5 text-base md:text-lg leading-relaxed text-white/80 max-w-3xl mb-14">
            <p>
              People with pending asylum claims are ordered to report to the
              seventh floor for mandatory check-in appointments. When they show
              up — voluntarily, with no criminal record and scheduled court
              dates — they are arrested on the spot.
            </p>
            <p>
              A Venezuelan asylum seeker traveled to 250 Delaware for a January
              6 check-in and was promptly detained. His wife, also an asylum
              seeker, attended the appointment with him but was released to care
              for their U.S.-born child. She was ordered to return to the
              building the following day.
            </p>
          </div>
          <blockquote className="border-l-2 border-[#FFD600] pl-6 mb-14 max-w-3xl">
            <p className="text-base md:text-lg italic text-white/80">
              &ldquo;That is a very easy way for ICE to boost their arrest
              numbers. None of these people are flight risks or a danger to the
              community. If you voluntarily show up to your check-in
              appointment, you&apos;re not a flight risk, right? You&apos;re
              showing up.&rdquo;
            </p>
            <cite className="block mt-2 text-sm text-white/40 not-italic">
              — Matthew Borowski, immigration attorney (
              <SourceLink
                href="https://investigativepost.org/2026/01/29/ice-now-targeting-afghans-rule-followers/"
                label="Investigative Post"
              />
              )
            </cite>
          </blockquote>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <h3 className="font-black text-lg md:text-xl text-[#FFD600] mb-4">
                Arrested at court
              </h3>
              <p className="text-base leading-relaxed text-white/70 mb-3">
                ICE agents dispatched from 250 Delaware wait outside immigration
                court at 130 Delaware Avenue — a separate building down the
                street — to arrest people who show up for their own hearings. A
                19-year-old Venezuelan asylum seeker was grabbed outside his
                scheduled hearing on May 21, 2025. ICE tried to fast-track his
                deportation. A federal judge ordered his release and a
                nationwide lawsuit was filed to end courthouse arrests.
              </p>
              <p className="text-xs text-white/30">
                <SourceLink
                  href="https://theintercept.com/2025/08/19/ice-courthouse-arrests-immigrants-lawsuit-nyclu/"
                  label="The Intercept"
                />
                {" | "}
                <SourceLink
                  href="https://investigativepost.org/2025/08/19/judge-overturns-immigration-court-arrest/"
                  label="Investigative Post"
                />
              </p>
            </div>
            <div>
              <h3 className="font-black text-lg md:text-xl text-[#FFD600] mb-4">
                Surveillance dispatched from here
              </h3>
              <p className="text-base leading-relaxed text-white/70 mb-3">
                Operations coordinated from 250 Delaware extend into Buffalo
                neighborhoods. ICE agents staked out a West Side block for days,
                surveilling an Iranian family here legally with no criminal
                record. Neighbors banded together to protect them. The family
                had fled political persecution in their homeland.
              </p>
              <p className="text-xs text-white/30">
                <SourceLink
                  href="https://www.wkbw.com/news/local-news/buffalo/buffalo-neighbors-band-together-to-protect-asylum-seeking-family-from-ice-surveillance"
                  label="WKBW"
                />
                {" | "}
                <SourceLink
                  href="https://investigativepost.org/2025/07/01/ice-targets-iranian-family-in-buffalo-here-legally/"
                  label="Investigative Post"
                />
              </p>
            </div>
          </div>
          <blockquote className="border-l-2 border-[#FFD600] pl-6 mt-14 max-w-3xl">
            <p className="text-base md:text-lg italic text-white/80">
              &ldquo;It causes people who are following immigration laws to not
              want to. Because if they do, and they attend their check-ins,
              they&apos;re going to be detained. And then what? How does that
              help?&rdquo;
            </p>
            <cite className="block mt-2 text-sm text-white/40 not-italic">
              — Aliza Berger, immigration attorney (
              <SourceLink
                href="https://investigativepost.org/2026/01/29/ice-now-targeting-afghans-rule-followers/"
                label="Investigative Post"
              />
              )
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ========== STAT BANNER ========== */}
      <section className="bg-[#DC2626] text-white px-6 md:px-10 py-10 md:py-14 border-y-2 border-black">
        <div className="max-w-6xl mx-auto">
          <p className="font-black text-xl md:text-3xl leading-tight uppercase">
            In 2025, ICE arrested <span className="text-[#FFD600]">1,009</span>{" "}
            people across Western New York.{" "}
            <span className="text-[#FFD600]">67%</span> had no criminal record.
          </p>
        </div>
      </section>

      {/* ========== THE NUMBERS ========== */}
      <section className="bg-white text-black px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-2xl md:text-4xl leading-tight mb-4">
            The scale of operations
          </h2>
          <p className="text-base md:text-lg text-black/50 mb-10 max-w-2xl">
            The numbers behind what 250 Delaware coordinates. Every arrest in
            the data below was ordered, processed, or managed from this
            building.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
            <StatCard
              stat="10.5x"
              label="Increase in Erie County arrests (2024 to 2025)"
              color="red"
            />
            <StatCard
              stat="37x"
              label="Increase in Monroe County arrests (2024 to 2025)"
              color="yellow"
            />
            <StatCard
              stat="620"
              label="People arrested in Erie County in 2025"
            />
            <StatCard
              stat="2x"
              label="ICE on track to double 2024 arrests statewide"
            />
          </div>

          <p className="text-xs text-black/40 max-w-xl">
            Arrest data: Deportation Data Project via{" "}
            <SourceLink
              href="https://spectrumlocalnews.com/nys/central-ny/news/2025/12/12/a-county-by-county-look-at-ice-arrests-in-new-york-"
              label="Spectrum News"
            />
            ,{" "}
            <SourceLink
              href="https://investigativepost.org/2026/01/29/ice-now-targeting-afghans-rule-followers/"
              label="Investigative Post"
            />
          </p>
        </div>
      </section>

      {/* ========== FOLLOW THE MONEY — BANNER ========== */}
      <section className="bg-black text-white px-6 md:px-10 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <p className="font-black text-lg md:text-2xl leading-tight uppercase tracking-wide">
            Our tax dollars are helping landlords profit from mass deportations.
          </p>
        </div>
      </section>

      {/* ========== UNILAND & THE MONTANTE FAMILY ========== */}
      <section className="bg-[#FFD600] text-black px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-2xl md:text-4xl leading-tight mb-4">
            Uniland &amp; the Montante family
          </h2>
          <p className="text-base md:text-lg text-black/60 mb-10 max-w-2xl">
            The biggest local profiteer from immigration enforcement. Built with
            public subsidies. Connected to every power center in Buffalo.
          </p>

          {/* Revenue from immigration agencies */}
          <div className="grid md:grid-cols-3 gap-3 md:gap-4 mb-14">
            <div className="bg-white border-2 border-black p-6 md:p-8">
              <p className="font-black text-3xl md:text-4xl leading-none mb-2">
                $1.95M<span className="text-lg">/yr</span>
              </p>
              <p className="text-sm md:text-base text-black/60 uppercase tracking-wide font-bold">
                ICE lease at 250 Delaware ($11.2M+ total since 2002)
              </p>
            </div>
            <div className="bg-white border-2 border-black p-6 md:p-8">
              <p className="font-black text-3xl md:text-4xl leading-none mb-2">
                $563K<span className="text-lg">/yr</span>
              </p>
              <p className="text-sm md:text-base text-black/60 uppercase tracking-wide font-bold">
                CBP lease at 300 Airborne Pkwy, Cheektowaga
              </p>
            </div>
            <div className="bg-[#DC2626] text-white border-2 border-black p-6 md:p-8">
              <p className="font-black text-3xl md:text-4xl leading-none mb-2">
                $2.5M<span className="text-lg">+/yr</span>
              </p>
              <p className="text-sm md:text-base text-white/80 uppercase tracking-wide font-bold">
                Total Uniland earns from ICE &amp; CBP
              </p>
            </div>
          </div>

          {/* The family */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-14">
            <div>
              <h3 className="font-black text-xl md:text-2xl mb-4">
                The family behind the lease
              </h3>
              <div className="space-y-4 text-base leading-relaxed text-black/70">
                <p>
                  Carl Montante Sr. founded Uniland Development with his brother
                  Thomas in 1974. He remains president and managing director,
                  holding 82.99% ownership. Three of his children — Laura
                  Zaepfel, Carl Montante Jr., and Michael Montante — are vice
                  presidents. Carl Jr.&apos;s wife Wendy also has roles tied to
                  the family&apos;s institutional network.
                </p>
                <p>
                  Uniland is headquartered in Amherst and is one of the largest
                  commercial developers in the Buffalo region. Their federal
                  leases — including 250 Delaware (ICE) and 300 Airborne Parkway
                  (CBP) — make them the biggest local profiteer from immigration
                  enforcement operations.
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-black text-xl md:text-2xl mb-4">
                Political donations
              </h3>
              <div className="space-y-1 text-base">
                <div className="flex justify-between py-2 border-b border-black/10">
                  <span className="text-black/70">Gov. Andrew Cuomo</span>
                  <span className="font-black">$39,500+</span>
                </div>
                <div className="flex justify-between py-2 border-b border-black/10">
                  <span className="text-black/70">Mayor Byron Brown</span>
                  <span className="font-black">$20,900+</span>
                </div>
                <div className="flex justify-between py-2 border-b border-black/10">
                  <span className="text-black/70">Lt. Gov. Kathy Hochul</span>
                  <span className="font-black">$15,500+</span>
                </div>
                <div className="flex justify-between py-2 border-b border-black/10">
                  <span className="text-black/70">Rep. Chris Collins (R)</span>
                  <span className="font-black">$13,500</span>
                </div>
                <div className="flex justify-between py-2 border-b border-black/10">
                  <span className="text-black/70">Rep. Brian Higgins (D)</span>
                  <span className="font-black">$8,750</span>
                </div>
                <div className="flex justify-between py-2 border-b border-black/10">
                  <span className="text-black/70">Sen. Chuck Schumer</span>
                  <span className="font-black">$6,400</span>
                </div>
                <div className="flex justify-between py-2 bg-black text-white px-3 -mx-3">
                  <span className="font-bold">Total donations</span>
                  <span className="font-black">$415,000+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Institutional power */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-14">
            <div>
              <h3 className="font-black text-xl md:text-2xl mb-4">
                Board seats &amp; institutional power
              </h3>
              <div className="space-y-4 text-base leading-relaxed text-black/70">
                <p>
                  The Montante family sits on the boards of some of the most
                  influential institutions in the region. Michael Montante
                  serves on the board of the{" "}
                  <strong>Buffalo Niagara Partnership</strong>, the
                  region&apos;s most influential corporate lobbying group. Carl
                  Sr. has held a board position there as well.
                </p>
                <p>
                  Carl Sr. has been{" "}
                  <strong>chairman of Catholic Health System</strong> and{" "}
                  <strong>chairman of Canisius High School</strong>. Laura
                  Zaepfel has{" "}
                  <strong>chaired the board of Catholic Charities</strong> and
                  served on the Foundation of the Roman Catholic Diocese of
                  Buffalo. Carl Sr. also sits on the board of trustees of{" "}
                  <strong>D&apos;Youville College</strong>.
                </p>
                <p>
                  The family&apos;s name is on the buildings: the Montante
                  Cultural Center at Canisius College and the Montante Family
                  Library at D&apos;Youville.
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-black text-xl md:text-2xl mb-4">
                The Catholic contradiction
              </h3>
              <div className="space-y-4 text-base leading-relaxed text-black/70">
                <p>
                  The Montante family&apos;s deep involvement with Catholic
                  institutions sits in direct tension with their profiteering
                  from immigration enforcement. The Catholic Church has
                  unequivocally denounced the cruel treatment of immigrants.
                  Pope Francis called on the United States to treat immigrants{" "}
                  <em>
                    &ldquo;in a way which is always humane, just and
                    fraternal.&rdquo;
                  </em>
                </p>
                <p>
                  Canisius College and High School were founded by the Jesuits,
                  the Catholic order best known for its commitment to social
                  justice. In 2016, the president of Canisius signed a letter
                  urging politicians to maintain the DACA program, stressing
                  Catholic institutions&apos; history of{" "}
                  <em>
                    &ldquo;welcoming those on society&apos;s margins, especially
                    immigrants and underprivileged populations.&rdquo;
                  </em>
                </p>
                <p>
                  The Montante family&apos;s name is on buildings at these same
                  institutions — while they collect $2.5 million a year from the
                  agencies tearing immigrant families apart.
                </p>
              </div>
            </div>
          </div>

          {/* Delaware North */}
          <div className="bg-black text-white p-6 md:p-8 mb-14">
            <h3 className="font-black text-lg md:text-xl mb-3">
              Delaware North: the anchor tenant
            </h3>
            <p className="text-base leading-relaxed text-white/70">
              Directly above the ICE offices sit the global headquarters of
              Delaware North, a $3 billion hospitality company owned by the
              billionaire Jacobs family. Jeremy Jacobs Sr. also owns the Boston
              Bruins and chairs the NHL Board of Governors. The Jacobs family
              are among the biggest donors to both Donald Trump and Andrew Cuomo
              in the region.
            </p>
          </div>

          {/* Tax breaks */}
          <h3 className="font-black text-xl md:text-2xl mb-4">
            A quarter century of tax breaks
          </h3>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-10">
            <div className="space-y-4 text-base leading-relaxed text-black/70">
              <p>
                Before 250 Delaware even existed, Delaware North received $4.1
                million in tax breaks at its previous headquarters at Key Center
                (2000-2015), plus an $11.6 million low-interest line of credit
                from the City of Buffalo — using federal anti-poverty funds that
                HUD later recalled.
              </p>
              <p>
                Then, for 250 Delaware, the Erie County Industrial Development
                Agency (ECIDA) approved up to $10.6 million in tax breaks for
                Uniland, including $1.8 million in sales tax, $400,000 in
                mortgage tax, and up to $8.4 million in property tax abatements.
                Delaware North received an additional $807,000 sales tax waiver
                and applied for $4 million in state tax credits.
              </p>
              <p>
                That property tax abatement is still in effect.{" "}
                <strong>
                  In 2024 alone, it cost Buffalo and Erie County $791,000.
                </strong>
              </p>
            </div>
            <div>
              <blockquote className="border-l-2 border-black pl-6 mb-8">
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
              <blockquote className="border-l-2 border-black pl-6">
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
          </div>

          {/* Other landlords */}
          <div className="bg-white border-2 border-black p-6 md:p-8 mb-10">
            <h3 className="font-black text-lg md:text-xl mb-3">
              They&apos;re not alone
            </h3>
            <p className="text-base leading-relaxed text-black/70">
              An Investigative Post investigation found{" "}
              <strong>14 locations</strong> across Buffalo and its suburbs
              leased to immigration agencies — generating over{" "}
              <strong>$12 million annually</strong> for landlords including
              Larkin Development Group (Zemsky family), Ellicott Development
              (Paladino family), Boyd Waterson, and Iskalo Development.
            </p>
          </div>

          <p className="text-xs text-black/40 max-w-xl">
            Sources:{" "}
            <SourceLink
              href="https://littlesis.org/news/buffalos-immigrant-detention-profiteers/"
              label="LittleSis"
            />
            ,{" "}
            <SourceLink
              href="https://investigativepost.org/2026/02/20/landlords-earn-millions-from-immigration-leases/"
              label="Investigative Post"
            />
            ,{" "}
            <SourceLink
              href="https://investigativepost.org/2013/11/26/delaware-norths-endless-subsidies/"
              label="Investigative Post (2013)"
            />
          </p>
        </div>
      </section>

      {/* ========== THE LEASE EXPIRES BANNER ========== */}
      <section className="bg-[#1E3A8A] text-white px-6 md:px-10 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <p className="font-black text-lg md:text-2xl leading-tight uppercase tracking-wide">
            The ICE lease at 250 Delaware expires{" "}
            <span className="text-[#FFD600]">March 31, 2027</span>. The decision
            to renew is Uniland&apos;s alone.
          </p>
        </div>
      </section>

      {/* ========== IT'S BEEN DONE BEFORE ========== */}
      <section className="bg-white text-black px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-2xl md:text-4xl leading-tight mb-4">
            It&apos;s been done before
          </h2>
          <p className="text-base md:text-lg text-black/50 mb-10 max-w-2xl">
            In Portland, Oregon, community pressure forced ICE out of a
            privately leased building. Here&apos;s how it happened.
          </p>

          {/* Portland timeline */}
          <div className="max-w-3xl space-y-10 mb-14">
            <div className="border-l-2 border-[#1E3A8A] pl-6">
              <p className="font-black text-sm uppercase tracking-wider text-[#DC2626] mb-2">
                2011
              </p>
              <p className="text-base leading-relaxed text-black/70">
                A private landlord on Portland&apos;s South Waterfront signs a
                long-term lease with the General Services Administration,
                housing ICE and related agencies in the building.
              </p>
            </div>

            <div className="border-l-2 border-[#1E3A8A] pl-6">
              <p className="font-black text-sm uppercase tracking-wider text-[#DC2626] mb-2">
                June 2018
              </p>
              <p className="text-base leading-relaxed text-black/70">
                Following the Trump administration&apos;s &ldquo;zero
                tolerance&rdquo; family separation policy, protesters establish
                an encampment outside the ICE facility. The{" "}
                <strong>Occupy ICE</strong> encampment lasts seven weeks,
                forcing ICE to temporarily shut down operations. The movement
                sparks protests in over 700 U.S. cities.
              </p>
              <p className="text-xs text-black/40 mt-2">
                <SourceLink
                  href="https://en.wikipedia.org/wiki/Occupy_ICE"
                  label="Wikipedia — Occupy ICE"
                />
              </p>
            </div>

            <div className="border-l-2 border-[#1E3A8A] pl-6">
              <p className="font-black text-sm uppercase tracking-wider text-[#DC2626] mb-2">
                2018 — 2025
              </p>
              <p className="text-base leading-relaxed text-black/70">
                Community pressure continues year after year. Advocacy groups,
                residents, and Portland city officials sustain attention on the
                facility. In Philadelphia, similar protests lead the city to end
                its PARS contract with ICE entirely.
              </p>
            </div>

            <div className="border-l-2 border-[#1E3A8A] pl-6">
              <p className="font-black text-sm uppercase tracking-wider text-[#DC2626] mb-2">
                September 2025
              </p>
              <p className="text-base leading-relaxed text-black/70">
                Portland officials issue land use violation notices against the
                building owner, citing{" "}
                <strong>25 violations in 10 months</strong> — including
                detaining people beyond 12 hours and environmental hazards.
              </p>
              <p className="text-xs text-black/40 mt-2">
                <SourceLink
                  href="https://www.courthousenews.com/portland-to-cite-ice-for-keeping-people-detained-past-12-hour-limit/"
                  label="Courthouse News"
                />
              </p>
            </div>

            <div className="border-l-2 border-[#1E3A8A] pl-6">
              <p className="font-black text-sm uppercase tracking-wider text-[#DC2626] mb-2">
                December 2025
              </p>
              <p className="text-base leading-relaxed text-black/70">
                Portland City Council votes <strong>9-2</strong> to pass the{" "}
                <strong>Detention Facility Impact Fee</strong> ordinance,
                targeting any future ICE lease renewal with annual fees. The
                ordinance also creates a new nuisance provision prohibiting
                detention center landlords from allowing chemical agents or
                other environmental hazards from their facilities.
              </p>
              <p className="text-xs text-black/40 mt-2">
                <SourceLink
                  href="https://www.politico.com/news/2025/12/04/a-leased-ice-detention-center-wears-out-its-welcome-in-portland-oregon-00677961"
                  label="Politico"
                />
                {" | "}
                <SourceLink
                  href="https://www.oregonlive.com/politics/2025/12/portland-approves-impact-fee-targeting-ice-detention-center-what-that-means-is-less-clear.html"
                  label="OregonLive"
                />
                {" | "}
                <SourceLink
                  href="https://www.portland.gov/council/documents/ordinance/passed/192127"
                  label="Portland Ordinance 192127"
                />
              </p>
            </div>

            <div className="border-l-2 border-[#DC2626] pl-6 bg-[#DC2626]/5 -ml-[2px] border-l-4 py-4">
              <p className="font-black text-sm uppercase tracking-wider text-[#DC2626] mb-2">
                2033
              </p>
              <p className="text-base leading-relaxed text-black/70">
                The ICE lease in Portland expires. The community is ready.
              </p>
            </div>
          </div>

          {/* Public opinion + takeaway */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-[#1E3A8A] text-white p-6 md:p-8">
              <p className="font-black text-3xl md:text-5xl leading-none mb-3">
                20% <span className="text-[#FFD600]">&rarr;</span> 46%
              </p>
              <p className="text-sm md:text-base text-white/70 uppercase tracking-wide font-bold">
                Growth in public support for Abolish ICE (Aug 2024 — Jan 2026,{" "}
                <SourceLink
                  href="https://en.wikipedia.org/wiki/Abolish_ICE"
                  label="Civiqs"
                />
                )
              </p>
            </div>
            <div className="bg-[#FFD600] text-black p-6 md:p-8">
              <p className="font-black text-lg md:text-xl leading-snug mb-2">
                Our lease expires sooner.
              </p>
              <p className="text-base text-black/70">
                Portland&apos;s ICE lease runs until 2033. Ours expires{" "}
                <strong>March 31, 2027</strong>. We don&apos;t have to wait
                eight more years. The window is now.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SOURCES ========== */}
      <section className="bg-black text-white px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-xl md:text-2xl uppercase tracking-wide mb-8">
            Sources
          </h2>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-4 text-sm text-white/60">
            <div className="space-y-3">
              <p>
                <SourceLink
                  href="https://investigativepost.org/2026/02/20/landlords-earn-millions-from-immigration-leases/"
                  label="&ldquo;Landlords profiting from Trump&rsquo;s immigration crackdown&rdquo;"
                />{" "}
                — Investigative Post, Feb 2026
              </p>
              <p>
                <SourceLink
                  href="https://investigativepost.org/2026/01/29/ice-now-targeting-afghans-rule-followers/"
                  label="&ldquo;ICE now targeting Afghans, rule followers&rdquo;"
                />{" "}
                — Investigative Post, Jan 2026
              </p>
              <p>
                <SourceLink
                  href="https://investigativepost.org/2013/11/26/delaware-norths-endless-subsidies/"
                  label="&ldquo;Delaware North&rsquo;s endless subsidies&rdquo;"
                />{" "}
                — Investigative Post, Nov 2013
              </p>
              <p>
                <SourceLink
                  href="https://littlesis.org/news/buffalos-immigrant-detention-profiteers/"
                  label="&ldquo;Buffalo&rsquo;s immigrant detention profiteers&rdquo;"
                />{" "}
                — LittleSis
              </p>
            </div>
            <div className="space-y-3">
              <p>
                <SourceLink
                  href="https://spectrumlocalnews.com/nys/central-ny/news/2025/12/12/a-county-by-county-look-at-ice-arrests-in-new-york-"
                  label="&ldquo;A county-by-county look at ICE arrests in New York&rdquo;"
                />{" "}
                — Spectrum News, Dec 2025
              </p>
              <p>
                <SourceLink
                  href="https://www.politico.com/news/2025/12/04/a-leased-ice-detention-center-wears-out-its-welcome-in-portland-oregon-00677961"
                  label="&ldquo;A leased ICE detention center wears out its welcome in Portland&rdquo;"
                />{" "}
                — Politico, Dec 2025
              </p>
              <p>
                <SourceLink
                  href="https://www.oregonlive.com/politics/2025/12/portland-approves-impact-fee-targeting-ice-detention-center-what-that-means-is-less-clear.html"
                  label="&ldquo;Portland approves impact fee targeting ICE detention center&rdquo;"
                />{" "}
                — OregonLive, Dec 2025
              </p>
              <p>
                <SourceLink
                  href="https://en.wikipedia.org/wiki/250_Delaware_Avenue"
                  label="250 Delaware Avenue"
                />{" "}
                — Wikipedia
              </p>
              <p>
                <SourceLink
                  href="https://www.usaspending.gov/search"
                  label="Federal contract awards for 250 Delaware Ave, Buffalo, NY"
                />{" "}
                — USASpending.gov (search &ldquo;Uniland Partnership of
                Delaware&rdquo;)
              </p>
              <p>
                <SourceLink
                  href="https://iolp.gsa.gov/"
                  label="GSA lease and property data (Lease #LNY24174)"
                />{" "}
                — GSA Inventory of Owned &amp; Leased Properties
              </p>
              <p>
                <SourceLink
                  href="https://www.fpds.gov/"
                  label="Federal procurement records (PIIDs GS02B23305, GS02B23427, GS02B23566)"
                />{" "}
                — Federal Procurement Data System
              </p>
              <p>
                <SourceLink
                  href="https://en.wikipedia.org/wiki/Abolish_ICE"
                  label="Abolish ICE (public opinion data)"
                />{" "}
                — Wikipedia
              </p>
              <p>
                <SourceLink
                  href="https://theintercept.com/2025/08/19/ice-courthouse-arrests-immigrants-lawsuit-nyclu/"
                  label="&ldquo;Teen immigrant&rsquo;s release propels lawsuit to end ICE&rsquo;s courthouse arrests&rdquo;"
                />{" "}
                — The Intercept, Aug 2025
              </p>
              <p>
                <SourceLink
                  href="https://theintercept.com/2025/11/06/batavia-ice-medical-care-buffalo/"
                  label="&ldquo;Batavia ICE prison dogged by allegations of shoddy medical care&rdquo;"
                />{" "}
                — The Intercept, Nov 2025
              </p>
              <p>
                <SourceLink
                  href="https://investigativepost.org/2025/07/01/ice-targets-iranian-family-in-buffalo-here-legally/"
                  label="&ldquo;ICE targets Iranian family in Buffalo here legally&rdquo;"
                />{" "}
                — Investigative Post, Jul 2025
              </p>
              <p>
                <SourceLink
                  href="https://investigativepost.org/2025/10/03/ice-facility-batavia-overcrowded-2025/"
                  label="&ldquo;ICE facility in Batavia has been overcrowded for months&rdquo;"
                />{" "}
                — Investigative Post, Oct 2025
              </p>
              <p>
                <SourceLink
                  href="https://www.wkbw.com/news/local-news/buffalo/buffalo-neighbors-band-together-to-protect-asylum-seeking-family-from-ice-surveillance"
                  label="&ldquo;Neighbors band together to protect asylum-seeking family&rdquo;"
                />{" "}
                — WKBW, Jul 2025
              </p>
              <p>
                <SourceLink
                  href="https://en.wikipedia.org/wiki/Occupy_ICE"
                  label="Occupy ICE"
                />{" "}
                — Wikipedia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="bg-[#DC2626] text-white px-6 md:px-10 py-14 md:py-20 border-t-2 border-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-black text-3xl md:text-4xl leading-[0.95] mb-4">
            Now you know the facts.
          </h2>
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-lg mx-auto">
            The lease expires March 31, 2027. The decision is Uniland&apos;s.
            But the pressure is ours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/show-up"
              className="bg-black text-white font-black text-sm uppercase tracking-wider px-8 py-4 border-2 border-black hover:bg-white hover:text-black transition-colors cursor-pointer text-center"
            >
              Show up
            </Link>
            <Link
              href="/#join"
              className="bg-white text-black font-black text-sm uppercase tracking-wider px-8 py-4 border-2 border-black hover:bg-black hover:text-white transition-colors cursor-pointer text-center"
            >
              Join the coalition
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
