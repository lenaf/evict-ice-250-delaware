import type { Metadata } from "next";
import { WhoProfits } from "./WhoProfits";

export const metadata: Metadata = {
  title: "Who Profits: The Facts",
  description:
    "Uniland, the Montante family, and the landlords profiting from ICE's lease at 250 Delaware Avenue in Buffalo, NY.",
};

export default function WhoProfitsPage() {
  return <WhoProfits />;
}
