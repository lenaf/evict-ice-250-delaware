import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Supabase Storage public objects (CMS media)
      { protocol: "https", hostname: "*.supabase.co" },
    ],
    // Serve one modern format instead of AVIF+WebP, and keep the width ladders
    // tight — the logo wall and headshots render small, so we don't need the
    // large-viewport variants. Fewer variants = far fewer Vercel image
    // transformations. Large photos are local files, so trimming deviceSizes
    // costs nothing but optimizer work.
    formats: ["image/webp"],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 2678400, // 31 days
  },
  async headers() {
    return [
      {
        // Strict CSP for the public site. Exclude the Payload admin (/cms)
        // and Payload's REST API (/api/*), whose admin bundle needs looser rules.
        source: "/((?!cms|api/).*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://actionnetwork.org https://*.actionnetwork.org https://va.vercel-scripts.com https://js.stripe.com",
              "style-src 'self' 'unsafe-inline' https://actionnetwork.org https://*.actionnetwork.org",
              "img-src 'self' data: https:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://actionnetwork.org https://*.actionnetwork.org https://va.vercel-scripts.com https://vitals.vercel-insights.com https://*.supabase.co https://api.stripe.com https://m.stripe.network",
              "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://m.stripe.network",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://actionnetwork.org https://*.actionnetwork.org",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig);
