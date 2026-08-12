import React from "react";
import Link from "next/link";
import { EventRow } from "@/components/EventRow";
import { supabaseAdmin } from "@/lib/supabase-server";
import type { Slot } from "@/types/slots";

// Events to feature on the homepage: each upcoming event marked `featured`
// (its next date only, so a multi-date event doesn't repeat), plus a single
// next occurrence of the standing weekly picket. Includes active signup counts.
// Returns [] on any error so the section still renders.
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

  // Featured events (soonest date per event), plus the single soonest upcoming
  // picket. The list is date-sorted, so the first row of each group_id is its
  // next date — dedupe on group_id so a multi-date event shows once.
  const seenGroups = new Set<string>();
  const chosen: Slot[] = [];
  for (const s of slots) {
    if (!s.featured) continue;
    const g = s.group_id || s.id;
    if (seenGroups.has(g)) continue;
    seenGroups.add(g);
    chosen.push(s);
  }
  const nextPicket = slots.find((s) => s.type === "picket");
  if (nextPicket && !seenGroups.has(nextPicket.group_id || nextPicket.id)) {
    chosen.push(nextPicket);
  }

  return chosen.sort((a, b) =>
    a.date === b.date
      ? a.start_time.localeCompare(b.start_time)
      : a.date.localeCompare(b.date),
  );
}

// "Stand With Us" — the weekly-picket invite plus any featured upcoming events,
// on a yellow band, as a divided list of rows.
export const StandWithUs = async () => {
  const slots = await getHomepageSlots();

  return (
    <section className="bg-white text-black border-b-2 border-black py-10 md:py-14">
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
  );
};
