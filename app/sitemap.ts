import type { MetadataRoute } from "next";
import { SYSTEM_SLUGS } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1 },
    ...SYSTEM_SLUGS.map((slug) => ({ url: `${SITE_URL}/sistemi/${slug}`, priority: 0.8 })),
  ];
}
