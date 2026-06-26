import type { Metadata } from "next";
import { getPageBySlug } from "@/lib/payload";
import { RenderSections } from "@/components/RenderSections";
import { WhatHappensInside } from "./WhatHappensInside";

export const metadata: Metadata = {
  title: "What Happens Inside: The Facts",
  description:
    "Field office. Hold rooms. Weapons storage. What the federal government runs out of 250 Delaware Avenue in downtown Buffalo.",
};

// Render from the CMS when available; fall back to the hardcoded view until
// the page has been seeded (and so the build doesn't require a live DB).
export const dynamic = "force-dynamic";

export default async function WhatHappensInsidePage() {
  const page = await getPageBySlug("facts/what-happens-inside");
  const sections = (page?.sections ?? []) as Parameters<typeof RenderSections>[0]["sections"];
  if (!sections.length) return <WhatHappensInside />;
  return (
    <main className="min-h-screen">
      <RenderSections sections={sections} />
    </main>
  );
}
