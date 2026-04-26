import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/content/ArticleCard";
import { RichBody } from "@/components/content/RichBody";
import { asset, unprefix } from "@/lib/asset";
import { getAllArticles, getArticleBySlug } from "@/lib/content";
import { formatRuDate } from "@/lib/format-date";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Статья не найдена" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: unprefix(article.cover) }],
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const all = await getAllArticles();
  const related = all.filter((a) => a.slug !== article.slug).slice(0, 3);

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
            <Link href="/blog">Блог</Link>
            <Caret />
            <span className="current">{article.title}</span>
          </nav>
        </div>
      </section>

      <section className="article-hero-section">
        <div className="wrap">
          <div className="layout">
            <Image
              className="hero-img"
              src={asset(article.cover)}
              alt={article.title}
              width={1200}
              height={800}
              priority
            />
            <div className="hero-info">
              <span className="article-tag">{article.category}</span>
              <h1>{article.title}</h1>
              <p className="hero-lede">{article.excerpt}</p>
              <div className="hero-meta">
                <span>{formatRuDate(article.publishedAt)}</span>
                <span className="dot" />
                <span>{article.readingMinutes} мин чтения</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="article-body">
        <div className="wrap">
          <div className="layout">
            <div className="article-content">
              <RichBody body={article.body} />
            </div>

            <aside className="article-sidebar">
              <div className="sidebar-card">
                <h3>Три формата участия</h3>
                <ul className="formats">
                  <li>
                    <span className="name">Полное делегирование</span>
                    <span className="price">от 65&nbsp;000&nbsp;₽ за&nbsp;сезон</span>
                  </li>
                  <li>
                    <span className="name">Полусамостоятельно</span>
                    <span className="price">от 39&nbsp;000&nbsp;₽ за&nbsp;сезон</span>
                  </li>
                  <li>
                    <span className="name">Полная ответственность</span>
                    <span className="price">от 25&nbsp;000&nbsp;₽ за&nbsp;сезон</span>
                  </li>
                </ul>
                <Link className="btn-side" href="/catalog" style={{ display: "inline-block" }}>
                  Подобрать участок
                </Link>
              </div>

              {article.author && (
                <div className="author-card">
                  <div className="author-avatar">{article.author.initials}</div>
                  <div className="author-info">
                    <strong>{article.author.name}</strong>
                    <span>{article.author.role}</span>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="related-articles">
          <div className="wrap">
            <h2>Читайте также</h2>
            <div className="related-grid">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="article-cta">
        <div className="wrap">
          <div className="layout">
            <h2>Запишитесь на&nbsp;экскурсию по&nbsp;клубу</h2>
            <p>
              Покажем участки, инфраструктуру и&nbsp;познакомим с&nbsp;командой.
              Без обязательств&nbsp;— просто посмотреть, как это устроено.
            </p>
            <Link
              href="/contacts"
              style={{ display: "inline-block" }}
            >
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
