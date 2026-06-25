import React from "react";
import Link from "next/link";

interface ComingSoonProps {
  title: string;
  teaser: React.ReactNode; // a sentence or two on what's coming
}

// Placeholder shown on facts pages whose full content isn't published yet.
export const ComingSoon: React.FC<ComingSoonProps> = ({ title, teaser }) => (
  <main className="min-h-screen bg-black text-white">
    <section className="px-6 md:px-10 pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-black text-5xl md:text-7xl leading-[0.95] mb-6">
          {title}
        </h1>
        <p className="text-xs font-black uppercase tracking-widest text-[#FFD600] mb-6">
          Coming soon
        </p>
        <div className="text-lg md:text-2xl leading-relaxed text-white/70 mb-12 max-w-3xl">
          {teaser}
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/#facts"
            className="bg-white text-black font-black text-sm uppercase tracking-wider px-8 py-4 border-2 border-white hover:opacity-80 transition cursor-pointer text-center"
          >
            &larr; The Facts
          </Link>
          <Link
            href="/events"
            className="bg-[#DC2626] text-white font-black text-sm uppercase tracking-wider px-8 py-4 border-2 border-[#DC2626] hover:opacity-80 transition cursor-pointer text-center"
          >
            Take action &rarr;
          </Link>
        </div>
      </div>
    </section>
  </main>
);
