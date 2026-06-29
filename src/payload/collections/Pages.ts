import type { Block, CollectionConfig, Field } from "payload";
import { revalidatePageBySlug } from "../revalidate";

// Shared: which colored band a section renders in (matches Section.tsx variants).
const sectionVariant: Field = {
  name: "sectionVariant",
  type: "select",
  defaultValue: "black",
  options: [
    { label: "Black", value: "black" },
    { label: "Blue", value: "blue" },
    { label: "Yellow", value: "yellow" },
    { label: "White", value: "white" },
    { label: "Red", value: "red" },
  ],
};

const borderTop: Field = {
  name: "borderTop",
  type: "checkbox",
  label: "Thin top divider",
  defaultValue: false,
};

// The workhorse: any prose section (headings, paragraphs, lists, quotes,
// links, highlights, inline money bags).
const RichTextSection: Block = {
  slug: "richTextSection",
  labels: { singular: "Rich Text Section", plural: "Rich Text Sections" },
  fields: [
    sectionVariant,
    {
      name: "hero",
      type: "checkbox",
      label: "Hero (extra top padding to clear the header)",
      defaultValue: false,
    },
    borderTop,
    { name: "content", type: "richText" },
  ],
};

// The command-center layout: text on the left, a framed image on the right.
const ImageBlock: Block = {
  slug: "imageBlock",
  labels: { singular: "Text + Image Section", plural: "Text + Image Sections" },
  fields: [
    { ...sectionVariant, defaultValue: "blue" },
    borderTop,
    { name: "heading", type: "text" },
    { name: "body", type: "richText" },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "caption", type: "text" },
    {
      type: "row",
      fields: [
        { name: "sourceLabel", type: "text", admin: { width: "50%" } },
        { name: "sourceHref", type: "text", admin: { width: "50%" } },
      ],
    },
  ],
};

// Bottom-of-page "continue reading" card.
const FactsReadNextBlock: Block = {
  slug: "factsReadNextBlock",
  labels: { singular: "Read Next Card", plural: "Read Next Cards" },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "href", type: "text", required: true },
  ],
};

// Heading + intro + a row of buttons (e.g. the final CTA).
const CtaButtonsBlock: Block = {
  slug: "ctaButtonsBlock",
  labels: { singular: "CTA Buttons Section", plural: "CTA Buttons Sections" },
  fields: [
    { ...sectionVariant, defaultValue: "black" },
    borderTop,
    { name: "heading", type: "text" },
    { name: "intro", type: "textarea" },
    {
      name: "buttons",
      type: "array",
      maxRows: 3,
      fields: [
        {
          type: "row",
          fields: [
            { name: "label", type: "text", required: true, admin: { width: "40%" } },
            { name: "href", type: "text", required: true, admin: { width: "40%" } },
            {
              name: "style",
              type: "select",
              defaultValue: "primary",
              options: [
                { label: "Primary (red)", value: "primary" },
                { label: "Outline", value: "outline" },
              ],
              admin: { width: "20%" },
            },
          ],
        },
      ],
    },
  ],
};

const familyKey: Field = {
  name: "familyKey",
  type: "select",
  required: true,
  options: [
    { label: "Montante", value: "montante" },
    { label: "Jacobs", value: "jacobs" },
  ],
};

// Wealth hero: question + family name + lede prose + the family photo row.
const WealthHeroBlock: Block = {
  slug: "wealthHeroBlock",
  labels: { singular: "Wealth Hero", plural: "Wealth Heroes" },
  fields: [
    { name: "question", type: "text", required: true },
    { name: "familyName", type: "text", required: true },
    familyKey,
    { name: "lede", type: "richText" },
  ],
};

// Network-of-influence map: intro prose + the interactive PowerMap + per-area summaries.
const PowerMapBlock: Block = {
  slug: "powerMapBlock",
  labels: { singular: "Power Map", plural: "Power Maps" },
  fields: [
    sectionVariant,
    borderTop,
    familyKey,
    { name: "heading", type: "text", defaultValue: "Network of Influence" },
    { name: "intro", type: "richText" },
    {
      name: "areas",
      type: "group",
      label: "Area summaries (shown when an area is focused)",
      fields: [
        { name: "politician", type: "richText" },
        { name: "business", type: "richText" },
        { name: "education", type: "richText" },
        { name: "arts", type: "richText" },
        { name: "civic", type: "richText" },
        { name: "sports", type: "richText" },
      ],
    },
  ],
};

export const Pages: CollectionConfig = {
  slug: "pages" as const,
  admin: { useAsTitle: "title", group: "📄 Content" },
  hooks: {
    afterChange: [({ doc }) => revalidatePageBySlug((doc as { slug?: string }).slug)],
    afterDelete: [({ doc }) => revalidatePageBySlug((doc as { slug?: string }).slug)],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { position: "sidebar" },
    },
    {
      name: "sections",
      type: "blocks",
      admin: { initCollapsed: true },
      blocks: [
        RichTextSection,
        WealthHeroBlock,
        PowerMapBlock,
        ImageBlock,
        FactsReadNextBlock,
        CtaButtonsBlock,
      ],
    },
  ],
};
