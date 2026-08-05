import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SwipeCarousel } from "@/components/SwipeCarousel";
import { EventRow } from "@/components/EventRow";
import { supabaseAdmin } from "@/lib/supabase-server";
import type { Slot } from "@/types/slots";

interface Photo {
  src: string;
  alt: string;
  credit?: boolean;
}

const REUTERS_CREDIT = "Photo: REUTERS/Lindsay DeDario";

const photos: Photo[] = [
  {
    src: "/photos/reuters/rally-abducted-here.jpg",
    alt: "Demonstrator holding a sign reading 'Your neighbors were abducted here'",
    credit: true,
  },
  {
    src: "/photos/campaign/ice-fuera-250-delaware.jpg",
    alt: "Supporter holding a yellow '¡ICE Fuera! de 250 Delaware' sign",
  },
  {
    src: "/photos/reuters/rally-evict-ice-signs.jpg",
    alt: "Demonstrators holding 'Evict ICE from 250 Delaware' signs",
    credit: true,
  },
  {
    src: "/photos/campaign/family-matters-too.jpg",
    alt: "Demonstrators holding signs reading 'My family matters too' and 'Mi abuela no es criminal'",
  },
  {
    src: "/photos/campaign/sign-ice-out-now.jpg",
    alt: "A handmade 'ICE Out Now!!' sign held at a demonstration",
  },
  {
    src: "/photos/reuters/rally-street-signs.jpg",
    alt: "Demonstrators on the street holding 'Abolish ICE' signs",
    credit: true,
  },
  {
    src: "/photos/campaign/free-dolores.jpg",
    alt: "Demonstrators holding '¡ICE Fuera!' and 'Free Dolores' signs outside 250 Delaware",
  },
  {
    src: "/photos/campaign/rally-speakers.jpg",
    alt: "Speakers addressing the crowd outside 250 Delaware",
  },
  {
    src: "/photos/campaign/sign-hands-off-our-neighbors.jpg",
    alt: "Demonstrator holding a 'Hands off our neighbors' sign",
  },
  {
    src: "/photos/campaign/rally-speaker-megaphone.jpg",
    alt: "Speaker addressing demonstrators with a megaphone",
  },
];

// Events to feature on the homepage: every upcoming event marked `featured`,
// plus a single next occurrence of the standing weekly picket. Includes active
// signup counts. Returns [] on any error so the section still renders.
async function getHomepageSlots(): Promise<Slot[]> {
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabaseAdmin
    .from("slots")
    .select("*")
    .gte("date", today)
    .order("date", { ascending: true })
    .order("start_time", { ascending: true });
  if (error || !data) return [];

  const { data: counts } = await supabaseAdmin
    .from("signups")
    .select("slot_id")
    .is("cancelled_at", null);

  const countMap: Record<string, number> = {};
  for (const row of counts || []) {
    countMap[row.slot_id] = (countMap[row.slot_id] || 0) + 1;
  }

  const slots = (data as Slot[]).map((s) => ({
    ...s,
    signup_count: countMap[s.id] || 0,
  }));

  // Featured events, plus the single soonest upcoming picket (the list is
  // already date-sorted, so the first picket is the next one).
  const chosen = slots.filter((s) => s.featured);
  const nextPicket = slots.find((s) => s.type === "picket");
  if (nextPicket && !chosen.some((s) => s.id === nextPicket.id)) {
    chosen.push(nextPicket);
  }

  return chosen.sort((a, b) =>
    a.date === b.date
      ? a.start_time.localeCompare(b.start_time)
      : a.date.localeCompare(b.date),
  );
}

// "Stand With Us" — the weekly-picket invite plus the next few special
// (non-picket) events, on a yellow band. The demonstration photos follow on
// their own black band.
export const OnTheGroundCarousel = async () => {
  const slots = await getHomepageSlots();

  return (
    <>
      <section className="bg-[#FFD600] text-black border-y-2 border-black py-10 md:py-14">
        <div className="px-6 md:px-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-black text-2xl md:text-3xl uppercase tracking-wide">
              Stand With Us
            </h2>
            <p className="mt-2 leading-relaxed text-black/80">
              We&apos;re out in front of 250 Delaware Ave{" "}
              <span className="font-bold text-[#DC2626]">
                every Tuesday from 4:30–5:30pm
              </span>
              . Join us.
            </p>
            {slots.length > 0 && (
              <div className="mt-8 max-w-3xl">
                <h3 className="font-black text-base md:text-lg uppercase tracking-wider text-black">
                  Upcoming Events
                </h3>
                <ul className="mt-4 border-t-2 border-black">
                  {slots.map((s) => (
                    <EventRow key={s.id} slot={s} />
                  ))}
                </ul>
              </div>
            )}

            <Link
              href="/events"
              className="mt-8 inline-block font-black text-sm uppercase tracking-wider text-black hover:text-[#DC2626] transition"
            >
              See all events &amp; details &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-12 md:py-16">
        <div className="px-6 md:px-10 mb-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-black text-2xl md:text-3xl uppercase tracking-wide">
              On the Ground
            </h2>
          </div>
        </div>

        <SwipeCarousel
          tone="light"
          gapClassName="gap-3"
          ariaLabel="Photos from the ground"
        >
          {photos.map((photo) => (
            <figure
              key={photo.src}
              className="relative shrink-0 snap-start h-64 md:h-80 aspect-square overflow-hidden"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 320px, 256px"
                className="object-cover"
              />
              {photo.credit && (
                <figcaption className="absolute bottom-0 right-0 bg-black/70 text-white/90 text-[10px] leading-none px-1.5 py-1">
                  {REUTERS_CREDIT}
                </figcaption>
              )}
            </figure>
          ))}
        </SwipeCarousel>
      </section>
    </>
  );
};
