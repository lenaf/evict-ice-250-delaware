"use client";

import React, { useState } from "react";
import type { Slot } from "@/types/slots";
import { formatTime } from "@/lib/format";
import { localKey } from "@/lib/events";
import { EventModal } from "@/components/EventModal";

interface EventChipProps {
  slot: Slot;
}

// A compact, clickable event marker for calendar cells. Clicking it opens a
// details modal (description + when/where) with the signup action inside.
export const EventChip: React.FC<EventChipProps> = ({ slot }) => {
  const [open, setOpen] = useState(false);

  const isPast = slot.date < localKey(new Date());
  const base =
    "block w-full text-left text-[10px] md:text-xs font-bold leading-tight px-1.5 py-1 transition cursor-pointer truncate no-underline hover:opacity-80";
  // Past events read as muted; upcoming events get the yellow highlight and
  // pickets stay red.
  const variant = isPast
    ? "bg-black/10 text-black/50"
    : slot.type === "event"
      ? "bg-[#FFD600] text-black border border-black"
      : "bg-[#DC2626] text-white";
  const cls = `${base} ${variant}`;
  const label = `${formatTime(slot.start_time)} · ${slot.title}`;

  return (
    <>
      <button onClick={() => setOpen(true)} className={cls} title={slot.title}>
        {label}
      </button>
      <EventModal slot={slot} open={open} onClose={() => setOpen(false)} />
    </>
  );
};
