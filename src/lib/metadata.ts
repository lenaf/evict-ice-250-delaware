// Default OG image for pages that don't have a more specific photo. Open
// Graph doesn't merge nested objects across layouts, so any page that sets
// its own `openGraph` needs to repeat this (or its own `images`) to keep a
// preview image.
export const DEFAULT_OG_IMAGE = [
  {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: "Evict ICE from 250 Delaware - Buffalo, NY Community Campaign",
  },
];
