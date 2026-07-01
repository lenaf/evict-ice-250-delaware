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
    // People carry the family; connections link to a person, so we scope
    // connections by this family's person IDs. depth:1 populates the Media
    // uploads (photo/image) and the person relationship.
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

    const connRes = personIds.length
      ? await payload.find({
          collection: "connections",
          where: { person: { in: personIds } },
          sort: "order",
          limit: 1000,
          depth: 1,
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

    const affiliations: AffiliationEntry[] = [];
    const donations: PowerMapDonation[] = [];
    for (const doc of connRes.docs) {
      const c = doc as unknown as Record<string, unknown>;
      const shortName = idToShortName.get(relId(c.person)) ?? "";
      if (c.type === "donation") {
        donations.push({
          person: shortName,
          recipient: (c.org as string) ?? "",
          amount: (c.label as string) ?? "",
          period: (c.period as string) ?? undefined,
          jurisdiction: (c.jurisdiction as Jurisdiction) ?? "local",
          detail: (c.description as string) ?? undefined,
          photo: mediaUrl(c.image) || undefined,
          href: (c.href as string) ?? undefined,
        });
      } else {
        affiliations.push({
          person: shortName,
          org: (c.org as string) ?? "",
          role: (c.label as string) ?? "",
          category: (c.category as AffiliationCategory) ?? "civic",
          jurisdiction: (c.jurisdiction as Jurisdiction) ?? undefined,
          href: (c.href as string) ?? undefined,
          contribution: (c.contribution as string) ?? undefined,
          description: (c.description as string) ?? undefined,
          coverImage: mediaUrl(c.image) || undefined,
        });
      }
    }

    return { people, heroPeople, affiliations, donations };
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
