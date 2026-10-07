import { getSlot } from "@/lib/slots";
import { generateIcsContent } from "@/lib/calendar";

// Downloadable .ics for one event (Apple Calendar, Outlook, etc).
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const slot = await getSlot((await params).id);
  if (!slot || !slot.published) return new Response("Not found", { status: 404 });
  return new Response(generateIcsContent(slot), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="evict-ice-${slot.date}.ics"`,
    },
  });
}
