import type { Metadata } from "next";
import Image from "next/image";
import { DonateWidget } from "../DonateWidget";

export const metadata: Metadata = {
  title: "Puppet Raising",
  description:
    "Fund the puppets, banners, and performance art powering the campaign to Evict ICE from 250 Delaware.",
};

const CONTACT_EMAIL = "evictice250delaware@proton.me";

const FUNDS = [
  "Fair pay for the artists creating the work",
  "Materials and production",
  "Installation",
];

export default async function PuppetsDonatePage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string }>;
}) {
  const params = await searchParams;
  const donated = params.success === "1";
  const canceled = params.canceled === "1";

  return (
    <main className="flex-1 bg-[#1E3A8A] text-white px-6 md:px-10 pt-10 md:pt-14 pb-12 md:pb-16">
      {/* Mobile: heading, then the full pitch, then the widget last.
          Desktop: heading + pitch on the left, widget sticky on the right. */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr_2fr] md:grid-rows-[auto_1fr] gap-y-6 md:gap-x-10 md:gap-y-0 items-start">
        <div className="md:col-start-1 md:row-start-1">
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

          <h1 className="uppercase tracking-tight md:mb-8 font-black text-5xl md:text-7xl leading-[0.95]">
            Puppet Raising
          </h1>
        </div>

        {/* Copy */}
        <div className="md:col-start-1 md:row-start-2">
          <div className="relative aspect-[3/2] border-2 border-black overflow-hidden mb-6">
            <Image
              src="/photos/puppets/montante-puppets-no-ice.jpg"
              alt="Demonstrators outside 250 Delaware hold towering puppet effigies of Carl Montante, one labeled 'ICE's Puppet,' beside a 'NO ICE' sign"
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover object-top"
              priority
            />
          </div>

          <blockquote className="italic text-lg md:text-xl text-white/90 mb-6">
            &ldquo;It is the job of the artist&hellip;to think outside the
            boundaries of permissible thought and dare to say things that no
            one else will say.&rdquo;
            <footer className="not-italic font-bold text-sm text-white/70 mt-2">
              — Howard Zinn,{" "}
              <a
                href="https://web.english.upenn.edu/~cavitch/pdf-library/Zinn_Artists.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 text-[#FFD600] hover:text-white transition"
              >
                Artists in the Time of War
              </a>
            </footer>
          </blockquote>

          <p className="leading-relaxed text-white/90 mb-4">
            We believe that powerful visual and performance art is key to
            amplifying our message and demands to Evict ICE from 250
            Delaware. We are asking our community to raise funds specifically
            in support of creating additional art for our campaign. This may
            include puppets, banners, signs, music, and other interactive
            elements.
          </p>

          <p className="leading-relaxed text-white/90 mb-6">
            Funding this work does two things at once. It supports the
            artists we&rsquo;re working with, who bring skill, time, and
            lived commitment to this work and deserve to be paid for it. And
            it increases the reach of our message, putting it in front of
            people who might never read an article about our demands but
            will stop for a powerful image.
          </p>

          <p className="font-bold text-base md:text-lg mb-4">
            Your donation will fund:
          </p>

          <ul className="space-y-3 mb-6">
            {FUNDS.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="text-[#FFD600] font-black shrink-0 leading-snug">
                  ›
                </span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>

          <p className="leading-relaxed text-white/90">
            Please consider making a generous donation to fund this important
            piece of our campaign&rsquo;s next phase. The world needs our
            action and it needs our art.
          </p>
        </div>

        {/* Donate widget */}
        <div className="md:col-start-2 md:row-start-1 md:row-span-2 md:sticky md:top-28">
          <DonateWidget campaign="puppets" />
          <p className="text-sm text-white/70 mt-4">
            Prefer to give by check? Email{" "}
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
