"use client";

import React, { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import QRCode from "react-qr-code";

// TODO: replace with the campaign's real Cash App cashtag.
// Both the QR code and the "Open Cash App" button are generated from this.
const CASHTAG = "$EvictICE";
const CASHAPP_URL = `https://cash.app/${CASHTAG}`;

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const PRESETS = [25, 50, 100, 250];
const MIN = 2.5;
const INITIAL_CENTS = 5000;

const fmt = (dollars: number) =>
  dollars % 1 === 0 ? `$${dollars}` : `$${dollars.toFixed(2)}`;

// Inner form: the Payment Element renders immediately (deferred mode); the
// PaymentIntent is created on submit, then confirmed.
const CardForm: React.FC<{ amountCents: number; valid: boolean }> = ({
  amountCents,
  valid,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Keep the deferred amount in sync as the donor changes it.
  useEffect(() => {
    if (elements && valid) elements.update({ amount: amountCents });
  }, [elements, amountCents, valid]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !valid) return;
    setLoading(true);
    setError("");

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Please check your details.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/donate/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountCents }),
      });
      const data = await res.json();
      if (!res.ok || !data.clientSecret) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret: data.clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/donate?success=1`,
        },
      });
      // On success Stripe redirects to return_url; we only reach here on error.
      if (confirmError) {
        setError(confirmError.message ?? "Payment failed. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Network error — please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <PaymentElement />
      {error && <p className="text-[#DC2626] text-sm font-bold">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading || !valid}
        className="w-full bg-[#DC2626] hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black uppercase tracking-wider py-3.5 transition cursor-pointer"
      >
        {loading
          ? "Processing…"
          : `Donate${valid ? ` ${fmt(amountCents / 100)}` : ""}`}
      </button>
    </form>
  );
};

export const DonateWidget: React.FC = () => {
  const [tab, setTab] = useState<"card" | "cashapp">("card");
  const [selected, setSelected] = useState<number | "custom">(50);
  const [custom, setCustom] = useState("");

  const dollars = selected === "custom" ? parseFloat(custom) : selected;
  const valid = Number.isFinite(dollars) && dollars >= MIN;
  const amountCents = valid ? Math.round(dollars * 100) : INITIAL_CENTS;

  // Stable options so the Elements group isn't recreated on amount change.
  const options = useMemo(
    () => ({
      mode: "payment" as const,
      amount: INITIAL_CENTS,
      currency: "usd",
      appearance: {
        theme: "stripe" as const,
        variables: {
          colorPrimary: "#DC2626",
          borderRadius: "0px",
          fontFamily: "Inter, sans-serif",
        },
      },
    }),
    [],
  );

  const tabClass = (active: boolean) =>
    `py-2.5 font-black uppercase text-sm tracking-wider cursor-pointer transition ${
      active ? "bg-black text-white" : "bg-white text-black"
    }`;

  return (
    <div className="bg-white text-black border-2 border-black p-5 md:p-6">
      <div className="grid grid-cols-2 border-2 border-black mb-5">
        <button onClick={() => setTab("card")} className={tabClass(tab === "card")}>
          Card
        </button>
        <button
          onClick={() => setTab("cashapp")}
          className={`${tabClass(tab === "cashapp")} border-l-2 border-black`}
        >
          Cash App
        </button>
      </div>

      {tab === "card" ? (
        <>
          <div className="grid grid-cols-4 gap-2 mb-2">
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setSelected(p);
                  setCustom("");
                }}
                className={`border-2 border-black py-2 font-black transition cursor-pointer ${
                  selected === p && !custom
                    ? "bg-[#FFD600]"
                    : "bg-white hover:opacity-80"
                }`}
              >
                ${p}
              </button>
            ))}
          </div>
          <input
            type="number"
            min={MIN}
            inputMode="decimal"
            value={custom}
            onChange={(e) => {
              setCustom(e.target.value);
              setSelected("custom");
            }}
            placeholder="Other amount (USD)"
            className="w-full px-3 py-2 border-2 border-black mb-4 focus:outline-none focus:border-[#DC2626]"
          />
          <Elements stripe={stripePromise} options={options}>
            <CardForm amountCents={amountCents} valid={valid} />
          </Elements>
          <p className="text-xs text-black/50 mt-3">
            Secured by Stripe. All contributions are tax-deductible.
          </p>
        </>
      ) : (
        <div className="text-center py-2">
          <div className="inline-block bg-white p-2 border-2 border-black mb-4">
            <QRCode value={CASHAPP_URL} size={160} />
          </div>
          <p className="text-sm text-black/70 mb-4">
            Scan to donate, or tap below to open Cash App.
          </p>
          <a
            href={CASHAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#DC2626] hover:opacity-80 text-white font-black uppercase tracking-wider px-6 py-3 transition cursor-pointer"
          >
            Open Cash App ({CASHTAG})
          </a>
        </div>
      )}
    </div>
  );
};
