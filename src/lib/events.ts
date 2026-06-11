import type { Slot } from "@/types/slots";

// Local-time YYYY-MM-DD key (matches the slot.date format without TZ drift).
export function localKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

// Monday-start week (M T W T F S S).
export function startOfWeekMonday(d: Date): Date {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const offset = (x.getDay() + 6) % 7; // Sun=0 -> 6, Mon=1 -> 0, ...
  x.setDate(x.getDate() - offset);
  return x;
}

// 6-week (42-day) Monday-start grid covering the given month.
export function monthGridMonday(year: number, month: number): Date[] {
  const start = startOfWeekMonday(new Date(year, month, 1));
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}

export function groupByDate(slots: Slot[]): Record<string, Slot[]> {
  const map: Record<string, Slot[]> = {};
  for (const s of slots) {
    (map[s.date] ||= []).push(s);
  }
  return map;
}

export const WEEKDAY_LETTERS = ["M", "T", "W", "T", "F", "S", "S"];
