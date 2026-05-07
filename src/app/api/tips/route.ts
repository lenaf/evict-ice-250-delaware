import { NextResponse } from "next/server";
import { getResend, getFromEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json();
  const { message, email } = body;

  const trimmed = (message || "").trim();
  if (!trimmed || trimmed.length > 5000) {
    return NextResponse.json(
      { error: "Message is required (max 5000 characters)" },
      { status: 400 },
    );
  }

  const contactLine = email
    ? `<p style="margin-top: 16px; color: #555;">Reply-to contact provided: <strong>${email}</strong></p>`
    : `<p style="margin-top: 16px; color: #888;"><em>No contact info provided (anonymous)</em></p>`;

  try {
    await getResend().emails.send({
      from: getFromEmail(),
      to: [
        "evictice250delaware@gmail.com",
        "evictice250delaware@proton.me",
      ],
      replyTo: email || undefined,
      subject: "New Anonymous Tip",
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px;">
          <h2 style="color: #1E3A8A;">New Tip Received</h2>
          <div style="background: #F8FAFC; padding: 16px; border-left: 4px solid #FFD600; margin: 16px 0; white-space: pre-wrap;">${trimmed}</div>
          ${contactLine}
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send tip" },
      { status: 500 },
    );
  }
}
