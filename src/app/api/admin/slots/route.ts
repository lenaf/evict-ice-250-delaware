import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

// GET /api/admin/slots — list all slots (upcoming + past) with signup counts
export async function GET(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const authHeader = request.headers.get("x-admin-password");
  if (!adminPassword || authHeader !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: slots, error } = await supabaseAdmin
    .from("slots")
    .select("*")
    .order("date", { ascending: false })
    .order("start_time", { ascending: false });

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
