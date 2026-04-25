import { describe, it, expect } from "vitest";
import { filterAndSort } from "@/lib/filter-plots";
import type { Plot } from "@/lib/types";

const make = (overrides: Partial<Plot>): Plot => ({
  id: 1,
  title: "P",
  area: 5,
  location: "L",
  pricePerMonth: 10000,
  status: "available",
  photos: ["/x.jpg"],
  description: "",
  features: [],
  ...overrides,
});

const plots: Plot[] = [
  make({ id: 1, area: 3, pricePerMonth: 9000, status: "available" }),
  make({ id: 2, area: 6, pricePerMonth: 18000, status: "available" }),
  make({ id: 3, area: 8, pricePerMonth: 24000, status: "booked" }),
  make({ id: 4, area: 12, pricePerMonth: 36000, status: "sold" }),
];

describe("filterAndSort", () => {
  it("returns all plots with no params", () => {
    expect(filterAndSort(plots, {}).length).toBe(4);
  });

  it("filters by status", () => {
    expect(filterAndSort(plots, { status: "available" }).map((p) => p.id)).toEqual([1, 2]);
    expect(filterAndSort(plots, { status: "sold" }).map((p) => p.id)).toEqual([4]);
  });

  it("filters by area range", () => {
    expect(filterAndSort(plots, { area: "0-4" }).map((p) => p.id)).toEqual([1]);
    expect(filterAndSort(plots, { area: "5-7" }).map((p) => p.id)).toEqual([2]);
    expect(filterAndSort(plots, { area: "8+" }).map((p) => p.id)).toEqual([3, 4]);
  });

  it("ignores unknown status / area / sort values", () => {
    expect(filterAndSort(plots, { status: "weird" }).length).toBe(4);
    expect(filterAndSort(plots, { area: "ten" }).length).toBe(4);
    expect(filterAndSort(plots, { sort: "random" }).map((p) => p.id)).toEqual([1, 2, 3, 4]);
  });

  it("sorts by price ascending", () => {
    expect(filterAndSort(plots, { sort: "price-asc" }).map((p) => p.id)).toEqual([1, 2, 3, 4]);
  });

  it("sorts by price descending", () => {
    expect(filterAndSort(plots, { sort: "price-desc" }).map((p) => p.id)).toEqual([4, 3, 2, 1]);
  });

  it("sorts by area ascending", () => {
    expect(filterAndSort(plots, { sort: "area-asc" }).map((p) => p.id)).toEqual([1, 2, 3, 4]);
  });

  it("combines filter and sort", () => {
    expect(
      filterAndSort(plots, { status: "available", sort: "price-desc" }).map((p) => p.id),
    ).toEqual([2, 1]);
  });
});
