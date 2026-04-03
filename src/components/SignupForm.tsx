"use client";

import React, { useState } from "react";
import type { Slot } from "@/types/slots";
import { formatDate, formatTime } from "@/lib/format";

interface SignupFormProps {
  slot: Slot;
  onSuccess: () => void;
  onClose: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ slot, onSuccess, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "duplicate">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isValid = name.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && phone.trim().length >= 7;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/signups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot_id: slot.id, name, email, phone }),
      });

      if (res.status === 409) {
        setStatus("duplicate");
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Signup failed");
      }

      setStatus("success");
      setTimeout(onSuccess, 2000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <p className="font-black text-3xl mb-2">You&apos;re in!</p>
        <p className="text-sm opacity-70">Check your email for confirmation details.</p>
      </div>
    );
  }

  if (status === "duplicate") {
    return (
      <div className="text-center py-8">
        <p className="font-black text-2xl mb-2">Already signed up!</p>
        <p className="text-sm opacity-70">You&apos;re already registered for this slot. Check your email for details.</p>
        <button onClick={onClose} className="mt-4 text-sm underline cursor-pointer">
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-black/5 p-4 border-2 border-black mb-4">
        <p className="font-bold">{slot.title}</p>
        <p className="text-sm opacity-70">
          {formatDate(slot.date)} &middot; {formatTime(slot.start_time)} –{" "}
          {formatTime(slot.end_time)}
        </p>
        <p className="text-sm opacity-70">{slot.location}</p>
      </div>
      <input
        type="text"
        placeholder="Your name *"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 bg-white border-2 border-black text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-[#DC2626]"
      />
      <input
        type="email"
        placeholder="Email address *"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 bg-white border-2 border-black text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-[#DC2626]"
      />
      <input
        type="tel"
        placeholder="Phone number *"
        required
        value={phone}
        onChange={(e) => {
          const sanitized = e.target.value.replace(/[^\d\s\-+()]/g, "");
          setPhone(sanitized);
        }}
        className="w-full px-3 py-2 bg-white border-2 border-black text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-[#DC2626]"
      />
      <button
        type="submit"
        disabled={!isValid || status === "submitting"}
        className="w-full bg-[#DC2626] hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-white font-black text-lg tracking-wider py-3 px-6 border-2 border-[#DC2626] hover:border-black disabled:hover:bg-[#DC2626] disabled:hover:border-[#DC2626] uppercase transition-all"
      >
        {status === "submitting" ? "Signing up..." : "Sign Up"}
      </button>
      {status === "error" && (
        <p className="text-red-600 text-sm text-center">{errorMsg}</p>
      )}
      <div className="text-center">
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-black/50 hover:text-black transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
