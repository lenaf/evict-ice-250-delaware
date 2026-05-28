"use client";

import React from "react";
import Link from "next/link";

interface ComingSoonProps {
  title: string;
  subtitle?: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ title, subtitle }) => {
  return (
    <main className="min-h-screen">
      <section className="bg-black text-white px-6 md:px-10 pt-28 md:pt-36 pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm uppercase tracking-wider text-white/40 mb-3">
            <Link href="/facts" className="hover:text-white transition-colors">
              The Facts
            </Link>
          </p>
          {subtitle && (
            <p className="text-sm uppercase tracking-wider text-[#DC2626] mb-2">
              {subtitle}
            </p>
          )}
          <h1 className="font-black text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-6">
            {title}
          </h1>
        </div>
      </section>

      <section className="bg-white text-black px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-wider text-black mb-4">
            Coming soon
          </p>
          <h2 className="font-black text-2xl md:text-3xl leading-tight mb-6">
            This section is being finalized.
          </h2>
          <p className="text-base md:text-lg text-black mb-10">
            We&apos;re building out this page now. In the meantime, start with
            What Happens Inside.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/facts/what-happens-inside"
              className="inline-block bg-black text-white font-black text-sm uppercase tracking-wider px-8 py-4 border-2 border-black hover:bg-[#DC2626] hover:border-[#DC2626] transition-colors cursor-pointer text-center"
            >
              Read: What Happens Inside &rarr;
            </Link>
            <Link
              href="/facts"
              className="inline-block bg-white text-black font-black text-sm uppercase tracking-wider px-8 py-4 border-2 border-black hover:border-[#DC2626] hover:text-[#DC2626] transition-colors cursor-pointer text-center"
            >
              &larr; Back to The Facts
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
