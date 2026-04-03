import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { sendReminderEmail } from "@/lib/email";

// GET /api/cron/reminders — send 24-hour reminder emails
// Called by Vercel cron or external cron service
export async function GET(request: Request) {
  // Verify cron secret
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find slots happening tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const { data: slots } = await supabaseAdmin
    .from("slots")
    .select("*")
    .eq("date", tomorrowStr);

  if (!slots || slots.length === 0) {
    return NextResponse.json({ message: "No slots tomorrow", sent: 0 });
  }

  let totalSent = 0;

  for (const slot of slots) {
    // Get signups that haven't been reminded yet
    const { data: signups } = await supabaseAdmin
      .from("signups")
      .select("*")
      .eq("slot_id", slot.id)
      .is("cancelled_at", null)
      .eq("reminder_sent", false);

    if (!signups || signups.length === 0) continue;

    // Send reminders
    const results = await Promise.allSettled(
      signups.map((s) => sendReminderEmail(s.email, s.name, slot, s.cancel_token)),
    );

    // Mark as reminded
    const sentIds = signups
      .filter((_, i) => results[i].status === "fulfilled")
      .map((s) => s.id);

    if (sentIds.length > 0) {
      await supabaseAdmin
        .from("signups")
        .update({ reminder_sent: true })
        .in("id", sentIds);

      totalSent += sentIds.length;
    }
  }

  return NextResponse.json({ message: "Reminders sent", sent: totalSent });
}
