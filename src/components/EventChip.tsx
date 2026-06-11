"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import type { Slot } from "@/types/slots";
import { formatTime } from "@/lib/format";
import { localKey } from "@/lib/events";
import { SignupForm } from "@/components/SignupForm";

interface EventChipProps {
  slot: Slot;
}

// A compact, clickable event marker for calendar cells. Opens the signup form
// (or an external signup link) the same way the slot cards do.
export const EventChip: React.FC<EventChipProps> = ({ slot }) => {
  const [open, setOpen] = useState(false);
  const cls =
    "block w-full text-left bg-[#DC2626] hover:opacity-80 text-white text-[10px] md:text-xs font-bold leading-tight px-1.5 py-1 transition cursor-pointer truncate no-underline";
  const label = `${formatTime(slot.start_time)} · ${slot.title}`;

  // Past events are shown for the record but can't be signed up for.
  const isPast = slot.date < localKey(new Date());
  if (isPast) {
    return (
      <span
        className="block w-full text-left bg-black/10 text-black/50 text-[10px] md:text-xs font-bold leading-tight px-1.5 py-1 truncate"
        title={slot.title}
      >
        {label}
      </span>
    );
  }

  if (slot.signup_link) {
    return (
      <a
        href={slot.signup_link}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        title={slot.title}
      >
        {label}
      </a>
    );
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className={cls} title={slot.title}>
        {label}
      </button>
      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="bg-white text-black w-full max-w-md p-6 md:p-8 max-h-[90vh] overflow-y-auto">
              <SignupForm
                slot={slot}
                onSuccess={() => setOpen(false)}
                onClose={() => setOpen(false)}
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
