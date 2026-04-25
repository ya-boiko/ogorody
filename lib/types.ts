export type PlotStatus = "available" | "booked" | "sold";

export type Plot = {
  id: number;
  title: string;
  /** Short headline shown in card meta — e.g. "Легко начать", "Парковка рядом". */
  headline: string;
  /** Scenario label — also drives the catalog scenario filter. */
  scenario: string;
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

export type CareFormat = "self" | "supported" | "managed";

export type Lead = {
  name: string;
  phone: string;
  message?: string;
  email?: string;
  careFormat?: CareFormat;
  source: LeadSource;
  plotId?: number;
};
