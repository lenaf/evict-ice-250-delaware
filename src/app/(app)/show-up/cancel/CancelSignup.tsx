"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const CancelSignup: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"idle" | "cancelling" | "done" | "error">("idle");

  useEffect(() => {
    if (!token) return;
    setStatus("cancelling");

    fetch("/api/signups/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        if (res.ok) setStatus("done");
        else setStatus("error");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-md pt-32">
        {!token ? (
          <>
            <h1 className="font-black text-2xl mb-2">Invalid link</h1>
            <p className="text-black/60">This cancellation link appears to be invalid.</p>
          </>
        ) : status === "cancelling" ? (
          <p className="text-black/50 text-lg">Cancelling your signup...</p>
        ) : status === "done" ? (
          <>
            <h1 className="font-black text-3xl mb-2">Signup cancelled</h1>
            <p className="text-black/60 mb-6">
              Your spot has been freed up for someone else. Thanks for letting us know.
            </p>
            <Link
              href="/show-up"
              className="inline-block bg-[#1E3A8A] text-white font-bold px-6 py-3 hover:bg-black transition-colors"
            >
              Browse other shifts
            </Link>
          </>
        ) : (
          <>
            <h1 className="font-black text-2xl mb-2">Something went wrong</h1>
            <p className="text-black/60">
              This signup may have already been cancelled, or the link is invalid.
            </p>
          </>
        )}
      </div>
    </main>
  );
};
