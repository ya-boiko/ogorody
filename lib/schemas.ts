import { z } from "zod";

export const PlotSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  area: z.number().positive(),
  location: z.string().min(1),
  pricePerMonth: z.number().nonnegative(),
  status: z.enum(["available", "booked", "sold"]),
  photos: z.array(z.string().min(1)).min(1),
  description: z.string(),
  features: z.array(z.string()),
});

export const LeadSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^(\+7|8)[\s\-()]*\d[\s\-()]*\d{2}.*$/),
  message: z.string().max(2000).optional(),
  source: z.enum(["main", "catalog", "plot", "contacts"]),
  plotId: z.number().int().positive().optional(),
});
