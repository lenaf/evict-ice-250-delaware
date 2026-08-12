import type {
  Payload,
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

type AuditAction = "created" | "updated" | "deleted";

// Reads a human label off a doc — the first title-ish field that exists. Covers
// the differently-named title fields across our collections (Pages `title`,
// Statements `org`, Press `headline`, Sponsors `name`, GroundPhotos `alt`).
export function pickLabel(doc: Record<string, unknown> | null | undefined): string {
  if (!doc) return "";
  const v = doc.title ?? doc.org ?? doc.headline ?? doc.name ?? doc.alt ?? doc.slug;
  return typeof v === "string" ? v : "";
}

// Append one row to the auditLog collection. Best-effort: wrapped in try/catch
// so a logging failure never breaks the save it's recording. Written via the
// local API with overrideAccess (the collection is read-only in the UI).
export async function logAudit(
  payload: Payload,
  entry: {
    action: AuditAction;
    entity: string;
    label?: string;
    docId?: string;
    user?: string | null;
  },
) {
  try {
    await payload.create({
      collection: "auditLog",
      data: {
        action: entry.action,
        entity: entry.entity,
        label: entry.label || "",
        docId: entry.docId || "",
        user: entry.user || "unknown",
      },
      overrideAccess: true,
    });
  } catch (err) {
    console.error("[audit] failed to log:", err);
  }
}

// Collection-hook factories: drop `auditChange`/`auditDelete` into a
// collection's afterChange/afterDelete arrays to record edits by the logged-in
// Payload user.
export function auditChange(entity: string): CollectionAfterChangeHook {
  return async ({ doc, req, operation }) => {
    await logAudit(req.payload, {
      action: operation === "create" ? "created" : "updated",
      entity,
      label: pickLabel(doc),
      docId: doc?.id != null ? String(doc.id) : undefined,
      user: req.user?.email,
    });
    return doc;
  };
}

export function auditDelete(entity: string): CollectionAfterDeleteHook {
  return async ({ doc, req }) => {
    await logAudit(req.payload, {
      action: "deleted",
      entity,
      label: pickLabel(doc),
      docId: doc?.id != null ? String(doc.id) : undefined,
      user: req.user?.email,
    });
    return doc;
  };
}
