import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const ORIGINAL = process.env.NEXT_PUBLIC_BASE_PATH;

async function loadAsset(prefix: string) {
  process.env.NEXT_PUBLIC_BASE_PATH = prefix;
  vi.resetModules();
  const mod = await import("@/lib/asset");
  return mod.asset;
}

afterEach(() => {
  if (ORIGINAL === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
  else process.env.NEXT_PUBLIC_BASE_PATH = ORIGINAL;
});

describe("asset() with no prefix", () => {
  let asset: (p: string) => string;
  beforeEach(async () => {
    asset = await loadAsset("");
  });

  it("returns rooted path unchanged", () => {
    expect(asset("/assets/logo.png")).toBe("/assets/logo.png");
  });

  it("strips /ogorody prefix baked into Decap-authored content", () => {
    expect(asset("/ogorody/assets/plots/foo.jpg")).toBe("/assets/plots/foo.jpg");
  });

  it("passes through empty string", () => {
    expect(asset("")).toBe("");
  });

  it("passes through non-rooted strings", () => {
    expect(asset("https://example.com/x.png")).toBe("https://example.com/x.png");
  });
});

describe("asset() with /ogorody prefix", () => {
  let asset: (p: string) => string;
  beforeEach(async () => {
    asset = await loadAsset("/ogorody");
  });

  it("prepends prefix to bare path", () => {
    expect(asset("/assets/logo.png")).toBe("/ogorody/assets/logo.png");
  });

  it("does NOT double-prepend if already prefixed", () => {
    expect(asset("/ogorody/assets/uploads/foo.jpg")).toBe(
      "/ogorody/assets/uploads/foo.jpg",
    );
  });

  it("does prepend when path coincidentally contains prefix later", () => {
    expect(asset("/photos/ogorody/x.jpg")).toBe("/ogorody/photos/ogorody/x.jpg");
  });

  it("passes through non-rooted strings", () => {
    expect(asset("foo.jpg")).toBe("foo.jpg");
  });

  it("passes through empty string", () => {
    expect(asset("")).toBe("");
  });
});
