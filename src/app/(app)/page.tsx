import Image from "next/image";
import Link from "next/link";
import { ActionNetworkForm } from "@/components/ActionNetworkForm";
import { CoalitionLogos } from "@/components/CoalitionLogos";
import { InlineDaysLeft } from "@/components/CountdownTimer";
import { OnTheGroundCarousel } from "@/components/OnTheGroundCarousel";
import { TipForm } from "@/components/TipForm";
import { Statements } from "./Statements";
import { Section } from "@/components/Section";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Evict ICE from 250 Delaware",
  url: "https://evictice250delaware.com",
  description:
    "Community campaign to evict ICE from 250 Delaware Avenue in Buffalo, NY. Uniland leases space to DHS for deportation operations across New York State.",
  publisher: {
    "@type": "Organization",
    name: "Evict ICE 250 Delaware",
    url: "https://evictice250delaware.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "250 Delaware Avenue",
      addressLocality: "Buffalo",
      addressRegion: "NY",
      addressCountry: "US",
    },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ========== HERO ========== */}
      <section className="relative w-full min-h-[22rem] md:min-h-[34rem] bg-black flex items-center overflow-hidden">
        {/* Photo on the right; a solid black column sits on the left, with the
            photo's left edge blended into it so there's no hard line. */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[70%]">
          <Image
            src="/photos/campaign/rally-megaphone-crowd.jpg"
            alt="Demonstrators gather outside 250 Delaware Avenue as a speaker addresses the crowd with a megaphone"
            fill
            priority
            sizes="(min-width: 768px) 70vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent md:via-black/25" />
        </div>
        <div className="relative z-10 w-full px-6 md:px-10">
          <div className="max-w-6xl mx-auto">
            <h1 className="uppercase tracking-tight leading-[0.95] text-white max-w-sm [text-shadow:0_2px_16px_rgba(0,0,0,0.65)]">
              <span className="block text-[clamp(1.1rem,3vw,1.75rem)] font-light tracking-[-0.04em] mb-1 md:mb-1.5">
                Uniland Development
              </span>
              <span className="block text-[clamp(1.1rem,3vw,1.75rem)] font-light tracking-[-0.04em]">
                &amp; Delaware North
              </span>
              <span className="block text-[clamp(2.75rem,7.5vw,5.5rem)] font-black tracking-[0.22em] mt-4 md:mt-6">
                stop
              </span>
              <span className="block text-[clamp(1.75rem,4.5vw,3.25rem)] font-light">
                leasing to
              </span>
              <span className="block text-[clamp(5rem,13vw,9.75rem)] font-black tracking-[0.14em] text-[#DC2626]">
                ICE
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* ========== Coalition statement ========== */}
      <Section variant="blue">
        <p className="text-lg md:text-2xl font-medium text-white/80 leading-relaxed mb-4 md:mb-5">
          Uniland leases 250 Delaware to ICE. The lease expires{" "}
          <span className="font-bold text-[#FFD600]">March 31, 2027</span>.
        </p>
        <p className="font-light text-[clamp(1.25rem,2.6vw,1.875rem)] leading-[1.1] md:whitespace-nowrap">
          We are a coalition of Buffalonians calling on Uniland to{" "}
          <span className="font-black text-[#FFD600]">EVICT ICE</span>.
        </p>
      </Section>

      {/* ========== Coalition partners (full-width) ========== */}
      <section className="bg-white py-10 md:py-14">
        <CoalitionLogos />
      </section>

      {/* ========== Coalition statements (quotes) ========== */}
      <Statements />

      {/* ========== Stand With Us (photos) ========== */}
      <OnTheGroundCarousel />

      {/* ========== Donate CTA ========== */}
      <Section
        variant="yellow"
        innerClassName="grid md:grid-cols-2 gap-8 md:gap-10 items-center"
      >
        <div>
          <h2 className="font-black text-3xl md:text-4xl leading-[0.95] uppercase mb-3">
            Chip in to keep the{" "}
            <span className="text-[#DC2626]">billboards</span> up.
          </h2>
          <p className="text-base md:text-lg leading-relaxed max-w-xl mb-6">
            Every dollar funds billboards across from ICE headquarters and
            materials for our weekly demonstrations. All contributions are
            tax-deductible.
          </p>
          <Link
            href="/donate"
            className="inline-block text-center bg-[#DC2626] hover:bg-black text-white font-black text-lg uppercase tracking-wider px-8 py-4 border-2 border-black transition cursor-pointer"
          >
            Donate &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-[4/3] border-2 border-black">
            <Image
              src="/photos/campaign/billboard-uniland-owns.jpg"
              alt="Billboard reading 'Uniland owns ICE headquarters — Evict ICE!'"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover object-center"
            />
          </div>
          <div className="relative aspect-[4/3] border-2 border-black">
            <Image
              src="/photos/campaign/billboard-250-delaware.jpg"
              alt="Billboard reading 'ICE headquarters is located at 250 Delaware'"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </Section>

      {/* ========== Stats ========== */}
      <Section variant="red" pad="compact">
        <p className="font-black text-xl md:text-3xl leading-tight uppercase">
          <span className="text-[#FFD600]">7,258</span> people were taken across
          Upstate and Western NY in 2025
        </p>
      </Section>

      {/* ========== 250 Delaware story ========== */}
      <Section variant="blue">
        <h2 className="font-black text-2xl md:text-3xl leading-tight mb-4">
          When a <span className="text-[#FFD600]">wall away</span> feels like a{" "}
          <span className="text-[#FFD600]">world away</span> —
        </h2>
        <p className="font-black text-lg md:text-xl uppercase tracking-wide text-white mb-4">
          you know you&apos;re at 250 Delaware.
        </p>
        <p className="text-base md:text-lg leading-relaxed text-white">
          On the first floor, there&apos;s a fine dining restaurant, and across
          the lobby is the entrance to a luxury hotel. People come and go from
          the building every day without realizing that just a few floors above
          them, on the seventh floor, ICE is deciding the fate of our neighbors
          — whether they will be allowed to remain in the city they call home or
          face indefinite detention and deportation.
        </p>
      </Section>

      {/* ========== 1 Year ========== */}
      <Section variant="yellow" pad="compact">
        <h2 className="font-black text-[clamp(2rem,5vw,3.5rem)] leading-[0.95]">
          We have
          <InlineDaysLeft
            targetDate="2027-03-31T00:00:00"
            className="text-[#DC2626] mx-2"
          />
          to change that.
        </h2>
      </Section>

      {/* ========== The Facts ========== */}
      <Section variant="white" id="facts" className="scroll-mt-14">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-black text-3xl md:text-4xl">The Facts</h2>
          <Link
            href="/facts"
            className="text-[#DC2626] font-black text-sm uppercase tracking-wider hover:text-black transition"
          >
            Read more &rarr;
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
            <div className="border-l-2 border-[#1E3A8A] pl-6">
              <h3 className="font-black text-xl md:text-2xl uppercase text-[#1E3A8A] mb-4">
                Buffalo DHS Operations
              </h3>
              <ul className="space-y-4 text-base leading-relaxed text-black">
                <li>
                  Downtown Buffalo&apos;s 250 Delaware Avenue houses four ICE
                  offices that control operations, detention management,
                  reporting, logistics, and administration for all of New York
                  State outside of NYC.
                </li>
                <li>
                  Every ICE action in Western New York, Central New York, the
                  Finger Lakes, Southern Tier, North Country, Mohawk Valley,
                  Capital Region, and Mid-Hudson — all of it — is coordinated
                  from 250 Delaware.
                </li>
                <li>
                  And it&apos;s not just coordination and administration — 250
                  Delaware has{" "}
                  <span className="text-[#DC2626] font-bold">
                    holding cells
                  </span>{" "}
                  where
                  <span className="text-black font-bold">
                    {" "}
                    adults and children are held for days before transfer or
                    deportation.
                  </span>
                </li>
              </ul>
            </div>
            <div className="border-l-2 border-[#DC2626] pl-6">
              <h3 className="font-black text-xl md:text-2xl uppercase text-[#DC2626] mb-4">
                Who Owns 250 Delaware
              </h3>
              <ul className="space-y-4 text-base leading-relaxed text-black">
                <li>
                  Uniland Development (the Montante family) owns the building
                  and Delaware North (the Jacobs family) is the anchor tenant.
                  In 2013, the Erie County Industrial Development Agency
                  approved $9.6 million in property and sales tax breaks for
                  this project — public money that subsidized a building now
                  profiting from ICE operations.
                </li>
                <li>
                  Today, Uniland collects $2 million per year from ICE&apos;s
                  lease, while taxpayers continue to subsidize the building
                  through generous tax abatement that cost Buffalo and Erie
                  County $791,000 in 2024 alone.
                </li>
              </ul>
            </div>
          </div>
      </Section>

      {/* ========== Join Form ========== */}
      <section id="join" className="scroll-mt-14">
        <div className="grid md:grid-cols-2">
          <div className="bg-black text-white px-6 md:px-10 py-14 md:py-20 flex flex-col justify-center">
            <h2 className="font-black text-3xl md:text-4xl leading-[0.95] mb-4">
              Tell us about you.
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-white max-w-md">
              Whether you can knock on doors, make graphics, do research, or
              just want to stay informed — we need you. Sign up and we&apos;ll
              be in touch.
            </p>
          </div>
          <div className="bg-[#FFD600] px-6 md:px-10 py-14 md:py-20 flex items-center">
            <div className="w-full max-w-md mx-auto">
              <ActionNetworkForm />
            </div>
          </div>
        </div>
      </section>

      {/* ========== Send Us a Tip ========== */}
      <Section variant="white" className="border-t-2 border-black">
        <div className="max-w-xl">
          <h2 className="font-black text-3xl md:text-4xl leading-tight uppercase mb-3">
            Send Us a Tip
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-black mb-8">
            Know something about the building? Have an idea for the campaign?
            Drop us an anonymous message.
          </p>
          <TipForm />
        </div>
      </Section>

      {/* ========== Closing ========== */}
      <Section
        variant="blue"
        pad="compact"
        innerClassName="flex items-end justify-between gap-6"
      >
        <h2 className="font-black text-[clamp(2rem,5vw,3.5rem)] leading-[0.95]">
          We are just getting started.
        </h2>
        <Image
          src="/logos/evict-ice/logo-transparent.png"
          alt="Evict ICE from 250 Delaware"
          width={120}
          height={30}
          className="w-20 md:w-28 h-auto shrink-0 brightness-0 invert"
        />
      </Section>
    </main>
  );
}
