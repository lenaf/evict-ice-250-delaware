"use client";

import React, { useEffect, useState } from "react";
import { SwipeCarousel } from "@/components/SwipeCarousel";

interface Statement {
  org: string;
  href: string;
  logo: string;
  // Optional ~3-line teaser shown on the card; the full statement opens on
  // "Read full statement". If omitted, the single paragraph is the full text.
  keyPoint?: string;
  paragraphs: string[];
}

const statements: Statement[] = [
  {
    org: "Colored Girls Bike Too",
    href: "https://www.instagram.com/coloredgirlsbiketoo/",
    logo: "/sponsors/colored-girls-bike-too.webp",
    keyPoint:
      "We are clear that ICE, policing, over-policing, and the occupation of Black and Brown neighborhoods are not separate crises but interconnected mechanisms of the same system. ",
    paragraphs: [
      "We support this campaign because, as Black women committed to the liberation of Black people, we understand state violence not as an abstraction, but as an ongoing structure that organizes life in our communities through surveillance, containment, and harm.",
      "ICE is not external to this structure; it is one of its clearest expressions. It operates through the same logics of white supremacist enforcement that organize policing, all of which are rooted in the consolidation of power, the extraction of profit, and the control of land. From this foundation, systems of enforcement emerge that criminalize Black and Brown life, regulate movement, and sustain the constant threat of separation, displacement, and detention. These are not isolated institutions, but mutually reinforcing mechanisms designed to preserve racial hierarchy and territorial control.",
      "Our support of this campaign is about building a bridge between struggles — linking resistance to ICE with the ongoing crisis of over-policing and police violence in Black and brown communities. These forms of state violence are often only made visible in moments of public outrage, campaigns, or high-profile cases, even though Black communities have experienced them as continuous and structural realities, for CENTURIES. As a result, these struggles are frequently fragmented, minimized, or treated as episodic rather than systemic. Black life is often only recognized within narrow windows of attention, while the broader conditions of policing remain normalized and obscured. We reject frameworks that isolate ICE from policing, or that treat policing as reformable without confronting its foundational role in maintaining racial order and state control.",
      "In Buffalo, the recent appointment of Erika Shields as police commissioner further underscores the urgency of this moment. Her record, shaped by leadership roles in Atlanta and Louisville during periods of heightened protest and political conflict, reflects the ongoing institutional reliance on “reform” paradigms of policing that manage public pressure without addressing the structural conditions that produce harm in Black and Brown communities.",
      "We are clear that ICE, policing, over-policing, and the occupation of Black and Brown neighborhoods are not separate crises but interconnected mechanisms of the same system. Our demand is not limited to reform or symbolic change, but points toward the necessity of dismantling these overlapping structures of control in order to make possible genuine safety, autonomy, and collective life for our communities.",
      "“Until Black people are free, no one is free.”",
    ],
  },
  {
    org: "BreadHive",
    href: "https://www.breadhive.com/",
    logo: "/sponsors/breadhive.jpg",
    keyPoint:
      "We stand with our neighbors against the violent abuses of human rights ICE is committing daily. Our city should be a leader in housing, education, and healthcare — not the destruction of families.",
    paragraphs: [
      "We at BreadHive want a safe home for our community in Buffalo. We stand with our neighbors against the violent abuses of human rights ICE is committing daily. Our city should be a leader in housing, education, and healthcare — not the destruction of families.",
    ],
  },
  {
    org: "Burning Books",
    href: "https://www.burningbooks.com/",
    logo: "/sponsors/burning-books.jpeg",
    keyPoint:
      "State-sanctioned bigotry and violence must be strongly and consistently resisted. No-one is illegal. America was never great. The future is what the people struggle to make it.",
    paragraphs: [
      "Burning Books is anti-fascist and anti-authoritarian. State-sanctioned bigotry and violence must be strongly and consistently resisted. No-one is illegal. America was never great. The future is what the people struggle to make it.",
    ],
  },
  {
    org: "Buffalo Niagara LGBTQ History Project",
    href: "https://bflolgbtqhistoryproject.org/",
    logo: "/sponsors/buffalo-niagara-lgbtq-history.png",
    keyPoint:
      "As a queer community we have long stood in solidarity with immigrant rights — and we know that an attack on one marginalized community is an attack on all of us.",
    paragraphs: [
      "Buffalo-Niagara LGBTQ History Project does not accept any form of persecution and retaliatory crackdowns on immigrants, specifically the targeting of LGBTQ+ community members. As a queer community we have long stood in solidarity with immigrant rights and we know that attacks on one marginalized community is an attack on all of us. We stand in solidarity with all immigrants and displaced persons.",
    ],
  },
  {
    org: "U-Belong Coalition",
    href: "https://www.instagram.com/ubelongcoalition/",
    logo: "/sponsors/u-belong-coalition.png",
    keyPoint:
      "The UBelong Coalition is outraged at the brazen abduction of our UB students. We demand their immediate release and stand in total solidarity with all targeted by ICE.",
    paragraphs: [
      "The UBelong Coalition is outraged at the brazen abduction of our UB students. These students came here to learn, to contribute, and to build futures and they were met with violence and fear instead. We demand their immediate release and stand in total solidarity with all students and community members targeted by ICE.",
    ],
  },
  {
    org: "Peace Action New York State",
    href: "https://www.panys.org/",
    logo: "/sponsors/panys.webp",
    keyPoint:
      "We see ICE enforcement as an extension of the same systems of militarism and violence we have always opposed. We stand with immigrants and all people targeted by state violence.",
    paragraphs: [
      "As a statewide grassroots peace organization deeply invested in resisting U.S. militarism, we see ICE enforcement as an extension of the same systems of violence we have always opposed. We stand with immigrants and all people targeted by state violence.",
    ],
  },
  {
    org: "WNY Environmental Alliance",
    href: "https://www.wnyea.org/",
    logo: "/sponsors/wnyea.jpg",
    keyPoint:
      "Supporting the environment means creating a world that supports all life — including people. WNY EA stands with our immigrant neighbors and calls for policies that protect families and communities.",
    paragraphs: [
      "We believe that part of supporting the environment means creating a world that supports all life including the lives of people. When communities are disrupted by fear and forced separation, it undermines the stability needed to build sustainable, just futures. WNY EA stands with our immigrant neighbors and calls for policies that protect families and communities.",
    ],
  },
  {
    org: "Rights of Nature WNY",
    href: "https://www.wnyea.org/rights-of-nature.html",
    logo: "/sponsors/rights-of-nature-wny.png",
    keyPoint:
      "Communities should have a say over how we care for each other. The people of Buffalo do not consent to authoritarian policing and the forceful removal of our neighbors.",
    paragraphs: [
      "We believe that communities should have a say over policies and how we care for each other. In order to move towards a world that affirms all life, we need to care for each other and our neighbors. People are inextricably linked to nature, and our wellbeing is linked to nature's wellbeing. We therefore need to be able to make decisions in our communities, not be imposed upon by federal forces that do not take into account what people on the ground want and need.",
      "The people of Buffalo, like the people of Minneapolis, do not consent to authoritarian policing of our community and forceful removal of our friends and neighbors. All people are deserving of the right to live and thrive. As our planet experiences changes in climate and loss of biodiversity, much of which has been caused by US capitalism, people will be forced to find refuge in places like Buffalo and we want to create a place where people can come and be active members of our community. We cannot do that if there is a government entity that rules through fear and oppression. We support evicting ICE from Buffalo!",
    ],
  },
  {
    org: "Liberate Buffalo State",
    href: "https://www.instagram.com/liberate.buff.state/",
    logo: "/sponsors/liberate-buffalo-state.png",
    keyPoint:
      "We are firmly opposed to ICE terror, on and off campus. Surveillance funded by our own money makes this a student issue, a workers issue, and a revolutionary issue.",
    paragraphs: [
      "Liberate Buffalo State is firmly opposed to ICE terror, on and off campus. We do not believe any state vehicle of oppression, violence, and discrimination should be as aggressively funded and protected as ICE, the police, or even campus PD. The use of Flock AI on our campus and across our city to surveil us using our hard earned money makes this a student issue just as much as a workers issue, just as it is a revolutionary issue.",
      "The violence inflicted on our neighbors through abductions, harassment, deportations and murders is a direct reflection of the fascist history of this country and it must not continue. We proudly join our voices and in our resistance with the Evict ICE from 250 Delaware Campaign and other coalition members to demand ICE be removed from the heart of OUR city, to have their lease terminated, and to be expelled from Buffalo altogether. Power concedes nothing without demand, and our demands will not waver. ICE terror and abuse must end, and we must be the ones to end it for our neighbors.",
    ],
  },
];

export const Statements: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null ? statements[openIndex] : null;

  // While the modal is open: close on Escape and lock background scroll.
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex]);

  return (
    <section className="bg-[#1E3A8A] text-white py-12 md:py-20">
      <SwipeCarousel tone="light" ariaLabel="Coalition statements">
        {statements.map((statement, i) => (
          <figure
            key={statement.org}
            className="shrink-0 snap-start w-[85vw] sm:w-[24rem] md:w-[28rem] flex flex-col"
          >
            <svg
              aria-hidden
              viewBox="0 0 42 24"
              className="self-start w-7 h-4 md:w-8 md:h-5 fill-white mt-2 mb-3"
            >
              <path d="M0 24C0 13 5 5 16 2L17.5 6C11 8.5 8.5 12 8.5 16H16V24H0ZM24 24C24 13 29 5 40 2L41.5 6C35 8.5 32.5 12 32.5 16H40V24H24Z" />
            </svg>
            <blockquote className="flex-1 text-lg md:text-xl leading-snug">
              {(statement.keyPoint ?? statement.paragraphs[0]).trim()}
            </blockquote>
            <div className="mt-5 flex flex-col items-start gap-2">
              <a
                href={statement.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-black text-sm uppercase tracking-wider text-[#FFD600] hover:text-white transition"
              >
                {statement.org}
              </a>
              {statement.keyPoint && (
                <button
                  onClick={() => setOpenIndex(i)}
                  className="text-xs font-bold uppercase tracking-wider text-white/70 underline underline-offset-4 hover:text-[#FFD600] transition cursor-pointer"
                >
                  Read full statement
                </button>
              )}
            </div>
          </figure>
        ))}
      </SwipeCarousel>

      {/* Full-statement modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${open.org} full statement`}
        >
          <div className="relative bg-white text-black border-2 border-black w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 md:p-10">
            <div className="flex items-start justify-between gap-4 mb-6">
              <a
                href={open.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-black text-base uppercase tracking-wider text-[#1E3A8A] hover:text-[#DC2626] transition"
              >
                {open.org}
              </a>
              <button
                onClick={() => setOpenIndex(null)}
                aria-label="Close"
                className="shrink-0 w-9 h-9 flex items-center justify-center border-2 border-black text-black font-black hover:opacity-80 transition cursor-pointer"
              >
                ✕
              </button>
            </div>
            <blockquote className="space-y-4">
              {open.paragraphs.map((p, i) => (
                <p key={i} className="text-base md:text-lg leading-relaxed">
                  {p}
                </p>
              ))}
            </blockquote>
          </div>
        </div>
      )}
    </section>
  );
};
