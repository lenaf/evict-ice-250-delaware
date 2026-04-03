import type { Metadata } from "next";
import { Suspense } from "react";
import { CancelSignup } from "./CancelSignup";

export const metadata: Metadata = {
  title: "Cancel Signup",
};

export default function CancelPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white flex items-center justify-center">
          <p className="text-black/50">Loading...</p>
        </main>
      }
    >
      <CancelSignup />
    </Suspense>
  );
}
