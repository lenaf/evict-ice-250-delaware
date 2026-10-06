"use client";

import React, { useEffect, useState } from "react";
import type { Slot } from "@/types/slots";
import { googleCalUrl } from "@/lib/calendar";
import { eventPath } from "@/lib/slug";

interface AddToCalendarProps {
  slot: Slot;
}

const linkClass =
  "text-xs font-black uppercase tracking-wider px-3 py-2 border-2 border-black hover:border-[#DC2626] hover:text-[#DC2626] transition cursor-pointer";

// Add-to-calendar (no signup needed) and a copyable direct link to the event.
export const AddToCalendar: React.FC<AddToCalendarProps> = ({ slot }) => {
  const [copied, setCopied] = useState(false);
  // iOS hands Google Calendar links to the app, which drops the event, so
  // iPhone/iPad get the native .ics prompt only.
  const [isIOS, setIsIOS] = useState(false);
  useEffect(() => {
    setIsIOS(
      /iPhone|iPad|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    );
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${eventPath(slot)}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — nothing to do */
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {!isIOS && (
        <a href={googleCalUrl(slot)} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Google Calendar
        </a>
      )}
      <a href={`/events/${slot.id}/ics`} className={linkClass}>
        {isIOS ? "Add to calendar" : "Apple / Outlook"}
      </a>
      <button type="button" onClick={copyLink} className={linkClass}>
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
};
