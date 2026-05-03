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
// Content authored through Decap stores absolute paths that include the
// production basePath (`/ogorody`). Strip it before re-applying PREFIX so
// the same content renders correctly in dev (PREFIX="") and in prod.
const LEGACY_PREFIX = "/ogorody";

export function asset(path: string): string {
  if (!path) return path;
  if (!path.startsWith("/")) return path;
  let p = path;
  if (p.startsWith(`${LEGACY_PREFIX}/`)) p = p.slice(LEGACY_PREFIX.length);
  return `${PREFIX}${p}`;
}

/**
 * Inverse of asset(): strip the deployment basePath if present.
 * Used for og:image URLs in metadata exports — Next.js's metadataBase
 * prepends its pathname via concatenation (not URL resolution), so we must
 * pass the raw "/assets/..." form and let metadataBase handle the prefix.
 */
export function unprefix(path: string): string {
  if (!path || !path.startsWith("/")) return path;
  if (path.startsWith(`${LEGACY_PREFIX}/`)) return path.slice(LEGACY_PREFIX.length);
  if (PREFIX && path.startsWith(`${PREFIX}/`)) return path.slice(PREFIX.length);
  return path;
}
