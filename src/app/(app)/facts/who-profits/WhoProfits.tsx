"use client";

import React from "react";
import { SourceLink } from "../SourceLink";
import { MoneyTree } from "@/components/MoneyTree";
import { WealthHero } from "@/components/WealthHero";
import { PoliticalDonations } from "@/components/PoliticalDonations";
import { StackedBars } from "@/components/StackedBars";
import { MONTANTE_GIVING_SERIES, MONTANTE_GIVING_DATA } from "./montanteGiving";
import { PowerMap } from "@/components/PowerMap";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { FactsReadNext } from "@/components/FactsReadNext";
import Link from "next/link";

import { MONTANTE_PEOPLE, MONTANTE_SHORT_NAMES, MONTANTE_WEALTH, MONTANTE_DONATIONS, MONTANTE_AFFILIATIONS } from "./montanteData";
export const WhoProfits: React.FC = () => {
  return (
    <main className="min-h-screen">
      {/* ========== WEALTH / FAMILY INTRO ========== */}
      <Section variant="black" hero>
        <WealthHero
          title="The Montante Family"
          watermark="/illustrations/ice-badge.svg"
          bigStat={{
            amount: "$2.5M / year",
            label: (
              <>
                to Uniland from ICE &amp; CBP rent at 250 Delaware — more than
                $11 million since 2002
              </>
            ),
          }}
          lede={
            <>
              Through Uniland Development —{" "}
              <strong className="text-[#FFD600]">
                Western New York&apos;s largest commercial developer
              </strong>{" "}
              — the Montantes are among{" "}
              <SourceLink
                href="https://littlesis.org/news/buffalos-immigrant-detention-profiteers/"
                label="Buffalo's biggest immigrant-detention profiteers"
              />
              . They collect{" "}
              <strong className="text-[#FFD600]">$2.5 million a year</strong>{" "}
              from ICE and CBP to house their operations at 250 Delaware and 300
              Airborne Parkway, and have taken in{" "}
              <strong className="text-[#FFD600]">more than $11 million</strong>{" "}
              since 2002 — in a building handed{" "}
              <SourceLink
                href="https://news.wbfo.org/post/uniland-receives-tax-breaks-delawarechippewa-project"
                label="$9.6 million in public tax breaks"
              />
              . The lease is theirs to renew.
            </>
          }
          people={MONTANTE_PEOPLE.map((p, i) => ({
            name: p.name,
            title: p.title,
            photo: p.photo,
            wealth: MONTANTE_WEALTH[MONTANTE_SHORT_NAMES[i]],
          }))}
        />
      </Section>

      {/* ========== TAX BREAKS ========== */}
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
        <p className="text-base md:text-lg leading-relaxed text-white/70 mb-10">
          250 Delaware was built with{" "}
          <strong className="text-[#FFD600]">$9.6 million in public tax breaks</strong>{" "}
          the Erie County Industrial Development Agency approved in 2013 — over
          public opposition — to &ldquo;benefit the community.&rdquo; The
          building still collects a property-tax abatement on top.
        </p>
        <MoneyTree
          sources={[
            {
              amount: "$9.6M",
              label: "ECIDA tax breaks",
              payer: "Handed over by Erie County taxpayers, who were told the subsidy would build the community up.",
              bags: 19,
              source: {
                href: "https://news.wbfo.org/post/uniland-receives-tax-breaks-delawarechippewa-project",
                label: "WBFO",
              },
            },
            {
              amount: "$791K",
              label: "Property tax abatement",
              payer: "Erie County taxpayers — forgone public revenue, ongoing",
              bags: 2,
              recurring: true,
            },
          ]}
        />
        <p className="mt-12 text-sm md:text-base leading-relaxed text-white/50">
          And the breaks rarely stop there. Through IDA{" "}
          <SourceLink
            href="https://www.osc.ny.gov/files/local-government/publications/pdf/idabackground.pdf"
            label="PILOT deals"
          />
          , developers pay a fraction of normal property tax — payments that
          often start at just 10–20% of the real bill. Commercial real-estate
          owners are also documented using depreciation write-offs to owe{" "}
          <SourceLink
            href="https://www.propublica.org/article/these-real-estate-and-oil-tycoons-used-paper-losses-to-avoid-paying-taxes-for-years"
            label="little or no federal income tax"
          />{" "}
          for years. Personal returns aren&apos;t public — but the public
          subsidies are a matter of record.
        </p>
      </Section>

      {/* ========== POLITICAL DONATIONS ========== */}
      <Section variant="black" className="border-t border-white/10">
        <SectionHeading>
          Where the Money Goes
        </SectionHeading>
        <PoliticalDonations
          total="$415,000+"
          timeframe="Family + Uniland, per LittleSis (2018) · $296,000 verified from family filings"
          totalCaption={
            <>
              The Montantes don&apos;t just profit from immigration enforcement
              — they fund the political infrastructure that enables it.
              LittleSis put the family-and-Uniland total at more than $415,000;
              the family members&apos; own federal and state filings, charted
              below, independently verify about $296,000 through 2026. The
              giving leans Democratic but crosses party lines — they buy access
              on every side.
            </>
          }
          intro={
            <>
              The same family that cashes ICE rent checks funds politicians at
              every level of government — Republicans and Democrats alike. The
              largest dollars flow to the state and local offices that control
              Uniland&apos;s development approvals and lease business. Every
              figure below is fact-checkable: state and local totals come from{" "}
              <SourceLink
                href="https://data.ny.gov/d/4j2b-6a2j"
                label="NY State Board of Elections filings"
              />
              ; federal gifts from{" "}
              <SourceLink
                href="https://www.fec.gov/data/receipts/individual-contributions/?contributor_name=montante"
                label="FEC records"
              />
              .
            </>
          }
        />
        <div className="mt-10">
          <StackedBars
            series={MONTANTE_GIVING_SERIES}
            data={MONTANTE_GIVING_DATA}
            caption="Money to politicians, grouped by 4-year period"
            note="Family members' individual federal (FEC) and New York State (NYSBOE) contributions since 2004, grouped into 4-year periods and colored by the recipient's party. Tap or hover any period to see the federal/state split and top recipients. Major recipients are party-coded; smaller PAC and local gifts are bucketed as 'Other.'"
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
          Four people. Dozens of institutions. The bigger the node, the more
          seats it holds in Buffalo&apos;s civic, religious, and business life.
          Yellow lines are political donations — the dollars that follow the
          relationships. Filter by type or jurisdiction, and tap any node to see
          who sits where.
        </p>
        <PowerMap
          people={MONTANTE_PEOPLE.map((p, i) => ({
            id: p.id,
            name: p.name,
            shortName: MONTANTE_SHORT_NAMES[i],
            title: p.title,
            photo: p.photo,
            bioParas: p.bioParas,
          }))}
          affiliations={MONTANTE_AFFILIATIONS}
          donations={MONTANTE_DONATIONS}
        />
      </Section>

      {/* ========== LETTER CTA ========== */}
      <Section variant="red">
        <div className="text-center">
          <h2 className="font-black text-3xl md:text-4xl leading-[0.95] mb-4">
            Tell the Montante family to end the lease.
          </h2>
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-lg mx-auto">
            The ICE lease at 250 Delaware expires March 31, 2027. The decision
            to renew is Uniland&apos;s alone.
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
        title="Who Pulls the Strings"
        description="The Jacobs family donated $65,000 to Trump's transition, paid Governor Hochul's husband hundreds of thousands of dollars a year, and have said nothing about what happens in the building that bears their name."
        href="/facts/who-pulls-the-strings"
      />
    </main>
  );
};
