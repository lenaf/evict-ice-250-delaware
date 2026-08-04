"use client";

import React, { useState } from "react";
import type { Slot } from "@/types/slots";
import { formatTime } from "@/lib/format";
import { EventModal } from "@/components/EventModal";
import { ProgressBar } from "@/components/ProgressBar";

interface EventCardLargeProps {
  slot: Slot;
}

const monthAbbr = (date: string) =>
  new Date(date + "T00:00:00")
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();

const dayNum = (date: string) => new Date(date + "T00:00:00").getDate();

// Image-forward event card, shared by the events page list and the homepage
// carousel. Shows the event photo (or a red date-block fallback), a date badge,
// title, time, location, and a "spots left" bar when a volunteer target is set.
// Clicking opens the shared details/RSVP modal.
export const EventCardLarge: React.FC<EventCardLargeProps> = ({ slot }) => {
  const [open, setOpen] = useState(false);
  const target = slot.target_volunteers;
  const count = slot.signup_count ?? 0;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex h-full w-full flex-col overflow-hidden border-2 border-black bg-white text-left text-black transition hover:border-[#DC2626] cursor-pointer"
      >
        {slot.image_url ? (
          <div className="relative aspect-[16/9] border-b-2 border-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slot.image_url}
              alt={slot.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="flex aspect-[16/9] flex-col items-center justify-center border-b-2 border-black bg-[#DC2626] text-white">
            <div className="font-black text-sm uppercase tracking-[0.2em]">
              {monthAbbr(slot.date)}
            </div>
            <div className="font-black text-6xl leading-none">
              {dayNum(slot.date)}
            </div>
          </div>
        )}

        <div className="flex flex-1 flex-col p-4">
          <div className="mb-2 flex items-start gap-3">
            {slot.image_url && (
              <div className="shrink-0 text-center leading-none">
                <div className="font-black text-[10px] uppercase tracking-wider text-[#DC2626]">
                  {monthAbbr(slot.date)}
                </div>
                <div className="font-black text-2xl">{dayNum(slot.date)}</div>
              </div>
            )}
            <div className="min-w-0">
              <h3 className="font-black text-lg leading-tight group-hover:text-[#DC2626] transition-colors">
                {slot.title}
              </h3>
              <p className="mt-1 text-sm text-black/70 leading-snug">
                {formatTime(slot.start_time)} – {formatTime(slot.end_time)}
                {slot.location ? ` · ${slot.location}` : ""}
              </p>
            </div>
          </div>

          {target != null && target > 0 && (
            <div className="mt-auto pt-2">
              <ProgressBar current={count} target={target} />
            </div>
          )}
        </div>
      </button>
      <EventModal slot={slot} open={open} onClose={() => setOpen(false)} />
    </>
  );
};
