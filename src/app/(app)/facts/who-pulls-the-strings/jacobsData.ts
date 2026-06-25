import type { AffiliationEntry, PersonData, WealthRef } from "@/types/affiliation";
import type { PowerMapDonation } from "@/components/PowerMap";

export const JACOBS_PEOPLE: PersonData[] = [
  {
    id: "jeremy-sr",
    name: "Jeremy M. Jacobs",
    title: "Chairman, Delaware North; Owner & Governor, Boston Bruins",
    photo: "/photos/jacobs/jacobs-jeremy-sr.jpg",
    bioParas: [
      [
        { text: "Jeremy \"Jerry\" M. Jacobs serves as " },
        { text: "chairman of Delaware North, chairman and governor of the Boston Bruins, and chairman of the NHL's Board of Governors", highlight: true },
        { text: ". Since 1968, Jacobs has led Delaware North through decades of growth and expansion." },
      ],
      [
        { text: "His three sons — Jerry Jr., Lou, and Charlie — serve as CEOs of this over-110-year-old enterprise headquartered in Buffalo. " },
        { text: "The organization operates globally", highlight: true },
        { text: " in hospitality sectors including food and retail at sports venues, facility ownership and management, parks hospitality services, hotel management, gaming, and fine dining." },
      ],
      [
        { text: "Jacobs graduated from " },
        { text: "UB's School of Management", highlight: true },
        { text: ". He and his family established the " },
        { text: "Jacobs School of Medicine and Biomedical Sciences ($30 million commitment)", highlight: true },
        { text: " and the Jacobs Institute for medical innovation." },
      ],
    ],
    affiliations: [
      { org: "Delaware North", role: "Chairman", category: "business", faviconDomain: "delawarenorth.com", coverImage: "/logos/affiliations/delaware-north.jpg", href: "https://www.delawarenorth.com" },
      { org: "Boston Bruins / NHL", role: "Owner & Governor; NHL Board Chair since 2007", category: "business", faviconDomain: "nhl.com", coverImage: "/logos/affiliations/bruins.jpg", href: "https://www.nhl.com/bruins" },
      { org: "University at Buffalo Council", role: "Former Chairman (appointed 1998)", category: "education", jurisdiction: "state", faviconDomain: "buffalo.edu", coverImage: "/logos/affiliations/ub.jpg", href: "https://www.buffalo.edu/ubcouncil/members.html", contribution: "Jeremy Sr. chaired the UB Council for years; son Jerry Jr. now holds the chair, appointed by Gov. Hochul", description: "Jeremy Sr. chaired the University at Buffalo Council for years; his son Jerry Jr. now holds the chair, appointed by Gov. Hochul. ICE — operating from 250 Delaware, the building Delaware North is headquartered in — has targeted UB students and faculty." },
      { org: "Jacobs School of Medicine (UB)", role: "Namesake; $30M founding donor", category: "education", jurisdiction: "state", faviconDomain: "buffalo.edu", coverImage: "/logos/affiliations/ub.jpg", contribution: "$30 million founding gift — the family's name is on UB's medical school", description: "The Jacobs family's $30 million gift named UB's medical school. The same family's headquarters sits above the ICE field office." },
      { org: "Jacobs Institute", role: "Chairman", category: "charity", faviconDomain: "jacobsinstitute.org", coverImage: "/logos/affiliations/jacobs-institute.jpg", href: "https://www.jacobsinstitute.org", contribution: "Founded and funds the vascular medical-innovation center that bears the family name", description: "A vascular medical-innovation center the family founded and chairs." },
      { org: "Jacobs Family Foundation", role: "Founder & Trustee", category: "charity", href: "https://projects.propublica.org/nonprofits/organizations/933116080", contribution: "~$10M family foundation funding medical research", description: "The Margaret D. & Jeremy M. Jacobs Family Foundation (~$10M in assets) funds medical research." },
      { org: "Trump Transition Team", role: "Donor — $65,000+", category: "government", jurisdiction: "federal", contribution: "$65,000+ to Trump's 2016 transition — eleven family members gave the maximum", description: "Eleven Jacobs family members and their corporate entities gave the maximum to Trump's 2016 transition." },
    ],
  },
  {
    id: "jerry-jr",
    name: "Jerry Jacobs Jr.",
    title: "CEO, Delaware North; Alternate Governor, Boston Bruins",
    photo: "/photos/jacobs/jacobs-jerry-jr.jpg",
    bioParas: [
      [
        { text: "Jeremy \"Jerry\" M. Jacobs Jr. serves as Chief Executive Officer of Delaware North, a position he shares with his brothers Lou and Charlie. He also functions as an alternate governor for the Boston Bruins." },
      ],
      [
        { text: "Beyond his executive duties, Jacobs has invested significantly in philanthropic and civic endeavors. He " },
        { text: "chairs the University at Buffalo Council's board", highlight: true },
        { text: " — appointed by Governor Hochul — and serves on multiple boards, including the Corps Network and Mimivax. He participates in the U.S. Travel Association's CEO Roundtable and the Partnership for New York City." },
      ],
      [
        { text: "ICE, operating from 250 Delaware just floors below Delaware North's headquarters, has " },
        { text: "targeted UB students and faculty", highlight: true },
        { text: " — abducting a faculty researcher and an art student, and raiding off-campus student housing in Amherst." },
      ],
    ],
    affiliations: [
      { org: "Delaware North", role: "CEO", category: "business", faviconDomain: "delawarenorth.com", coverImage: "/logos/affiliations/delaware-north.jpg", href: "https://www.delawarenorth.com" },
      { org: "Boston Bruins / NHL", role: "Alternate Governor", category: "business", faviconDomain: "nhl.com", coverImage: "/logos/affiliations/bruins.jpg" },
      { org: "University at Buffalo Council", role: "Current Chair (appointed by Gov. Hochul, 2025)", category: "education", jurisdiction: "state", faviconDomain: "buffalo.edu", coverImage: "/logos/affiliations/ub.jpg", href: "https://www.buffalo.edu/ubcouncil/members.html", description: "Gov. Hochul appointed Jerry Jr. chair of the UB Council in March 2025 — the same governor whose husband Delaware North paid hundreds of thousands of dollars a year as general counsel." },
      { org: "M&T Bank", role: "Board of Directors (2025)", category: "business", faviconDomain: "mtb.com", coverImage: "/logos/affiliations/mtbank.jpg", href: "https://ir.mtb.com", description: "Elected to the board of Buffalo's largest bank in 2025." },
      { org: "Mimivax", role: "Board Chair", category: "business", faviconDomain: "mimivax.com", description: "Chairs the board of the Buffalo biotech company." },
      { org: "Corps Network", role: "Board Member", category: "civic", jurisdiction: "federal", faviconDomain: "corpsnetwork.org", coverImage: "/logos/affiliations/corps.jpg" },
      { org: "Partnership for New York City", role: "Member", category: "civic", jurisdiction: "state", faviconDomain: "pfnyc.org", coverImage: "/logos/affiliations/pfnyc.jpg" },
      { org: "Say Yes Buffalo", role: "Founding Board Member", category: "education", faviconDomain: "sayyesbuffalo.org", coverImage: "/logos/affiliations/sayyes.jpg", href: "https://www.sayyesbuffalo.org" },
      { org: "United Way of Buffalo & Erie County", role: "Former Chairman", category: "charity", faviconDomain: "uwbec.org", coverImage: "/logos/affiliations/uwbec.jpg", href: "https://www.uwbec.org" },
      { org: "Georgetown University", role: "Former Board of Regents", category: "education", jurisdiction: "federal", faviconDomain: "georgetown.edu", coverImage: "/logos/affiliations/georgetown.jpg" },
    ],
  },
  {
    id: "lou",
    name: "Lou Jacobs",
    title: "CEO, Delaware North; Alternate Governor, Boston Bruins",
    photo: "/photos/jacobs/jacobs-lou.jpg",
    bioParas: [
      [
        { text: "Lou Jacobs serves as one of three co-CEOs of Delaware North, the family's global hospitality and entertainment enterprise headquartered in Buffalo. He also serves as " },
        { text: "Alternate Governor of the Boston Bruins", highlight: true },
        { text: "." },
      ],
      [
        { text: "Along with his brothers Jerry Jr. and Charlie, Lou oversees a company that operates food and retail concessions at sports venues, national parks, hotels, and gaming facilities worldwide." },
      ],
    ],
    affiliations: [
      { org: "Delaware North", role: "CEO", category: "business", faviconDomain: "delawarenorth.com", coverImage: "/logos/affiliations/delaware-north.jpg", href: "https://www.delawarenorth.com" },
      { org: "Boston Bruins / NHL", role: "Alternate Governor", category: "business", faviconDomain: "nhl.com", coverImage: "/logos/affiliations/bruins.jpg" },
      { org: "American Gaming Association", role: "CEO Roundtable Chair (2026)", category: "business", jurisdiction: "federal", faviconDomain: "americangaming.org", coverImage: "/logos/affiliations/aga.jpg", href: "https://www.americangaming.org", description: "Chairs the CEO Roundtable of the casino industry's main lobbying group." },
      { org: "FeedMore WNY", role: "Board of Directors; Capital Campaign Chair", category: "charity", faviconDomain: "feedmorewny.org", coverImage: "/logos/affiliations/feedmore.jpg", href: "https://www.feedmorewny.org" },
      { org: "Everglades Foundation", role: "Chairman's Advisory Council", category: "charity", faviconDomain: "evergladesfoundation.org", coverImage: "/logos/affiliations/everglades.jpg", href: "https://www.evergladesfoundation.org" },
    ],
  },
  {
    id: "charlie",
    name: "Charlie Jacobs",
    title: "CEO, Delaware North; CEO, Boston Bruins",
    photo: "/photos/jacobs/jacobs-charlie.jpg",
    bioParas: [
      [
        { text: "Charlie Jacobs serves as one of three co-CEOs of Delaware North and as " },
        { text: "CEO of the Boston Bruins", highlight: true },
        { text: " — the NHL franchise owned by the Jacobs family." },
      ],
      [
        { text: "Along with his brothers Jerry Jr. and Lou, Charlie co-leads Delaware North's global operations. The company's headquarters at 250 Delaware Avenue sit directly above the ICE offices that coordinate mass deportations across all of upstate and Western New York." },
      ],
    ],
    affiliations: [
      { org: "Delaware North", role: "CEO", category: "business", faviconDomain: "delawarenorth.com", coverImage: "/logos/affiliations/delaware-north.jpg", href: "https://www.delawarenorth.com" },
      { org: "Boston Bruins / NHL", role: "CEO & Alternate Governor", category: "business", faviconDomain: "nhl.com", coverImage: "/logos/affiliations/bruins.jpg", href: "https://www.nhl.com/bruins" },
      { org: "Boston Bruins Foundation", role: "Founder & Chairman", category: "charity", faviconDomain: "bostonbruins.com", coverImage: "/logos/affiliations/bruins-foundation.jpg", href: "https://www.nhl.com/bruins/community/boston-bruins-foundation" },
      { org: "NESN", role: "Board Member (22 years)", category: "business", faviconDomain: "nesn.com", coverImage: "/logos/affiliations/nesn.jpg", href: "https://www.nesn.com" },
      { org: "The Sports Museum", role: "Board Member", category: "cultural", faviconDomain: "sportsmuseum.org", coverImage: "/logos/affiliations/sportsmuseum.jpg", href: "https://www.sportsmuseum.org" },
      { org: "Massachusetts Business Roundtable", role: "Member", category: "business", faviconDomain: "maroundtable.com" },
    ],
  },
];

// Short labels for each person, indexed to match JACOBS_PEOPLE order.
export const JACOBS_SHORT_NAMES = ["Jeremy Sr.", "Jerry Jr.", "Lou", "Charlie"];

// Verified wealth references shown under each photo. Only Jeremy Sr. has a
// documented personal net worth (Forbes); the sons share the family fortune.
export const JACOBS_WEALTH: Record<string, WealthRef> = {
  "Jeremy Sr.": {
    label: "Buffalo's only Forbes billionaire · ~$4.6B (2025)",
    href: "https://buffalonews.com/news/local/business/jeremy-jacobs-sr-is-buffalo-niagaras-only-billionaire-forbes-says/article_26f0bac8-0aa3-5cc9-bee5-f398a84c3766.html",
  },
  "Jerry Jr.": {
    label: "Co-CEO of family-owned Delaware North",
    href: "https://www.delawarenorth.com/who-we-are/executive-team/",
  },
  Lou: {
    label: "Co-CEO of family-owned Delaware North",
    href: "https://www.delawarenorth.com/who-we-are/executive-team/",
  },
  Charlie: {
    label: "CEO of the Boston Bruins · shares the family fortune",
    href: "https://en.wikipedia.org/wiki/Charlie_Jacobs",
  },
};

// Top political donations shown as edges in the power map (verified figures).
export const JACOBS_DONATIONS: PowerMapDonation[] = [
  { person: "Jeremy Sr.", recipient: "Trump Victory", amount: "$100,000", jurisdiction: "federal", detail: "Jeremy Jacobs Sr. to Trump's 2016 joint fundraising committee.", href: "https://www.fec.gov/data/receipts/?contributor_name=Jacobs&contributor_employer=Delaware+North" },
  { person: "Jeremy Sr.", recipient: "Gov. Kathy Hochul", amount: "$401,854 (family)", jurisdiction: "state", detail: "Family total to Hochul's campaigns since 1999 (NY State Board of Elections).", href: "https://data.ny.gov/d/4j2b-6a2j" },
  { person: "Jeremy Sr.", recipient: "Republican National Committee", amount: "$33,400", jurisdiction: "federal", detail: "Jeremy Jacobs Sr., 2016 cycle.", href: "https://www.fec.gov/data/receipts/?contributor_name=Jacobs&contributor_employer=Delaware+North" },
  { person: "Jerry Jr.", recipient: "Rep. Hakeem Jeffries", amount: "$17,000 (family)", jurisdiction: "federal", detail: "U.S. House Democratic Leader · family total.", href: "https://www.fec.gov/data/receipts/?contributor_name=Jacobs&contributor_employer=Delaware+North" },
  { person: "Charlie", recipient: "Mass. Democratic Party", amount: "$20,000", jurisdiction: "state", detail: "Charles Jacobs, 2025.", href: "https://www.fec.gov/data/receipts/?contributor_name=Jacobs&contributor_employer=Delaware+North" },
];

export const JACOBS_AFFILIATIONS: AffiliationEntry[] = JACOBS_PEOPLE.flatMap(
  (person, i) =>
    person.affiliations.map((aff) => ({
      ...aff,
      person: JACOBS_SHORT_NAMES[i],
    }))
);
