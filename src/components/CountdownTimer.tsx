"use client";

import { useState, useEffect } from "react";

function getDaysLeft(targetDate: string) {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return 0;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function InlineDaysLeft({ targetDate, className }: { targetDate: string; className?: string }) {
  const [days, setDays] = useState(getDaysLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setDays(getDaysLeft(targetDate)), 60000);
    return () => clearInterval(id);
  }, [targetDate]);

  return <span className={className}>{days} days</span>;
}
