import "@/app/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import type { Metadata } from "next";



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://evictice250delaware.com"),
  title: {
    default: "Evict ICE from 250 Delaware - Buffalo, NY Community Campaign",
    template: "%s | Evict ICE 250 Delaware",
  },
  description:
    "Evict ICE from 250 Delaware Avenue in Buffalo, NY. Uniland leases space to ICE for deportation operations across New York State. Join our community campaign to stop the lease renewal by March 2027.",
  keywords: [
    "evict ICE",
    "evict ICE Delaware",
    "evict ICE Buffalo",
    "250 Delaware Avenue",
    "250 Delaware Buffalo",
    "ICE Buffalo NY",
    "ICE deportation Buffalo",
    "Uniland Development",
    "Uniland ICE lease",
    "Buffalo immigration",
    "stop ICE Buffalo",
    "anti-ICE campaign Buffalo",
    "Delaware North ICE",
    "Buffalo NY community organizing",
    "ICE New York State",
    "evict ICE 250 Delaware",
  ],
  openGraph: {
    title: "Evict ICE from 250 Delaware - Buffalo, NY",
    description:
      "Uniland leases 250 Delaware to DHS for New York State ICE operations. Join Buffalonians organizing to stop the lease renewal.",
    url: "https://evictice250delaware.com",
    siteName: "Evict ICE 250 Delaware",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evict ICE from 250 Delaware - Buffalo, NY",
    description:
      "Uniland leases 250 Delaware to DHS for New York State ICE operations. Join Buffalonians organizing to stop the lease renewal.",
  },
  alternates: {
    canonical: "https://evictice250delaware.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LCM2M97XM7" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-LCM2M97XM7');`,
          }}
        />
      </head>
      <body
        className={inter.variable}
        style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
