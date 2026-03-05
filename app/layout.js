import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/logic/SmoothScroller";
import { Analytics } from "@vercel/analytics/next"; // 1. ADDED IMPORT
import Preloader from "@/components/global/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Product Thinking: Advanced SEO & Social Sharing Graph
export const metadata = {
  metadataBase: new URL("https://eklak.site"),
  title: {
    default: "Eklak Alam",
    template: "%s | Eklak Alam", // Automatically formats sub-pages like "Projects | Eklak Alam"
  },
  description: "Portfolio of Eklak Alam. Specializing in scalable architectures, cloud infrastructure, and premium user experiences.",
  keywords: [
    "Eklak Alam",
    "Software Engineer",
    "Cloud Architect",
    "DevOps",
    "Full Stack Developer",
    "Portfolio",
    "React",
    "Next.js"
  ],
  authors: [{ name: "Eklak Alam", url: "https://eklak.site" }],
  creator: "Eklak Alam",
  
  // Open Graph (For LinkedIn, Facebook, Discord, Slack)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eklak.site",
    title: "Eklak Alam | Software Engineer",
    description: "Building scalable architectures and premium user experiences.",
    siteName: "Eklak Alam Portfolio",
    images: [
      {
        url: "/og-image.jpg", // You must place an 'og-image.jpg' in your /public folder!
        width: 1200,
        height: 630,
        alt: "Eklak Alam - Software Engineer Portfolio",
      },
    ],
  },

  // Twitter / X Cards
  twitter: {
    card: "summary_large_image",
    title: "Eklak Alam | Software Engineer",
    description: "Building scalable architectures and premium user experiences.",
    creator: "@eklak__alam", 
    images: ["/logo.png"], 
  },

  // Search Engine Crawler Instructions
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

  // Prevents duplicate content penalties from Google
  alternates: {
    canonical: "https://eklak.site",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-x-hidden max-w-[100vw]`}
      >
        <SmoothScroller>
          {/* Navbar sits on top of all pages */}
          {/* <Navbar /> */}
          <Analytics />
          <Preloader />
          
          <main>
            {children}
          </main>
        </SmoothScroller>
      </body>
    </html>
  );
}