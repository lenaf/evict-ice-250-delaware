import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

function getFromEmail() {
  return process.env.FROM_EMAIL || "Evict ICE 250 Delaware <noreply@evictice250delaware.com>";
}

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://evictice250delaware.com";
}

import { formatDateLong as formatDate, formatTime } from "@/lib/format";

function generateIcsContent(slot: {
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  description?: string | null;
}) {
  const startDt = slot.date.replace(/-/g, "") + "T" + slot.start_time.replace(/:/g, "") + "00";
  const endDt = slot.date.replace(/-/g, "") + "T" + slot.end_time.replace(/:/g, "") + "00";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//EvictICE250//EN",
    "BEGIN:VEVENT",
    `DTSTART:${startDt}`,
    `DTEND:${endDt}`,
    `SUMMARY:${slot.title}`,
    `LOCATION:${slot.location}`,
    `DESCRIPTION:${slot.description || "Volunteer shift for Evict ICE 250 Delaware"}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function googleCalUrl(slot: {
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
}) {
  const startDt = slot.date.replace(/-/g, "") + "T" + slot.start_time.replace(/:/g, "") + "00";
  const endDt = slot.date.replace(/-/g, "") + "T" + slot.end_time.replace(/:/g, "") + "00";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: slot.title,
    dates: `${startDt}/${endDt}`,
    location: slot.location,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export async function sendConfirmationEmail(
  to: string,
  name: string,
  slot: {
    title: string;
    date: string;
    start_time: string;
    end_time: string;
    location: string;
    description?: string | null;
  },
  cancelToken: string,
) {
  const cancelUrl = `${getSiteUrl()}/show-up/cancel?token=${cancelToken}`;
  const gcalUrl = googleCalUrl(slot);
  const icsContent = generateIcsContent(slot);
  const icsBase64 = Buffer.from(icsContent).toString("base64");

  await getResend().emails.send({
    from: getFromEmail(),
    to,
    subject: `You're signed up: ${slot.title}`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 500px;">
        <h2 style="color: #1E3A8A;">You're signed up, ${name}!</h2>
        <div style="background: #F8FAFC; padding: 16px; border-left: 4px solid #FFD600; margin: 16px 0;">
          <p style="margin: 0 0 4px; font-weight: bold;">${slot.title}</p>
          <p style="margin: 0 0 4px; color: #555;">${formatDate(slot.date)}</p>
          <p style="margin: 0 0 4px; color: #555;">${formatTime(slot.start_time)} – ${formatTime(slot.end_time)}</p>
          <p style="margin: 0; color: #555;">${slot.location}</p>
        </div>
        <p>
          <a href="${gcalUrl}" style="display: inline-block; background: #1E3A8A; color: white; padding: 10px 20px; text-decoration: none; font-weight: bold; margin-right: 8px;">Add to Google Calendar</a>
        </p>
        <p style="font-size: 13px; color: #888; margin-top: 24px;">
          Can't make it? <a href="${cancelUrl}">Cancel your signup</a>
        </p>
      </div>
    `,
    attachments: [
      {
        filename: "event.ics",
        content: icsBase64,
        contentType: "text/calendar",
      },
    ],
  });
}

export async function sendReminderEmail(
  to: string,
  name: string,
  slot: {
    title: string;
    date: string;
    start_time: string;
    end_time: string;
    location: string;
  },
  cancelToken: string,
) {
  const cancelUrl = `${getSiteUrl()}/show-up/cancel?token=${cancelToken}`;

  await getResend().emails.send({
    from: getFromEmail(),
    to,
    subject: `Reminder: ${slot.title} is tomorrow`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 500px;">
        <h2 style="color: #1E3A8A;">See you tomorrow, ${name}!</h2>
        <div style="background: #F8FAFC; padding: 16px; border-left: 4px solid #FFD600; margin: 16px 0;">
          <p style="margin: 0 0 4px; font-weight: bold;">${slot.title}</p>
          <p style="margin: 0 0 4px; color: #555;">${formatDate(slot.date)}</p>
          <p style="margin: 0 0 4px; color: #555;">${formatTime(slot.start_time)} – ${formatTime(slot.end_time)}</p>
          <p style="margin: 0; color: #555;">${slot.location}</p>
        </div>
        <p style="font-size: 13px; color: #888; margin-top: 24px;">
          Can't make it? <a href="${cancelUrl}">Cancel your signup</a>
        </p>
      </div>
    `,
  });
}

export async function sendCancellationNotice(
  to: string,
  name: string,
  slot: {
    title: string;
    date: string;
    start_time: string;
    end_time: string;
    location: string;
  },
  changeType: "deleted" | "updated",
) {
  const subject =
    changeType === "deleted"
      ? `Cancelled: ${slot.title}`
      : `Updated: ${slot.title}`;

  const message =
    changeType === "deleted"
      ? "This volunteer slot has been cancelled."
      : "This volunteer slot has been updated. Please check the new details below.";

  await getResend().emails.send({
    from: getFromEmail(),
    to,
    subject,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 500px;">
        <h2 style="color: #DC2626;">${subject}</h2>
        <p>${message}</p>
        <div style="background: #F8FAFC; padding: 16px; border-left: 4px solid ${changeType === "deleted" ? "#DC2626" : "#FFD600"}; margin: 16px 0;">
          <p style="margin: 0 0 4px; font-weight: bold;">${slot.title}</p>
          <p style="margin: 0 0 4px; color: #555;">${formatDate(slot.date)}</p>
          <p style="margin: 0 0 4px; color: #555;">${formatTime(slot.start_time)} – ${formatTime(slot.end_time)}</p>
          <p style="margin: 0; color: #555;">${slot.location}</p>
        </div>
        ${changeType === "updated" ? `<p><a href="${getSiteUrl()}/show-up" style="color: #1E3A8A; font-weight: bold;">View updated details</a></p>` : ""}
      </div>
    `,
  });
}
