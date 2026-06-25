"use client";

import React from "react";
import Link from "next/link";
import { SourceLink } from "../SourceLink";
import { MoneyTree } from "@/components/MoneyTree";
import { WealthHero } from "@/components/WealthHero";
import { PowerMap } from "@/components/PowerMap";
import { PoliticalDonations } from "@/components/PoliticalDonations";
import { GivingTimeline } from "@/components/GivingTimeline";
import { StackedBars } from "@/components/StackedBars";
import { JACOBS_GIVING_SERIES, JACOBS_GIVING_DATA } from "./jacobsGiving";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { FactsReadNext } from "@/components/FactsReadNext";

import { toPowerMapPeople, toWealthPeople } from "../peopleMappers";
import {
  JACOBS_PEOPLE,
  JACOBS_SHORT_NAMES,
  JACOBS_WEALTH,
  JACOBS_DONATIONS,
  JACOBS_AFFILIATIONS,
} from "./jacobsData";
export const WhoPullsTheStrings: React.FC = () => {
  return (
    <main className="min-h-screen">
      {/* ========== WEALTH / FAMILY INTRO ========== */}
      <Section variant="black" hero>
        <WealthHero
          title="The Jacobs Family"
          bigStat={{
            amount: "$4.6B",
            label: (
              <>
                Jeremy Jacobs Sr.&apos;s fortune (Forbes, 2025) — and the
                family&apos;s global HQ sits directly above the ICE field office
                at 250 Delaware
              </>
            ),
          }}
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
          people={toWealthPeople(JACOBS_PEOPLE, JACOBS_SHORT_NAMES, JACOBS_WEALTH)}
        />
      </Section>

      {/* ========== SUBSIDIES ========== */}
      <Section variant="black" className="border-t border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/handout.svg"
          alt=""
          aria-hidden="true"
          className="w-28 md:w-36 mb-5 opacity-70 invert"
        />
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
              bags: 1,
              source: {
                href: "https://investigativepost.org/2013/11/26/delaware-norths-endless-subsidies/",
                label: "Investigative Post",
              },
            },
            {
              amount: "$4M",
              label: "State job-creation credits",
              payer: "New York State taxpayers · ~$61,500 per promised job",
              bags: 4,
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

      {/* ========== POLITICAL DONATIONS ========== */}
      <Section variant="black" className="border-t border-white/10">
        <SectionHeading>
          Where the Money Goes
        </SectionHeading>
        <div className="mb-12">
          <GivingTimeline
            caption="Delaware North Company PAC — receipts by election cycle"
            bars={[
              { cycle: "2012", amount: 65000 },
              { cycle: "2014", amount: 254933 },
              { cycle: "2016", amount: 225398 },
              { cycle: "2018", amount: 211500 },
              { cycle: "2020", amount: 70481 },
              { cycle: "2022", amount: 47900 },
              { cycle: "2024", amount: 262414 },
              { cycle: "2026", amount: 156653 },
            ]}
            note="Federal PAC receipts only; family members' individual giving and New York State contributions are counted separately below. 2026 cycle still in progress."
            source={{
              href: "https://www.fec.gov/data/committee/C00532887/",
              label: "FEC committee C00532887",
            }}
          />
        </div>
        <PoliticalDonations
          total="$1.15M+"
          timeframe="Individual federal giving · 2008–2026"
          average="≈ $64,000 / year"
          totalCaption={
            <>
              Since 2008, family members listing Delaware North as their
              employer have given more than $1.15 million in individual federal
              contributions (chart above) — and that is before the Delaware
              North PAC&apos;s own giving and the family&apos;s New York State
              donations. The PAC has steered roughly $380,000 to candidates and
              parties; the family has given Gov. Hochul more than $400,000 over
              her career — $104,000 in 2025 alone — and steered some $167,000
              around Donald Trump&apos;s 2016 run. The
              giving crosses party lines — it tracks wherever federal park and
              concession contracts and New York State decisions sit.
            </>
          }
          intro={
            <>
              The Jacobs family&apos;s most concrete tie to Albany isn&apos;t a
              donation at all: Delaware North employed Gov. Hochul&apos;s
              husband, Bill Hochul, as general counsel from 2016 to 2023,
              paying him{" "}
              <SourceLink
                href="https://littlesis.org/news/who-is-bankrolling-new-yorks-gubernatorial-candidates/"
                label="roughly $450,000–$650,000 a year"
              />{" "}
              (about $585,000 in 2017) — making the family a major source of
              the Hochuls&apos; household income. On top of that, the donations
              below buy access on every side. Federal gifts are searchable in{" "}
              <SourceLink
                href="https://www.fec.gov/data/receipts/?contributor_name=Jacobs&contributor_employer=Delaware+North"
                label="FEC records"
              />
              ; the PAC&apos;s giving is detailed by{" "}
              <SourceLink
                href="https://www.investigativepost.org/2026/02/18/trumps-national-parks-nominee-has-major-conflict-of-interest/"
                label="Investigative Post"
              />
              .
            </>
          }
        />
        <div className="mt-10">
          <StackedBars
            series={JACOBS_GIVING_SERIES}
            data={JACOBS_GIVING_DATA}
            caption="Money to politicians, grouped by 4-year period"
            note="Family members' individual federal (FEC) and New York State (NYSBOE) contributions since 2004, grouped into 4-year periods and colored by the recipient's party — separate from the Delaware North PAC above. Tap or hover any period for the federal/state split and top recipients. Major recipients are party-coded; smaller PAC and local gifts are bucketed as 'Other.'"
            source={{
              href: "https://data.ny.gov/d/4j2b-6a2j",
              label: "NYSBOE + FEC",
            }}
          />
        </div>
      </Section>

      {/* ========== POWER MAP ========== */}
      <Section variant="black" className="border-t border-white/10">
        <SectionHeading>
          The Web of Power
        </SectionHeading>
        <p className="text-base md:text-lg leading-relaxed text-white/70 mb-8">
          Four men. The University at Buffalo, the NHL, Buffalo&apos;s biggest
          bank, the Governor&apos;s office, and the building that houses ICE.
          The bigger the node, the more seats it holds in Buffalo and Boston&apos;s
          civic and business life. Yellow lines are political donations — the
          dollars that follow the relationships. Filter by type or jurisdiction,
          and tap any node to see who sits where.
        </p>
        <PowerMap
          people={toPowerMapPeople(JACOBS_PEOPLE, JACOBS_SHORT_NAMES)}
          affiliations={JACOBS_AFFILIATIONS.filter(
            (a) => a.org !== "Delaware North"
          )}
          donations={JACOBS_DONATIONS}
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
