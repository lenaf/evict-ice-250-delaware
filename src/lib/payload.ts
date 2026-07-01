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
        href: (e.href as string) ?? undefined,
        contribution: (e.contribution as string) ?? undefined,
        description: (e.description as string) ?? undefined,
        coverImage: mediaUrl(e.photo) || undefined,
      });
    }

    return { people, heroPeople, affiliations, donations: [] };
  } catch (err) {
    console.error(`[payload] getFamilyData("${family}") failed:`, err);
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
