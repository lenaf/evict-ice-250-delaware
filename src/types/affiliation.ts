// Shared shapes for the family power-map / affiliations features.

export type AffiliationCategory =
  | "education"
  | "catholic"
  | "business"
  | "cultural"
  | "charity"
  | "civic"
  | "government";

// Power-map filter axes.
export type Jurisdiction = "local" | "state" | "federal";
export type FilterType =
  | "politician"
  | "arts"
  | "education"
  | "business"
  | "civic";

// A single institutional tie held by a person.
export interface Affiliation {
  org: string;
  role: string;
  category: AffiliationCategory;
  faviconDomain?: string;
  logoPath?: string;
  coverImage?: string;
  href?: string;
  description?: string;
  contribution?: string; // money/time the family gives this org — e.g. "$30M founding gift"
  jurisdiction?: Jurisdiction; // for the power-map jurisdiction filter (defaults to local)
}

// An affiliation flattened out and tagged with which person holds it.
export interface AffiliationEntry extends Affiliation {
  person: string;
}

export interface BioSegment {
  text: string;
  highlight?: boolean;
}

// A family member: bio + the institutional affiliations they hold.
export interface PersonData {
  id: string;
  name: string;
  title: string;
  photo: string;
  bioParas: BioSegment[][];
  affiliations: Affiliation[];
}
