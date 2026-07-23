"use client";

import React, { useState } from "react";
import type { Slot } from "@/types/slots";
import { formatTime } from "@/lib/format";
import { EventModal } from "@/components/EventModal";

interface EventCardProps {
  slot: Slot;
}

const monthAbbr = (date: string) =>
  new Date(date + "T00:00:00")
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();

const dayNum = (date: string) => new Date(date + "T00:00:00").getDate();

// Homepage event card. Clicking it opens the same details modal as the
// calendar chips (title, description, signup), not the events page.
export const EventCard: React.FC<EventCardProps> = ({ slot }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full h-full gap-4 text-left bg-white text-black border-2 border-black hover:border-[#DC2626] p-4 transition cursor-pointer"
      >
        <div className="shrink-0 text-center leading-none">
          <div className="font-black text-xs uppercase tracking-wider text-[#DC2626]">
            {monthAbbr(slot.date)}
          </div>
          <div className="font-black text-3xl">{dayNum(slot.date)}</div>
        </div>
        <div className="min-w-0">
          <h4 className="font-black text-base leading-tight mb-1">
            {slot.title}
          </h4>
          <p className="text-sm text-black/70 leading-snug">
            {formatTime(slot.start_time)}
            {slot.location ? ` · ${slot.location}` : ""}
          </p>
        </div>
      </button>
      <EventModal slot={slot} open={open} onClose={() => setOpen(false)} />
    </>
  );
};
