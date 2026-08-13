import type { CollectionConfig } from "payload";

// Append-only activity trail: who created / updated / deleted which event or
// CMS item, and when. Rows are written by collection hooks and the events API
// via the local API (overrideAccess). Create/update/delete are closed in the UI
// so the log can't be edited; any logged-in user can read it under Activity.
export const AuditLog: CollectionConfig = {
  slug: "auditLog" as const,
  defaultSort: "-createdAt",
  admin: {
    useAsTitle: "label",
    group: "Activity",
    defaultColumns: ["action", "entity", "label", "user", "createdAt"],
    description:
      "Who added, edited, or deleted events and CMS content. Newest first. Read-only.",
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: "action",
      type: "select",
      options: [
        { label: "Created", value: "created" },
        { label: "Updated", value: "updated" },
        { label: "Deleted", value: "deleted" },
      ],
    },
    {
      name: "entity",
      type: "text",
      admin: { description: "What kind of thing — Event, Press, Statement, etc." },
    },
    { name: "label", type: "text", admin: { description: "The item's title." } },
    { name: "docId", type: "text" },
    { name: "user", type: "text", admin: { description: "Who did it (email)." } },
  ],
};
