import type Stripe from "stripe";

// Payment methods hidden from the donate form. Everything else (card, Apple and
// Google Pay, bank) stays on automatically. Cash App has its own tab, and
// pay-later options don't fit donations.
export const EXCLUDED_PAYMENT_METHODS: Stripe.PaymentIntentCreateParams.ExcludedPaymentMethodType[] =
  ["affirm", "klarna", "afterpay_clearpay", "cashapp"];
