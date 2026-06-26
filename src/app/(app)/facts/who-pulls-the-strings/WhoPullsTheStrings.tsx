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
        Delaware North runs hospitality concessions in national parks and
        stadiums nationwide, so the family&apos;s political money flows federal:
        $65,000 to Trump&apos;s 2016 transition, $100,000 to Trump Victory, and
        $401,854 to Gov. Hochul — whose husband Delaware North employed as
        general counsel.
      </>
    ),
  },
  business: {
    summary: (
      <>
        Delaware North, the Boston Bruins and the NHL, a seat on M&amp;T
        Bank&apos;s board, the American Gaming Association — the family&apos;s
        reach spans the industries that live on government contracts and
        regulation.
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
  arts: {
    summary: (
      <>
        Through the Bruins, NESN and the Sports Museum, the family&apos;s
        influence reaches into Boston&apos;s sports and cultural institutions.
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
              The Jacobs family owns Delaware North outright, and Jeremy Jacobs
              Sr. is{" "}
              <SourceLink
                href="https://buffalonews.com/news/local/business/jeremy-jacobs-sr-is-buffalo-niagaras-only-billionaire-forbes-says/article_26f0bac8-0aa3-5cc9-bee5-f398a84c3766.html"
                label="Buffalo's only Forbes billionaire"
              />
              , worth about{" "}
              <strong className="text-[#FFD600]">$4.6 billion</strong>. Their
              global headquarters sits{" "}
              <strong className="text-[#FFD600]">
                directly above the ICE field office
              </strong>{" "}
              at 250 Delaware. They gave{" "}
              <strong className="text-[#FFD600]">$65,000</strong> to
              Trump&apos;s transition,{" "}
              <SourceLink
                href="https://data.ny.gov/d/4j2b-6a2j"
                label="$401,854 to Gov. Hochul's campaigns"
              />
              , and paid the governor&apos;s husband{" "}
              <strong className="text-[#FFD600]">
                hundreds of thousands a year
              </strong>{" "}
              — while the building they anchor collects a{" "}
              <strong className="text-[#FFD600]">$4.17 million</strong> tax
              break. They have said nothing about what happens in the building
              that bears their name.
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
            Simultaneously, Delaware North applied for up to{" "}
            <strong className="text-[#FFD600]">$4 million</strong> in state
            job-creation tax credits — roughly{" "}
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
            {
              amount: "$4M",
              label: "State job-creation credits",
              payer: "New York State taxpayers · ~$61,500 per promised job",
              bags: 40,
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
          philanthropy. They take money from taxpayers — and get called{" "}
          <strong className="text-[#FFD600]">philanthropists</strong> for it. Map
          their network of deals, donations, and favors, and we can start to hold
          them accountable. Click a sphere to dig in.
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
