import type { CollectionConfig, Field } from "payload";
import { revalidateFamilyPages } from "../revalidate";

const family: Field = {
  name: "family",
  type: "select",
  required: true,
  options: [
    { label: "Montante", value: "montante" },
    { label: "Jacobs", value: "jacobs" },
  ],
  admin: { position: "sidebar" },
};

export const People: CollectionConfig = {
  slug: "people" as const,
  hooks: {
    afterChange: [() => revalidateFamilyPages()],
    afterDelete: [() => revalidateFamilyPages()],
  },
  admin: {
    useAsTitle: "name",
    group: "🕸️ Power Map",
    defaultColumns: ["name", "family", "title"],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    family,
    { name: "order", type: "number", admin: { position: "sidebar" } },
    { name: "name", type: "text", required: true },
    {
      name: "shortName",
      type: "text",
      required: true,
      admin: { description: "Label shown on the map node — must match the 'person' on this family's affiliations/donations." },
    },
    { name: "title", type: "text" },
    {
      name: "photo",
      type: "text",
      admin: { description: "Path under /public, e.g. /photos/montante/montante-carl-sr.jpg" },
    },
    { name: "bio", type: "richText", admin: { description: "Shown in the node detail modal. Bold = emphasized." } },
  ],
};
