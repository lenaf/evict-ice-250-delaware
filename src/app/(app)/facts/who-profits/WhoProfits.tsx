"use client";

import React from "react";
import { SourceLink } from "../SourceLink";
import { MoneyTree } from "@/components/MoneyTree";
import { WealthHero } from "@/components/WealthHero";
import { HandsDivider } from "@/components/HandsDivider";
import { PowerMap, type AreaInfo } from "@/components/PowerMap";
import type { FilterType } from "@/types/affiliation";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { FactsReadNext } from "@/components/FactsReadNext";
import Link from "next/link";
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
    blurb: "The Catholic Church",
    stat: "25+ yrs on the Bishop's Council",
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
    blurb: "Governors & local officials",
    stat: "$290,000+ to politicians",
    summary: (
      <>
        Carl Montante and Laura Zaepfel have given more than $220,000 to New
        York politicians since 1999 — to Governors Pataki, Spitzer, Paterson,
        Cuomo and Hochul, the officials who control development approvals and
        the lease at 250 Delaware.
      </>
    ),
  },
  education: {
    blurb: "Catholic schools",
    stat: "Buildings on 3 campuses",
    summary: (
      <>
        Uniland built academic halls, a field house and student housing for
        Canisius High School and Canisius University, and the family&apos;s name
        sits on buildings and a library across Buffalo&apos;s Catholic colleges.
      </>
    ),
  },
  arts: {
    blurb: "Buffalo Philharmonic",
    stat: "$1.5M to the BPO",
    summary: (
      <>
        Carl Montante Sr. is a past chairman of the Buffalo Philharmonic
        Orchestra; the family has given as much as $1.5 million, and Uniland is
        the BPO&apos;s lead corporate sponsor.
      </>
    ),
  },
  business: {
    blurb: "The development lobby",
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
          people={toHeroPeople(MONTANTE_PEOPLE)}
        />
      </Section>

      <HandsDivider />

      {/* ========== TAX BREAKS ========== */}
      <Section variant="black" className="border-t border-white/10">
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
              bags: 96,
              source: {
                href: "https://news.wbfo.org/post/uniland-receives-tax-breaks-delawarechippewa-project",
                label: "WBFO",
              },
            },
            {
              amount: "$791K",
              label: "Property tax abatement",
              payer: "Erie County taxpayers — forgone public revenue, ongoing",
              bags: 8,
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

      {/* ========== WEB OF POWER ========== */}
      <Section variant="black" className="border-t border-white/10">
        <SectionHeading>The Web of Power</SectionHeading>
        <p className="text-base md:text-lg leading-relaxed text-white/70 mb-8">
          And with the public subsidies and personal wealth in hand, the
          Montantes feed money back into the institutions and politicians that
          protect their interests — buying influence across Buffalo&apos;s
          civic, religious, and political life. Yellow lines are political
          donations; the bigger the node, the more seats it holds.
        </p>
        <PowerMap
          people={toPowerMapPeople(MONTANTE_PEOPLE, MONTANTE_SHORT_NAMES)}
          affiliations={MONTANTE_AFFILIATIONS}
          donations={MONTANTE_DONATIONS}
          areas={MONTANTE_AREAS}
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
