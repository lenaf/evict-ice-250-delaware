import type { Metadata } from "next";
import { Facts } from "./Facts";

export const metadata: Metadata = {
  title: "The Facts",
  description:
    "The full story behind 250 Delaware Avenue — who profits from ICE's lease, how your tax dollars subsidize it, the human cost of operations run from this building, and what we can do about it.",
};

export default function FactsPage() {
  return <Facts />;
}
