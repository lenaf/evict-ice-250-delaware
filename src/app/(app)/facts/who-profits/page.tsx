import type { Metadata } from "next";
import { loadFactsPage } from "@/lib/payload";
import { RenderSections } from "@/components/RenderSections";
import { WhoProfits } from "./WhoProfits";

export const metadata: Metadata = {
  title: "Who Profits: The Facts",
  description:
    "Uniland, the Montante family, and the landlords profiting from ICE's lease at 250 Delaware Avenue in Buffalo, NY.",
};

export const dynamic = "force-dynamic";

export default async function WhoProfitsPage() {
  const data = await loadFactsPage("facts/who-profits");
  if (!data?.sections?.length) return <WhoProfits />;
  return (
    <main className="min-h-screen">
      <RenderSections
        sections={data.sections as Parameters<typeof RenderSections>[0]["sections"]}
        familyData={data.familyData}
      />
    </main>
  );
}
