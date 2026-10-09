import type { CollectionConfig } from "payload";
import { revalidatePress } from "../revalidate";
import { auditChange, auditDelete } from "../audit";

// Press coverage for the homepage "Featured News" section and /news. One doc
// per article: the publication, the headline, a link out, the date (drives the
// newest-first order), the publication's logo, and an optional photo and
// subheading for the card view.
export const Press: CollectionConfig = {
  slug: "press" as const,
  labels: { singular: "News Article", plural: "News Articles" },
  hooks: {
    afterChange: [() => revalidatePress(), auditChange("Press")],
    afterDelete: [() => revalidatePress(), auditDelete("Press")],
  },
  admin: {
    useAsTitle: "headline",
    group: "Articles",
    defaultColumns: ["outlet", "headline", "date", "showOnHomepage", "featured"],
    listSearchableFields: ["outlet", "headline"],
    description:
      "Press coverage for the homepage 'Featured News' section and /news. Articles show newest first by date.",
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
          "Show this article in the homepage 'Featured News' section. Uncheck to keep it on the /news page only.",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        condition: (data) => data?.showOnHomepage === true,
        description:
          "Show as a large card at the top of the homepage section. Any number of articles can be featured.",
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
    {
      name: "subheading",
      type: "textarea",
      admin: {
        description:
          "Optional line under the headline on the card, e.g. the article's subtitle or a key sentence.",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Optional photo for the card (usually the article's lead photo). The logo shows in its place if empty.",
      },
    },
    {
      name: "imageCredit",
      type: "text",
      admin: {
        condition: (data) => !!data?.image,
        description: "Optional photo credit shown in the corner (e.g. \"Tito Ruiz / TRu iNk Media\").",
      },
    },
  ],
};
