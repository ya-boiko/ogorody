import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { z } from "zod";
import type { Article, NewsItem } from "./types";
import { ArticleSchema, NewsItemSchema } from "./schemas";

const ARTICLES_DIR = path.resolve(process.cwd(), "content/articles");
const NEWS_DIR = path.resolve(process.cwd(), "content/news");

async function loadFromDir<T>(dir: string, schema: z.ZodType<T>): Promise<T[]> {
  let entries: string[];
  try {
    entries = await readdir(dir);
  } catch {
    return [];
  }

  const items: T[] = [];
  for (const entry of entries) {
    if (!entry.endsWith(".json")) continue;
    const filePath = path.join(dir, entry);
    try {
      const raw = await readFile(filePath, "utf-8");
      items.push(schema.parse(JSON.parse(raw)));
    } catch (err) {
      console.warn(`[content] skipping ${entry}:`, err instanceof Error ? err.message : err);
    }
  }
  return items;
}

export const getAllArticles = cache(async (): Promise<Article[]> => {
  const all = await loadFromDir(ARTICLES_DIR, ArticleSchema);
  return all.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
});

export const getArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
  const all = await getAllArticles();
  return all.find((a) => a.slug === slug) ?? null;
});

export const getAllNews = cache(async (): Promise<NewsItem[]> => {
  const all = await loadFromDir(NEWS_DIR, NewsItemSchema);
  return all.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
});

export const getNewsBySlug = cache(async (slug: string): Promise<NewsItem | null> => {
  const all = await getAllNews();
  return all.find((n) => n.slug === slug) ?? null;
});
