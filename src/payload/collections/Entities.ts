import type { CollectionConfig } from "payload";
import { revalidateFamilyPages } from "../revalidate";

// A node in the power map: an org, institution, board, committee, or
// politician the family connects to. Deduped — one entity, many relationships.
export const Entities: CollectionConfig = {
  slug: "entities" as const,
  hooks: {
    afterChange: [() => revalidateFamilyPages()],
    afterDelete: [() => revalidateFamilyPages()],
  },
  admin: {
    useAsTitle: "name",
    group: "🕸️ Power Map",
    defaultColumns: ["name", "category", "jurisdiction"],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: "civic",
      options: [
        "education",
        "catholic",
        "business",
        "cultural",
        "sports",
        "charity",
        "civic",
        "government",
      ].map((c) => ({ label: c, value: c })),
      admin: { description: "Drives the map's area filter and node color. Use \"government\" for politicians/committees." },
    },
    {
      name: "jurisdiction",
      type: "select",
      options: ["local", "state", "federal"].map((j) => ({ label: j, value: j })),
    },
    { name: "photo", type: "upload", relationTo: "media", admin: { description: "Logo or headshot for the node." } },
    { name: "contribution", type: "text", admin: { description: "What the family gives this entity (shown in the modal)." } },
    { name: "description", type: "textarea" },
    { name: "href", type: "text", label: "Source link" },
  ],
};
