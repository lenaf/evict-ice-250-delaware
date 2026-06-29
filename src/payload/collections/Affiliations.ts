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

export const Affiliations: CollectionConfig = {
  slug: "affiliations" as const,
  hooks: {
    afterChange: [() => revalidateFamilyPages()],
    afterDelete: [() => revalidateFamilyPages()],
  },
  admin: {
    useAsTitle: "org",
    group: "🕸️ Power Map",
    defaultColumns: ["org", "person", "family", "category"],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    family,
    {
      name: "person",
      type: "text",
      required: true,
      admin: { description: "Short name of the family member (must match a People shortName for this family)." },
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
