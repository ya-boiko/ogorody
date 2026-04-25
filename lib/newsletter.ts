import "server-only";

export type NewsletterSubscription = {
  email: string;
  source: "blog" | "news";
};

export async function subscribeToNewsletter(
  sub: NewsletterSubscription,
): Promise<{ ok: true }> {
  console.log("[newsletter]", JSON.stringify(sub));
  // TODO(backlog): wire to mail service once chosen
  return { ok: true };
}
