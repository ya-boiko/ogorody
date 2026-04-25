import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CatalogList } from "@/components/catalog/CatalogList";
import { getAllPlots } from "@/lib/plots";
import { listScenarios } from "@/lib/filter-plots";

export const metadata: Metadata = {
  title: "Участки",
  description:
    "Каталог готовых участков под ключ в Краснодарском крае: фотографии, площадь, цена за месяц аренды.",
};

export default async function CatalogPage() {
  const plots = await getAllPlots();
  const scenarios = listScenarios(plots);

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

      <Suspense fallback={null}>
        <CatalogList plots={plots} scenarios={scenarios} />
      </Suspense>
    </>
  );
}
