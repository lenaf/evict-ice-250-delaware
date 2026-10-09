import React from "react";
import Link from "next/link";
import { getPress } from "@/lib/payload";
import { PressList } from "@/components/PressList";
import { PressCard } from "@/components/PressCard";

const AllCoverageLink: React.FC = () => (
  <Link
    href="/news"
    className="inline-flex items-center gap-1 font-black text-sm uppercase tracking-wider text-black hover:text-[#DC2626] transition-colors cursor-pointer"
  >
    See all news coverage
    <span aria-hidden="true" className="text-base leading-none">
      &rarr;
    </span>
  </Link>
);

// "Featured News" — the homepage press section. Shows only items flagged
// `showOnHomepage` in the CMS: those also marked `featured` as large cards up
// top, the rest as a compact list below them. The full list
// lives at /news. Renders nothing when no item is flagged for the homepage.
export const PressSection = async () => {
  const articles = await getPress();
  const onHomepage = articles?.filter((a) => a.showOnHomepage) ?? [];
  if (!onHomepage.length) return null;
  const cards = onHomepage.filter((a) => a.featured);
  const rest = onHomepage.filter((a) => !a.featured);

  return (
    <section className="bg-white text-black py-12 md:py-16">
      <div className="px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-6">
            <h2 className="font-black text-2xl md:text-3xl uppercase tracking-wide">
              Featured News
            </h2>
            <AllCoverageLink />
          </div>
          {cards.length > 0 && (
            <div
              className={`flex flex-col gap-4 ${rest.length > 0 ? "mb-8 md:mb-10" : ""}`}
            >
              {cards.map((a) => (
                <PressCard key={a.url} item={a} />
              ))}
            </div>
          )}
          {rest.length > 0 && <PressList items={rest} />}
        </div>
      </div>
    </section>
  );
};
