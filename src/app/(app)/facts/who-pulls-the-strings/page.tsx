import type { Metadata } from "next";
import { loadFactsPage } from "@/lib/payload";
import { RenderSections } from "@/components/RenderSections";
import { WhoPullsTheStrings } from "./WhoPullsTheStrings";

export const metadata: Metadata = {
  title: "Who Pulls the Strings: The Facts",
  description:
    "Delaware North and the Jacobs family, the $3 billion anchor tenant above ICE at 250 Delaware Avenue in Buffalo, NY.",
};

export const dynamic = "force-dynamic";

export default async function WhoPullsTheStringsPage() {
  const data = await loadFactsPage("facts/who-pulls-the-strings");
  if (!data?.sections?.length) return <WhoPullsTheStrings />;
  return (
    <main className="min-h-screen">
      <RenderSections
        sections={data.sections as Parameters<typeof RenderSections>[0]["sections"]}
        familyData={data.familyData}
      />
    </main>
  );
}
