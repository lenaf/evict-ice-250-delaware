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
    const [peopleRes, affRes, donRes] = await Promise.all([
      payload.find({ collection: "people", where: { family: { equals: family } }, sort: "order", limit: 100, depth: 0 }),
      payload.find({ collection: "affiliations", where: { family: { equals: family } }, limit: 500, depth: 0 }),
      payload.find({ collection: "donations", where: { family: { equals: family } }, sort: "order", limit: 200, depth: 0 }),
    ]);

    const peopleDocs = peopleRes.docs as unknown as Record<string, unknown>[];
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
        person: (a.person as string) ?? "",
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
        person: (o.person as string) ?? "",
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
