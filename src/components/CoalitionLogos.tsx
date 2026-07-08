import React from "react";
import Image from "next/image";
import { SwipeCarousel } from "@/components/SwipeCarousel";

// Per-logo size tiers → responsive height caps. Each logo is sized by height and
// centered in its grid cell; pick the tier that makes it read at a weight
// comparable to its neighbors. Wide wordmarks generally need a larger tier than
// square marks to look the same size. Use `cap` for a true one-off.
type Size = "sm" | "md" | "lg" | "xl";

const HEIGHT: Record<Size, string> = {
  sm: "max-h-6 md:max-h-10",
  md: "max-h-8 md:max-h-12",
  lg: "max-h-10 md:max-h-16",
  xl: "max-h-12 md:max-h-20",
};

interface Sponsor {
  src: string;
  name: string;
  href: string;
  size: Size;
  // Optional responsive height-cap override for a mark that doesn't sit right at
  // any tier (wins over `size`).
  cap?: string;
}

const sponsors: Sponsor[] = [
  { src: "/sponsors/buffalo-united.png", name: "Buffalo Coalition United", href: "https://www.buffalounitedcoalition.org/", size: "lg" },
  { src: "/sponsors/lwvbn.png", name: "League of Women Voters of Buffalo-Niagara", href: "https://www.lwvbn.org/", size: "sm" },
  { src: "/sponsors/burning-books.jpeg", name: "Burning Books", href: "https://www.burningbooks.com/", size: "xl" },
  { src: "/sponsors/jfmf.webp", name: "Justice for Migrant Families WNY", href: "https://www.justiceformigrantfamilies.org/", size: "lg" },
  { src: "/sponsors/justice-for-geraldine-martin.png", name: "Justice for Geraldine and Martin", href: "https://www.instagram.com/justiceforgeraldineandmartin/", size: "lg" },
  { src: "/sponsors/liberate-buffalo-state.png", name: "Liberate Buffalo State", href: "https://www.instagram.com/liberate.buff.state/", size: "xl" },
  { src: "/sponsors/ocb.png", name: "Our City Buffalo", href: "https://www.ourcitybuffalo.com/", size: "lg" },
  { src: "/sponsors/ocab.png", name: "Our City Action Buffalo", href: "https://www.ourcityactionbuffalo.com/", size: "md" },
  { src: "/sponsors/ppg.png", name: "Partnership for the Public Good", href: "https://ppgbuffalo.org/", size: "lg" },
  { src: "/sponsors/rootsaction.png", name: "RootsAction", href: "https://rootsaction.org/", size: "md" },
  { src: "/sponsors/rose-jade.png", name: "Rose Jade Consulting", href: "https://www.rosejadeconsulting.com/", size: "md" },
  { src: "/sponsors/surj-buffalo.png", name: "SURJ Buffalo", href: "https://surj.org/chapter/surj-buffalo/", size: "lg" },
  { src: "/sponsors/ujima.png", name: "Ujima Company", href: "https://www.ujimacoinc.org/", size: "md" },
  { src: "/sponsors/wny-peace-center.jpeg", name: "WNY Peace Center", href: "https://wnypeace.org/", size: "xl", cap: "max-h-14 md:max-h-24" },
  { src: "/sponsors/wnycosh.jpeg", name: "WNYCOSH", href: "https://wnycosh.org/", size: "md" },
  { src: "/sponsors/wny-bridge-brigade.png", name: "WNY Bridge Brigade", href: "https://wnybb.org/", size: "lg" },
  { src: "/sponsors/buffalo-dsa.webp", name: "Buffalo DSA", href: "https://buffalodsa.org/", size: "md" },
  { src: "/sponsors/buffalo-niagara-lgbtq-history.png", name: "Buffalo Niagara LGBTQ History Project", href: "https://bflolgbtqhistoryproject.org/", size: "lg" },
  { src: "/sponsors/colored-girls-bike-too.webp", name: "Colored Girls Bike Too", href: "https://www.instagram.com/coloredgirlsbiketoo/", size: "xl" },
  { src: "/sponsors/nyic.png", name: "NYIC", href: "https://www.nyic.org/", size: "md" },
  { src: "/sponsors/u-belong-coalition.png", name: "U-Belong Coalition", href: "https://www.instagram.com/ubelongcoalition/", size: "lg" },
  { src: "/sponsors/buffalo-latino-village.png", name: "Buffalo Latino Village", href: "https://buffalolatinovillage.com/", size: "md" },
  { src: "/sponsors/push-buffalo.png", name: "PUSH Buffalo", href: "https://www.pushbuffalo.org/", size: "xl" },
  { src: "/sponsors/suny-buffalo-bds.jpeg", name: "SUNY Buffalo BDS", href: "https://www.instagram.com/sunybds_ub/", size: "xl" },
  { src: "/sponsors/cooperation-buffalo.jpg", name: "Cooperation Buffalo", href: "https://www.cooperationbuffalo.org/", size: "xl" },
  { src: "/sponsors/breadhive.jpg", name: "BreadHive", href: "https://www.breadhive.com/", size: "xl" },
  { src: "/sponsors/little-peoples-victory.webp", name: "Little People's Victory", href: "https://www.littlepeoplesvictory.com/", size: "lg" },
  { src: "/sponsors/king-urban-life-center.webp", name: "King Urban Life Center", href: "https://www.kingurbanlifecenter.org/", size: "md" },
  { src: "/sponsors/jonathan-rivera.png", name: "Assemblymember Jon D. Rivera", href: "https://nyassembly.gov/mem/Jonathan-Rivera", size: "md" },
  { src: "/sponsors/fitz-books.png", name: "Fitz Books & Waffles", href: "https://www.fitzbooks.net/", size: "lg", cap: "max-h-11 md:max-h-[4.5rem]" },
  { src: "/sponsors/wnyea.jpg", name: "WNY Environmental Alliance", href: "https://www.wnyea.org/", size: "lg" },
  { src: "/sponsors/rights-of-nature-wny.png", name: "Rights of Nature WNY", href: "https://www.wnyea.org/rights-of-nature.html", size: "lg" },
  { src: "/sponsors/panys.webp", name: "Peace Action New York State", href: "https://www.panys.org/", size: "md" },
  { src: "/sponsors/east-side-stewards.png", name: "East Side Stewards", href: "https://www.eastsidestewards.com/", size: "lg" },
  { src: "/sponsors/do-something-southtowns.jpeg", name: "Do Something! Southtowns", href: "https://dosomethingsouthtowns.org/", size: "lg" },
  { src: "/sponsors/for-the-many.svg", name: "For The Many", href: "https://www.forthemany.org/", size: "lg" },
  { src: "/sponsors/taisha-st-jean-tard.png", name: "Erie County Legislator Taisha St. Jean Tard", href: "https://www4.erie.gov/tard/", size: "xl" },
];

// Each logo fills its grid cell and centers; the image is capped by height (its
// size tier) and width so wide wordmarks shrink to fit instead of overflowing.
const LogoMark: React.FC<{ sponsor: Sponsor }> = ({ sponsor }) => (
  <a
    href={sponsor.href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center min-w-0 w-full hover:opacity-70 transition-opacity"
    title={sponsor.name}
  >
    <Image
      src={sponsor.src}
      alt={sponsor.name}
      width={140}
      height={140}
      className={`w-auto max-w-full object-contain ${sponsor.cap ?? HEIGHT[sponsor.size]}`}
    />
  </a>
);

// Group logos into viewport-width pages so the carousel snaps one full page at a
// time and nothing is clipped at the edge. 18/page → 35 logos fit in 2 pages.
const PER_PAGE = 18;
const pages: Sponsor[][] = [];
for (let i = 0; i < sponsors.length; i += PER_PAGE) {
  pages.push(sponsors.slice(i, i + PER_PAGE));
}

// A swipeable, paginated grid of partner logos. The page spans the full width on
// desktop; column count is responsive (6 on mobile → 9 on desktop) so a full
// page lands on two even rows on desktop while staying dense on mobile.
export const CoalitionLogos: React.FC = () => (
  <SwipeCarousel
    tone="dark"
    ariaLabel="Coalition partners"
    gapClassName="gap-0"
    maxWidthClassName="max-w-none"
    paddingClassName="px-10 md:px-12"
  >
    {pages.map((page, i) => (
      <div
        key={i}
        className="shrink-0 snap-start w-full grid grid-cols-6 lg:grid-cols-9 items-center gap-x-4 gap-y-6 md:gap-x-8 md:gap-y-10"
      >
        {page.map((sponsor) => (
          <LogoMark key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
    ))}
  </SwipeCarousel>
);
