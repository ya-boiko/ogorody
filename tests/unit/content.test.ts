import { describe, it, expect } from "vitest";
import { ArticleSchema, NewsItemSchema } from "@/lib/schemas";

describe("ArticleSchema", () => {
  const valid = {
    slug: "kak-vybrat",
    title: "T",
    excerpt: "E",
    category: "C",
    cover: "/x.jpg",
    publishedAt: "2026-04-10",
    readingMinutes: 5,
    body: "B",
  };

  it("accepts a valid article", () => {
    expect(() => ArticleSchema.parse(valid)).not.toThrow();
  });

  it("rejects bad slug", () => {
    expect(() => ArticleSchema.parse({ ...valid, slug: "Bad Slug" })).toThrow();
    expect(() => ArticleSchema.parse({ ...valid, slug: "BAD" })).toThrow();
  });

  it("rejects bad date", () => {
    expect(() => ArticleSchema.parse({ ...valid, publishedAt: "10/04/2026" })).toThrow();
  });

  it("rejects non-positive reading time", () => {
    expect(() => ArticleSchema.parse({ ...valid, readingMinutes: 0 })).toThrow();
    expect(() => ArticleSchema.parse({ ...valid, readingMinutes: -1 })).toThrow();
  });

  it("accepts optional featured", () => {
    expect(() => ArticleSchema.parse({ ...valid, featured: true })).not.toThrow();
  });
});

describe("NewsItemSchema", () => {
  const valid = {
    slug: "anons",
    title: "T",
    excerpt: "E",
    category: "C",
    cover: "/x.jpg",
    publishedAt: "2026-04-01",
    body: "B",
  };

  it("accepts a valid news item", () => {
    expect(() => NewsItemSchema.parse(valid)).not.toThrow();
  });

  it("rejects bad slug", () => {
    expect(() => NewsItemSchema.parse({ ...valid, slug: "Плохой" })).toThrow();
  });

  it("does not require readingMinutes", () => {
    expect(() => NewsItemSchema.parse(valid)).not.toThrow();
  });
});
