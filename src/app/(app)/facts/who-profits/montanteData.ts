import type { AffiliationEntry, PersonData } from "@/types/affiliation";
import type { PowerMapDonation } from "@/components/PowerMap";

export const MONTANTE_PEOPLE: PersonData[] = [
  {
    id: "carl-sr",
    name: "Carl J. Montante",
    title: "Executive Chairman, Uniland",
    photo: "/photos/montante/montante-carl-sr.jpg",
    bioParas: [
      [
        { text: "Born and raised in Buffalo, New York, Carl J. Montante's accomplishments in business and philanthropy have earned him a reputation as " },
        { text: "one of Buffalo's most notable citizens", highlight: true },
        { text: ". A " },
        { text: "passionate community leader", highlight: true },
        { text: ", Mr. Montante is active in countless organizations and manages the majority of his and his family's philanthropic contributions with little fanfare." },
      ],
      [
        { text: "He decided to pursue real estate full-time and founded Uniland Development Company in 1974. Since that time, Mr. Montante has managed the development of over 16 million square feet of commercial, institutional and residential properties, making Uniland one of the largest developers and property owners in Western New York." },
      ],
      [
        { text: "As strong as Mr. Montante's belief in the pursuit of excellence is his steadfast responsibility for " },
        { text: "strengthening community", highlight: true },
        { text: ". He dedicates much of his time and energy to nonprofit organizations in the Buffalo Niagara region including " },
        { text: "D'Youville University, The Bishop's Council of the Laity, Invest Buffalo Niagara, and the Buffalo Niagara Partnership", highlight: true },
        { text: ". He has served as chairman for the " },
        { text: "Catholic Health System, Canisius University, Canisius High School, and the Buffalo Philharmonic Orchestra", highlight: true },
        { text: "." },
      ],
      [
        { text: "For his efforts, Mr. Montante has received the " },
        { text: "Seymour H. Knox Humanitarian of the Year Award", highlight: true },
        { text: ", the " },
        { text: "WNY Philanthropist of the Year", highlight: true },
        { text: " award, and the " },
        { text: "Bishop's Medal from the Catholic Diocese of Buffalo", highlight: true },
        { text: "." },
      ],
    ],
    affiliations: [
      { org: "Catholic Diocese of Buffalo", role: "Bishop's Council member, 25+ years; Bishop's Medal (2009); former Chairman of Catholic Health System", category: "catholic", faviconDomain: "buffalodiocese.org", logoPath: "/logos/affiliations/diocese-buffalo.svg", coverImage: "/logos/affiliations/diocese.jpg", contribution: "25+ years on the Bishop's Council, which raises money for the diocese and advises the bishop directly", description: "Carl Montante Sr. said he was a member of the Bishop's Council of the Laity, an invitation-only diocesan organization that raises money for the church and gives advice directly to the bishop, for more than 25 years. He also served as Chairman of the diocese-sponsored Catholic Health System, and was awarded the Bishop's Medal by the Buffalo Diocese in 2009. Laura Zaepfel was a former trustee of both Catholic Charities (the diocese's philanthropic arm) and the Foundation of the Roman Catholic Diocese of Buffalo. In September 2025, Pope Leo XIV denounced the Trump administration immigration crackdown from which the Montante family brings in more than $2 million every year as \"inhuman\"." },
      { org: "Canisius High School", role: "Former Board of Trustees; Distinguished Service Award; Hall of Honor", category: "education", faviconDomain: "canisiushigh.org", logoPath: "/logos/affiliations/canisius-high.webp", coverImage: "/logos/affiliations/canisius-high.jpg", href: "https://www.canisiushigh.org", contribution: "Uniland built the Montante Academic Hall, the Kennedy '49 Field House, and the Madden Center for Global Learning", description: "Carl Sr., Carl Jr., and Michael are graduates. The school's Montante Academic Hall is named for the family and built by Uniland. Uniland also built the Bernard J. Kennedy '49 Field House and the Madden Center for Global Learning for the high school." },
      { org: "Canisius University", role: "Former Board Chair; Donor; Distinguished Alumni", category: "education", faviconDomain: "canisius.edu", logoPath: "/logos/affiliations/canisius-university.svg", coverImage: "/logos/affiliations/canisius-univ.jpg", href: "https://www.canisius.edu", contribution: "Namesake of the Montante Cultural Center; Uniland built the Science Hall and student housing", description: "Carl Sr. is a former board chair, Laura Zaepfel is trustee emerita, and Michael sits on the business school's advisory council. The Montante Cultural Center bears their name. Uniland built the university's Science Hall and student housing." },
      { org: "D'Youville University", role: "Board of Trustees Member; Honorary Degree (2016)", category: "education", faviconDomain: "dyu.edu", logoPath: "/logos/affiliations/dyouville.png", coverImage: "/logos/affiliations/dyouville.jpg", href: "https://www.dyu.edu", contribution: "Named its library for the family; the school chose Uniland-owned land for its planned medical school", description: "Named its library for the family and selected Uniland-owned land for its planned medical school." },
      { org: "Buffalo Philharmonic Orchestra", role: "Past Chairman; $1.5M+ Donor; Uniland Lead Sponsor", category: "cultural", faviconDomain: "bpo.org", logoPath: "/logos/affiliations/bpo.svg", coverImage: "/logos/affiliations/bpo.jpg", href: "https://bpo.org", contribution: "As much as $1.5 million in personal gifts; Uniland is lead sponsor of the BPO Diversity Council", description: "Carl Montante Sr. is a past chairman of the Buffalo Philharmonic Orchestra. Carl Montante Sr. and his wife Carol Ann Montante have given at least two significant donations to the BPO, totaling as much as $1.5 million. Uniland is the lead corporate sponsor of BPO's Diversity Council." },
      { org: "The Buffalo Club", role: "Board of Directors", category: "cultural", logoPath: "/logos/affiliations/buffalo-club.png", coverImage: "/logos/affiliations/buffalo-club.jpg", description: "Carl Montante Sr., Michael Montante, and Laura Zaepfel have all served on the board of directors of the Buffalo Club, an elite social club established in 1867 whose membership list is a who's who of Western New York's richest and most powerful. The Buffalo Club did not admit women or Black people as members until compelled to by a local law in 1989. Laura Zaepfel was President of the Buffalo Club board through 2023 and Michael Montante was First Vice President as of 2024." },
      { org: "Buffalo Tennis & Squash Club", role: "Board Member", category: "cultural", logoPath: "/logos/affiliations/buffalo-tennis-squash.png", coverImage: "/logos/affiliations/tennis-squash.jpg", description: "Carl Montante Sr. and his wife Carol have been board members at the Buffalo Tennis & Squash Club, a private racket sports club in Buffalo's Elmwood Village neighborhood." },
      { org: "Buffalo Niagara Partnership", role: "Former Board Member; Director's Circle", category: "business", faviconDomain: "thepartnership.org", coverImage: "/logos/affiliations/bnp.jpg", href: "https://www.thepartnership.org", description: "Uniland is a \"Director's Circle\" member of the Buffalo Niagara Partnership, the Western New York region's chamber of commerce and primary lobbying organization for the corporate community. Carl Montante Sr. is a former board member and Michael Montante is a current member. The Buffalo Niagara Partnership has made statements embracing immigrants, particularly refugees, for their contributions to the local economy." },
      { org: "Invest Buffalo Niagara", role: "Former Board Member", category: "business", faviconDomain: "buffaloniagara.org", logoPath: "/logos/affiliations/invest-buffalo-niagara.svg", coverImage: "/logos/affiliations/invest.jpg", href: "https://buffaloniagara.org" },
    ],
  },
  {
    id: "michael",
    name: "Michael J. Montante",
    title: "CEO, Uniland",
    photo: "/photos/montante/montante-michael.png",
    bioParas: [
      [
        { text: "Michael Montante has 35 years' experience in the real estate industry and leads " },
        { text: "one of the largest commercial real estate development companies in Western New York", highlight: true },
        { text: ". Mr. Montante's executive oversight ranges from site selection and development to " },
        { text: "tenant negotiations", highlight: true },
        { text: " and asset management of Uniland's broad portfolio." },
      ],
      [
        { text: "As Chief Executive Officer, Mr. Montante oversees Uniland's departments and company subsidiaries. Today Uniland employs over 200 associates and has developed over 16 million square feet, with " },
        { text: "8 million square feet under management", highlight: true },
        { text: ", across the Buffalo-Rochester corridor and beyond." },
      ],
    ],
    affiliations: [
      { org: "Buffalo Niagara Partnership", role: "Current Board Member", category: "business", faviconDomain: "thepartnership.org", href: "https://members.thepartnership.org/board-of-directors" },
      { org: "NAIOP", role: "Former Corporate Board; Former Upstate NY Chapter President; Current Office Dev. Forum Chair", category: "business", faviconDomain: "naiop.org", logoPath: "/logos/affiliations/naiop.svg", href: "https://www.naiop.org", description: "NAIOP, the Commercial Real Estate Development Association, is the industry's main national trade and lobbying group. Michael is a former corporate board member and current Office Development Forum chair; Carl Jr. is a former Upstate NY chapter president and member of the Urban Redevelopment Forum; Laura is also a member." },
      { org: "Canisius University", role: "Former Trustee; Business Advisory Council; Dr. Shick Award", category: "education", faviconDomain: "canisius.edu", href: "https://www.canisius.edu/academics/our-schools/richard-j-wehle-school-business/career-preparation-wehle/business-advisory" },
      { org: "Canisius High School", role: "Former Board of Trustees", category: "education", faviconDomain: "canisiushigh.org" },
      { org: "Frank Lloyd Wright Martin House", role: "Former Board Member", category: "cultural", faviconDomain: "martinhouse.org", logoPath: "/logos/affiliations/martin-house.png", coverImage: "/logos/affiliations/martin-house.jpg", href: "https://martinhouse.org", description: "Michael Montante is a former member of the board of directors of Frank Lloyd Wright's Martin House Corporation. Carl and Carol Montante have also made a testamentary gift to the Martin House through their fund at the Community Foundation for Greater Buffalo." },
      { org: "The Buffalo Club", role: "First Vice President (2024)", category: "cultural" },
      { org: "Roswell Park Alliance Foundation", role: "Board Member", category: "charity", faviconDomain: "roswellpark.org", logoPath: "/logos/affiliations/roswell.png", coverImage: "/logos/affiliations/roswell.jpg", href: "https://www.roswellpark.org/about-us/board-directors/alliance-foundation", description: "Michael Montante is a member of the board of directors of the Roswell Park Alliance Foundation." },
      { org: "Buffalo Renaissance Foundation", role: "Former Board President (2016–2017)", category: "charity", faviconDomain: "buffalorenaissance.org", logoPath: "/logos/affiliations/buffalo-renaissance.png", coverImage: "/logos/affiliations/buffalo-renaissance.jpg", href: "https://buffalorenaissance.org/board-of-directors/", description: "Michael was board president 2016–2017." },
    ],
  },
  {
    id: "laura",
    name: "Laura A. Zaepfel",
    title: "VP Corporate Relations, Uniland",
    photo: "/photos/montante/montante-laura.png",
    bioParas: [
      [
        { text: "Laura A. Zaepfel serves as Vice President of Corporate Relations at Uniland Development Company. She collaborates extensively with local, regional, state, and federal government and business leaders to enhance the Western New York business climate." },
      ],
      [
        { text: "A " },
        { text: "dedicated advocate for inclusive communities", highlight: true },
        { text: ", Zaepfel leads initiatives focused on workforce development that " },
        { text: "reflect community values and empower all members to contribute and succeed", highlight: true },
        { text: ". She oversees Uniland's corporate philanthropy program, maintaining the company's established commitment to community engagement." },
      ],
      [
        { text: "Throughout her career, Zaepfel has provided leadership to organizations including " },
        { text: "Catholic Charities", highlight: true },
        { text: ", Humanities New York, NAIOP, the " },
        { text: "National Federation of Just Communities", highlight: true },
        { text: ", and the Buffalo and Erie County Naval & Military Park." },
      ],
    ],
    affiliations: [
      { org: "Catholic Diocese of Buffalo", role: "Former Trustee & Eight-County Appeal Chair, Catholic Charities; former Trustee & Advancement Chair, Diocese Foundation", category: "catholic", faviconDomain: "buffalodiocese.org", logoPath: "/logos/affiliations/diocese-buffalo.svg", coverImage: "/logos/affiliations/diocese.jpg", description: "Laura Zaepfel is a former trustee of Catholic Charities, the diocese's philanthropic arm, and the former chair of Catholic Charities' Eight-County Annual Appeal. Zaepfel is also a former trustee of the Foundation of the Roman Catholic Diocese of Buffalo, and a former chair of that foundation's Advancement Committee." },
      { org: "Canisius University", role: "Trustee Emerita; LaSalle Medal (2009)", category: "education", faviconDomain: "canisius.edu", href: "https://www.canisius.edu/about/our-leadership/board-trustees" },
      { org: "The Buffalo Club", role: "Board President (through 2023)", category: "cultural" },
      { org: "Amherst Chamber of Commerce", role: "Former Board Member", category: "business", faviconDomain: "amherst.org", logoPath: "/logos/affiliations/amherst-chamber.png", coverImage: "/logos/affiliations/amherst.jpg", description: "Carl Jr. is a current board member; Zaepfel has served in the past." },
      { org: "NAIOP", role: "Member", category: "business", faviconDomain: "naiop.org" },
      { org: "Thurman Thomas Family Foundation", role: "Board Member", category: "charity", faviconDomain: "thurmanthomasfamilyfoundation.org", coverImage: "/logos/affiliations/thurman.jpg", href: "https://www.thurmanthomasfamilyfoundation.org/#board", description: "Zaepfel is a board member." },
      { org: "African American Veterans Monument", role: "Board Member", category: "charity", logoPath: "/logos/affiliations/aavm.png", coverImage: "/logos/affiliations/aavm.jpg", href: "https://projects.propublica.org/nonprofits/organizations/852599672", description: "Zaepfel is a board member." },
      { org: "Law Enforcement Foundation of WNY", role: "Board Member", category: "charity", logoPath: "/logos/affiliations/lefwny.png", href: "https://projects.propublica.org/nonprofits/organizations/161494420/202533099349100508/full", description: "Zaepfel is a board member. The foundation channels private money to area law enforcement." },
      { org: "NAACP Buffalo Branch", role: "Co-Chair, Economic Development Committee; Jefferson Avenue Redevelopment Committee", category: "civic", description: "Per her Uniland bio, Zaepfel co-chairs the Economic Development Committee of the NAACP Buffalo Branch and serves on its Jefferson Avenue Redevelopment Committee." },
      { org: "Erie County Sheriff's Foundation", role: "Board of Directors", category: "charity", description: "Per her Uniland bio, Zaepfel sits on the board of the Erie County Sheriff's Foundation, which channels private money to the county sheriff's office." },
      { org: "FBI Citizens Academy", role: "Member", category: "government", description: "Per her Uniland bio, Zaepfel is a member of the FBI Citizens Academy." },
      { org: "Urban Land Institute", role: "Member", category: "business", description: "Per their Uniland bios, both Laura Zaepfel and Carl Montante Jr. are members of the Urban Land Institute, a national real-estate and land-use network." },
    ],
  },
  {
    id: "carl-jr",
    name: "Carl J. Montante Jr.",
    title: "VP Marketing & Strategic Initiatives, Uniland",
    photo: "/photos/montante/montante-carl-jr.png",
    bioParas: [
      [
        { text: "Carl Montante, Jr. joined Uniland Development Company in 1992. He currently serves as Vice President of Marketing and Strategic Initiatives. Mr. Montante is also the President and Co-Founder of HANSA, an innovative office and coworking space in downtown Buffalo owned by Uniland." },
      ],
      [
        { text: "In his current role, Mr. Montante oversees the firm's strategic planning, marketing services, and various corporate initiatives. Additional responsibilities include pursuing " },
        { text: "business development opportunities for market and product expansion", highlight: true },
        { text: ", enhancement of client services, and organizational development." },
      ],
    ],
    affiliations: [
      { org: "Invest Buffalo Niagara", role: "Current Board Member", category: "business", faviconDomain: "buffaloniagara.org", href: "https://buffaloniagara.org/about-us/" },
      { org: "Amherst Chamber of Commerce", role: "Current Board Member", category: "business", faviconDomain: "amherst.org", href: "https://amherst.org/board-2026/" },
      { org: "Buffalo Niagara Partnership", role: "Development & Construction Industry Leader Forum", category: "business", faviconDomain: "thepartnership.org" },
      { org: "NAIOP", role: "Former Upstate NY Chapter President; Urban Redevelopment Forum Member", category: "business", faviconDomain: "naiop.org", logoPath: "/logos/affiliations/naiop.svg" },
      { org: "Buffalo Civic Auto Ramps", role: "Board Member (manages city-owned parking garages)", category: "civic", coverImage: "/logos/affiliations/bcar.jpg", href: "https://projects.propublica.org/nonprofits/organizations/20738159/202542829349301864/full", description: "Per his Uniland bio, Carl Montante Jr. sits on the board of Buffalo Civic Auto Ramps, which manages publicly owned parking infrastructure." },
      { org: "Urban Land Institute", role: "Member", category: "business", description: "Per their Uniland bios, both Carl Montante Jr. and Laura Zaepfel are members of the Urban Land Institute, a national real-estate and land-use network." },
    ],
  },
];

// Short labels for each person, indexed to match MONTANTE_PEOPLE order.
export const MONTANTE_SHORT_NAMES = ["Carl Sr.", "Michael", "Laura", "Carl Jr."];

// Top political donations shown as edges in the power map (verified, NYSBOE/FEC).
export const MONTANTE_DONATIONS: PowerMapDonation[] = [
  { person: "Carl Sr.", recipient: "Gov. Paterson", amount: "$35,000", period: "2006–10", jurisdiction: "state", photo: "/photos/politicians/paterson.jpg", detail: "Montante family to Gov. David Paterson (NYSBOE).", href: "https://data.ny.gov/d/4j2b-6a2j" },
  { person: "Carl Sr.", recipient: "Gov. Pataki", amount: "$25,000", period: "through 2006", jurisdiction: "state", photo: "/photos/politicians/pataki.jpg", detail: "Montante family to Gov. George Pataki (NYSBOE).", href: "https://data.ny.gov/d/4j2b-6a2j" },
  { person: "Carl Sr.", recipient: "Gov. Cuomo", amount: "$18,000", period: "2010–22", jurisdiction: "state", photo: "/photos/politicians/cuomo.jpg", detail: "Montante family to Gov. Andrew Cuomo (NYSBOE).", href: "https://data.ny.gov/d/4j2b-6a2j" },
  { person: "Carl Sr.", recipient: "Rep. Chris Collins", amount: "$13,500", period: "2012–18", jurisdiction: "federal", detail: "To U.S. Rep. Chris Collins (R, NY-27).", href: "https://www.fec.gov/data/receipts/individual-contributions/?contributor_name=montante" },
  { person: "Laura", recipient: "Gov. Hochul", amount: "$10,000+", period: "since 2014", jurisdiction: "state", photo: "/photos/politicians/hochul.jpg", detail: "Montante/Zaepfel to Gov. Kathy Hochul (NYSBOE).", href: "https://data.ny.gov/d/4j2b-6a2j" },
];

export const MONTANTE_AFFILIATIONS: AffiliationEntry[] = MONTANTE_PEOPLE.flatMap(
  (person, i) =>
    person.affiliations.map((aff) => ({
      ...aff,
      person: MONTANTE_SHORT_NAMES[i],
    }))
);
