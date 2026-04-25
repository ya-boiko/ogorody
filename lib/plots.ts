import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import type { Plot } from "./types";
import { PlotSchema } from "./schemas";
import { PLOTS_DIR } from "./plots-config";

export const getAllPlots = cache(async (): Promise<Plot[]> => {
  let entries: string[];
  try {
    entries = await readdir(PLOTS_DIR);
  } catch {
    return [];
  }

  const plots: Plot[] = [];
  for (const entry of entries) {
    if (!entry.endsWith(".json")) continue;
    const filePath = path.join(PLOTS_DIR, entry);
    try {
      const raw = await readFile(filePath, "utf-8");
      const parsed = PlotSchema.parse(JSON.parse(raw));
      plots.push(parsed);
    } catch (err) {
      console.warn(`[plots] skipping ${entry}:`, err instanceof Error ? err.message : err);
    }
  }

  return plots.sort((a, b) => a.id - b.id);
});

export const getPlotById = cache(async (id: number): Promise<Plot | null> => {
  const all = await getAllPlots();
  return all.find((p) => p.id === id) ?? null;
});
