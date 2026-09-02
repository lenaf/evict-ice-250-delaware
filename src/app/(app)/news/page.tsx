import type { Metadata } from "next";
import Link from "next/link";
import { getPress } from "@/lib/payload";
import { PressList } from "@/components/PressList";

export const metadata: Metadata = {
  title: "In the News",
  description:
    "Press coverage of the campaign to evict ICE from 250 Delaware Avenue in Buffalo, NY.",
};

// ISR: prerendered, refreshed on a CMS Press save (revalidate hook) or hourly.
export const revalidate = 3600;

export default async function NewsPage() {
  const articles = await getPress();

  return (
    <main className="min-h-screen bg-white text-black px-6 md:px-10 py-14 md:py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-black text-3xl md:text-4xl uppercase tracking-wide mb-2">
          In the News
        </h1>
        <p className="text-sm text-black/60 mb-8">
          Press coverage of the campaign to evict ICE from 250 Delaware.
        </p>

        {articles?.length ? (
          <PressList items={articles} />
        ) : (
          <p className="text-black/60">No coverage yet.</p>
        )}

        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-1 font-black text-sm uppercase tracking-wider text-black hover:text-[#DC2626] transition-colors cursor-pointer"
        >
          <span aria-hidden="true" className="text-base leading-none">
            &#8592;
          </span>
          Back home
        </Link>
      </div>
    </main>
  );
}
