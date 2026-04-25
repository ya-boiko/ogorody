import type { Metadata } from "next";
import Link from "next/link";
import { PlotCard } from "@/components/catalog/PlotCard";
import { PlotFilters } from "@/components/catalog/PlotFilters";
import { Footer } from "@/components/footer/Footer";
import { Nav } from "@/components/nav/Nav";
import { getAllPlots } from "@/lib/plots";
import { filterAndSort, type CatalogParams } from "@/lib/filter-plots";

export const metadata: Metadata = {
  title: "Участки",
  description:
    "Каталог готовых участков под ключ в Краснодарском крае: фотографии, площадь, цена за месяц аренды.",
};

type SearchParams = Promise<{
  status?: string;
  area?: string;
  sort?: string;
}>;

export default async function CatalogPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const all = await getAllPlots();
  const plots = filterAndSort(all, params as CatalogParams);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path
                d="M3 1l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="current">Участки</span>
          </nav>
          <h1 className="h-page">
            Выберите участок под свой <em>ритм&nbsp;жизни</em>
          </h1>
          <p className="page-lede">
            Для&nbsp;старта, для&nbsp;семьи, для&nbsp;совместной аренды или
            с&nbsp;делегированием ухода&nbsp;— подберите удобный формат без дачной
            рутины.
          </p>
        </div>
      </section>

      <section className="filters">
        <div className="wrap">
          <PlotFilters />
        </div>
      </section>

      <section className="catalog">
        <div className="wrap">
          {plots.length === 0 ? (
            <p style={{ padding: "32px 0", color: "var(--text-muted)" }}>
              Под выбранные фильтры участков пока нет — попробуйте изменить параметры.
            </p>
          ) : (
            <div className="grid">
              {plots.map((plot) => (
                <PlotCard key={plot.id} plot={plot} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
