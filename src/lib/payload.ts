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

export async function getFamilyData(family: FamilyKey): Promise<FamilyData | null> {
  try {
    const payload = await getPayload();
    // People carry the family; affiliations/donations link to a person, so we
    // scope those by this family's person IDs and map person → shortName.
    const peopleRes = await payload.find({
      collection: "people",
      where: { family: { equals: family } },
      sort: "order",
      limit: 100,
      depth: 0,
    });
    const peopleDocs = peopleRes.docs as unknown as Record<string, unknown>[];
    const personIds = peopleDocs.map((d) => d.id);
    const idToShortName = new Map(peopleDocs.map((d) => [d.id, (d.shortName as string) ?? ""]));

    const [affRes, donRes] = await Promise.all([
      personIds.length
        ? payload.find({ collection: "affiliations", where: { person: { in: personIds } }, limit: 500, depth: 0 })
        : Promise.resolve({ docs: [] as unknown[] }),
      personIds.length
        ? payload.find({ collection: "donations", where: { person: { in: personIds } }, sort: "order", limit: 200, depth: 0 })
        : Promise.resolve({ docs: [] as unknown[] }),
    ]);

    const people: PowerMapPerson[] = peopleDocs.map((d) => ({
      id: String(d.id),
      name: (d.name as string) ?? "",
      shortName: (d.shortName as string) ?? "",
      title: (d.title as string) ?? "",
      photo: (d.photo as string) ?? "",
      bioParas: bioToParas(d.bio),
    }));

    const heroPeople: HeroPerson[] = peopleDocs.map((d) => ({
      name: (d.name as string) ?? "",
      title: (d.title as string) ?? "",
      photo: (d.photo as string) ?? "",
    }));

    const affiliations: AffiliationEntry[] = affRes.docs.map((doc) => {
      const a = doc as unknown as Record<string, unknown>;
      return {
        person: idToShortName.get(a.person) ?? "",
        org: (a.org as string) ?? "",
        role: (a.role as string) ?? "",
        category: (a.category as AffiliationCategory) ?? "civic",
        jurisdiction: (a.jurisdiction as Jurisdiction) ?? undefined,
        href: (a.href as string) ?? undefined,
        contribution: (a.contribution as string) ?? undefined,
        description: (a.description as string) ?? undefined,
        logoPath: (a.logoPath as string) ?? undefined,
        coverImage: (a.coverImage as string) ?? undefined,
        faviconDomain: (a.faviconDomain as string) ?? undefined,
      };
    });

    const donations: PowerMapDonation[] = donRes.docs.map((doc) => {
      const o = doc as unknown as Record<string, unknown>;
      return {
        person: idToShortName.get(o.person) ?? "",
        recipient: (o.recipient as string) ?? "",
        amount: (o.amount as string) ?? "",
        period: (o.period as string) ?? undefined,
        jurisdiction: (o.jurisdiction as Jurisdiction) ?? "local",
        detail: (o.detail as string) ?? undefined,
        photo: (o.photo as string) ?? undefined,
        href: (o.href as string) ?? undefined,
      };
    });

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
