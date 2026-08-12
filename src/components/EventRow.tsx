"use client";

import React, { useState } from "react";
import type { Slot } from "@/types/slots";
import { formatTime } from "@/lib/format";
import { EventModal } from "@/components/EventModal";

interface EventRowProps {
  slot: Slot;
}

const atNoon = (date: string) => new Date(date + "T00:00:00");
const weekdayAbbr = (date: string) =>
  atNoon(date).toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
const monthAbbr = (date: string) =>
  atNoon(date).toLocaleDateString("en-US", { month: "short" }).toUpperCase();
const dayNum = (date: string) => atNoon(date).getDate();

// Horizontal event row for the "Upcoming" lists (homepage + /events). A compact
// date column, optional photo, the title, and — on desktop — a right-aligned
// time/location column so the row spans the full width. Opens the RSVP modal.
export const EventRow: React.FC<EventRowProps> = ({ slot }) => {
  const [open, setOpen] = useState(false);
  const time = `${formatTime(slot.start_time)} – ${formatTime(slot.end_time)}`;

  return (
    <li>
      <button
        onClick={() => setOpen(true)}
        className="group flex w-full items-center gap-4 md:gap-6 border-b-2 border-black py-4 text-left cursor-pointer"
      >
        {/* Date */}
        <span className="flex shrink-0 flex-col items-center justify-center w-12 md:w-16 leading-none">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#DC2626]">
            {weekdayAbbr(slot.date)}
          </span>
          <span className="text-2xl md:text-3xl font-black tabular-nums">
            {dayNum(slot.date)}
          </span>
          <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-black/60">
            {monthAbbr(slot.date)}
          </span>
        </span>

        {/* Title (+ time/location stacked under it on mobile) */}
        <span className="min-w-0 flex-1">
          <span className="block font-black text-base md:text-xl leading-tight group-hover:text-[#DC2626] transition-colors">
            {slot.title}
          </span>
          <span className="mt-1 block text-sm md:text-base font-semibold text-black/80">
            {time}
          </span>
          {slot.location && (
            <span className="block text-xs md:text-sm text-black/60">{slot.location}</span>
          )}
        </span>

        <span className="flex shrink-0 items-center gap-1 font-black text-xs md:text-sm uppercase tracking-wider text-black/70 group-hover:text-[#DC2626] transition-colors">
          <span className="hidden sm:inline">Sign up</span>
          <span aria-hidden="true" className="text-base leading-none">
            &rarr;
          </span>
        </span>
      </button>
      <EventModal slot={slot} open={open} onClose={() => setOpen(false)} />
    </li>
  );
};
