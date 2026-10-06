import { supabaseAdmin } from "@/lib/supabase-server";
import { getSlugError, isUuid } from "@/lib/slug";
import type { Slot } from "@/types/slots";

// One slot by id or slug, or null if missing. A slug covers every date in its
// group, so it resolves to the next upcoming date (or the latest past one).
export async function getSlot(idOrSlug: string): Promise<Slot | null> {
  if (isUuid(idOrSlug)) {
    const { data, error } = await supabaseAdmin.from("slots").select("*").eq("id", idOrSlug).maybeSingle();
    if (error || !data) return null;
    return data as Slot;
  }

  const { data, error } = await supabaseAdmin
    .from("slots")
    .select("*")
    .eq("slug", idOrSlug)
    .order("date", { ascending: true });
  if (error || !data || data.length === 0) return null;
  const today = new Date().toISOString().split("T")[0];
  return (data.find((s) => s.date >= today) ?? data[data.length - 1]) as Slot;
}

// Error message if the slug is invalid or taken by another event, else null.
export async function getSlugProblem(slug: string, groupId?: string): Promise<string | null> {
  const invalid = getSlugError(slug);
  if (invalid) return invalid;
  let query = supabaseAdmin.from("slots").select("title").eq("slug", slug).limit(1);
  if (groupId) query = query.neq("group_id", groupId);
  const { data } = await query;
  return data && data.length > 0 ? `"${slug}" is already used by "${data[0].title}".` : null;
}
