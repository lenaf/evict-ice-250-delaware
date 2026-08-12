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

// Horizontal event row for the "Upcoming" lists (homepage + /events). A big
// date column carries the weekday / day / month; then an optional photo, the
// title and time, and a sign-up affordance. Opens the shared RSVP modal.
export const EventRow: React.FC<EventRowProps> = ({ slot }) => {
  const [open, setOpen] = useState(false);

  return (
    <li>
      <button
        onClick={() => setOpen(true)}
        className="group flex w-full items-center gap-4 md:gap-8 border-b-2 border-black py-5 md:py-8 text-left cursor-pointer"
      >
        {/* Date — always prominent, sized up on desktop. */}
        <span className="flex shrink-0 flex-col items-center justify-center w-14 md:w-28 leading-none">
          <span className="text-[10px] md:text-sm font-black uppercase tracking-widest text-[#DC2626]">
            {weekdayAbbr(slot.date)}
          </span>
          <span className="text-4xl md:text-7xl font-black tabular-nums">
            {dayNum(slot.date)}
          </span>
          <span className="text-[10px] md:text-sm font-black uppercase tracking-widest text-black/60">
            {monthAbbr(slot.date)}
          </span>
        </span>

        {slot.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={slot.image_url}
            alt={slot.title}
            className="hidden shrink-0 border-2 border-black object-cover sm:block sm:h-20 sm:w-20 md:h-28 md:w-28"
          />
        )}

        <span className="min-w-0 flex-1">
          <span className="block font-black text-xl md:text-3xl leading-tight group-hover:text-[#DC2626] transition-colors">
            {slot.title}
          </span>
          <span className="mt-1 md:mt-2 block text-sm md:text-lg font-semibold text-black/80">
            {formatTime(slot.start_time)} – {formatTime(slot.end_time)}
          </span>
          {slot.location && (
            <span className="mt-0.5 block text-xs md:text-base text-black/60">
              {slot.location}
            </span>
          )}
        </span>

        <span className="flex shrink-0 items-center gap-1 font-black text-xs md:text-base uppercase tracking-wider text-black/70 group-hover:text-[#DC2626] transition-colors">
          <span className="hidden sm:inline">Sign up</span>
          <span aria-hidden="true" className="text-base md:text-xl leading-none">
            &rarr;
          </span>
        </span>
      </button>
      <EventModal slot={slot} open={open} onClose={() => setOpen(false)} />
    </li>
  );
};
