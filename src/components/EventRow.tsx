"use client";

import React, { useState } from "react";
import type { Slot } from "@/types/slots";
import { formatDate, formatTime } from "@/lib/format";
import { EventModal } from "@/components/EventModal";

interface EventRowProps {
  slot: Slot;
}

const monthAbbr = (date: string) =>
  new Date(date + "T00:00:00")
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();

const dayNum = (date: string) => new Date(date + "T00:00:00").getDate();

// Horizontal event row for the homepage "Upcoming" list — thumbnail (photo or a
// red date block), title, date/time, location, and a sign-up affordance. Mirrors
// the divided-list styling of the press section. Opens the shared RSVP modal.
export const EventRow: React.FC<EventRowProps> = ({ slot }) => {
  const [open, setOpen] = useState(false);

  return (
    <li>
      <button
        onClick={() => setOpen(true)}
        className="group flex w-full items-center gap-4 border-b-2 border-black py-4 text-left cursor-pointer"
      >
        {slot.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={slot.image_url}
            alt={slot.title}
            className="h-16 w-16 shrink-0 border-2 border-black object-cover md:h-20 md:w-20"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center border-2 border-black bg-[#DC2626] leading-none text-white md:h-20 md:w-20">
            <div className="text-[10px] font-black uppercase tracking-widest">
              {monthAbbr(slot.date)}
            </div>
            <div className="text-2xl font-black md:text-3xl">
              {dayNum(slot.date)}
            </div>
          </div>
        )}

        <span className="min-w-0 flex-1">
          <span className="block font-black text-lg leading-tight group-hover:text-[#DC2626] transition-colors">
            {slot.title}
          </span>
          <span className="mt-1 block text-sm font-semibold text-black/80">
            {formatDate(slot.date)} · {formatTime(slot.start_time)} –{" "}
            {formatTime(slot.end_time)}
          </span>
          {slot.location && (
            <span className="block text-xs text-black/60">{slot.location}</span>
          )}
        </span>

        <span className="shrink-0 flex items-center gap-1 font-black text-xs md:text-sm uppercase tracking-wider text-black/70 group-hover:text-[#DC2626] transition-colors">
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
