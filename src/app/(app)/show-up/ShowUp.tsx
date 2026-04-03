"use client";

import React, { useState, useEffect } from "react";
import type { Slot } from "@/types/slots";
import { SlotCard } from "@/components/SlotCard";

export const ShowUp: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/slots")
      .then((r) => r.json())
      .then((data) => setSlots(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#1E3A8A] text-white px-6 md:px-10 pt-28 pb-14 md:pt-36 md:pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-black text-4xl md:text-5xl leading-[0.95] mb-4">
            Stand With Us.
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl">
            We need people on the ground. Sign up for a volunteer shift and help us
            evict ICE from 250 Delaware.
          </p>
        </div>
      </section>

      {/* Slots list */}
      <section className="bg-white px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-black/50 text-lg">Loading shifts...</p>
            </div>
          ) : slots.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-bold text-xl mb-2">No upcoming shifts right now.</p>
              <p className="text-black/50">
                Check back soon — new shifts are added regularly.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {slots.map((slot) => (
                <SlotCard key={slot.id} slot={slot} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
