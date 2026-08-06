import type { CollectionConfig } from "payload";
import { revalidateHome } from "../revalidate";

// Coalition endorsement statements shown on the homepage carousel. One doc per
// organization. `orderable: true` gives the list view drag handles so the
// display order is set by dragging rows.
export const Statements: CollectionConfig = {
  slug: "statements" as const,
  orderable: true,
  hooks: {
    afterChange: [() => revalidateHome()],
    afterDelete: [() => revalidateHome()],
  },
  admin: {
    useAsTitle: "org",
    group: "💬 Endorsements",
    defaultColumns: ["org", "href"],
    listSearchableFields: ["org", "keyPoint", "statement"],
    description:
      "Coalition endorsement statements on the homepage. Drag rows to reorder how they appear.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: "org",
      type: "text",
      required: true,
      admin: { description: "Organization name (shown as the link label)." },
    },
    {
      name: "href",
      type: "text",
      admin: { description: "Link to the org's website or Instagram (optional)." },
    },
    {
      name: "keyPoint",
      type: "textarea",
      admin: {
        description:
          "Short teaser shown on the card (~3 lines). Leave blank to show the start of the full statement instead.",
      },
    },
    {
      name: "statement",
      type: "textarea",
      required: true,
      admin: {
        description:
          "The full statement, shown in the 'Read full statement' popup. Separate paragraphs with a blank line.",
      },
    },
  ],
};
