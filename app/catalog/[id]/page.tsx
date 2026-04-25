import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlotCard } from "@/components/catalog/PlotCard";
import { PlotGallery } from "@/components/catalog/PlotGallery";
import { PlotInlineForm } from "@/components/catalog/PlotInlineForm";
import { PlotSpecs } from "@/components/catalog/PlotSpecs";
import { PlotWhyTiles } from "@/components/catalog/PlotWhyTiles";
import { getAllPlots, getPlotById } from "@/lib/plots";
import type { Plot } from "@/lib/types";

const STATUS_LABEL = {
  available: { label: "Свободен", className: "free" },
  booked: { label: "Забронирован", className: "busy" },
  sold: { label: "Занят", className: "busy" },
} as const;

const formatPrice = (n: number) => `${new Intl.NumberFormat("ru-RU").format(n)} ₽`;

const formatArea = (n: number) => {
  const lastTwo = n % 100;
  const last = n % 10;
  let unit = "соток";
  if (lastTwo < 11 || lastTwo > 14) {
    if (last === 1) unit = "сотка";
    else if (last >= 2 && last <= 4) unit = "сотки";
  }
  return `${n} ${unit}`;
};

export async function generateStaticParams() {
  const plots = await getAllPlots();
  return plots.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const plot = await getPlotById(Number(id));
  if (!plot) return { title: "Участок не найден" };
  return {
    title: plot.title,
    description: plot.description.slice(0, 160),
    openGraph: {
      title: plot.title,
      description: plot.description.slice(0, 160),
      images: plot.photos[0] ? [{ url: plot.photos[0] }] : undefined,
    },
  };
}

export default async function PlotPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isInteger(numId) || numId <= 0) notFound();

  const plot = await getPlotById(numId);
  if (!plot) notFound();

  const all = await getAllPlots();
  const similar = all.filter((p) => p.id !== plot.id).slice(0, 3);

  const status = STATUS_LABEL[plot.status];

  return (
    <>
      <section
        className="page-head"
        style={{ padding: "28px 0 0", border: 0, background: "var(--bg)" }}
      >
        <div className="wrap">
          <nav className="crumbs" aria-label="Хлебные крошки" style={{ margin: 0 }}>
            <Link href="/">Главная</Link>
            <Caret />
            <Link href="/catalog">Участки</Link>
            <Caret />
            <span className="current">
              {plot.title} · {formatArea(plot.area)}
            </span>
          </nav>
        </div>
      </section>

      <section className="plot-hero">
        <div className="wrap">
          <div className="layout">
            <PlotGallery photos={plot.photos} alt={plot.title} />

            <div className="plot-info">
              <h1>
                {plot.title}
                <span className={`badge ${status.className}`}>{status.label}</span>
              </h1>

              <ul className="info-rows">
                <li>
                  <span className="label">Формат</span>
                  <span className="value">{formatArea(plot.area)}</span>
                </li>
                <li>
                  <span className="label">Расположение</span>
                  <span className="value">{plot.location}</span>
                </li>
                {plot.features[0] && (
                  <li>
                    <span className="label">Особенность</span>
                    <span className="value">{plot.features[0]}</span>
                  </li>
                )}
                <li>
                  <span className="label">Старт сезона</span>
                  <span className="value">С&nbsp;1&nbsp;апреля 2026</span>
                </li>
              </ul>

              <p className="price-big">
                от&nbsp;{formatPrice(plot.pricePerMonth)} <span>/&nbsp;мес</span>
              </p>
              <Link className="btn-big" href="/contacts">
                Записаться на просмотр
                <svg
                  className="arrow"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 7h12m0 0L8 2m5 5l-5 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="plot-why">
        <div className="wrap">
          <div className="why-head">
            <h2>Почему этот участок удобен</h2>
            <p className="why-lede">{plot.description}</p>
          </div>

          <PlotWhyTiles />

          <PlotSpecs />

          {plot.features.length > 0 && (
            <div className="included">
              <div className="included-head">
                <h2>Что включено в&nbsp;цену</h2>
                <p>Без скрытых платежей&nbsp;— всё, что нужно для&nbsp;сезона, уже в&nbsp;аренде.</p>
              </div>
              <ul className="included-list">
                {plot.features.map((f) => (
                  <li key={f}>
                    <span className="check">
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                          d="M3 8.5l3.5 3.5L13 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="plot-form">
        <div className="wrap">
          <h2>
            Посмотреть участок и&nbsp;выбрать
            <br />
            формат ухода
          </h2>
          <PlotInlineForm plotId={plot.id} />
        </div>
      </section>

      {similar.length > 0 && (
        <section className="similar">
          <div className="wrap">
            <h2>Похожие сценарии</h2>
            <div className="grid">
              {similar.map((p: Plot) => (
                <PlotCard key={p.id} plot={p} />
              ))}
            </div>
          </div>
        </section>
      )}
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
