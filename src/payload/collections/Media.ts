import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media" as const,
  admin: {
    group: "📷 Media",
  },
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (req.file && !data.alt) {
          data.alt = req.file.name
            .replace(/\.[^/.]+$/, "")
            .replace(/[-_]/g, " ");
        }
        return data;
      },
    ],
  },
  upload: {
    mimeTypes: ["image/*"],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
