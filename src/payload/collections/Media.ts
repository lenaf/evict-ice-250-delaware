import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media" as const,
  admin: {
    group: "Media",
    // Show and search by the editable alt text (filenames can't be renamed).
    useAsTitle: "alt",
    listSearchableFields: ["alt", "filename"],
    defaultColumns: ["filename", "alt", "updatedAt"],
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
        description:
          "The image's name in the CMS and its alt text on the site. Auto-filled from the filename if left blank.",
      },
    },
  ],
};
