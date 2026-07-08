import { revalidatePath } from "next/cache";

// Facts pages that depend on the People/Affiliations/Donations collections.
const FAMILY_PAGES = ["/facts/who-profits", "/facts/who-pulls-the-strings"];

// revalidatePath throws when called outside a request scope (e.g. the seed
// script), so swallow that — there's nothing to revalidate there anyway.
function safe(path: string) {
  try {
    revalidatePath(path);
  } catch {
    /* not in a request scope (seed/CLI) — ignore */
  }
}

// A Pages doc changed → revalidate its own route ("facts/x" → "/facts/x").
export function revalidatePageBySlug(slug?: string | null) {
  if (!slug) return;
  safe("/" + String(slug).replace(/^\/+/, ""));
}

// Power-map data changed → revalidate the family pages that render it.
export function revalidateFamilyPages() {
  FAMILY_PAGES.forEach(safe);
}

// Sponsors changed → revalidate the homepage, which renders the logo grid.
export function revalidateHome() {
  safe("/");
}
