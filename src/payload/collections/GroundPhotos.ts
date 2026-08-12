import type { CollectionConfig } from "payload";
import { revalidateHome } from "../revalidate";
import { auditChange, auditDelete } from "../audit";

// Photos for the homepage "On the Ground" strip. One doc per photo.
// `orderable: true` gives the list view drag handles so the display order is
// set by dragging rows.
export const GroundPhotos: CollectionConfig = {
  slug: "groundPhotos" as const,
  orderable: true,
  hooks: {
    afterChange: [() => revalidateHome(), auditChange("Photo")],
    afterDelete: [() => revalidateHome(), auditDelete("Photo")],
  },
  admin: {
    useAsTitle: "alt",
    group: "📷 On the Ground",
    defaultColumns: ["alt", "image", "credit"],
    listSearchableFields: ["alt", "credit"],
    description:
      "Photos in the homepage 'On the Ground' strip. Drag rows to reorder how they appear.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "alt",
      type: "text",
      admin: {
        description:
          "Describes the photo for screen readers (e.g. \"Demonstrators holding 'Evict ICE' signs\").",
      },
    },
    {
      name: "credit",
      type: "text",
      admin: {
        description:
          "Optional photo credit shown in the corner (e.g. \"Photo: REUTERS/Lindsay DeDario\").",
      },
    },
  ],
};
