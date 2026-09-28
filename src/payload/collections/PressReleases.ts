import type { CollectionConfig } from "payload";
import { revalidatePress } from "../revalidate";
import { auditChange, auditDelete } from "../audit";

// Our own press releases, uploaded as PDFs. They show in the "In the News"
// list alongside press coverage, sorted by date.
export const PressReleases: CollectionConfig = {
  slug: "press-releases" as const,
  hooks: {
    afterChange: [() => revalidatePress(), auditChange("Press Release")],
    afterDelete: [() => revalidatePress(), auditDelete("Press Release")],
  },
  admin: {
    useAsTitle: "title",
    group: "Articles",
    defaultColumns: ["title", "date", "showOnHomepage", "filename"],
    listSearchableFields: ["title"],
    description:
      "Press release PDFs. They show in 'In the News' with press coverage, newest first by date.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  upload: {
    mimeTypes: ["application/pdf"],
    bulkUpload: false,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: { description: "The press release headline." },
    },
    {
      name: "date",
      type: "date",
      required: true,
      admin: { description: "Release date. Newest items show first." },
    },
    {
      name: "showOnHomepage",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
        description:
          "Show this release in the homepage 'In the News' section. Uncheck to keep it on the /news page only.",
      },
    },
  ],
};
