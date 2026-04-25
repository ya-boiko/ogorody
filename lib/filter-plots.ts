import type { Plot } from "./types";

const SORTERS: Record<string, (a: Plot, b: Plot) => number> = {
  "price-asc": (a, b) => a.pricePerMonth - b.pricePerMonth,
  "price-desc": (a, b) => b.pricePerMonth - a.pricePerMonth,
  "area-asc": (a, b) => a.area - b.area,
  "area-desc": (a, b) => b.area - a.area,
};

export type CatalogParams = {
  scenario?: string;
  area?: string;
  sort?: string;
  q?: string;
};

/**
 * Convert a search-param area value to a [min, max] inclusive range.
 * "3"/"4"/"5"/"6" → exact size. "8+" → 8..Infinity. Anything else → null.
 */
function parseAreaRange(value: string): [number, number] | null {
  if (value.endsWith("+")) {
    const min = Number(value.slice(0, -1));
    if (!Number.isFinite(min)) return null;
    return [min, Infinity];
  }
  const exact = Number(value);
  if (!Number.isFinite(exact)) return null;
  return [exact, exact];
}

export function filterAndSort(plots: Plot[], params: CatalogParams): Plot[] {
  let result = plots;

  if (params.scenario) {
    result = result.filter((p) => p.scenario === params.scenario);
  }

  if (params.area) {
    const range = parseAreaRange(params.area);
    if (range) {
      const [min, max] = range;
      result = result.filter((p) => p.area >= min && p.area <= max);
    }
  }

  if (params.q) {
    const q = params.q.trim().toLowerCase();
    if (q) {
      result = result.filter((p) => {
        const haystack = [p.title, p.headline, p.scenario, p.location]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
    }
  }

  if (params.sort && SORTERS[params.sort]) {
    result = [...result].sort(SORTERS[params.sort]!);
  }

  return result;
}

/** Distinct scenario labels found in the data, in stable A→Z order. */
export function listScenarios(plots: Plot[]): string[] {
  return Array.from(new Set(plots.map((p) => p.scenario))).sort((a, b) =>
    a.localeCompare(b, "ru"),
  );
}
