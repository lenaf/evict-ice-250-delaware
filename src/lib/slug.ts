const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Paths under /events that a slug would shadow.
const RESERVED = new Set(["cancel"]);

export function isUuid(value: string): boolean {
  return UUID.test(value);
}

// Lowercase, hyphen-separated URL slug from free text.
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// Error message for an unusable slug, or null if it's fine.
export function getSlugError(slug: string): string | null {
  if (slug !== slugify(slug)) return "URL can only use lowercase letters, numbers, and hyphens.";
  if (isUuid(slug) || RESERVED.has(slug)) return `"${slug}" can't be used as an event URL.`;
  return null;
}

export function eventPath(slot: { id: string; slug?: string | null }): string {
  return `/events/${slot.slug || slot.id}`;
}
