import Image from "next/image";
import Link from "next/link";
import type { Plot } from "@/lib/types";

const STATUS_LABEL = {
  available: { label: "Свободен", className: "free" },
  booked: { label: "Бронь", className: "busy" },
  sold: { label: "Занят", className: "busy" },
} as const;

const formatPrice = (n: number) =>
  `${new Intl.NumberFormat("ru-RU").format(n)} ₽`;

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

export function PlotCard({ plot }: { plot: Plot }) {
  const status = STATUS_LABEL[plot.status];
  const cover = plot.photos[0];
  const ctaLabel = plot.status === "available" ? "Посмотреть формат" : "Оставить интерес";

  return (
    <Link className="plot-card" href={`/catalog/${plot.id}`}>
      <div className="media">
        {cover && (
          <Image
            src={cover}
            alt={plot.title}
            width={600}
            height={420}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
      </div>
      <div className="body">
        <div className="title-row">
          <h3>{plot.title}</h3>
          <span className={`badge ${status.className}`}>{status.label}</span>
        </div>
        <div className="meta">
          <span>{formatArea(plot.area)}</span>
          <span className="dot" />
          <span>{plot.headline}</span>
        </div>
        <span className="scenario-tag">{plot.scenario}</span>
        <p className="price">
          от&nbsp;{formatPrice(plot.pricePerMonth)} <span>/&nbsp;мес</span>
        </p>
        <span className="cta">{ctaLabel}</span>
      </div>
    </Link>
  );
}
