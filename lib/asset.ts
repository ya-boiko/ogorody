/**
 * Prepend the deployment basePath to an asset path so it resolves correctly
 * on GitHub Pages (which serves under /<repo>/).
 *
 * Used for `<Image src>`, inline `backgroundImage: url(...)`, and any other
 * place where Next.js doesn't automatically rewrite the URL.
 *
 * The env var `NEXT_PUBLIC_BASE_PATH` is set by the deploy workflow.
 * Locally it defaults to "" so paths resolve from "/".
 */
const PREFIX = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path) return path;
  if (!path.startsWith("/")) return path;
  return `${PREFIX}${path}`;
}
