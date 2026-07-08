// Canonical coalition partner list. This is the fallback the homepage renders
// when the CMS is unavailable/unseeded, and the source the `populate` script
// uses to seed the Sponsors collection. Once the CMS is seeded, edits happen in
// /cms (drag to reorder, slider to resize) — this list is just the safety net.
//
// `scale` is the per-logo size (1 = baseline). All default to 1: the logo wall
// auto-balances every logo to roughly equal visual area, so sizes need no manual
// tuning. Bump a single value in the CMS only to give one logo extra presence.
export interface SponsorData {
  src: string;
  name: string;
  href: string;
  scale: number;
}

export const FALLBACK_SPONSORS: SponsorData[] = [
  { src: "/sponsors/buffalo-united.png", name: "Buffalo Coalition United", href: "https://www.buffalounitedcoalition.org/", scale: 1 },
  { src: "/sponsors/lwvbn.png", name: "League of Women Voters of Buffalo-Niagara", href: "https://www.lwvbn.org/", scale: 1 },
  { src: "/sponsors/burning-books.jpeg", name: "Burning Books", href: "https://www.burningbooks.com/", scale: 1 },
  { src: "/sponsors/jfmf.webp", name: "Justice for Migrant Families WNY", href: "https://www.justiceformigrantfamilies.org/", scale: 1 },
  { src: "/sponsors/justice-for-geraldine-martin.png", name: "Justice for Geraldine and Martin", href: "https://www.instagram.com/justiceforgeraldineandmartin/", scale: 1 },
  { src: "/sponsors/liberate-buffalo-state.png", name: "Liberate Buffalo State", href: "https://www.instagram.com/liberate.buff.state/", scale: 1 },
  { src: "/sponsors/ocb.png", name: "Our City Buffalo", href: "https://www.ourcitybuffalo.com/", scale: 1 },
  { src: "/sponsors/ocab.png", name: "Our City Action Buffalo", href: "https://www.ourcityactionbuffalo.com/", scale: 1 },
  { src: "/sponsors/ppg.png", name: "Partnership for the Public Good", href: "https://ppgbuffalo.org/", scale: 1 },
  { src: "/sponsors/rootsaction.png", name: "RootsAction", href: "https://rootsaction.org/", scale: 1 },
  { src: "/sponsors/rose-jade.png", name: "Rose Jade Consulting", href: "https://www.rosejadeconsulting.com/", scale: 1 },
  { src: "/sponsors/surj-buffalo.png", name: "SURJ Buffalo", href: "https://surj.org/chapter/surj-buffalo/", scale: 1 },
  { src: "/sponsors/ujima.png", name: "Ujima Company", href: "https://www.ujimacoinc.org/", scale: 1 },
  { src: "/sponsors/wny-peace-center.jpeg", name: "WNY Peace Center", href: "https://wnypeace.org/", scale: 1 },
  { src: "/sponsors/wnycosh.jpeg", name: "WNYCOSH", href: "https://wnycosh.org/", scale: 1 },
  { src: "/sponsors/wny-bridge-brigade.png", name: "WNY Bridge Brigade", href: "https://wnybb.org/", scale: 1 },
  { src: "/sponsors/buffalo-dsa.webp", name: "Buffalo DSA", href: "https://buffalodsa.org/", scale: 1 },
  { src: "/sponsors/buffalo-niagara-lgbtq-history.png", name: "Buffalo Niagara LGBTQ History Project", href: "https://bflolgbtqhistoryproject.org/", scale: 1 },
  { src: "/sponsors/colored-girls-bike-too.webp", name: "Colored Girls Bike Too", href: "https://www.instagram.com/coloredgirlsbiketoo/", scale: 1 },
  { src: "/sponsors/nyic.png", name: "NYIC", href: "https://www.nyic.org/", scale: 1 },
  { src: "/sponsors/u-belong-coalition.png", name: "U-Belong Coalition", href: "https://www.instagram.com/ubelongcoalition/", scale: 1 },
  { src: "/sponsors/buffalo-latino-village.png", name: "Buffalo Latino Village", href: "https://buffalolatinovillage.com/", scale: 1 },
  { src: "/sponsors/push-buffalo.png", name: "PUSH Buffalo", href: "https://www.pushbuffalo.org/", scale: 1 },
  { src: "/sponsors/suny-buffalo-bds.jpeg", name: "SUNY Buffalo BDS", href: "https://www.instagram.com/sunybds_ub/", scale: 1 },
  { src: "/sponsors/cooperation-buffalo.jpg", name: "Cooperation Buffalo", href: "https://www.cooperationbuffalo.org/", scale: 1 },
  { src: "/sponsors/breadhive.jpg", name: "BreadHive", href: "https://www.breadhive.com/", scale: 1 },
  { src: "/sponsors/little-peoples-victory.webp", name: "Little People's Victory", href: "https://www.littlepeoplesvictory.com/", scale: 1 },
  { src: "/sponsors/king-urban-life-center.webp", name: "King Urban Life Center", href: "https://www.kingurbanlifecenter.org/", scale: 1 },
  { src: "/sponsors/jonathan-rivera.png", name: "Assemblymember Jon D. Rivera", href: "https://nyassembly.gov/mem/Jonathan-Rivera", scale: 1 },
  { src: "/sponsors/fitz-books.png", name: "Fitz Books & Waffles", href: "https://www.fitzbooks.net/", scale: 1 },
  { src: "/sponsors/wnyea.jpg", name: "WNY Environmental Alliance", href: "https://www.wnyea.org/", scale: 1 },
  { src: "/sponsors/rights-of-nature-wny.png", name: "Rights of Nature WNY", href: "https://www.wnyea.org/rights-of-nature.html", scale: 1 },
  { src: "/sponsors/panys.webp", name: "Peace Action New York State", href: "https://www.panys.org/", scale: 1 },
  { src: "/sponsors/east-side-stewards.png", name: "East Side Stewards", href: "https://www.eastsidestewards.com/", scale: 1 },
  { src: "/sponsors/do-something-southtowns.jpeg", name: "Do Something! Southtowns", href: "https://dosomethingsouthtowns.org/", scale: 1 },
  { src: "/sponsors/for-the-many.svg", name: "For The Many", href: "https://www.forthemany.org/", scale: 1 },
  { src: "/sponsors/taisha-st-jean-tard.png", name: "Erie County Legislator Taisha St. Jean Tard", href: "https://www4.erie.gov/tard/", scale: 1 },
];
