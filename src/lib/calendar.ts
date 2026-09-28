// Add-to-calendar helpers shared by the event page and the signup emails.
// Times are Buffalo local (America/New_York), stored as YYYY-MM-DD + HH:MM.

export interface CalendarSlot {
  id?: string;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  description?: string | null;
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://evictice250delaware.com";
}

export function eventUrl(id: string) {
  return `${getSiteUrl()}/events/${id}`;
}

const stamp = (date: string, time: string) =>
  date.replace(/-/g, "") + "T" + time.slice(0, 5).replace(":", "") + "00";

// Escape text per RFC 5545 (backslash, comma, semicolon, newline).
const icsText = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/[,;]/g, (c) => `\\${c}`).replace(/\r?\n/g, "\\n");

export function generateIcsContent(slot: CalendarSlot) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//EvictICE250//EN",
    "BEGIN:VEVENT",
    ...(slot.id ? [`UID:${slot.id}@evictice250delaware.com`, `URL:${eventUrl(slot.id)}`] : []),
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART;TZID=America/New_York:${stamp(slot.date, slot.start_time)}`,
    `DTEND;TZID=America/New_York:${stamp(slot.date, slot.end_time)}`,
    `SUMMARY:${icsText(slot.title)}`,
    `LOCATION:${icsText(slot.location)}`,
    `DESCRIPTION:${icsText(slot.description || "Evict ICE 250 Delaware")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function googleCalUrl(slot: CalendarSlot) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: slot.title,
    dates: `${stamp(slot.date, slot.start_time)}/${stamp(slot.date, slot.end_time)}`,
    ctz: "America/New_York",
    location: slot.location,
    details: [slot.description, slot.id && eventUrl(slot.id)].filter(Boolean).join("\n\n"),
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}
