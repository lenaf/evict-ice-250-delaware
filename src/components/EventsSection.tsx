import React from "react";
import { supabaseAdmin } from "@/lib/supabase-server";
import type { Slot } from "@/types/slots";
import { EventCardLarge } from "@/components/EventCardLarge";

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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {slots.map((slot) => (
        <EventCardLarge key={slot.id} slot={slot} />
      ))}
    </div>
  );
};
