import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-server";
import { getAdminUser } from "@/lib/adminAuth";
import { getPayload } from "@/lib/payload";
import { logAudit } from "@/payload/audit";

export const dynamic = "force-dynamic";

// GET /api/slots — list slots with signup counts.
// Defaults to upcoming only; pass ?range=all to include past events too.
export async function GET(request: Request) {
  const includeAll =
    new URL(request.url).searchParams.get("range") === "all";
  const today = new Date().toISOString().split("T")[0];

  let query = supabaseAdmin
    .from("slots")
    .select("*")
    .order("date", { ascending: true })
    .order("start_time", { ascending: true });
  if (!includeAll) query = query.gte("date", today);

  const { data: slots, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Get signup counts
  const { data: counts } = await supabaseAdmin
    .from("signups")
    .select("slot_id")
    .is("cancelled_at", null);

  const countMap: Record<string, number> = {};
  for (const row of counts || []) {
    countMap[row.slot_id] = (countMap[row.slot_id] || 0) + 1;
  }

  const slotsWithCounts = (slots ?? []).map((slot) => ({
    ...slot,
    signup_count: countMap[slot.id] || 0,
  }));

  return NextResponse.json(slotsWithCounts);
}

// POST /api/slots — create an event (admin only). One event can span multiple
// dates: we insert one row per date, all sharing a group_id, so per-date RSVPs
// and reminders keep working while the event is edited in one place.
export async function POST(request: Request) {
  const user = await getAdminUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { type, title, description, dates, date, start_time, end_time, location, target_volunteers, signup_link, image_url, featured } = body;

  // Accept a dates[] (multi-date) or a single `date` for back-compat. Dedupe.
  const dateList: string[] = Array.from(
    new Set(
      (Array.isArray(dates) && dates.length ? dates : date ? [date] : []).filter(
        Boolean,
      ),
    ),
  );

  if (!title || dateList.length === 0 || !start_time || !end_time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const group_id = randomUUID();
  const shared = {
    type: type || "picket",
    title,
    description: description || null,
    start_time,
    end_time,
    location: location || "250 Delaware Ave, Buffalo, NY",
    target_volunteers: target_volunteers || null,
    signup_link: signup_link || null,
    image_url: image_url || null,
    featured: featured || false,
    group_id,
  };

  const { data: slots, error } = await supabaseAdmin
    .from("slots")
    .insert(dateList.map((d) => ({ ...shared, date: d })))
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await logAudit(await getPayload(), {
    action: "created",
    entity: "Event",
    label: dateList.length > 1 ? `${title} (${dateList.length} dates)` : title,
    docId: group_id,
    user: user.email,
  });

  // Refresh the statically-cached homepage carousel + events list.
  revalidatePath("/");
  revalidatePath("/events");

  return NextResponse.json({ group_id, slots }, { status: 201 });
}
