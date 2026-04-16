import { MetadataRoute } from "next";

const BASE_URL = "https://kubobot.com";
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      images: [
        `${BASE_URL}/og-image.png`,
        `${BASE_URL}/Photos/heroimg.png`,
        `${BASE_URL}/Photos/img1.jpg`,
      ],
    },
    {
      url: `${BASE_URL}/buy`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.95,
      images: [
        `${BASE_URL}/Photos/img1.jpg`,
        `${BASE_URL}/Photos/img2.jpg`,
      ],
    },
    {
      url: `${BASE_URL}/support`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
