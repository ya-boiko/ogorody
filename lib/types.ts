export type PlotStatus = "available" | "booked" | "sold";

export type Plot = {
  id: number;
  title: string;
  area: number;
  location: string;
  pricePerMonth: number;
  status: PlotStatus;
  photos: string[];
  description: string;
  features: string[];
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover: string;
  publishedAt: string; // YYYY-MM-DD
  readingMinutes: number;
  body: string; // markdown-light: paragraphs separated by blank lines, h2 lines start with "## "
  featured?: boolean;
};

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover: string;
  publishedAt: string; // YYYY-MM-DD
  body: string;
  featured?: boolean;
};

export type LeadSource = "main" | "catalog" | "plot" | "contacts";

export type Lead = {
  name: string;
  phone: string;
  message?: string;
  source: LeadSource;
  plotId?: number;
};
