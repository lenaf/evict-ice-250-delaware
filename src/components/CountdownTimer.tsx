"use client";

import { useState, useEffect } from "react";

function getTimeLeft(targetDate: string) {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex gap-4 text-center">
      <Unit value={time.days} label="Days" />
      <Unit value={time.hours} label="Hrs" />
      <Unit value={time.minutes} label="Min" />
      <Unit value={time.seconds} label="Sec" />
    </div>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-5xl md:text-6xl font-extrabold tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs uppercase tracking-widest opacity-70 mt-1">{label}</span>
    </div>
  );
}
