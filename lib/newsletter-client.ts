/**
 * Client-safe newsletter subscription stub. Same reasoning as lead-client.ts —
 * no backend on GitHub Pages. Swap with real fetch when one lands.
 */

export type NewsletterSubscription = {
  email: string;
  source: "blog" | "news";
};

export async function subscribeToNewsletter(
  sub: NewsletterSubscription,
): Promise<{ ok: true }> {
  if (typeof window !== "undefined") {
    console.log("[newsletter]", sub);
  }
  await new Promise((r) => setTimeout(r, 300));
  return { ok: true };
}
