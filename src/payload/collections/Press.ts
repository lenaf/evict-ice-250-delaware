import type { CollectionConfig } from "payload";
import { revalidatePress } from "../revalidate";
import { auditChange, auditDelete } from "../audit";

// Press coverage shown in the homepage "In the News" carousel. One doc per
// article: the publication, the headline, a link out, the date (drives the
// newest-first order), and the publication's logo (uploaded to Media).
export const Press: CollectionConfig = {
  slug: "press" as const,
  hooks: {
    afterChange: [() => revalidatePress(), auditChange("Press")],
    afterDelete: [() => revalidatePress(), auditDelete("Press")],
  },
  admin: {
    useAsTitle: "headline",
    group: "Articles",
    defaultColumns: ["outlet", "headline", "date", "showOnHomepage", "logo"],
    listSearchableFields: ["outlet", "headline"],
    description:
      "Press coverage for the homepage 'In the News' carousel. Articles show newest first by date.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: "outlet",
      type: "text",
      required: true,
      admin: { description: "Publication name, e.g. \"Investigative Post\"." },
    },
    {
      name: "headline",
      type: "text",
      required: true,
      admin: { description: "The article title." },
    },
    {
      name: "url",
      type: "text",
      required: true,
      admin: { description: "Link to the article." },
    },
    {
      name: "date",
      type: "date",
      required: true,
      admin: { description: "Publish date. Newest articles show first." },
    },
    {
      name: "showOnHomepage",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
        description:
          "Show this article in the homepage 'In the News' section. Uncheck to keep it on the /news page only.",
      },
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "The publication's logo (thumbnail). Optional — the outlet name shows if there's no logo.",
      },
    },
  ],
};
