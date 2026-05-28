import type { Metadata } from "next";
import { ComingSoon } from "../ComingSoon";

export const metadata: Metadata = {
  title: "Who Profits — The Facts",
  description:
    "Uniland, the Montante family, and the landlords profiting from ICE's lease at 250 Delaware Avenue in Buffalo, NY.",
};

export default function WhoProfitsPage() {
  return (
    <ComingSoon
      title="Who Profits"
      subtitle="Uniland & the Montante family"
    />
  );
}
