import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NewsCard } from "@/components/content/NewsCard";
import { getAllNews } from "@/lib/content";
import { formatRuDate } from "@/lib/format-date";

export const metadata: Metadata = {
  title: "Новости",
  description:
    "События сезона, новые сервисы и обновления клуба «Огороды» в Краснодарском крае.",
};

const FILTERS = [
  "Все новости",
  "Анонс",
  "Инфраструктура",
  "Сервис",
  "Команда",
  "Итоги",
] as const;

export default async function NewsPage() {
  const all = await getAllNews();
  const featured = all.find((n) => n.featured) ?? all[0];
  const rest = all.filter((n) => n.slug !== featured?.slug);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <Caret />
            <span className="current">Новости</span>
          </nav>
          <h1 className="h-page">
            Что нового в&nbsp;<em>Огородах</em>
          </h1>
          <p className="page-lede">
            События сезона, новые сервисы и&nbsp;всё, что делает формат удобнее
            для&nbsp;вашей семьи.
          </p>
        </div>
      </section>

      {featured && (
        <section className="news-hero-section">
          <div className="wrap">
            <div className="layout">
              <Image
                className="hero-img"
                src={featured.cover}
                alt={featured.title}
                width={900}
                height={600}
                priority
              />
              <div className="hero-info">
                <span className="news-tag">{featured.category}</span>
                <h2>{featured.title}</h2>
                <p className="hero-lede">{featured.excerpt}</p>
                <div className="hero-meta">
                  <span>{formatRuDate(featured.publishedAt)}</span>
                </div>
                <Link href={`/news/${featured.slug}`} className="btn btn-primary hero-cta">
                  Открыть новость
                  <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="news-grid-section">
        <div className="wrap">
          <div className="filter-chips">
            {FILTERS.map((f, i) => (
              <span key={f} className={i === 0 ? "active" : undefined}>
                {f}
              </span>
            ))}
          </div>

          <div className="news-grid">
            {rest.map((n) => (
              <NewsCard key={n.slug} item={n} />
            ))}
          </div>
        </div>
      </section>

      <section className="news-newsletter">
        <div className="wrap">
          <div className="layout">
            <h2>Узнавайте о&nbsp;новостях первыми</h2>
            <p>
              Подпишитесь на&nbsp;рассылку&nbsp;— раз в&nbsp;месяц присылаем главное
              о&nbsp;сезоне, новых сервисах и&nbsp;событиях.
            </p>
            <p style={{ marginTop: 12, opacity: 0.7 }}>
              Email-рассылка появится с&nbsp;началом сезона.{" "}
              <Link href="/contacts">Напишите нам</Link>, и&nbsp;добавим вас в&nbsp;список.
            </p>
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
    <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M1 7h12m0 0L8 2m5 5l-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
