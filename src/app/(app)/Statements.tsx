import React from "react";
import { getStatements, type StatementItem } from "@/lib/payload";
import { StatementsCarousel } from "./StatementsCarousel";

// Shown until statements are added in the CMS (the `statements` collection).
const FALLBACK_STATEMENTS: StatementItem[] = [
  {
    org: "Colored Girls Bike Too",
    href: "https://www.instagram.com/coloredgirlsbiketoo/",
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
    keyPoint:
      "We stand with our neighbors against the violent abuses of human rights ICE is committing daily. Our city should be a leader in housing, education, and healthcare — not the destruction of families.",
    paragraphs: [
      "We at BreadHive want a safe home for our community in Buffalo. We stand with our neighbors against the violent abuses of human rights ICE is committing daily. Our city should be a leader in housing, education, and healthcare — not the destruction of families.",
    ],
  },
  {
    org: "Burning Books",
    href: "https://www.burningbooks.com/",
    keyPoint:
      "State-sanctioned bigotry and violence must be strongly and consistently resisted. No-one is illegal. America was never great. The future is what the people struggle to make it.",
    paragraphs: [
      "Burning Books is anti-fascist and anti-authoritarian. State-sanctioned bigotry and violence must be strongly and consistently resisted. No-one is illegal. America was never great. The future is what the people struggle to make it.",
    ],
  },
  {
    org: "Buffalo Niagara LGBTQ History Project",
    href: "https://bflolgbtqhistoryproject.org/",
    keyPoint:
      "As a queer community we have long stood in solidarity with immigrant rights — and we know that an attack on one marginalized community is an attack on all of us.",
    paragraphs: [
      "Buffalo-Niagara LGBTQ History Project does not accept any form of persecution and retaliatory crackdowns on immigrants, specifically the targeting of LGBTQ+ community members. As a queer community we have long stood in solidarity with immigrant rights and we know that attacks on one marginalized community is an attack on all of us. We stand in solidarity with all immigrants and displaced persons.",
    ],
  },
  {
    org: "U-Belong Coalition",
    href: "https://www.instagram.com/ubelongcoalition/",
    keyPoint:
      "The UBelong Coalition is outraged at the brazen abduction of our UB students. We demand their immediate release and stand in total solidarity with all targeted by ICE.",
    paragraphs: [
      "The UBelong Coalition is outraged at the brazen abduction of our UB students. These students came here to learn, to contribute, and to build futures and they were met with violence and fear instead. We demand their immediate release and stand in total solidarity with all students and community members targeted by ICE.",
    ],
  },
  {
    org: "Peace Action New York State",
    href: "https://www.panys.org/",
    keyPoint:
      "We see ICE enforcement as an extension of the same systems of militarism and violence we have always opposed. We stand with immigrants and all people targeted by state violence.",
    paragraphs: [
      "As a statewide grassroots peace organization deeply invested in resisting U.S. militarism, we see ICE enforcement as an extension of the same systems of violence we have always opposed. We stand with immigrants and all people targeted by state violence.",
    ],
  },
  {
    org: "WNY Environmental Alliance",
    href: "https://www.wnyea.org/",
    keyPoint:
      "Supporting the environment means creating a world that supports all life — including people. WNY EA stands with our immigrant neighbors and calls for policies that protect families and communities.",
    paragraphs: [
      "We believe that part of supporting the environment means creating a world that supports all life including the lives of people. When communities are disrupted by fear and forced separation, it undermines the stability needed to build sustainable, just futures. WNY EA stands with our immigrant neighbors and calls for policies that protect families and communities.",
    ],
  },
  {
    org: "Rights of Nature WNY",
    href: "https://www.wnyea.org/rights-of-nature.html",
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
    keyPoint:
      "We are firmly opposed to ICE terror, on and off campus. Surveillance funded by our own money makes this a student issue, a workers issue, and a revolutionary issue.",
    paragraphs: [
      "Liberate Buffalo State is firmly opposed to ICE terror, on and off campus. We do not believe any state vehicle of oppression, violence, and discrimination should be as aggressively funded and protected as ICE, the police, or even campus PD. The use of Flock AI on our campus and across our city to surveil us using our hard earned money makes this a student issue just as much as a workers issue, just as it is a revolutionary issue.",
      "The violence inflicted on our neighbors through abductions, harassment, deportations and murders is a direct reflection of the fascist history of this country and it must not continue. We proudly join our voices and in our resistance with the Evict ICE from 250 Delaware Campaign and other coalition members to demand ICE be removed from the heart of OUR city, to have their lease terminated, and to be expelled from Buffalo altogether. Power concedes nothing without demand, and our demands will not waver. ICE terror and abuse must end, and we must be the ones to end it for our neighbors.",
    ],
  },
  {
    org: "One of a Kind Yoga",
    href: "https://www.oneofakindyoga.com/",
    keyPoint:
      "Endorsing the Evict ICE from 250 Delaware campaign aligns with our values of compassion, justice, and human dignity. We believe that true wellness cannot exist without safety, belonging, and the protection of our neighbors.",
    paragraphs: [
      "At the heart of our organization is community. Everything we do is rooted in giving back—whether through accessible wellness, volunteering our time, creating spaces for meaningful conversations, or supporting organizations throughout Western New York. As a small, community-centered business, we believe that caring for our neighbors extends beyond the walls of our studio.",
      "Through the \"Let's Talk About It Buffalo\" discussion group, we've encouraged civic engagement, education, and collective action on issues that directly impact our community. Endorsing the Evict ICE from 250 Delaware campaign aligns with our values of compassion, justice, and human dignity. We believe that true wellness cannot exist without safety, belonging, and the protection of our neighbors.",
      "While we may be a small organization, we recognize that meaningful change is built through many voices coming together, and we are committed to using our platform to support causes that reflect the values of the community we strive to cultivate every day.",
    ],
  },
];

// "Coalition statements" — endorsement quotes, CMS-managed with a hardcoded
// fallback so the section always renders.
export const Statements = async () => {
  const statements = (await getStatements()) ?? FALLBACK_STATEMENTS;
  return <StatementsCarousel statements={statements} />;
};
