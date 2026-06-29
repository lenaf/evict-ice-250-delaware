import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadFactsPage } from "@/lib/payload";
import { RenderSections } from "@/components/RenderSections";

export const metadata: Metadata = {
  title: "What Happens Inside: The Facts",
  description:
    "Field office. Hold rooms. Weapons storage. What the federal government runs out of 250 Delaware Avenue in downtown Buffalo.",
};

// ISR: prerendered at build, refreshed on a CMS save (revalidate hook) or hourly.
export const revalidate = 3600;

export default async function WhatHappensInsidePage() {
  const data = await loadFactsPage("facts/what-happens-inside");
  if (!data?.sections?.length) notFound();
  return (
    <main className="min-h-screen">
      <RenderSections
        sections={data.sections as Parameters<typeof RenderSections>[0]["sections"]}
        familyData={data.familyData}
      />
    </main>
  );
}
