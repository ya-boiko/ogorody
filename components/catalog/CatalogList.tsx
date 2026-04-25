"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { PlotCard } from "@/components/catalog/PlotCard";
import { PlotFilters } from "@/components/catalog/PlotFilters";
import { filterAndSort, type CatalogParams } from "@/lib/filter-plots";
import type { Plot } from "@/lib/types";

type CatalogListProps = {
  plots: Plot[];
  scenarios: string[];
};

export function CatalogList({ plots, scenarios }: CatalogListProps) {
  const params = useSearchParams();

  const visible = useMemo(() => {
    const catalogParams: CatalogParams = {
      scenario: params.get("scenario") ?? undefined,
      area: params.get("area") ?? undefined,
      sort: params.get("sort") ?? undefined,
      q: params.get("q") ?? undefined,
    };
    return filterAndSort(plots, catalogParams);
  }, [plots, params]);

  return (
    <>
      <section className="filters">
        <div className="wrap">
          <PlotFilters scenarios={scenarios} />
        </div>
      </section>

      <section className="catalog">
        <div className="wrap">
          {visible.length === 0 ? (
            <p style={{ padding: "32px 0", color: "var(--text-muted)" }}>
              Под выбранные фильтры участков пока нет — попробуйте изменить параметры.
            </p>
          ) : (
            <div className="grid">
              {visible.map((plot) => (
                <PlotCard key={plot.id} plot={plot} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
