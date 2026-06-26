"use client";

import React from "react";
import { SourceLink } from "../SourceLink";
import { WealthHero } from "@/components/WealthHero";
import { PowerMap, type AreaInfo } from "@/components/PowerMap";
import type { FilterType } from "@/types/affiliation";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { FactsReadNext } from "@/components/FactsReadNext";

import { toPowerMapPeople, toHeroPeople } from "../peopleMappers";
import {
  JACOBS_PEOPLE,
  JACOBS_SHORT_NAMES,
  JACOBS_DONATIONS,
  JACOBS_AFFILIATIONS,
} from "./jacobsData";
// Editorial copy for each area of power (draft — refine from the source doc).
const JACOBS_AREAS: Partial<Record<FilterType, AreaInfo>> = {
  politician: {
    summary: (
      <>
      Delaware North does a significant amount of business with the federal government, operating hospitality concessions at many national parks and stadiums, which makes them reliant on government contracts and regulation.
        Eleven Jacobs family members donated the maximum allowable to Trump including Jeremy Jacobs Sr. and many of his children and their spouses.
Maximum donations also came from the family&apos;s business enterprises including Patina Restaurant Group and Delaware North Companies.

      </>
    ),
  },
  business: {
    summary: (
      <>
        The Jacobs fortune rests on Delaware North, a global hospitality and
        gaming company built on government concessions and contracts. From
        there the family&apos;s influence extends into the institutions that
        regulate them: Jerry Jr. joined the board of M&amp;T Bank, Buffalo&apos;s
        largest bank, in 2025, and Lou chairs the CEO roundtable of the American
        Gaming Association, the casino industry&apos;s main lobbying arm.
      </>
    ),
  },
  education: {
    summary: (
      <>
        A $30 million gift put the family&apos;s name on the University at
        Buffalo&apos;s medical school, and the Jacobses have run the UB Council
        for years. Jeremy Sr. chaired it for over a decade; in 2025 Gov. Hochul
        appointed his son Jerry Jr. to the same seat, the same governor whose
        husband Delaware North paid as general counsel.
      </>
    ),
  },
  civic: {
    summary: (
      <>
        The family&apos;s philanthropy doubles as standing. The Jacobs Family
        Foundation gives away hundreds of thousands a year, and family members
        sit at the head of civic institutions from United Way of Buffalo to the
        Partnership for New York City and the federal Corps Network. It is visible
        generosity that also buys access.
      </>
    ),
  },
  sports: {
    summary: (
      <>
        The Jacobses own the Boston Bruins, and Jeremy Sr. chairs the NHL&apos;s
        Board of Governors, which makes him one of the most powerful figures in
        professional hockey. The family also sits on the board of the regional
        sports network NESN and backs the Bruins Foundation and Boston&apos;s
        Sports Museum.
      </>
    ),
  },
};

export const WhoPullsTheStrings: React.FC = () => {
  return (
    <main className="min-h-screen">
      {/* ========== WEALTH / FAMILY INTRO ========== */}
      <Section variant="black" hero>
        <WealthHero
          question="Who Pulls the Strings?"
          family="The Jacobs Family"
          lede={
            <>
             Directly above the ICE offices sit the global headquarters of Delaware North, a $3 billion hospitality company owned by the Jacobs family.
             Jeremy Jacobs Sr. is <strong className="text-[#FFD600]">Buffalo&apos;s only Forbes billionaire</strong>, worth about <strong className="text-[#FFD600]">$4.6 billion</strong>.
            </>

            }
          people={toHeroPeople(JACOBS_PEOPLE)}
        />
      </Section>

      {/* ========== SUBSIDIES ========== */}
      <Section variant="black" className="border-t border-white/10">
        <SectionHeading>
          Despite the wealth, they still take the handouts.
        </SectionHeading>
        <div className="space-y-4 text-base md:text-lg leading-relaxed text-white/80">
          <p>
            One month before ECIDA approved $9.6 million in tax breaks for
            Uniland to build 250 Delaware, the same agency quietly approved a
            separate{" "}
            <strong className="text-[#FFD600]">$807,000 sales tax waiver</strong>{" "}
            for Delaware North to outfit the new offices.{" "}
            <SourceLink
              href="https://investigativepost.org/2013/11/26/delaware-norths-endless-subsidies/"
              label="Investigative Post"
            />
          </p>
          <p>
            Simultaneously, Delaware North applied to New York State for
            job-creation tax credits on the 65 jobs it pledged. A source
            estimated the credits could be worth up to{" "}
            <strong className="text-[#FFD600]">$4 million</strong> over ten years,
            or roughly{" "}
            <strong className="text-white">$61,500 per promised job</strong>.
          </p>
        </div>

        <p className="mt-12 text-sm md:text-base leading-relaxed text-white/50">
          The family also runs a private foundation, the Margaret D. &amp;
          Jeremy M. Jacobs Family Foundation, with{" "}
          <span className="text-white/70">$10.3 million in assets</span> and{" "}
          <span className="text-white/70">$883,000 granted in 2024</span>.
          Tax-exempt charity that doubles as a tax deduction.{" "}
          <SourceLink
            href="https://projects.propublica.org/nonprofits/organizations/933116080"
            label="ProPublica / IRS 990"
          />
        </p>
      </Section>

      {/* ========== WEB OF POWER ========== */}
      <Section variant="black" className="border-t border-white/10">
        <SectionHeading>Network of Influence</SectionHeading>
        <p className="text-base md:text-lg leading-relaxed text-white/70 mb-8">
          Jeremy Jacobs Sr. is Buffalo&apos;s only billionaire, worth about $4.6
          billion. That fortune buys reach: they fund politicians from federal
          elections to the Governor&apos;s office, sit on the business boards
          that win government contracts, and earn tax breaks through
          philanthropy. Map their network of deals, donations, and favors, and we
          can start to hold them accountable.
        </p>
        <PowerMap
          people={toPowerMapPeople(JACOBS_PEOPLE, JACOBS_SHORT_NAMES)}
          affiliations={JACOBS_AFFILIATIONS.filter(
            (a) => a.org !== "Delaware North"
          )}
          donations={JACOBS_DONATIONS}
          areas={JACOBS_AREAS}
        />
      </Section>

      <FactsReadNext
        title="Take Action"
        description="The lease expires March 31, 2027. The pressure is ours to apply."
        href="/events"
      />
    </main>
  );
};
