import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadFactsPage } from "@/lib/payload";
import { RenderSections } from "@/components/RenderSections";
import { DEFAULT_OG_IMAGE } from "@/lib/metadata";

const title = "Who Profits: The Facts";
const description =
  "Uniland, the Montante family, and the landlords profiting from ICE's lease at 250 Delaware Avenue in Buffalo, NY.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: DEFAULT_OG_IMAGE },
};

// ISR: prerendered at build, refreshed on a CMS save (revalidate hook) or hourly.
export const revalidate = 3600;

export default async function WhoProfitsPage() {
  const data = await loadFactsPage("facts/who-profits");
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
