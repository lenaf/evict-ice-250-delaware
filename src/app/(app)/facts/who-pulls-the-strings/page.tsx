import type { Metadata } from "next";
import { WhoPullsTheStrings } from "./WhoPullsTheStrings";

export const metadata: Metadata = {
  title: "Who Pulls the Strings — The Facts",
  description:
    "Delaware North and the Jacobs family — the $3 billion anchor tenant above ICE at 250 Delaware Avenue in Buffalo, NY.",
};

export default function WhoPullsTheStringsPage() {
  return <WhoPullsTheStrings />;
}
