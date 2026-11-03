import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadFactsPage } from "@/lib/payload";
import { RenderSections } from "@/components/RenderSections";
import { DEFAULT_OG_IMAGE } from "@/lib/metadata";

const title = "Who Pulls the Strings: The Facts";
const description =
  "Delaware North and the Jacobs family, the $3 billion anchor tenant above ICE at 250 Delaware Avenue in Buffalo, NY.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: DEFAULT_OG_IMAGE },
};

// ISR: prerendered at build, refreshed on a CMS save (revalidate hook) or hourly.
export const revalidate = 3600;

export default async function WhoPullsTheStringsPage() {
  const data = await loadFactsPage("facts/who-pulls-the-strings");
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
