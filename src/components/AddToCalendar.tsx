"use client";

import React, { useState } from "react";
import type { Slot } from "@/types/slots";
import { googleCalUrl } from "@/lib/calendar";

interface AddToCalendarProps {
  slot: Slot;
}

const linkClass =
  "text-xs font-black uppercase tracking-wider px-3 py-2 border-2 border-black hover:border-[#DC2626] hover:text-[#DC2626] transition cursor-pointer";

// Add-to-calendar (no signup needed) and a copyable direct link to the event.
export const AddToCalendar: React.FC<AddToCalendarProps> = ({ slot }) => {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/events/${slot.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — nothing to do */
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <a href={googleCalUrl(slot)} target="_blank" rel="noopener noreferrer" className={linkClass}>
        Google Calendar
      </a>
      <a href={`/events/${slot.id}/ics`} className={linkClass}>
        Apple / Outlook
      </a>
      <button type="button" onClick={copyLink} className={linkClass}>
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
};
