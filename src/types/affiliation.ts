// Shared shapes for the family power-map / affiliations features.

export type AffiliationCategory =
  | "education"
  | "catholic"
  | "business"
  | "cultural"
  | "sports"
  | "charity"
  | "civic"
  | "government";

// Power-map filter axes.
export type Jurisdiction = "local" | "state" | "federal";
export type FilterType =
  | "politician"
  | "sports"
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

// A power-map edge: a person connected to an entity (node). `description` is
// the entity's topline (rich text); `detail` is this relationship's own
// rich-text note. Both are Lexical JSON, rendered in the node modal.
export interface AffiliationEntry {
  person: string;
  org: string;
  role: string; // the label shown on the edge (role or $ amount)
  category: AffiliationCategory;
  jurisdiction?: Jurisdiction;
  coverImage?: string; // entity photo/logo URL
  href?: string; // this relationship's source link
  description?: unknown; // entity topline (rich text JSON)
  detail?: unknown; // this relationship's description (rich text JSON)
  // legacy optionals (no longer populated; kept so older references compile)
  faviconDomain?: string;
  logoPath?: string;
  contribution?: string;
}

export interface BioSegment {
  text: string;
  highlight?: boolean;
}

// A short labeled reference with an optional source link.
export interface WealthRef {
  label: string;
  href?: string;
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
