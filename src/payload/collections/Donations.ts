import type { CollectionConfig } from "payload";
import { revalidateFamilyPages } from "../revalidate";

export const Donations: CollectionConfig = {
  slug: "donations" as const,
  hooks: {
    afterChange: [() => revalidateFamilyPages()],
    afterDelete: [() => revalidateFamilyPages()],
  },
  admin: {
    useAsTitle: "recipient",
    group: "🕸️ Power Map",
    defaultColumns: ["recipient", "person", "amount"],
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
      admin: {
        position: "sidebar",
        description: "The family member who gave. The family is taken from the person.",
      },
    },
    { name: "order", type: "number", admin: { position: "sidebar" } },
    { name: "recipient", type: "text", required: true },
    { name: "amount", type: "text" },
    { name: "period", type: "text", admin: { description: "e.g. 2016 or 2006–10" } },
    {
      name: "jurisdiction",
      type: "select",
      options: ["local", "state", "federal"].map((j) => ({ label: j, value: j })),
    },
    { name: "detail", type: "textarea" },
    { name: "photo", type: "text", admin: { description: "Politician headshot path under /public (optional)." } },
    { name: "href", type: "text" },
  ],
};
