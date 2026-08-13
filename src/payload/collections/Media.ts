import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media" as const,
  admin: {
    group: "Media",
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
    // Use the standard single-file create drawer (with a Save button) instead
    // of the bulk-upload UI, which can leave inline uploads with no way to save.
    bulkUpload: false,
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
      admin: {
        description: "Auto-filled from the filename if left blank.",
      },
    },
  ],
};
