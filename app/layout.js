import "./globals.css";
import SmoothScroller from "@/components/logic/SmoothScroller";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { Fraunces, DM_Sans } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eklak Alam",
  url: "https://eklak.site",
  image: "https://eklak.site/og-image.jpg",
  jobTitle: "Software Engineer",
  description: "Software Engineer specializing in scalable architectures, cloud infrastructure, and premium user experiences.",
  sameAs: [
    "https://x.com/eklak__alam",
    "https://github.com/Eklak-Alam",
    "https://www.linkedin.com/in/eklak-alam/",
  ],
  knowsAbout: ["Software Engineering", "Cloud Architecture", "DevOps", "React", "Next.js", "TypeScript", "AWS"],
};

export const metadata = {
  metadataBase: new URL("https://eklak.site"),
  title: {
    default: "Eklak Alam",
    template: "%s | Eklak Alam",
  },
  description: "Portfolio of Eklak Alam — Software Engineer specializing in scalable architectures, cloud infrastructure, and premium user experiences.",
  keywords: ["Eklak Alam", "Software Engineer", "Cloud Architect", "DevOps", "Full Stack Developer", "Portfolio", "React", "Next.js", "TypeScript", "AWS"],
  authors: [{ name: "Eklak Alam", url: "https://eklak.site" }],
  creator: "Eklak Alam",
  publisher: "Eklak Alam",
  alternates: { canonical: "https://eklak.site" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eklak.site",
    title: "Eklak Alam — Software Engineer",
    description: "Building scalable architectures, cloud infrastructure, and premium user experiences.",
    siteName: "Eklak Alam",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Eklak Alam — Software Engineer Portfolio", type: "image/jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@eklak__alam",
    creator: "@eklak__alam",
    title: "Eklak Alam — Software Engineer",
    description: "Building scalable architectures, cloud infrastructure, and premium user experiences.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  applicationName: "Eklak Alam Portfolio",
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
};

export default function RootLayout({ children }) {
  return (
<html className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className={`font-[family-name:var(--font-body)] antialiased bg-background text-foreground overflow-x-hidden max-w-[100vw]`}>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
        <SmoothScroller>
          <Analytics />
          <main>{children}</main>
        </SmoothScroller>
      </body>
    </html>
  );
}