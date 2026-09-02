import { getPayload as getPayloadInstance } from "payload";
import type { Payload } from "payload";
import config from "@payload-config";
import type {
  PowerMapPerson,
  PowerMapDonation,
} from "@/components/PowerMap";
import type {
  AffiliationEntry,
  BioSegment,
  AffiliationCategory,
  Jurisdiction,
} from "@/types/affiliation";
import type { HeroPerson } from "@/components/WealthHero";

let cachedPayload: Payload | null = null;

export async function getPayload() {
  if (!cachedPayload) {
    cachedPayload = await getPayloadInstance({ config });
  }
  return cachedPayload;
}

// Fetch a page by slug. Returns null on any failure (e.g. DB not configured
// yet) so callers can fall back to a hardcoded view.
export async function getPageBySlug(slug: string) {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    });
    return result.docs[0] ?? null;
  } catch (err) {
    console.error(`[payload] getPageBySlug("${slug}") failed:`, err);
    return null;
  }
}

// ---- Power-map family data (People / Affiliations / Donations) ------------

export type FamilyKey = "montante" | "jacobs";

export interface FamilyData {
  people: PowerMapPerson[];
  heroPeople: HeroPerson[];
  affiliations: AffiliationEntry[];
  donations: PowerMapDonation[];
}

// Convert a People.bio Lexical doc into the BioSegment[][] PowerMap expects
// (paragraphs of text segments; bold/colored text → highlighted).
function bioToParas(bio: unknown): BioSegment[][] {
  const root = (bio as { root?: { children?: unknown[] } })?.root;
  const paras = (root?.children ?? []) as Array<{ type?: string; children?: unknown[] }>;
  return paras
    .filter((p) => p.type === "paragraph")
    .map((p) =>
      ((p.children ?? []) as Array<{ type?: string; text?: string; format?: number; $?: { color?: string } }>)
        .filter((c) => c.type === "text" && c.text)
        .map((c) => ({
          text: c.text as string,
          highlight: !!(((c.format ?? 0) & 1) || c.$?.color),
        })),
    )
    .filter((para) => para.length > 0);
}

// A populated upload relationship (depth ≥1) → its public URL; else "".
function mediaUrl(v: unknown): string {
  if (v && typeof v === "object" && "url" in v) {
    return String((v as { url?: string }).url ?? "");
  }
  return "";
}

// A relationship value → its id (populated object at depth ≥1, or a raw id).
function relId(v: unknown): unknown {
  if (v && typeof v === "object" && "id" in v) return (v as { id: unknown }).id;
  return v;
}

export async function getFamilyData(family: FamilyKey): Promise<FamilyData | null> {
  try {
    const payload = await getPayload();
    // People carry the family; relationships link a person to an entity (node).
    // Scope relationships by this family's people; depth:2 populates the person,
    // the entity, and the entity's Media photo.
    const peopleRes = await payload.find({
      collection: "people",
      where: { family: { equals: family } },
      sort: "order",
      limit: 100,
      depth: 1,
    });
    const peopleDocs = peopleRes.docs as unknown as Record<string, unknown>[];
    const personIds = peopleDocs.map((d) => d.id);
    const idToShortName = new Map(
      peopleDocs.map((d) => [d.id, (d.shortName as string) ?? ""]),
    );

    const relRes = personIds.length
      ? await payload.find({
          collection: "relationships",
          where: { person: { in: personIds } },
          sort: "order",
          limit: 1000,
          depth: 2,
        })
      : { docs: [] as unknown[] };

    const people: PowerMapPerson[] = peopleDocs.map((d) => ({
      id: String(d.id),
      name: (d.name as string) ?? "",
      shortName: (d.shortName as string) ?? "",
      title: (d.title as string) ?? "",
      photo: mediaUrl(d.photo),
      bioParas: bioToParas(d.bio),
    }));

    const heroPeople: HeroPerson[] = peopleDocs.map((d) => ({
      name: (d.name as string) ?? "",
      title: (d.title as string) ?? "",
      photo: mediaUrl(d.photo),
    }));

    // Each relationship becomes one power-map edge, its node the linked entity.
    const affiliations: AffiliationEntry[] = [];
    for (const doc of relRes.docs) {
      const r = doc as unknown as Record<string, unknown>;
      const e = r.entity as Record<string, unknown> | null;
      if (!e || typeof e !== "object") continue;
      affiliations.push({
        person: idToShortName.get(relId(r.person)) ?? "",
        org: (e.name as string) ?? "",
        role: (r.label as string) ?? "",
        category: (e.category as AffiliationCategory) ?? "civic",
        jurisdiction: (e.jurisdiction as Jurisdiction) ?? undefined,
        description: e.description ?? undefined, // entity topline (rich text)
        detail: r.description ?? undefined, // this relationship's note (rich text)
        href: (r.href as string) ?? undefined,
        coverImage: mediaUrl(e.photo) || undefined,
      });
    }

    return { people, heroPeople, affiliations, donations: [] };
  } catch (err) {
    console.error(`[payload] getFamilyData("${family}") failed:`, err);
    return null;
  }
}

// ---- Coalition sponsors ----------------------------------------------------

export interface SponsorItem {
  name: string;
  href: string;
  logo: string; // public URL of the logo image
  scale: number; // relative size / space claimed in the packing, 1 = baseline
  aspectRatio?: number; // width/height from the media doc, if known
}

// Fetch the coalition partners in their CMS display order (the `orderable`
// drag order). Returns null on any failure so the homepage can fall back to
// the hardcoded FALLBACK_SPONSORS list.
export async function getSponsors(): Promise<SponsorItem[] | null> {
  try {
    const payload = await getPayload();
    const res = await payload.find({
      collection: "sponsors",
      limit: 500,
      depth: 1,
    });
    const items = res.docs
      .map((doc) => {
        const d = doc as unknown as Record<string, unknown>;
        const logo = d.logo as { width?: number; height?: number } | null;
        const w = logo?.width;
        const h = logo?.height;
        return {
          name: (d.name as string) ?? "",
          href: (d.href as string) || "#",
          logo: mediaUrl(d.logo),
          scale: typeof d.scale === "number" ? d.scale : 1,
          aspectRatio: w && h ? w / h : undefined,
        };
      })
      .filter((s) => s.logo);
    return items.length ? items : null;
  } catch (err) {
    console.error("[payload] getSponsors() failed:", err);
    return null;
  }
}

// ---- Press coverage --------------------------------------------------------

export interface PressItem {
  outlet: string;
  headline: string;
  url: string;
  date: string; // ISO date
  logo: string; // public URL of the publication logo
  showOnHomepage: boolean; // featured in the homepage "In the News" section
}

// Fetch press articles newest-first for the homepage "In the News" section.
// Retries transient DB/connection blips so a single failure doesn't blank the
// section (and poison the ISR cache with an empty render). Returns null only
// when there are genuinely no articles or all retries fail.
export async function getPress(): Promise<PressItem[] | null> {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const payload = await getPayload();
      const res = await payload.find({
        collection: "press",
        sort: "-date",
        limit: 100,
        depth: 1,
      });
      const items = res.docs.map((doc) => {
        const d = doc as unknown as Record<string, unknown>;
        return {
          outlet: (d.outlet as string) ?? "",
          headline: (d.headline as string) ?? "",
          url: (d.url as string) || "#",
          date: (d.date as string) ?? "",
          logo: mediaUrl(d.logo),
          // Only articles checked "Show on homepage" appear in the homepage
          // strip; the rest live on /news. (Existing rows default to checked.)
          showOnHomepage: d.showOnHomepage === true,
        };
      });
      return items.length ? items : null;
    } catch (err) {
      if (attempt === 3) {
        console.error("[payload] getPress() failed after retries:", err);
        return null;
      }
      await new Promise((r) => setTimeout(r, 200 * attempt));
    }
  }
  return null;
}

// ---- On-the-ground photos --------------------------------------------------

export interface GroundPhotoItem {
  src: string; // public URL of the image
  alt: string;
  credit: string;
}

// Fetch the homepage "On the Ground" photos in their CMS drag order. Returns
// null on any failure or when empty so the component can fall back to its
// hardcoded photo set.
export async function getGroundPhotos(): Promise<GroundPhotoItem[] | null> {
  try {
    const payload = await getPayload();
    const res = await payload.find({
      collection: "groundPhotos",
      limit: 500,
      depth: 1,
    });
    const items = res.docs
      .map((doc) => {
        const d = doc as unknown as Record<string, unknown>;
        const media = d.image as { alt?: string } | null;
        return {
          src: mediaUrl(d.image),
          alt: (d.alt as string) || (media?.alt ?? ""),
          credit: (d.credit as string) ?? "",
        };
      })
      .filter((p) => p.src);
    return items.length ? items : null;
  } catch (err) {
    console.error("[payload] getGroundPhotos() failed:", err);
    return null;
  }
}

// ---- Coalition statements --------------------------------------------------

export interface StatementItem {
  org: string;
  href: string;
  keyPoint?: string; // short teaser; full text opens in the modal
  paragraphs: string[];
}

// Fetch the homepage coalition endorsement statements in their CMS drag order.
// The `statement` textarea is split on blank lines into paragraphs. Returns null
// on any failure or when empty so the component can fall back to its hardcoded
// set.
export async function getStatements(): Promise<StatementItem[] | null> {
  try {
    const payload = await getPayload();
    const res = await payload.find({
      collection: "statements",
      limit: 200,
      depth: 0,
    });
    const items = res.docs
      .map((doc) => {
        const d = doc as unknown as Record<string, unknown>;
        const full = ((d.statement as string) ?? "").trim();
        const paragraphs = full
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter(Boolean);
        const kp = ((d.keyPoint as string) ?? "").trim();
        return {
          org: (d.org as string) ?? "",
          href: (d.href as string) ?? "",
          keyPoint: kp || undefined,
          paragraphs: paragraphs.length ? paragraphs : full ? [full] : [],
        };
      })
      .filter((s) => s.org && s.paragraphs.length);
    return items.length ? items : null;
  } catch (err) {
    console.error("[payload] getStatements() failed:", err);
    return null;
  }
}

// Load a facts page plus the family data any of its blocks reference.
export async function loadFactsPage(slug: string) {
  const page = await getPageBySlug(slug);
  if (!page) return null;
  const sections = ((page as { sections?: unknown[] }).sections ?? []) as Array<{
    familyKey?: string;
  }>;
  const keys = Array.from(
    new Set(sections.map((s) => s.familyKey).filter(Boolean)),
  ) as FamilyKey[];
  const familyData: Partial<Record<string, FamilyData>> = {};
  for (const k of keys) {
    const fd = await getFamilyData(k);
    if (fd) familyData[k] = fd;
  }
  return { sections, familyData };
}
