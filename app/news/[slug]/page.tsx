import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsCard } from "@/components/content/NewsCard";
import { RichBody } from "@/components/content/RichBody";
import { asset, unprefix } from "@/lib/asset";
import { getAllNews, getNewsBySlug } from "@/lib/content";
import { formatRuDate } from "@/lib/format-date";

export async function generateStaticParams() {
  const items = await getAllNews();
  return items.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return { title: "Новость не найдена" };
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: [{ url: unprefix(item.cover) }],
      type: "article",
      publishedTime: item.publishedAt,
    },
  };
}

export default async function NewsItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  const all = await getAllNews();
  const related = all.filter((n) => n.slug !== item.slug).slice(0, 3);

  return (
    <>
      <section
        className="page-head"
        style={{ padding: "28px 0 0", borderBottom: 0 }}
      >
        <div className="wrap">
          <nav className="crumbs" aria-label="Хлебные крошки" style={{ margin: 0 }}>
            <Link href="/">Главная</Link>
            <Caret />
            <Link href="/news">Новости</Link>
            <Caret />
            <span className="current">{item.title}</span>
          </nav>
        </div>
      </section>

      <section className="news-hero-section">
        <div className="wrap">
          <div className="layout">
            <Image
              className="hero-img"
              src={asset(item.cover)}
              alt={item.title}
              width={1200}
              height={800}
              priority
            />
            <div className="hero-info">
              <span className="news-tag">{item.category}</span>
              <h1>{item.title}</h1>
              <p className="hero-lede">{item.excerpt}</p>
              <div className="hero-meta">
                <span>{formatRuDate(item.publishedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="article-body">
        <div className="wrap">
          <div className="layout">
            <div className="article-content">
              <RichBody body={item.body} />
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="related-news">
          <div className="wrap">
            <h2>Похожие новости</h2>
            <div className="news-grid">
              {related.map((n) => (
                <NewsCard key={n.slug} item={n} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="news-cta">
        <div className="wrap">
          <div className="layout">
            <h2>Запишитесь на&nbsp;экскурсию по&nbsp;клубу</h2>
            <p>
              Покажем участки, инфраструктуру и&nbsp;познакомим с&nbsp;командой.
              Без обязательств&nbsp;— просто посмотреть, как это устроено.
            </p>
            <Link href="/contacts" style={{ display: "inline-block" }}>
              Записаться на&nbsp;просмотр
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Caret() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path
        d="M3 1l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
