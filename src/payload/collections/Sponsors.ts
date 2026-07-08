import type { CollectionConfig } from "payload";
import { revalidateHome } from "../revalidate";

// Coalition partners & endorsers shown on the homepage. One doc per logo.
// `orderable: true` gives the list view drag handles so the display order is
// set by dragging rows; `scale` sizes each logo (via the ScaleSlider control)
// so wide wordmarks and small marks can be balanced against their neighbors.
export const Sponsors: CollectionConfig = {
  slug: "sponsors" as const,
  orderable: true,
  hooks: {
    afterChange: [() => revalidateHome()],
    afterDelete: [() => revalidateHome()],
  },
  admin: {
    useAsTitle: "name",
    group: "🤝 Coalition",
    defaultColumns: ["name", "logo", "scale", "href"],
    listSearchableFields: ["name"],
    description:
      "Coalition partners & endorsers on the homepage. Drag rows to reorder how they appear; set each logo's size with its slider.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "href",
      type: "text",
      admin: { description: "Link to the partner's website." },
    },
    {
      name: "scale",
      type: "number",
      required: true,
      defaultValue: 1,
      min: 0.4,
      max: 2.5,
      admin: {
        description:
          "How much space this logo claims in the wall. 1× is the baseline — drag bigger to give a logo a wider box (more presence), smaller to tuck it in. The logo itself is never stretched.",
        components: { Field: "/payload/fields/ScaleSlider#ScaleSlider" },
      },
    },
  ],
};
