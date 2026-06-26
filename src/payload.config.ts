import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import {
  lexicalEditor,
  LinkFeature,
  TextStateFeature,
  BlocksFeature,
} from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Pages } from "./payload/collections/Pages";
import { People } from "./payload/collections/People";
import { Affiliations } from "./payload/collections/Affiliations";
import { Donations } from "./payload/collections/Donations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const allowList = [
  "http://localhost:3000",
  process.env.NEXT_PUBLIC_SITE_URL || "",
].filter(Boolean);

export default buildConfig({
  // Mount the admin at /cms — /admin is the existing volunteer admin.
  routes: { admin: "/cms" },
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " - Evict ICE" },
  },
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  cors: allowList,
  csrf: allowList,
  collections: [Pages, People, Affiliations, Donations, Users, Media],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      // Inline links (used as SourceLinks on the front end)
      LinkFeature({}),
      // Inline brand-colored highlights. `section` follows the Section variant.
      TextStateFeature({
        state: {
          color: {
            default: { label: "Default", css: {} },
            yellow: {
              label: "Yellow highlight",
              css: { color: "#FFD600", "font-weight": "bold" },
            },
            red: {
              label: "Red highlight",
              css: { color: "#DC2626", "font-weight": "bold" },
            },
            section: {
              label: "Section highlight (auto)",
              css: { color: "var(--section-highlight)", "font-weight": "bold" },
            },
          },
        },
      }),
      // Money-bag groups droppable into the copy. Each group is a cluster of
      // bag icons (each ≈ $100k) with an amount, label, payer, and source —
      // rendered side-by-side like the original subsidies graphic.
      BlocksFeature({
        blocks: [
          {
            slug: "moneyBags",
            labels: { singular: "Money Bags", plural: "Money Bags" },
            fields: [
              {
                name: "sources",
                type: "array",
                minRows: 1,
                fields: [
                  {
                    type: "row",
                    fields: [
                      { name: "amount", type: "text", required: true, admin: { width: "30%" } },
                      { name: "label", type: "text", admin: { width: "40%" } },
                      { name: "bags", type: "number", required: true, defaultValue: 1, min: 1, max: 200, admin: { width: "15%" } },
                      { name: "recurring", type: "checkbox", label: "Per year", admin: { width: "15%" } },
                    ],
                  },
                  { name: "payer", type: "text" },
                  {
                    type: "row",
                    fields: [
                      { name: "sourceLabel", type: "text", admin: { width: "50%" } },
                      { name: "sourceHref", type: "text", admin: { width: "50%" } },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
      ssl: { rejectUnauthorized: false },
    },
    push: process.env.NODE_ENV !== "production",
    schemaName: "payload",
  }),
  sharp,
});
