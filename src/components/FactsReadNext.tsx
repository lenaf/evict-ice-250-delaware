import React from "react";
import Link from "next/link";
import { Section } from "@/components/Section";

interface FactsReadNextProps {
  title: string;
  description: string;
  href: string;
}

export const FactsReadNext: React.FC<FactsReadNextProps> = ({
  title,
  description,
  href,
}) => {
  return (
    <Section variant="black">
      <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-4">
        Continue Reading
      </p>
      <h2 className="font-black text-3xl md:text-4xl lg:text-5xl leading-tight text-white mb-4">
        {title}
      </h2>
      <p className="text-base md:text-lg text-white/70 mb-8 max-w-2xl">
        {description}
      </p>
      <Link
        href={href}
        className="inline-block bg-[#DC2626] text-white font-black text-sm uppercase tracking-wider px-8 py-4 border-2 border-[#DC2626] hover:opacity-80 transition cursor-pointer"
      >
        Read Next &rarr;
      </Link>
    </Section>
  );
};
