"use client";

import React, { useEffect, useState } from "react";
import type { Slot } from "@/types/slots";
import { EventChip } from "@/components/EventChip";
import {
  localKey,
  monthGridMonday,
  groupByDate,
  WEEKDAY_LETTERS,
} from "@/lib/events";

export const EventsCalendar: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const today = new Date();
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });

  useEffect(() => {
    fetch("/api/slots?range=all")
      .then((r) => r.json())
      .then((d) => setSlots(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  const byDate = groupByDate(slots);
  const todayKey = localKey(today);
  const days = monthGridMonday(view.y, view.m);
  const monthLabel = new Date(view.y, view.m, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const shift = (delta: number) =>
    setView((v) => {
      const d = new Date(v.y, v.m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-black text-2xl md:text-3xl">{monthLabel}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => shift(-1)}
            aria-label="Previous month"
            className="w-10 h-10 flex items-center justify-center border-2 border-black text-xl font-black hover:opacity-80 transition cursor-pointer"
          >
            ‹
          </button>
          <button
            onClick={() => shift(1)}
            aria-label="Next month"
            className="w-10 h-10 flex items-center justify-center border-2 border-black text-xl font-black hover:opacity-80 transition cursor-pointer"
          >
            ›
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-3 text-xs font-bold uppercase tracking-wide">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 bg-[#DC2626]" />
          Weekly picket
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 bg-[#FFD600] border border-black" />
          Event
        </span>
      </div>

      <div className="grid grid-cols-7 gap-px bg-black/15 border-2 border-black/15">
        {WEEKDAY_LETTERS.map((l, i) => (
          <div
            key={i}
            className="bg-white text-center text-[10px] md:text-xs font-black uppercase text-black/40 py-2"
          >
            {l}
          </div>
        ))}
        {days.map((d) => {
          const key = localKey(d);
          const inMonth = d.getMonth() === view.m;
          const events = byDate[key] || [];
          const isToday = key === todayKey;
          return (
            <div
              key={key}
              className={`bg-white min-h-[5rem] md:min-h-[7rem] p-1 md:p-1.5 flex flex-col ${
                inMonth ? "" : "opacity-40"
              }`}
            >
              <span
                className={`text-xs md:text-sm font-black ${
                  isToday ? "text-[#DC2626]" : ""
                }`}
              >
                {d.getDate()}
              </span>
              <div className="flex flex-col gap-1 mt-1">
                {events.map((s) => (
                  <EventChip key={s.id} slot={s} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
