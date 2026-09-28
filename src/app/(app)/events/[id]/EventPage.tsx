"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Slot } from "@/types/slots";
import { EventDetails } from "@/components/EventDetails";

interface EventPageProps {
  slot: Slot;
}

// Standalone event view: the same details + signup as the modal, where
// "Close" goes back to the full events list.
export const EventPage: React.FC<EventPageProps> = ({ slot }) => {
  const router = useRouter();
  return (
    <div>
      <Link
        href="/events"
        className="mb-6 inline-flex items-center gap-1 font-black text-sm uppercase tracking-wider text-black hover:text-[#DC2626] transition-colors cursor-pointer"
      >
        <span aria-hidden="true">&larr;</span> All events
      </Link>
      <EventDetails slot={slot} onClose={() => router.push("/events")} />
    </div>
  );
};
