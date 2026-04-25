import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const TEST_DIR = path.resolve(__dirname, "../fixtures/plots");

vi.mock("@/lib/plots-config", () => ({
  PLOTS_DIR: TEST_DIR,
}));

vi.mock("server-only", () => ({}));

const valid = {
  id: 42,
  title: "Тест",
  area: 6,
  location: "Где-то",
  pricePerSeason: 50000,
  status: "available",
  photos: ["/x.jpg"],
  description: "...",
  features: [],
};

beforeAll(async () => {
  await mkdir(TEST_DIR, { recursive: true });
  await writeFile(path.join(TEST_DIR, "42.json"), JSON.stringify(valid));
  await writeFile(path.join(TEST_DIR, "broken.json"), "{ not json");
  await writeFile(
    path.join(TEST_DIR, "invalid-shape.json"),
    JSON.stringify({ id: 0, title: "" }),
  );
});

afterAll(async () => {
  await rm(TEST_DIR, { recursive: true, force: true });
});

describe("plots", () => {
  it("getAllPlots returns valid plots and skips invalid files", async () => {
    const { getAllPlots } = await import("@/lib/plots");
    const all = await getAllPlots();
    expect(all).toHaveLength(1);
    expect(all[0]?.id).toBe(42);
  });

  it("getPlotById returns the plot when present", async () => {
    const { getPlotById } = await import("@/lib/plots");
    const p = await getPlotById(42);
    expect(p?.title).toBe("Тест");
  });

  it("getPlotById returns null when absent", async () => {
    const { getPlotById } = await import("@/lib/plots");
    const p = await getPlotById(9999);
    expect(p).toBeNull();
  });
});
