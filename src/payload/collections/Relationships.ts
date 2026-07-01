import type { CollectionConfig } from "payload";
import { revalidateFamilyPages } from "../revalidate";

// An edge in the power map: a family member connected to an entity, with the
// text shown on the line (a role like "Board Chair" or an amount like "$35,000").
export const Relationships: CollectionConfig = {
  slug: "relationships" as const,
  hooks: {
    afterChange: [() => revalidateFamilyPages()],
    afterDelete: [() => revalidateFamilyPages()],
  },
  admin: {
    useAsTitle: "label",
    group: "🕸️ Power Map",
    defaultColumns: ["person", "entity", "label"],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: "person",
      type: "relationship",
      relationTo: "people",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "entity",
      type: "relationship",
      relationTo: "entities",
      required: true,
      admin: { position: "sidebar" },
    },
    { name: "order", type: "number", admin: { position: "sidebar" } },
    {
      name: "label",
      type: "text",
      admin: { description: "Text shown on the connecting line — a role or a $ amount. Optional." },
    },
    { name: "period", type: "text", admin: { description: "When, e.g. 2016 or 2006–10 (mainly donations)." } },
    {
      name: "description",
      type: "richText",
      admin: { description: "This relationship's own note — shown under it in the entity modal, only on this family's page." },
    },
    { name: "href", type: "text", label: "Source link" },
  ],
};
