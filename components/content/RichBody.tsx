import { parseBody } from "@/lib/markdown-light";

/**
 * Renders a markdown-light body into the article content area.
 * Used by both /blog/[slug] and /news/[slug].
 */
export function RichBody({ body }: { body: string }) {
  const blocks = parseBody(body);
  return (
    <>
      {blocks.map((block, i) =>
        block.kind === "h2" ? (
          <h2 key={i}>{block.text}</h2>
        ) : (
          <p key={i}>{block.text}</p>
        ),
      )}
    </>
  );
}
