import { describe, it, expect } from "vitest";
import { PlotSchema, LeadSchema } from "@/lib/schemas";

describe("PlotSchema", () => {
  const validPlot = {
    id: 1,
    title: "Участок 12 соток",
    area: 12,
    location: "Краснодарский край, ст. Это",
    pricePerMonth: 90000,
    status: "available",
    photos: ["/assets/plots/1/01.jpg"],
    description: "Описание участка.",
    features: ["полив", "теплица"],
  };

  it("accepts a valid plot", () => {
    expect(() => PlotSchema.parse(validPlot)).not.toThrow();
  });

  it("rejects missing id", () => {
    const { id: _id, ...invalid } = validPlot;
    expect(() => PlotSchema.parse(invalid)).toThrow();
  });

  it("rejects negative price", () => {
    expect(() => PlotSchema.parse({ ...validPlot, pricePerMonth: -1 })).toThrow();
  });

  it("rejects unknown status", () => {
    expect(() => PlotSchema.parse({ ...validPlot, status: "pending" })).toThrow();
  });

  it("requires at least one photo", () => {
    expect(() => PlotSchema.parse({ ...validPlot, photos: [] })).toThrow();
  });
});

describe("LeadSchema", () => {
  const valid = {
    name: "Иван Петров",
    phone: "+7 861 000-00-00",
    source: "contacts" as const,
  };

  it("accepts a valid lead", () => {
    expect(() => LeadSchema.parse(valid)).not.toThrow();
  });

  it("rejects too-short name", () => {
    expect(() => LeadSchema.parse({ ...valid, name: "И" })).toThrow();
  });

  it("rejects malformed phone", () => {
    expect(() => LeadSchema.parse({ ...valid, phone: "abc" })).toThrow();
  });

  it("accepts phone starting with 8", () => {
    expect(() => LeadSchema.parse({ ...valid, phone: "8 (861) 000-00-00" })).not.toThrow();
  });

  it("accepts optional message", () => {
    expect(() =>
      LeadSchema.parse({ ...valid, message: "Когда можно посмотреть?" }),
    ).not.toThrow();
  });

  it("rejects message > 2000 chars", () => {
    expect(() => LeadSchema.parse({ ...valid, message: "x".repeat(2001) })).toThrow();
  });

  it("requires source enum", () => {
    expect(() => LeadSchema.parse({ ...valid, source: "wrong" })).toThrow();
  });
});
