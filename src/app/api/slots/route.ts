import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

// GET /api/slots — list upcoming slots with signup counts
export async function GET() {
  const today = new Date().toISOString().split("T")[0];

  const { data: slots, error } = await supabaseAdmin
    .from("slots")
    .select("*")
    .gte("date", today)
    .order("date", { ascending: true })
    .order("start_time", { ascending: true });

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

  const slotsWithCounts = slots.map((slot) => ({
    ...slot,
    signup_count: countMap[slot.id] || 0,
  }));

  return NextResponse.json(slotsWithCounts);
}

// POST /api/slots — create a new slot (admin only)
export async function POST(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const authHeader = request.headers.get("x-admin-password");
  if (!adminPassword || authHeader !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, description, date, start_time, end_time, location, target_volunteers, recurrence, recurrence_end_date } = body;

  if (!title || !date || !start_time || !end_time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Create the first slot
  const { data: slot, error } = await supabaseAdmin
    .from("slots")
    .insert({
      title,
      description: description || null,
      date,
      start_time,
      end_time,
      location: location || "250 Delaware Ave, Buffalo, NY",
      target_volunteers: target_volunteers || 5,
      recurrence: recurrence || "none",
      recurrence_end_date: recurrence_end_date || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // If recurring, generate future slots
  if (recurrence && recurrence !== "none" && recurrence_end_date) {
    const interval = recurrence === "weekly" ? 7 : 14;
    const endDate = new Date(recurrence_end_date);
    const slots = [];
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + interval);

    while (currentDate <= endDate) {
      slots.push({
        title,
        description: description || null,
        date: currentDate.toISOString().split("T")[0],
        start_time,
        end_time,
        location: location || "250 Delaware Ave, Buffalo, NY",
        target_volunteers: target_volunteers || 5,
        recurrence,
        recurrence_end_date,
        parent_slot_id: slot.id,
      });
      currentDate.setDate(currentDate.getDate() + interval);
    }

    if (slots.length > 0) {
      await supabaseAdmin.from("slots").insert(slots);
    }
  }

  return NextResponse.json(slot, { status: 201 });
}
