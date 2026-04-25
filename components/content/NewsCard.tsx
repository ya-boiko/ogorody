import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { formatRuDate } from "@/lib/format-date";
import type { NewsItem } from "@/lib/types";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link className="news-card" href={`/news/${item.slug}`}>
      <div className="media">
        <Image src={asset(item.cover)} alt={item.title} width={600} height={400} />
      </div>
      <div className="body">
        <span className="news-tag">{item.category}</span>
        <h3>{item.title}</h3>
        <p>{item.excerpt}</p>
        <div className="news-meta">
          <span>{formatRuDate(item.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
