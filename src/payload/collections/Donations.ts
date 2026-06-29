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

export const Donations: CollectionConfig = {
  slug: "donations" as const,
  hooks: {
    afterChange: [() => revalidateFamilyPages()],
    afterDelete: [() => revalidateFamilyPages()],
  },
  admin: {
    useAsTitle: "recipient",
    group: "🕸️ Power Map",
    defaultColumns: ["recipient", "person", "amount", "family"],
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
    {
      name: "person",
      type: "text",
      required: true,
      admin: { description: "Short name of the giver (matches People shortName)." },
    },
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
