import React from "react";
import { supabaseAdmin } from "@/lib/supabase-server";
import type { Slot } from "@/types/slots";
import { EventRow } from "@/components/EventRow";

// Upcoming slots (pickets + events), soonest first, with active signup counts.
async function getUpcomingSlotsWithCounts(): Promise<Slot[]> {
  const today = new Date().toISOString().split("T")[0];
  const { data: slots, error } = await supabaseAdmin
    .from("slots")
    .select("*")
    .gte("date", today)
    .order("date", { ascending: true })
    .order("start_time", { ascending: true });
  if (error || !slots) return [];

  const { data: counts } = await supabaseAdmin
    .from("signups")
    .select("slot_id")
    .is("cancelled_at", null);

  const countMap: Record<string, number> = {};
  for (const row of counts || []) {
    countMap[row.slot_id] = (countMap[row.slot_id] || 0) + 1;
  }

  return (slots as Slot[]).map((s) => ({
    ...s,
    signup_count: countMap[s.id] || 0,
  }));
}

// Chronological, image-forward list of upcoming events for the /events page.
export const EventsSection = async () => {
  const slots = await getUpcomingSlotsWithCounts();

  if (slots.length === 0) {
    return (
      <p className="text-base text-black/60">
        No upcoming events right now. Check back soon, or follow us on Instagram
        for the latest.
      </p>
    );
  }

  return (
    <ul className="max-w-5xl border-t-2 border-black">
      {slots.map((slot) => (
        <EventRow key={slot.id} slot={slot} />
      ))}
    </ul>
  );
};
