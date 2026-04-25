export type PlotStatus = "available" | "booked" | "sold";

export type Plot = {
  id: number;
  title: string;
  area: number;
  location: string;
  pricePerSeason: number;
  status: PlotStatus;
  photos: string[];
  description: string;
  features: string[];
};

export type LeadSource = "main" | "catalog" | "plot" | "contacts";

export type Lead = {
  name: string;
  phone: string;
  message?: string;
  source: LeadSource;
  plotId?: number;
};
