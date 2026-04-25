import { z } from "zod";

export const PlotSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  headline: z.string().min(1),
  scenario: z.string().min(1),
  area: z.number().positive(),
  location: z.string().min(1),
  pricePerMonth: z.number().nonnegative(),
  status: z.enum(["available", "booked", "sold"]),
  photos: z.array(z.string().min(1)).min(1),
  description: z.string(),
  features: z.array(z.string()),
});

export const ArticleSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug must be lowercase ascii with dashes"),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  category: z.string().min(1),
  cover: z.string().min(1),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  readingMinutes: z.number().int().positive(),
  body: z.string().min(1),
  featured: z.boolean().optional(),
});

export const NewsItemSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  category: z.string().min(1),
  cover: z.string().min(1),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  body: z.string().min(1),
  featured: z.boolean().optional(),
});

export const LeadSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^(\+7|8)[\s\-()]*\d[\s\-()]*\d{2}.*$/),
  message: z.string().max(2000).optional(),
  email: z.string().email().optional(),
  careFormat: z.enum(["self", "supported", "managed"]).optional(),
  source: z.enum(["main", "catalog", "plot", "contacts"]),
  plotId: z.number().int().positive().optional(),
});
