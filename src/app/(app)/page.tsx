import Image from "next/image";
import { ActionNetworkForm } from "@/components/ActionNetworkForm";
import { InlineDaysLeft } from "@/components/CountdownTimer";
import { UpcomingSlots } from "@/components/UpcomingSlots";

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
      <section className="bg-[#FFD600]">
        {/* Mobile: stacked */}
        <div className="md:hidden">
          <div className="px-6 pt-24 pb-10 flex justify-center">
            <Image
              src="/logo-transparent.png"
              alt="Evict ICE from 250 Delaware"
              width={700}
              height={170}
              className="w-full max-w-xs h-auto"
              priority
            />
          </div>
          <div className="relative w-full h-48 sm:h-64">
            <Image
              src="/250-Delaware.png"
              alt="250 Delaware Avenue building in downtown Buffalo, NY"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>
        {/* Desktop: side by side */}
        <div className="hidden md:block relative overflow-hidden">
          <div className="absolute bottom-0 right-[-5%] w-[40%] h-[90%] z-20 pointer-events-none">
            <Image
              src="/250-Delaware.png"
              alt="250 Delaware Avenue building in downtown Buffalo, NY"
              fill
              className="object-contain object-bottom"
            />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-10 pt-32 pb-28 pr-[44%]">
            <Image
              src="/logo-transparent.png"
              alt="Evict ICE from 250 Delaware"
              width={700}
              height={170}
              className="w-full max-w-xl h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* ========== Intro ========== */}
      <section className="bg-[#1E3A8A] text-white px-6 md:px-10 py-8 md:py-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-base md:text-lg leading-relaxed text-white/70 mb-4">
            Uniland leases 250 Delaware to DHS for New York State ICE
            operations. That lease expires on{" "}
            <strong className="text-white">March 31, 2027</strong>.
          </p>
          <p className="font-bold text-lg md:text-xl text-[#FFD600] leading-relaxed mt-6">
            We&apos;re calling on Uniland to not renew the lease.
          </p>
        </div>
      </section>

      {/* ========== Upcoming Volunteer Slots ========== */}
      <UpcomingSlots />

      {/* ========== Stats ========== */}
      <section className="bg-[#DC2626] text-white px-6 md:px-10 py-10 md:py-14 border-y-2 border-black">
        <div className="max-w-6xl mx-auto">
          <p className="font-black text-xl md:text-3xl leading-tight uppercase">
            <span className="text-[#FFD600]">7,258</span> people were taken
            across Upstate and Western NY in 2025
          </p>
        </div>
      </section>

      {/* ========== 250 Delaware story ========== */}
      <section className="bg-[#1E3A8A] text-white px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-2xl md:text-3xl leading-tight mb-4">
            When a <span className="text-[#FFD600]">wall away</span> feels like
            a <span className="text-[#FFD600]">world away</span> —
          </h2>
          <p className="font-black text-lg md:text-xl uppercase tracking-wide text-white/70 mb-4">
            you know you&apos;re at 250 Delaware.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-white/80">
            On the first floor, there&apos;s a fine dining restaurant, and
            across the lobby is the entrance to a luxury hotel. People come and
            go from the building every day without realizing that just a few
            floors above them, on the seventh floor, ICE is deciding the fate of
            our neighbors — whether they will be allowed to remain in the city
            they call home or face indefinite detention and deportation.
          </p>
        </div>
      </section>

      {/* ========== 1 Year ========== */}
      <section className="bg-[#FFD600] text-black px-6 md:px-10 py-10 md:py-14 border-y-2 border-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-[clamp(2rem,5vw,3.5rem)] leading-[0.95]">
            We have
            <InlineDaysLeft
              targetDate="2027-03-31T00:00:00"
              className="text-[#DC2626] mx-2"
            />
            to change that.
          </h2>
        </div>
      </section>

      {/* ========== The Facts ========== */}
      <section
        id="facts"
        className="bg-white text-black px-6 md:px-10 py-14 md:py-20 scroll-mt-14"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-4xl mb-10">The Facts</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="border-l-2 border-[#1E3A8A] pl-6">
              <h3 className="font-black text-xl md:text-2xl text-[#1E3A8A] mb-4">
                Buffalo DHS Operations
              </h3>
              <ul className="space-y-4 text-base leading-relaxed text-black/70">
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
              </ul>
            </div>
            <div className="border-l-2 border-[#DC2626] pl-6">
              <h3 className="font-black text-xl md:text-2xl text-[#DC2626] mb-4">
                Who Owns 250 Delaware
              </h3>
              <ul className="space-y-4 text-base leading-relaxed text-black/70">
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
        </div>
      </section>

      {/* ========== Tax Dollars ========== */}
      <section className="bg-black text-white px-6 md:px-10 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <p className="font-black text-lg md:text-2xl leading-tight uppercase tracking-wide">
            Our tax dollars are helping landlords profit from mass deportations.
          </p>
        </div>
      </section>

      {/* ========== Good Neighbors ========== */}
      <section className="bg-white text-black px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <h2 className="font-black text-3xl md:text-4xl leading-tight uppercase">
            Good neighbors stand together.
          </h2>
          <div className="text-base md:text-lg leading-relaxed text-black/70 md:border-l-2 md:border-black/10 md:pl-12">
            <p className="mb-4">
              This campaign is powered by the people of Buffalo — families,
              businesses, civil rights and faith leaders, grassroots
              organizations, elected officials, labor unions, and neighbors like
              you.
            </p>
            <p className="font-bold text-black">
              Our coalition is growing every day. Stay tuned for the full list
              calling for non-renewal.
            </p>
          </div>
        </div>
      </section>

      {/* ========== Join Form ========== */}
      <section id="join" className="scroll-mt-14">
        <div className="grid md:grid-cols-2">
          <div className="bg-black text-white px-6 md:px-10 py-14 md:py-20 flex flex-col justify-center">
            <h2 className="font-black text-3xl md:text-4xl leading-[0.95] mb-4">
              Tell us about you.
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-white/70 max-w-md">
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

      {/* ========== Closing ========== */}
      <section className="bg-[#1E3A8A] text-white px-6 md:px-10 py-10 md:py-14">
        <div className="max-w-6xl mx-auto flex items-end justify-between gap-6">
          <h2 className="font-black text-[clamp(2rem,5vw,3.5rem)] leading-[0.95]">
            We are just getting started.
          </h2>
          <Image
            src="/logo-transparent.png"
            alt="Evict ICE from 250 Delaware"
            width={120}
            height={30}
            className="w-20 md:w-28 h-auto shrink-0 brightness-0 invert"
          />
        </div>
      </section>
    </main>
  );
}
