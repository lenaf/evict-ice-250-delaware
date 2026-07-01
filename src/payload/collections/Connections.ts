import type { CollectionConfig } from "payload";
import { revalidateFamilyPages } from "../revalidate";

// A single edge in the power map: a family member connected to an org, an
// institution, or a politician. "affiliation" = a seat/role/tie; "donation" =
// political money given. Both render the same way, differing only by type.
export const Connections: CollectionConfig = {
  slug: "connections" as const,
  hooks: {
    afterChange: [() => revalidateFamilyPages()],
    afterDelete: [() => revalidateFamilyPages()],
  },
  admin: {
    useAsTitle: "org",
    group: "🕸️ Power Map",
    defaultColumns: ["org", "person", "type", "category"],
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
        description: "The family member on this connection. Family is taken from the person.",
      },
    },
    {
      name: "type",
      type: "select",
      required: true,
      defaultValue: "affiliation",
      options: [
        { label: "Affiliation (seat / role / tie)", value: "affiliation" },
        { label: "Donation (political money)", value: "donation" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "order", type: "number", admin: { position: "sidebar" } },
    {
      name: "org",
      type: "text",
      required: true,
      label: "Organization / recipient",
      admin: { description: "The node this person connects to — an org, institution, or politician/committee." },
    },
    {
      name: "label",
      type: "text",
      label: "Connection label (optional)",
      admin: { description: "Text shown on the line between them — e.g. a role (\"Board Chair\") or an amount (\"$35,000\"). Leave blank for no label." },
    },
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
      admin: { description: "Drives the area filter. Use \"government\" for politicians/donations." },
    },
    {
      name: "jurisdiction",
      type: "select",
      options: ["local", "state", "federal"].map((j) => ({ label: j, value: j })),
    },
    { name: "period", type: "text", admin: { description: "When (mainly donations), e.g. 2016 or 2006–10." } },
    { name: "href", type: "text", label: "Source link" },
    { name: "contribution", type: "text", admin: { description: "What the family gives this org (shown in the modal)." } },
    { name: "description", type: "textarea" },
    { name: "image", type: "upload", relationTo: "media", admin: { description: "Org logo or politician headshot." } },
  ],
};
