import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Kubo Bot | Your Premium AI Desktop Companion",
  description: "Meet Kubo—a modern desktop companion that keeps you productive, fights loneliness, and makes your desk alive. Built with premium materials and deep emotional intelligence.",
  keywords: ["Kubo Bot", "AI Desktop Companion", "Productivity Tool", "Mental Health Bot", "Modern Desk Toy", "Emotional AI", "Kubo Robotics"],
  authors: [{ name: "Kubo Robotics" }],
  creator: "Kubo Robotics",
  publisher: "Kubo Robotics",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kubobot.com"),
  openGraph: {
    title: "Kubo Bot | Your Premium AI Desktop Companion",
    description: "Your desk buddy. Keeps you productive. Never judges. Always there.",
    url: "https://kubobot.com",
    siteName: "Kubo Bot",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "Kubo Bot - Premium Desktop Companion",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kubo Bot | AI Desktop Companion",
    description: "The companion your desk has been waiting for.",
    images: ["/favicon.png"],
    creator: "@thekubobot",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="m-0 p-0 text-base md:cursor-none">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${syne.variable} font-[family-name:var(--font-inter)] min-h-screen flex flex-col items-center selection:bg-amber-100/50 selection:text-amber-900 overflow-x-hidden md:cursor-none`}
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
