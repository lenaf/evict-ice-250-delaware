import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

const MIN_CENTS = 250; // $2.50
const MAX_CENTS = 1_000_000; // $10,000

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cents = Math.round(Number(body?.amount));

    if (!Number.isFinite(cents) || cents < MIN_CENTS || cents > MAX_CENTS) {
      return NextResponse.json(
        { error: "Please enter an amount between $2.50 and $10,000." },
        { status: 400 },
      );
    }

    const paymentIntent = await getStripe().paymentIntents.create({
      amount: cents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      description: "Evict ICE 250 Delaware campaign donation",
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe payment intent error:", err);
    return NextResponse.json(
      { error: "Could not initialize payment. Please try again." },
      { status: 500 },
    );
  }
}
