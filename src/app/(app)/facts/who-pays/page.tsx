import type { Metadata } from "next";
import { ComingSoon } from "../ComingSoon";

export const metadata: Metadata = {
  title: "Who Pays — The Facts",
  description:
    "A quarter century of taxpayer subsidies for 250 Delaware Avenue — $10.6 million in tax breaks for Uniland and Delaware North.",
};

export default function WhoPaysPage() {
  return <ComingSoon title="Who Pays" subtitle="Taxpayer subsidies" />;
}
