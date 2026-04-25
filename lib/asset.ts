/**
 * Prepend the deployment basePath to an asset path so it resolves correctly
 * on GitHub Pages (which serves under /<repo>/).
 *
 * Idempotent: if the path already starts with PREFIX, returns it unchanged.
 * This matters because Decap CMS saves uploaded images with the full
 * public_folder path (which we configured to include /ogorody for admin
 * preview), and we don't want to double-prepend on render.
 *
 * The env var `NEXT_PUBLIC_BASE_PATH` is set by the deploy workflow.
 * Locally it defaults to "" so paths resolve from "/".
 */
const PREFIX = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path) return path;
  if (!path.startsWith("/")) return path;
  if (PREFIX && path.startsWith(`${PREFIX}/`)) return path;
  return `${PREFIX}${path}`;
}
