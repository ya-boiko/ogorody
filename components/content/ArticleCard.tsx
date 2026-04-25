import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { formatRuDate } from "@/lib/format-date";
import type { Article } from "@/lib/types";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link className="article-card" href={`/blog/${article.slug}`}>
      <div className="media">
        <Image src={asset(article.cover)} alt={article.title} width={600} height={400} />
      </div>
      <div className="body">
        <span className="article-tag">{article.category}</span>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <div className="article-meta">
          <span>{formatRuDate(article.publishedAt)}</span>
          <span className="dot" />
          <span>{article.readingMinutes} мин</span>
        </div>
      </div>
    </Link>
  );
}
