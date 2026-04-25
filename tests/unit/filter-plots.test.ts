import { describe, it, expect } from "vitest";
import { filterAndSort, listScenarios } from "@/lib/filter-plots";
import type { Plot } from "@/lib/types";

const make = (overrides: Partial<Plot>): Plot => ({
  id: 1,
  title: "P",
  headline: "H",
  scenario: "Новичкам",
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
  make({ id: 1, area: 3, pricePerMonth: 3500, scenario: "Новичкам", title: "Для первого сезона" }),
  make({ id: 2, area: 4, pricePerMonth: 6000, scenario: "Для семьи", title: "Для семьи" }),
  make({
    id: 3,
    area: 6,
    pricePerMonth: 8500,
    scenario: "Совместная аренда",
    title: "Участок №3",
  }),
  make({
    id: 4,
    area: 8,
    pricePerMonth: 10000,
    scenario: "Большой формат",
    title: "Для большой семьи",
  }),
];

describe("filterAndSort", () => {
  it("returns all plots with no params", () => {
    expect(filterAndSort(plots, {}).length).toBe(4);
  });

  it("filters by scenario (exact match)", () => {
    expect(filterAndSort(plots, { scenario: "Новичкам" }).map((p) => p.id)).toEqual([1]);
    expect(filterAndSort(plots, { scenario: "Для семьи" }).map((p) => p.id)).toEqual([2]);
  });

  it("filters by exact area size", () => {
    expect(filterAndSort(plots, { area: "3" }).map((p) => p.id)).toEqual([1]);
    expect(filterAndSort(plots, { area: "6" }).map((p) => p.id)).toEqual([3]);
  });

  it("filters by 8+ open range", () => {
    expect(filterAndSort(plots, { area: "8+" }).map((p) => p.id)).toEqual([4]);
  });

  it("ignores unknown scenario / area / sort", () => {
    expect(filterAndSort(plots, { scenario: "Не существует" }).length).toBe(0);
    expect(filterAndSort(plots, { area: "ten" }).length).toBe(4);
    expect(filterAndSort(plots, { sort: "random" }).map((p) => p.id)).toEqual([1, 2, 3, 4]);
  });

  it("filters by q (case-insensitive substring across title/headline/scenario)", () => {
    expect(filterAndSort(plots, { q: "семь" }).map((p) => p.id)).toEqual([2, 4]);
    expect(filterAndSort(plots, { q: "ПЕРВ" }).map((p) => p.id)).toEqual([1]);
    expect(filterAndSort(plots, { q: "" }).length).toBe(4);
    expect(filterAndSort(plots, { q: "  " }).length).toBe(4);
  });

  it("sorts by price ascending", () => {
    expect(filterAndSort(plots, { sort: "price-asc" }).map((p) => p.id)).toEqual([1, 2, 3, 4]);
  });

  it("sorts by price descending", () => {
    expect(filterAndSort(plots, { sort: "price-desc" }).map((p) => p.id)).toEqual([4, 3, 2, 1]);
  });

  it("combines scenario filter with sort", () => {
    expect(
      filterAndSort(plots, { scenario: "Новичкам", sort: "price-desc" }).map((p) => p.id),
    ).toEqual([1]);
  });
});

describe("listScenarios", () => {
  it("returns distinct scenario labels in Russian alphabetical order", () => {
    expect(listScenarios(plots)).toEqual([
      "Большой формат",
      "Для семьи",
      "Новичкам",
      "Совместная аренда",
    ]);
  });

  it("dedupes when multiple plots share a scenario", () => {
    const dup: Plot[] = [
      make({ id: 1, scenario: "Новичкам" }),
      make({ id: 2, scenario: "Новичкам" }),
    ];
    expect(listScenarios(dup)).toEqual(["Новичкам"]);
  });
});
