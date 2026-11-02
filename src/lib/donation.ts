import type Stripe from "stripe";

// Payment methods hidden from the donate form. Cash App has its own tab, and
// pay-later options don't fit donations.
export const EXCLUDED_PAYMENT_METHODS: Stripe.PaymentIntentCreateParams.ExcludedPaymentMethodType[] =
  ["affirm", "klarna", "afterpay_clearpay", "cashapp"];

// Campaign-specific donate pages pass their key through to Stripe (metadata
// + description) so contributions can be filtered in the dashboard.
export const CAMPAIGNS = {
  puppets: "Puppet Raising",
} as const;

export type Campaign = keyof typeof CAMPAIGNS;

export const isCampaign = (value: unknown): value is Campaign =>
  typeof value === "string" && value in CAMPAIGNS;
