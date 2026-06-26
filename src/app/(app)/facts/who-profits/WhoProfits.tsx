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
  MONTANTE_PEOPLE,
  MONTANTE_SHORT_NAMES,
  MONTANTE_DONATIONS,
  MONTANTE_AFFILIATIONS,
} from "./montanteData";

// Editorial copy for each area of power (draft — refine from the source doc).
const MONTANTE_AREAS: Partial<Record<FilterType, AreaInfo>> = {
  civic: {
    summary: (
      <>
        Carl Montante Sr. sat on the Diocese of Buffalo&apos;s Bishop&apos;s
        Council of the Laity for 25+ years, chaired the diocese&apos;s Catholic
        Health System, and was given the Bishop&apos;s Medal in 2009 — even as
        Pope Leo XIV condemned the immigration crackdown the family profits from
        as &ldquo;inhuman.&rdquo;
      </>
    ),
  },
  politician: {
    summary: (
      <>
      The family and their corporate entities have donated over $415,000 to political campaigns at every level of government.
      </>
    ),
  },
  education: {
    summary: (
      <>
        Uniland built academic halls, a field house and student housing for
        Canisius High School and Canisius University, and the family&apos;s name
        sits on buildings and a library across Buffalo&apos;s Catholic colleges.
      </>
    ),
  },
  arts: {
    summary: (
      <>
        Carl Montante Sr. is a past chairman of the Buffalo Philharmonic
        Orchestra; the family has given as much as $1.5 million, and Uniland is
        the BPO&apos;s lead corporate sponsor.
      </>
    ),
  },
  business: {
    summary: (
      <>
        The family holds seats across Buffalo&apos;s business establishment —
        the Buffalo Niagara Partnership, Invest Buffalo Niagara, NAIOP — the
        bodies that shape regional development policy.
      </>
    ),
  },
};

export const WhoProfits: React.FC = () => {
  return (
    <main className="min-h-screen">
      {/* ========== WEALTH / FAMILY INTRO ========== */}
      <Section variant="black" hero>
        <WealthHero
          question="Who Profits?"
          family="The Montante Family"
          lede={
            <>
              The Montante family own Uniland Development, the largest
              commercial real estate development company in Western NY. They make{" "}
              <strong className="text-[#FFD600]">$1.95 million a year</strong> in
              rent from ICE, plus another <strong className="text-[#FFD600]">$0.56 million a year</strong>{" "}
              from Customs and Border Protection. With a total profit of{" "}
              <strong className="text-[#FFD600]">$2.5 million a year</strong>, the
              Montante family is the largest local profiteer from immigration
              enforcement in the region.
            </>
          }
          people={toHeroPeople(MONTANTE_PEOPLE)}
        />
      </Section>

      {/* ========== TAX BREAKS ========== */}
      <Section variant="black" className="border-t border-white/10">
        <SectionHeading>
          They profit at the expense of our community safety. Yet they managed
          to get a deal to take our tax dollars to &ldquo;benefit the
          community.&rdquo;
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
              bags: 96,
              source: {
                href: "https://news.wbfo.org/post/uniland-receives-tax-breaks-delawarechippewa-project",
                label: "WBFO",
              },
            },
            {
              amount: "$521K",
              label: "Property tax abatement",
              payer: "Erie County taxpayers — net of PILOT, 2017–2024 average ($4.17M total)",
              bags: 5,
              recurring: true,
              source: {
                href: "https://data.ny.gov/Transparency/Industrial-Development-Agencies-Project-Data/9rtk-3fkw",
                label: "NY State IDA project data",
              },
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

      {/* ========== WEB OF POWER ========== */}
      <Section variant="black" className="border-t border-white/10">
        <SectionHeading>Network of Influence</SectionHeading>
        <p className="text-base md:text-lg leading-relaxed text-white/70 mb-8">
          In 2025, Buffalo Business First ranked Michael Montante No. 27 and
          Carl Sr. No. 139 among the most powerful people in Western New York.
          That power is built deliberately: they fund politicians, buy seats in
          the business groups that shape development policy, and earn tax breaks
          through philanthropy. Every donation, board seat, and charitable gift
          is another lever of influence. Map their network of deals, donations,
          and favors, and we can start to hold them accountable. Click a sphere
          to dig in.
        </p>
        <PowerMap
          people={toPowerMapPeople(MONTANTE_PEOPLE, MONTANTE_SHORT_NAMES)}
          affiliations={MONTANTE_AFFILIATIONS}
          donations={MONTANTE_DONATIONS}
          areas={MONTANTE_AREAS}
        />
      </Section>

      <FactsReadNext
        title="Who Pulls the Strings"
        description="The Jacobs family donated $65,000 to Trump's transition, paid Governor Hochul's husband hundreds of thousands of dollars a year, and have said nothing about what happens in the building that bears their name."
        href="/facts/who-pulls-the-strings"
      />
    </main>
  );
};
