import type { Plot, PlotStatus } from "./types";

const STATUSES: PlotStatus[] = ["available", "booked", "sold"];

const AREA_RANGES: Record<string, [number, number]> = {
  "0-4": [0, 4],
  "5-7": [5, 7],
  "8+": [8, Infinity],
};

const SORTERS: Record<string, (a: Plot, b: Plot) => number> = {
  "price-asc": (a, b) => a.pricePerMonth - b.pricePerMonth,
  "price-desc": (a, b) => b.pricePerMonth - a.pricePerMonth,
  "area-asc": (a, b) => a.area - b.area,
  "area-desc": (a, b) => b.area - a.area,
};

export type CatalogParams = {
  status?: string;
  area?: string;
  sort?: string;
};

export function filterAndSort(plots: Plot[], params: CatalogParams): Plot[] {
  let result = plots;

  if (params.status && STATUSES.includes(params.status as PlotStatus)) {
    const s = params.status as PlotStatus;
    result = result.filter((p) => p.status === s);
  }

  if (params.area && AREA_RANGES[params.area]) {
    const [min, max] = AREA_RANGES[params.area]!;
    result = result.filter((p) => p.area >= min && p.area <= max);
  }

  if (params.sort && SORTERS[params.sort]) {
    result = [...result].sort(SORTERS[params.sort]!);
  }

  return result;
}
