import { getSlot } from "@/lib/slots";
import { googleCalUrl } from "@/lib/calendar";

// Redirect to Google Calendar's prefilled event. Going through our own URL keeps
// iOS from handing calendar.google.com to the Calendar app, which drops the event.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const slot = await getSlot((await params).id);
  if (!slot) return new Response("Not found", { status: 404 });
  return Response.redirect(googleCalUrl(slot), 302);
}
