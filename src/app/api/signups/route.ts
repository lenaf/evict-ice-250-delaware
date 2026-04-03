import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { sendConfirmationEmail } from "@/lib/email";

// POST /api/signups — sign up for a slot
export async function POST(request: Request) {
  const body = await request.json();
  const { slot_id, name, email, phone } = body;

  if (!slot_id || !name || !email || !phone) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // Check slot exists
  const { data: slot, error: slotError } = await supabaseAdmin
    .from("slots")
    .select("*")
    .eq("id", slot_id)
    .single();

  if (slotError || !slot) {
    return NextResponse.json({ error: "Slot not found" }, { status: 404 });
  }

  // Check for existing signup (including cancelled)
  const { data: existing } = await supabaseAdmin
    .from("signups")
    .select("*")
    .eq("slot_id", slot_id)
    .eq("email", email.toLowerCase())
    .single();

  if (existing) {
    if (!existing.cancelled_at) {
      return NextResponse.json(
        { error: "You're already signed up for this slot" },
        { status: 409 },
      );
    }

    // Re-activate cancelled signup
    const { data: updated } = await supabaseAdmin
      .from("signups")
      .update({ name, phone, cancelled_at: null, reminder_sent: false })
      .eq("id", existing.id)
      .select()
      .single();

    if (updated) {
      sendConfirmationEmail(email, name, slot, updated.cancel_token).catch(console.error);
    }

    return NextResponse.json({ ok: true, signup_id: existing.id }, { status: 201 });
  }

  // Insert new signup
  const { data: signup, error } = await supabaseAdmin
    .from("signups")
    .insert({ slot_id, name, email: email.toLowerCase(), phone })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Send confirmation email (don't block response on email)
  sendConfirmationEmail(email, name, slot, signup.cancel_token).catch(console.error);

  return NextResponse.json({ ok: true, signup_id: signup.id }, { status: 201 });
}
