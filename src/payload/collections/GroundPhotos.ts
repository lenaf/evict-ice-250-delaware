import type { CollectionBeforeChangeHook, CollectionConfig } from "payload";
import { generateKeyBetween } from "payload/shared";
import { revalidateHome } from "../revalidate";
import { auditChange, auditDelete } from "../audit";

// New photos default to the top of the drag order instead of the bottom
// (Payload's own orderable hook only appends to the end, and only fills in
// `_order` when it's still unset — so setting it here first wins).
const insertNewPhotosAtTop: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
}) => {
  if (operation !== "create") return data;
  const firstDoc = await req.payload.find({
    collection: "groundPhotos",
    depth: 0,
    limit: 1,
    pagination: false,
    select: { _order: true },
    sort: "_order",
  });
  const firstOrderValue =
    ((firstDoc.docs[0] as Record<string, unknown> | undefined)?._order as
      | string
      | undefined) ?? null;
  data._order = generateKeyBetween(null, firstOrderValue);
  return data;
};

// Photos for the homepage "On the Ground" strip. One doc per photo.
// `orderable: true` gives the list view drag handles so the display order is
// set by dragging rows.
export const GroundPhotos: CollectionConfig = {
  slug: "groundPhotos" as const,
  orderable: true,
  hooks: {
    beforeChange: [insertNewPhotosAtTop],
    afterChange: [() => revalidateHome(), auditChange("Photo")],
    afterDelete: [() => revalidateHome(), auditDelete("Photo")],
  },
  admin: {
    useAsTitle: "alt",
    group: "On the Ground",
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
