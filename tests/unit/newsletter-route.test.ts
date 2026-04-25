import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/newsletter", () => ({
  subscribeToNewsletter: vi.fn().mockResolvedValue({ ok: true }),
}));

describe("POST /api/newsletter", () => {
  it("returns 200 on valid email", async () => {
    const { POST } = await import("@/app/api/newsletter/route");
    const req = new Request("http://localhost/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "ivan@example.com", source: "blog" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  it("returns 400 on invalid email", async () => {
    const { POST } = await import("@/app/api/newsletter/route");
    const req = new Request("http://localhost/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "no-at", source: "blog" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 on missing source", async () => {
    const { POST } = await import("@/app/api/newsletter/route");
    const req = new Request("http://localhost/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "ivan@example.com" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
