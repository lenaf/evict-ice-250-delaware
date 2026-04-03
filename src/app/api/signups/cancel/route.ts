import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

// POST /api/signups/cancel — cancel a signup via token
export async function POST(request: Request) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ error: "Token required" }, { status: 400 });
  }

  const { data: signup, error } = await supabaseAdmin
    .from("signups")
    .update({ cancelled_at: new Date().toISOString() })
    .eq("cancel_token", token)
    .is("cancelled_at", null)
    .select("id, slot_id")
    .single();

  if (error || !signup) {
    return NextResponse.json(
      { error: "Signup not found or already cancelled" },
      { status: 404 },
    );
  }

  return NextResponse.json({ ok: true });
}
