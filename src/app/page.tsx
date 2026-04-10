import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Intelligence from "@/components/sections/Intelligence";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import Specs from "@/components/sections/Specs";
import BuyCTA from "@/components/sections/BuyCTA";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Kubo Bot",
    "image": "https://kubobot.com/favicon.png",
    "description": "Your desktop companion. Keeps you productive. Never judges. Always there.",
    "brand": {
      "@type": "Brand",
      "name": "Kubo Robotics"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://kubobot.com/buy",
      "priceCurrency": "INR",
      "price": "2999",
      "availability": "https://schema.org/PreOrder",
      "seller": {
        "@type": "Organization",
        "name": "Kubo Robotics"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Features />
      <Intelligence />
      <HowItWorks />
      <Testimonials />
      <Specs />
      <BuyCTA />
    </>
  );
}
