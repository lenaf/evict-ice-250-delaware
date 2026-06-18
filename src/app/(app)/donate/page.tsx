import type { Metadata } from "next";
import Image from "next/image";
import { DonateWidget } from "./DonateWidget";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support the campaign to evict ICE from 250 Delaware in Buffalo. Your contribution funds billboards and materials.",
};

const CONTACT_EMAIL = "evictice250delaware@proton.me";

const funds = [
  {
    lead: "Billboards",
    rest: " across from ICE headquarters at 250 Delaware Ave",
    body: "Everyone passing 250 Delaware Ave should be made aware of what occurs in this unmarked building. Our goal is to keep the billboards running until ICE is no longer in the building.",
  },
  {
    lead: "Materials",
    rest: " for demonstrations and community education programs",
    body: "We're out in front of 250 Delaware Ave every Tuesday from 4:30–5:30pm and we co-host regular workshops with campaign co-sponsors. That takes time, materials, and resources — your contribution makes it a reality.",
  },
];

const photos = [
  {
    src: "/photos/campaign/billboard-uniland-owns.jpg",
    alt: "Billboard reading 'Uniland owns ICE headquarters — Evict ICE!'",
  },
  {
    src: "/photos/campaign/billboard-250-delaware.jpg",
    alt: "Billboard reading 'ICE headquarters is located at 250 Delaware'",
  },
  {
    src: "/photos/campaign/ice-fuera-250-delaware.jpg",
    alt: "Supporter holding a yellow '¡ICE Fuera! de 250 Delaware' sign",
  },
];

export default async function DonatePage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string }>;
}) {
  const params = await searchParams;
  const donated = params.success === "1";
  const canceled = params.canceled === "1";

  return (
    <main className="flex-1 bg-[#1E3A8A] text-white px-6 md:px-10 pt-28 md:pt-32 pb-12 md:pb-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr_2fr] gap-8 md:gap-10 items-start">
        {/* Left — what your gift funds */}
        <div>
          {donated && (
            <div className="border-2 border-black bg-[#FFD600] text-black p-3 mb-5 font-bold">
              Thank you for your contribution — it directly powers the campaign.
            </div>
          )}
          {canceled && (
            <div className="border-2 border-black bg-white text-black p-3 mb-5 font-bold">
              Your donation was canceled — no charge was made.
            </div>
          )}

          <h1 className="uppercase tracking-tight mb-6 md:mb-8">
            <span className="block font-black text-6xl md:text-8xl leading-[0.9]">
              Donate
            </span>
            <span className="block font-bold text-lg md:text-2xl leading-snug text-balance mt-3 md:mt-4">
              keep our{" "}
              <span className="text-[#FFD600]">billboard running</span> and our
              movement growing
            </span>
          </h1>

          <div className="flex flex-wrap gap-3 mb-6">
            {photos.map((p) => (
              <div
                key={p.src}
                className="relative w-36 h-28 md:w-48 md:h-36 shrink-0 border-2 border-black"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="192px"
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>

          <p className="font-bold text-base md:text-lg mb-4">
            Your contribution directly powers this work. It will fund:
          </p>

          <ul className="space-y-4 mb-6">
            {funds.map((f) => (
              <li key={f.lead} className="flex gap-2.5">
                <span className="text-[#FFD600] font-black shrink-0 leading-snug">
                  ›
                </span>
                <div>
                  <p className="leading-snug">
                    <span className="font-black text-[#FFD600]">{f.lead}</span>
                    <span className="font-normal">{f.rest}</span>
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-white/85 mt-1">
                    {f.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

        </div>

        {/* Right — donate widget */}
        <div className="md:sticky md:top-28">
          <DonateWidget />
          <p className="text-sm text-white/70 mt-4">
            Prefer to give by check or host a house party? Email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-bold text-[#FFD600] underline underline-offset-2 hover:text-white transition"
            >
              {CONTACT_EMAIL}
            </a>
            . 
          </p>
        </div>
      </div>
    </main>
  );
}
