import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { sendCancellationNotice } from "@/lib/email";

// GET /api/slots/[id] — get slot details + signups (admin only for signups)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const authHeader = request.headers.get("x-admin-password");
  const isAdmin = adminPassword && authHeader === adminPassword;

  const { data: slot, error } = await supabaseAdmin
    .from("slots")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !slot) {
    return NextResponse.json({ error: "Slot not found" }, { status: 404 });
  }

  // Get signup count
  const { count } = await supabaseAdmin
    .from("signups")
    .select("*", { count: "exact", head: true })
    .eq("slot_id", id)
    .is("cancelled_at", null);

  const result: Record<string, unknown> = { ...slot, signup_count: count || 0 };

  // Include full signup details for admin
  if (isAdmin) {
    const { data: signups } = await supabaseAdmin
      .from("signups")
      .select("*")
      .eq("slot_id", id)
      .is("cancelled_at", null)
      .order("created_at", { ascending: true });

    result.signups = signups || [];
  }

  return NextResponse.json(result);
}

// PUT /api/slots/[id] — update a slot (admin only)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const authHeader = request.headers.get("x-admin-password");
  if (!adminPassword || authHeader !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const { data: slot, error } = await supabaseAdmin
    .from("slots")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Notify signed-up volunteers about the change
  const { data: signups } = await supabaseAdmin
    .from("signups")
    .select("email, name")
    .eq("slot_id", id)
    .is("cancelled_at", null);

  if (signups && signups.length > 0) {
    await Promise.allSettled(
      signups.map((s) => sendCancellationNotice(s.email, s.name, slot, "updated")),
    );
  }

  return NextResponse.json(slot);
}

// DELETE /api/slots/[id] — delete a slot (admin only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const authHeader = request.headers.get("x-admin-password");
  if (!adminPassword || authHeader !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get slot details and signups before deleting
  const { data: slot } = await supabaseAdmin
    .from("slots")
    .select("*")
    .eq("id", id)
    .single();

  const { data: signups } = await supabaseAdmin
    .from("signups")
    .select("email, name")
    .eq("slot_id", id)
    .is("cancelled_at", null);

  // Delete the slot (cascades to signups)
  const { error } = await supabaseAdmin.from("slots").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Notify volunteers
  if (slot && signups && signups.length > 0) {
    await Promise.allSettled(
      signups.map((s) => sendCancellationNotice(s.email, s.name, slot, "deleted")),
    );
  }

  return NextResponse.json({ ok: true });
}
