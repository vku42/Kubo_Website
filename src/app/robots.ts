import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/kubo-hq/", "/_next/", "/scratch/"],
      },
      {
        // Block GPTBot from training on our content
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        // Block CCBot (Common Crawl used for AI training)
        userAgent: "CCBot",
        disallow: ["/"],
      },
    ],
    sitemap: "https://kubobot.com/sitemap.xml",
    host: "https://kubobot.com",
  };
}
