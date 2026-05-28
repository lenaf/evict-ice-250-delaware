"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import type { Slot } from "@/types/slots";
import { SlotCardMini } from "@/components/SlotCardMini";

export const UpcomingSlots: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/slots")
      .then((r) => r.json())
      .then((data) => {
        setSlots(Array.isArray(data) ? data.slice(0, 3) : []);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  if (loaded && slots.length === 0) return null;

  if (!loaded) {
    return (
      <section className="bg-white text-black px-6 md:px-10 py-8 md:py-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-2xl md:text-3xl mb-4">Stand With Us.</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-2 border-black/10 p-4 animate-pulse">
                <div className="h-4 w-20 bg-black/10 rounded mb-2" />
                <div className="h-5 w-40 bg-black/10 rounded mb-2" />
                <div className="h-4 w-32 bg-black/10 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white text-black px-6 md:px-10 py-8 md:py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h2 className="font-black text-2xl md:text-3xl leading-tight">Stand With Us.</h2>
            <p className="text-sm md:text-base text-black">Join us for our weekly pickets and community events.</p>
          </div>
          <Link
            href="/show-up"
            className="text-sm font-bold text-[#DC2626] hover:text-black transition-colors uppercase tracking-wider shrink-0"
          >
            See all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {slots.map((slot) => (
            <SlotCardMini key={slot.id} slot={slot} />
          ))}
        </div>
      </div>
    </section>
  );
};
