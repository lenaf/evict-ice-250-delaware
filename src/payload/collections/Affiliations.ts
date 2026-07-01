import type { CollectionConfig } from "payload";
import { revalidateFamilyPages } from "../revalidate";

export const Affiliations: CollectionConfig = {
  slug: "affiliations" as const,
  hooks: {
    afterChange: [() => revalidateFamilyPages()],
    afterDelete: [() => revalidateFamilyPages()],
  },
  admin: {
    useAsTitle: "org",
    group: "🕸️ Power Map",
    defaultColumns: ["org", "person", "category"],
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
        description: "The family member who holds this affiliation. The family is taken from the person.",
      },
    },
    { name: "org", type: "text", required: true },
    { name: "role", type: "text" },
    {
      name: "category",
      type: "select",
      required: true,
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
    },
    {
      name: "jurisdiction",
      type: "select",
      options: ["local", "state", "federal"].map((j) => ({ label: j, value: j })),
    },
    { name: "href", type: "text" },
    { name: "contribution", type: "text", admin: { description: "What the family gives this org (shown in modal)." } },
    { name: "description", type: "textarea" },
    { name: "logoPath", type: "text" },
    { name: "coverImage", type: "text" },
    { name: "faviconDomain", type: "text" },
  ],
};
