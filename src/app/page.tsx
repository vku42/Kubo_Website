import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Intelligence from "@/components/sections/Intelligence";
import FocusShowcase from "@/components/sections/FocusShowcase";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import Specs from "@/components/sections/Specs";
import BuyCTA from "@/components/sections/BuyCTA";
import { FAQ_ITEMS } from "@/lib/kubo-knowledge";

const BASE_URL = "https://kubobot.com";

export default function Home() {
  // ─── 1. Product Schema ───────────────────────────────────────────────────────
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BASE_URL}/#product`,
    name: "Kubo Bot",
    alternateName: "Kubo AI Desktop Companion",
    image: [
      `${BASE_URL}/og-image.png`,
      `${BASE_URL}/Photos/img1.jpg`,
      `${BASE_URL}/Photos/img2.jpg`,
    ],
    description:
      "Kubo Bot is a premium AI desktop companion robot with a 1.3\" OLED display, built on ESP32-C3 with 100% offline emotional AI, Pomodoro focus timer, and 32-hour standby battery. Made in India.",
    sku: "KUBO-BATCH-01",
    mpn: "KBO-B01",
    brand: {
      "@type": "Brand",
      name: "Kubo Robotics",
      logo: `${BASE_URL}/favicon.png`,
    },
    manufacturer: {
      "@type": "Organization",
      name: "Kubo Robotics",
      url: BASE_URL,
    },
    material: "Organic PLA+",
    color: "Matte Slate / Pearl White",
    weight: "320g",
    depth: { "@type": "QuantitativeValue", value: 50, unitCode: "MMT" },
    width: { "@type": "QuantitativeValue", value: 50, unitCode: "MMT" },
    height: { "@type": "QuantitativeValue", value: 50, unitCode: "MMT" },
    category: "Consumer Electronics > Robotics > Companion Robots",
    keywords:
      "AI robot, desktop companion, productivity robot, focus timer, OLED robot, ESP32 robot, India",
    countryOfOrigin: "IN",
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/buy`,
      priceCurrency: "INR",
      price: "2999",
      priceValidUntil: "2026-09-30",
      availability: "https://schema.org/PreOrder",
      itemCondition: "https://schema.org/NewCondition",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "INR",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          businessDays: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Friday"] },
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
      },
      seller: {
        "@type": "Organization",
        name: "Kubo Robotics",
        url: BASE_URL,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
  };

  // ─── 2. Organization Schema ───────────────────────────────────────────────────
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Kubo Robotics",
    alternateName: "Kubo Bot",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/favicon.png`,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/og-image.png`,
    description:
      "Kubo Robotics is an Indian consumer robotics company building premium AI companion robots for home and desk use. Our flagship product Kubo Bot features 100% offline emotional AI.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@kubobot.com",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.instagram.com/thekubobot/",
      "https://twitter.com/thekubobot",
    ],
    foundingCountry: "IN",
  };

  // ─── 3. WebSite Schema (Enables Google Sitelinks Search Box) ─────────────────
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Kubo Bot",
    description: "Premium AI Desktop Companion Robot — Made in India",
    publisher: { "@id": `${BASE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-IN",
  };

  // ─── 4. FAQPage Schema ────────────────────────────────────────────────────────
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  // ─── 5. BreadcrumbList Schema ─────────────────────────────────────────────────
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Pre-Order Kubo Bot", item: `${BASE_URL}/buy` },
    ],
  };

  return (
    <>
      {/* Inject all JSON-LD schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Hero />
      <Features />
      <Intelligence />
      <FocusShowcase />
      <HowItWorks />
      <Testimonials />
      <Specs />
      <BuyCTA />
    </>
  );
}
