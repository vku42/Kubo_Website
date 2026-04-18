import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pre-Order Kubo Bot | Premium AI Desktop Companion",
  description: "Secure your place in Kubo Bot Batch 01. ₹2,499 one-time payment. No subscription. Shipping Q3 2026. Made in India.",
  openGraph: {
    title: "Pre-Order Kubo Bot — Batch 01 Now Open",
    description: "Your desk buddy. Keeps you productive. Never judges. Only ₹2,499.",
    images: ["/og-image.png"],
  },
};

export default function BuyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
