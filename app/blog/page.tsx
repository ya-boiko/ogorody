import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/content/ArticleCard";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { asset } from "@/lib/asset";
import { getAllArticles } from "@/lib/content";
import { formatRuDate } from "@/lib/format-date";

import { getPageSeo, seoToMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return seoToMetadata(await getPageSeo("blog"));
}

const TOPICS = [
  "Все темы",
  "Гид",
  "Сезон",
  "Опыт",
  "Советы",
  "Календарь",
  "Истории участников",
] as const;

export default async function BlogPage() {
  const articles = await getAllArticles();
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a.slug !== featured?.slug);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <Caret />
            <span className="current">Блог</span>
          </nav>
          <h1 className="h-page">
            Полезные статьи о&nbsp;<em>выращивании&nbsp;овощей</em>
          </h1>
          <p className="page-lede">
            Советы агрономов, истории участников и&nbsp;практические лайфхаки
            для&nbsp;сезонного огорода. Обновляем по мере того, как происходят события.
          </p>
        </div>
      </section>

      {featured && (
        <section className="blog-hero">
          <div className="wrap">
            <div className="layout">
              <Image
                className="hero-img"
                src={asset(featured.cover)}
                alt={featured.title}
                width={900}
                height={600}
                priority
              />
              <div className="hero-info">
                <span className="hero-tag">Главный материал</span>
                <h2>{featured.title}</h2>
                <p className="hero-lede">{featured.excerpt}</p>
                <div className="hero-meta">
                  <span>{formatRuDate(featured.publishedAt)}</span>
                  <span className="dot" />
                  <span>{featured.readingMinutes} мин чтения</span>
                  <span className="dot" />
                  <span>{featured.category}</span>
                </div>
                <Link href={`/blog/${featured.slug}`} className="hero-cta">
                  Открыть материал
                  <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="blog-topics">
        <div className="wrap">
          <div className="topic-chips">
            {TOPICS.map((t, i) => (
              <span key={t} className={`topic-chip${i === 0 ? " active" : ""}`}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {rest.length > 0 && (
        <section className="materials">
          <div className="wrap">
            <div className="materials-head">
              <h2>Ещё материалы</h2>
              <p>
                Свежие статьи, истории и&nbsp;практические разборы от&nbsp;команды
                и&nbsp;участников клуба.
              </p>
            </div>
            <div className="blog-grid">
              {rest.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="blog-newsletter">
        <div className="wrap">
          <div className="layout">
            <h2>Раз в&nbsp;неделю&nbsp;— одно полезное письмо про сезон</h2>
            <p>
              Календарь, советы агронома и&nbsp;разборы. Без рекламы и&nbsp;спама.
              Отписка в&nbsp;один клик.
            </p>
            <NewsletterForm source="blog" />
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

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M1 7h12m0 0L8 2m5 5l-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
