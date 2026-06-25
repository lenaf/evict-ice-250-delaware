"use client";

import React from "react";
import Link from "next/link";
import { SourceLink } from "../SourceLink";
import { MoneyTree } from "@/components/MoneyTree";
import { WealthHero } from "@/components/WealthHero";
import { PowerMap, type AreaInfo } from "@/components/PowerMap";
import { GivingTimeline } from "@/components/GivingTimeline";
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
    blurb: "Federal elections & the parks",
    stat: "$1.75M+ to politicians",
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
    blurb: "Sports, banking & gaming",
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
    blurb: "University at Buffalo",
    stat: "$30M founding gift",
    summary: (
      <>
        A $30 million gift named UB&apos;s medical school, and the family has
        chaired the University at Buffalo Council for years — Jerry Jr. was
        appointed chair by Gov. Hochul in 2025.
      </>
    ),
  },
  civic: {
    blurb: "Philanthropy & civic boards",
    stat: "$10.3M family foundation",
    summary: (
      <>
        The Jacobs Family Foundation, the Corps Network, United Way and the
        Partnership for New York City — tax-advantaged giving that buys standing
        across civic and political life.
      </>
    ),
  },
  arts: {
    blurb: "Boston institutions",
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
        <div className="mb-10">
          <GivingTimeline
            caption="250 Delaware — net property-tax break by year"
            bars={[
              { cycle: "2017", amount: 636836 },
              { cycle: "2018", amount: 841428 },
              { cycle: "2019", amount: 838234 },
              { cycle: "2020", amount: 240431 },
              { cycle: "2021", amount: 232868 },
              { cycle: "2022", amount: 514988 },
              { cycle: "2023", amount: 535517 },
              { cycle: "2024", amount: 327420 },
            ]}
            note="Net tax exemption (total exemptions minus PILOT actually paid), per year, for the project filed as DNC 250, Inc. under the Erie County IDA."
            source={{
              href: "https://data.ny.gov/Transparency/Industrial-Development-Agencies-Project-Data/9rtk-3fkw",
              label: "NY State IDA project data",
            }}
          />
        </div>
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
        <SectionHeading>The Web of Power</SectionHeading>
        <p className="text-base md:text-lg leading-relaxed text-white/70 mb-8">
          And with the public subsidies and a billion-dollar fortune behind
          them, the Jacobses feed money back into the politicians and
          institutions that protect their interests — from federal elections to
          the Governor&apos;s office. Yellow lines are political donations; the
          bigger the node, the more seats it holds.
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

      {/* ========== LETTER CTA ========== */}
      <Section variant="red">
        <div className="text-center">
          <h2 className="font-black text-3xl md:text-4xl leading-[0.95] mb-4">
            Tell Delaware North to take a stand.
          </h2>
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-lg mx-auto">
            They sit directly above the ICE offices. They have the power to
            demand change. Make them hear you.
          </p>
          <Link
            href="/events"
            className="bg-white text-black font-black text-base uppercase tracking-wider px-10 py-5 border-2 border-white hover:opacity-80 hover:border-black transition cursor-pointer inline-block"
          >
            Show up &rarr;
          </Link>
        </div>
      </Section>

      <FactsReadNext
        title="Take Action"
        description="The lease expires March 31, 2027. The pressure is ours to apply."
        href="/events"
      />
    </main>
  );
};
