import type { MetadataRoute } from "next";
import { getAllPlots } from "@/lib/plots";
import { getAllArticles, getAllNews } from "@/lib/content";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ogorody.example";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [plots, articles, news] = await Promise.all([
    getAllPlots(),
    getAllArticles(),
    getAllNews(),
  ]);
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/catalog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/care`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/contacts`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const plotRoutes: MetadataRoute.Sitemap = plots.map((p) => ({
    url: `${SITE_URL}/catalog/${p.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const newsRoutes: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${SITE_URL}/news/${n.slug}`,
    lastModified: new Date(n.publishedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...plotRoutes, ...articleRoutes, ...newsRoutes];
}
