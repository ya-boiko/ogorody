/**
 * Tiny markdown-light parser used for article/news bodies.
 * Supports:
 *   - paragraphs separated by blank lines
 *   - lines starting with "## " become <h2>
 *   - everything else is wrapped in <p>
 * No inline formatting (bold/italic/links) — keep content authoring simple.
 */

export type Block = { kind: "h2"; text: string } | { kind: "p"; text: string };

export function parseBody(body: string): Block[] {
  const blocks: Block[] = [];
  const chunks = body.split(/\n\s*\n/);
  for (const chunk of chunks) {
    const trimmed = chunk.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("## ")) {
      blocks.push({ kind: "h2", text: trimmed.slice(3).trim() });
    } else {
      blocks.push({ kind: "p", text: trimmed });
    }
  }
  return blocks;
}
