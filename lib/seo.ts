import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import type { Metadata } from "next";
import { z } from "zod";
import { asset } from "./asset";

const SEO_DIR = path.resolve(process.cwd(), "content/seo");

const SeoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  ogImage: z.string().optional(),
});

export type SeoConfig = z.infer<typeof SeoSchema>;

/** Page key matches the JSON file name (no extension) in content/seo/. */
export type SeoPage = "main" | "care" | "about" | "contacts" | "blog" | "news";

const FALLBACKS: Record<SeoPage, SeoConfig> = {
  main: {
    title: "Огороды — Свой урожай без дачной рутины",
    description:
      "Готовые участки в Краснодарском крае: посадка, уход и контроль через приложение.",
  },
  care: {
    title: "Помощь в уходе",
    description: "Три формата участия и разовые услуги.",
  },
  about: {
    title: "О проекте",
    description: "Загородный сервис «Огороды» в Краснодарском крае.",
  },
  contacts: {
    title: "Контакты",
    description: "Свяжитесь с нами или оставьте заявку.",
  },
  blog: {
    title: "Блог",
    description: "Полезные статьи о выращивании овощей.",
  },
  news: {
    title: "Новости",
    description: "События сезона и обновления клуба.",
  },
};

export const getPageSeo = cache(async (page: SeoPage): Promise<SeoConfig> => {
  try {
    const raw = await readFile(path.join(SEO_DIR, `${page}.json`), "utf-8");
    return SeoSchema.parse(JSON.parse(raw));
  } catch (err) {
    console.warn(`[seo] using fallback for ${page}:`, err instanceof Error ? err.message : err);
    return FALLBACKS[page];
  }
});

/**
 * Build a Next.js Metadata object from an SeoConfig. Used in `generateMetadata`
 * or `export const metadata` of static pages. Title is wrapped in `default`
 * so the layout's title-template doesn't append on top of it.
 */
export function seoToMetadata(seo: SeoConfig): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      ...(seo.ogImage ? { images: [{ url: asset(seo.ogImage) }] } : {}),
    },
  };
}
