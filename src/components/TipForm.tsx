"use client";

import React, { useState } from "react";

export const TipForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus("submitting");

    try {
      const res = await fetch("/api/tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim(), email: email.trim() || null }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="border-2 border-black p-6">
        <p className="font-black text-lg">Tip received — thank you.</p>
        <p className="text-sm text-black/60 mt-2">
          Your message has been sent directly to our organizers.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        placeholder="What's on your mind? Tips about the building, campaign ideas, feedback — anything helps."
        required
        maxLength={5000}
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full px-3 py-2 bg-white border-2 border-black text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-[#DC2626] resize-y"
      />
      <input
        type="email"
        placeholder="Email (optional — only if you want a reply)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 bg-white border-2 border-black text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-[#DC2626]"
      />
      <p className="text-xs text-black/50">
        Your tip is sent directly to organizers and is not stored. Fully anonymous unless you choose to include your email.
      </p>
      <button
        type="submit"
        disabled={!message.trim() || status === "submitting"}
        className="bg-[#DC2626] hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-white font-black text-sm tracking-wider py-3 px-6 border-2 border-[#DC2626] hover:border-black uppercase transition-all"
      >
        {status === "submitting" ? "Sending..." : "Send Tip"}
      </button>
      {status === "error" && (
        <p className="text-[#DC2626] text-sm">Something went wrong. Please try again.</p>
      )}
    </form>
  );
};
