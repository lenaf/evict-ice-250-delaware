"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import type { Slot } from "@/types/slots";
import { SlotCard } from "@/components/SlotCard";

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
      <section className="bg-white text-black px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-4xl mb-8">Stand With Us.</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-2 border-black/10 p-5 animate-pulse">
                <div className="h-4 w-20 bg-black/10 rounded mb-2" />
                <div className="h-6 w-40 bg-black/10 rounded mb-2" />
                <div className="h-4 w-32 bg-black/10 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white text-black px-6 md:px-10 py-14 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="font-black text-3xl md:text-4xl">Stand With Us.</h2>
          <Link
            href="/show-up"
            className="text-sm font-bold text-[#DC2626] hover:text-black transition-colors uppercase tracking-wider"
          >
            See all slots &rarr;
          </Link>
        </div>
        <p className="text-base md:text-lg text-black/70 mb-8">We need people on the ground.</p>
        <div className="space-y-4">
          {slots.map((slot) => (
            <SlotCard key={slot.id} slot={slot} />
          ))}
        </div>
      </div>
    </section>
  );
};
