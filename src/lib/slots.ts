import { supabaseAdmin } from "@/lib/supabase-server";
import type { Slot } from "@/types/slots";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// One slot by id, or null if the id is malformed or missing.
export async function getSlot(id: string): Promise<Slot | null> {
  if (!UUID.test(id)) return null;
  const { data, error } = await supabaseAdmin.from("slots").select("*").eq("id", id).maybeSingle();
  if (error || !data) return null;
  return data as Slot;
}
