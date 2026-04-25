import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/leads", () => ({
  submitLead: vi.fn().mockResolvedValue({ ok: true }),
}));

describe("POST /api/leads", () => {
  it("returns 200 on valid payload", async () => {
    const { POST } = await import("@/app/api/leads/route");
    const req = new Request("http://localhost/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Иван Петров",
        phone: "+7 861 000-00-00",
        source: "contacts",
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ ok: true });
  });

  it("returns 400 on invalid payload", async () => {
    const { POST } = await import("@/app/api/leads/route");
    const req = new Request("http://localhost/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "И", phone: "abc", source: "contacts" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 on malformed JSON", async () => {
    const { POST } = await import("@/app/api/leads/route");
    const req = new Request("http://localhost/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
