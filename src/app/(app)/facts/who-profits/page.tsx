import type { Metadata } from "next";
import { ComingSoon } from "../ComingSoon";
// Full page is built but not yet published — restore when ready:
// import { WhoProfits } from "./WhoProfits";

export const metadata: Metadata = {
  title: "Who Profits — The Facts",
  description:
    "Uniland, the Montante family, and the landlords profiting from ICE's lease at 250 Delaware Avenue in Buffalo, NY.",
};

export default function WhoProfitsPage() {
  return (
    <ComingSoon
      title="Who Profits"
      teaser={
        <>
          How the Montante family and Uniland Development collect millions a
          year from ICE &mdash; in a building taxpayers helped subsidize. The
          full money trail is coming soon.
        </>
      }
    />
  );
  // return <WhoProfits />;
}
