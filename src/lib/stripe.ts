import Stripe from "stripe";

// Lazily instantiated so a missing key never breaks the build — only the
// donate API route touches this, and only at request time.
let client: Stripe | null = null;

export function getStripe(): Stripe {
  if (!client) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    client = new Stripe(key);
  }
  return client;
}
