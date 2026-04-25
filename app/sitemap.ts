import type { MetadataRoute } from "next";
import { getAllPlots } from "@/lib/plots";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ogorody.example";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const plots = await getAllPlots();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/catalog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/contacts`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const plotRoutes: MetadataRoute.Sitemap = plots.map((p) => ({
    url: `${SITE_URL}/catalog/${p.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...plotRoutes];
}
