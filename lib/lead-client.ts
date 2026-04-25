import type { Lead } from "./types";

/**
 * Client-safe lead submission stub. Used directly by form components
 * because GitHub Pages has no server runtime.
 *
 * When a backend lands later (FastAPI / Vercel function / external service),
 * replace the body with the real fetch and keep this signature.
 */
export async function submitLead(lead: Lead): Promise<{ ok: true }> {
  if (typeof window !== "undefined") {
    // Visible in DevTools while we don't have a real destination
    console.log("[lead]", lead);
  }
  // Small artificial latency so the UI gets a chance to show "Отправляем…"
  await new Promise((r) => setTimeout(r, 300));
  return { ok: true };
}
