import React from "react";
import Link from "next/link";
import { getPress } from "@/lib/payload";
import { PressList } from "@/components/PressList";

// "In the News" — the homepage press strip. Shows only articles flagged
// `showOnHomepage` in the CMS; the full list lives at /news. Renders nothing
// when no article is flagged for the homepage.
export const PressSection = async () => {
  const articles = await getPress();
  const featured = articles?.filter((a) => a.showOnHomepage) ?? [];
  if (!featured.length) return null;

  return (
    <section className="bg-white text-black py-12 md:py-16">
      <div className="px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-2xl md:text-3xl uppercase tracking-wide mb-6">
            In the News
          </h2>
          <PressList items={featured} />
          <Link
            href="/news"
            className="group mt-6 inline-flex items-center gap-1 font-black text-sm uppercase tracking-wider text-black hover:text-[#DC2626] transition-colors cursor-pointer"
          >
            See all coverage
            <span aria-hidden="true" className="text-base leading-none">
              &#8599;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
