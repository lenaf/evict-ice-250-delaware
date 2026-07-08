import React from "react";
import { getSponsors, type SponsorItem } from "@/lib/payload";
import { FALLBACK_SPONSORS } from "@/components/coalitionSponsors";
import { JustifiedLogoWall } from "@/components/JustifiedLogoWall";

// Load the coalition partners for the homepage: CMS order (Sponsors collection,
// drag-ordered) when available, else the hardcoded fallback so the section
// never breaks. Called from the (async) homepage and passed to CoalitionLogos.
export async function getCoalitionSponsors(): Promise<SponsorItem[]> {
  return (
    (await getSponsors()) ??
    FALLBACK_SPONSORS.map((s) => ({
      name: s.name,
      href: s.href,
      logo: s.src,
      scale: s.scale,
    }))
  );
}

// Coalition partner logos — packed into gap-free justified rows that fill the
// content width and reflow at any screen size (see JustifiedLogoWall). Drag
// order and per-logo size are managed in the CMS.
export const CoalitionLogos: React.FC<{ sponsors: SponsorItem[] }> = ({
  sponsors,
}) => (
  <div className="max-w-6xl mx-auto px-6 md:px-10">
    <h2 className="text-center font-black uppercase tracking-wider text-sm md:text-base text-black/70 mb-8 md:mb-10">
      Partners &amp; Endorsers
    </h2>
    <JustifiedLogoWall logos={sponsors} />
  </div>
);
