import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import SmoothScrolling from "@/components/ui/SmoothScrolling";
import PreLoader from "@/components/ui/PreLoader";
import CustomCursor from "@/components/ui/CustomCursor";
import ChatBot from "@/components/ui/ChatBot";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });

const BASE_URL = "https://kubobot.com";

export const viewport: Viewport = {
  themeColor: "#fbfbfd",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  applicationName: "Kubo Bot",
  title: {
    default: "Kubo Bot | A Soul for Your Desk",
    template: "%s | Kubo Bot",
  },
  description:
    "Meet Kubo — the desktop witness for your late nights. 100% offline emotional AI, 1.3\" OLED face, 24hr standby. Pre-order Batch 01 at ₹2,499. Made in India.",
  keywords: [
    "Kubo Bot",
    "Emotional Desktop Robot",
    "AI Robot India",
    "Productivity Robot",
    "Desk Companion",
    "ESP32 Robot",
    "Emotional AI Robot",
    "Focus Timer Robot",
    "Mental Health Bot",
    "OLED Robot Face",
    "Smart Desk Toy",
    "Kubo Robotics",
    "Vehon Infotech",
    "Pre-order Robot India",
    "Emotional Robot 2026",
    "desktop robot India",
    "AI robot buy India",
    "desktop companion robot Surat",
  ],
  authors: [{ name: "Vehon Infotech", url: BASE_URL }],
  creator: "Vehon Infotech",
  publisher: "Vehon Infotech",
  category: "Technology",
  classification: "Consumer Electronics / AI Robotics",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Kubo Bot | A Soul for Your Desk",
    description:
      "Your desktop witness. Keeps you productive. Never judges. Always there. 100% offline emotional AI — no subscription, no cloud, no compromise.",
    url: BASE_URL,
    siteName: "Kubo Bot",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kubo Bot — A Soul for Your Desk. Pre-order now at ₹2,499.",
        type: "image/png",
      },
    ],
    locale: "en_IN",
    type: "website",
    countryName: "India",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kubo Bot | A Soul for Your Desk",
    description:
      "The witness your desk has been waiting for. 100% offline emotional AI, Pomodoro focus timer, 24hr battery. Pre-order Batch 01 — only 50 units.",
    images: [{ url: "/og-image.png", alt: "Kubo Bot Robot" }],
    creator: "@thekubobot",
    site: "@thekubobot",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "google-site-verification": "de28423b46f5c3f6",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" suppressHydrationWarning className="m-0 p-0 text-base md:cursor-none relative">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${syne.variable} font-[family-name:var(--font-inter)] min-h-screen flex flex-col items-center selection:bg-black/10 selection:text-[#1d1d1f] overflow-x-hidden md:cursor-none relative`}
      >
        <PreLoader />
        <CustomCursor />
        <SmoothScrolling>
          <ConvexClientProvider>
            <Navbar />
            <main className="flex-1 w-full flex flex-col pt-24 items-center relative">
              {children}
            </main>
            <ChatBot />
            <Footer />
          </ConvexClientProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
}
