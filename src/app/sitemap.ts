import type { MetadataRoute } from "next";
import { SERVICES_DATA } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/qhse",
    "/careers",
    "/contact",
    "/privacy",
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${base}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  for (const srv of SERVICES_DATA) {
    entries.push({
      url: `${base}/services/${srv.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
