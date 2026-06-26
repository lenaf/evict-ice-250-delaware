"use client";

import React from "react";
import { SourceLink } from "../SourceLink";
import { MoneyTree } from "@/components/MoneyTree";
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
      Delaware North does a significant amount of business with the federal government, operating hospitality concessions at many national parks and stadiums — making them reliant on government contracts and regulation.
        Eleven Jacobs family members donated the maximum allowable to Trump including Jeremy Jacobs Sr. and many of his children and their spouses.
Maximum donations also came from the family&apos;s business enterprises including Patina Restaurant Group and Delaware North Companies.

      </>
    ),
  },
  business: {
    summary: (
      <>
        Delaware North&apos;s global hospitality and gaming empire, a seat on
        M&amp;T Bank&apos;s board, and the chair of the American Gaming
        Association&apos;s CEO roundtable — the family&apos;s reach spans the
        industries that live on government contracts and regulation.
      </>
    ),
  },
  education: {
    summary: (
      <>
        A $30 million gift named UB&apos;s medical school, and the family has
        chaired the University at Buffalo Council for years — Jerry Jr. was
        appointed chair by Gov. Hochul in 2025.
      </>
    ),
  },
  civic: {
    summary: (
      <>
        The Jacobs Family Foundation, the Corps Network, United Way and the
        Partnership for New York City — tax-advantaged giving that buys standing
        across civic and political life.
      </>
    ),
  },
  sports: {
    summary: (
      <>
        The family owns the Boston Bruins and chairs the NHL&apos;s Board of
        Governors, sits on the board of regional sports network NESN, and backs
        the Bruins Foundation and Boston&apos;s Sports Museum — a sports and
        entertainment empire built on the same hospitality business.
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
             Directly above the ICE offices sit the global headquarters of Delaware North — a $3 billion hospitality company owned by the Jacobs family.
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
            The 250 Delaware project was awarded{" "}
            <strong className="text-[#FFD600]">
              more than $10.8 million in public subsidies
            </strong>{" "}
            — $807,000 in sales-tax savings for Delaware North and roughly $10
            million in real-estate-tax abatements, sales-tax and mortgage-tax
            savings for Uniland.{" "}
            <SourceLink
              href="https://littlesis.org/reports/selling-out-new-yorks-immigrants/"
              label="LittleSis"
            />
          </p>
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
            job-creation tax credits on the 65 jobs it pledged — credits a source
            estimated could be worth up to{" "}
            <strong className="text-[#FFD600]">$4 million</strong> over ten years,
            or roughly{" "}
            <strong className="text-white">$61,500 per promised job</strong>.
          </p>
        </div>

        <div className="mt-12">
        <MoneyTree
          sources={[
            {
              amount: "$807K",
              label: "ECIDA sales tax waiver",
              payer: "Erie County taxpayers · approved Nov 2013, a month before groundbreaking",
              bags: 8,
              source: {
                href: "https://investigativepost.org/2013/11/26/delaware-norths-endless-subsidies/",
                label: "Investigative Post",
              },
            },
          ]}
        />
        </div>

        <h3 className="font-black text-xl md:text-2xl leading-tight text-white mt-16 mb-3">
          Excused from millions
        </h3>
        <p className="text-base md:text-lg leading-relaxed text-white/70 mb-8">
          Do they pay taxes on 250 Delaware? Some — a reduced{" "}
          <span className="text-white">&ldquo;payment in lieu of taxes.&rdquo;</span>{" "}
          But New York State&apos;s own records show how much they were{" "}
          <span className="text-[#FFD600]">excused</span> from paying. From 2017
          to 2024, the building drew{" "}
          <strong className="text-[#FFD600]">$5.84 million</strong> in tax
          exemptions; the owners paid{" "}
          <strong className="text-white">$1.68 million</strong> in PILOTs — a net
          tax break of{" "}
          <strong className="text-[#FFD600]">$4.17 million</strong> on a single
          building.
        </p>
        <p className="text-sm md:text-base leading-relaxed text-white/50">
          The family also runs a private foundation — the Margaret D. &amp;
          Jeremy M. Jacobs Family Foundation — with{" "}
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
          Jeremy Jacobs Sr. is{" "}
          <strong className="text-[#FFD600]">
            Buffalo&apos;s only billionaire
          </strong>
          , worth about <strong className="text-[#FFD600]">$4.6 billion</strong>.
          That fortune buys reach: they fund{" "}
          <strong className="text-white">politicians</strong> from{" "}
          <strong className="text-white">federal elections</strong> to the{" "}
          <strong className="text-white">Governor&apos;s office</strong>, sit on
          the <strong className="text-white">business</strong> boards that win
          government contracts, and earn{" "}
          <strong className="text-white">tax breaks</strong> through
          philanthropy. Map their network of deals, donations, and favors, and we
          can start to hold them accountable. Click a sphere to dig in.
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
