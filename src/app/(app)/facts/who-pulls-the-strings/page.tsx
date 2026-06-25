import type { Metadata } from "next";
import { ComingSoon } from "../ComingSoon";
// Full page is built but not yet published — restore when ready:
// import { WhoPullsTheStrings } from "./WhoPullsTheStrings";

export const metadata: Metadata = {
  title: "Who Pulls the Strings — The Facts",
  description:
    "Delaware North and the Jacobs family — the $3 billion anchor tenant above ICE at 250 Delaware Avenue in Buffalo, NY.",
};

export default function WhoPullsTheStringsPage() {
  return (
    <ComingSoon
      title="Who Pulls the Strings"
      teaser={
        <>
          The Jacobs family, Delaware North, and the web of political donations
          and influence behind 250 Delaware. The full power map is coming soon.
        </>
      }
    />
  );
  // return <WhoPullsTheStrings />;
}
