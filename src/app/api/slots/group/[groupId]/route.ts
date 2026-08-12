import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-server";
import { sendCancellationNotice } from "@/lib/email";
import { getAdminUser } from "@/lib/adminAuth";
import { getPayload } from "@/lib/payload";
import { logAudit } from "@/payload/audit";
import type { Slot } from "@/types/slots";

// A logical event is a set of slot rows sharing group_id (one row per date).
// PUT reconciles the whole event in one shot: shared fields apply to every
// date, dates with an id are updated, dates without an id are inserted, and
// existing dates omitted from the payload are deleted.

interface IncomingDate {
  id?: string;
  date: string;
}

async function notifySignups(
  slotId: string,
  slot: Slot,
  kind: "updated" | "deleted",
) {
  const { data: signups } = await supabaseAdmin
    .from("signups")
    .select("email, name")
    .eq("slot_id", slotId)
    .is("cancelled_at", null);
  if (signups && signups.length > 0) {
    await Promise.allSettled(
      signups.map((s) => sendCancellationNotice(s.email, s.name, slot, kind)),
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ groupId: string }> },
) {
  const { groupId } = await params;
  const user = await getAdminUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { type, title, description, start_time, end_time, location, target_volunteers, signup_link, image_url, featured, dates } = body;

  const incoming: IncomingDate[] = Array.isArray(dates) ? dates.filter((d) => d?.date) : [];
  if (!title || incoming.length === 0 || !start_time || !end_time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data: existing, error: fetchErr } = await supabaseAdmin
    .from("slots")
    .select("*")
    .eq("group_id", groupId);

  if (fetchErr || !existing || existing.length === 0) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

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
  };

  const existingById = new Map(existing.map((r) => [r.id, r]));
  const keptIds = new Set(
    incoming.map((d) => d.id).filter((id): id is string => !!id && existingById.has(id)),
  );

  // Update kept dates; notify only when something a volunteer cares about
  // (date / time / location) actually changed, so adding a date doesn't email
  // everyone on the other dates.
  for (const d of incoming) {
    if (!d.id || !existingById.has(d.id)) continue;
    const prev = existingById.get(d.id)!;
    const { data: updated, error } = await supabaseAdmin
      .from("slots")
      .update({ ...shared, date: d.date })
      .eq("id", d.id)
      .select()
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    const material =
      prev.date !== d.date ||
      prev.start_time !== start_time ||
      prev.end_time !== end_time ||
      prev.location !== shared.location;
    if (material) await notifySignups(d.id, updated, "updated");
  }

  // Insert added dates (deduped against dates already in the group).
  const existingDates = new Set(existing.map((r) => r.date));
  const newDates = Array.from(
    new Set(incoming.filter((d) => !d.id).map((d) => d.date)),
  ).filter((date) => !existingDates.has(date));
  if (newDates.length > 0) {
    const { error } = await supabaseAdmin
      .from("slots")
      .insert(newDates.map((date) => ({ ...shared, group_id: groupId, date })));
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  // Delete removed dates (rows in the group no longer present in the payload).
  const removed = existing.filter((r) => !keptIds.has(r.id));
  for (const row of removed) {
    await notifySignups(row.id, row, "deleted");
  }
  if (removed.length > 0) {
    const { error } = await supabaseAdmin
      .from("slots")
      .delete()
      .in("id", removed.map((r) => r.id));
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  const dateCount = keptIds.size + newDates.length;
  await logAudit(await getPayload(), {
    action: "updated",
    entity: "Event",
    label: dateCount > 1 ? `${title} (${dateCount} dates)` : title,
    docId: groupId,
    user: user.email,
  });

  revalidatePath("/");
  revalidatePath("/events");

  const { data: slots } = await supabaseAdmin
    .from("slots")
    .select("*")
    .eq("group_id", groupId)
    .order("date", { ascending: true });

  return NextResponse.json({ group_id: groupId, slots: slots ?? [] });
}

// DELETE /api/slots/group/[groupId] — delete a whole event (all its dates).
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ groupId: string }> },
) {
  const { groupId } = await params;
  const user = await getAdminUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: rows } = await supabaseAdmin
    .from("slots")
    .select("*")
    .eq("group_id", groupId);

  if (!rows || rows.length === 0) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const title = (rows[0] as Slot).title;

  for (const row of rows) {
    await notifySignups(row.id, row, "deleted");
  }

  const { error } = await supabaseAdmin
    .from("slots")
    .delete()
    .eq("group_id", groupId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await logAudit(await getPayload(), {
    action: "deleted",
    entity: "Event",
    label: rows.length > 1 ? `${title} (${rows.length} dates)` : title,
    docId: groupId,
    user: user.email,
  });

  revalidatePath("/");
  revalidatePath("/events");

  return NextResponse.json({ ok: true });
}
