"use client";

import React from "react";
import type { Slot } from "@/types/slots";
import { formatDateLong, formatTime } from "@/lib/format";
import { localKey } from "@/lib/events";
import { SignupForm } from "@/components/SignupForm";

interface EventDetailsProps {
  slot: Slot;
  onClose: () => void;
}

// Modal body for a calendar event: title, when/where, the full description,
// then the right signup action (inline form, external link, or nothing if past).
export const EventDetails: React.FC<EventDetailsProps> = ({ slot, onClose }) => {
  const isPast = slot.date < localKey(new Date());

  return (
    <div>
      <h3 className="font-black text-2xl leading-tight mb-2">{slot.title}</h3>
      <p className="text-sm font-bold text-black/70">
        {formatDateLong(slot.date)}
        {" · "}
        {formatTime(slot.start_time)} – {formatTime(slot.end_time)}
      </p>
      <p className="text-sm text-black/70 mb-4">{slot.location}</p>

      {slot.description && (
        <p className="text-sm leading-relaxed whitespace-pre-line mb-6">
          {slot.description}
        </p>
      )}

      {isPast ? (
        <div>
          <p className="text-sm font-bold text-black/50 mb-4">
            This event has already happened.
          </p>
          <button
            onClick={onClose}
            className="text-sm text-black/50 hover:text-black transition cursor-pointer"
          >
            Close
          </button>
        </div>
      ) : slot.signup_link ? (
        <div className="space-y-4">
          <a
            href={slot.signup_link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-[#DC2626] hover:bg-black text-white font-black text-lg tracking-wider py-3 px-6 border-2 border-black uppercase transition cursor-pointer"
          >
            Sign up &rarr;
          </a>
          <div className="text-center">
            <button
              onClick={onClose}
              className="text-sm text-black/50 hover:text-black transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <SignupForm
          slot={slot}
          showHeader={false}
          onSuccess={onClose}
          onClose={onClose}
        />
      )}
    </div>
  );
};
