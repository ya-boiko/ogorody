import Link from "next/link";
import { getAllPlots } from "@/lib/plots";

const STATUS_LABEL = {
  available: "Свободно",
  booked: "Бронь",
  sold: "Продано",
} as const;

const formatPrice = (n: number) =>
  `${new Intl.NumberFormat("ru-RU").format(Math.round(n / 3))} ₽`;

export async function PlotsPreview() {
  const all = await getAllPlots();
  const featured = all.filter((p) => p.status === "available").slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section className="plots">
      <div className="wrap">
        <div className="head">
          <div>
            <p className="kicker">Каталог</p>
            <h2 className="h-section">Выберите участок по&nbsp;сценарию</h2>
          </div>
          <Link className="btn btn-ghost" href="/catalog">
            Все {all.length}&nbsp;{plotWordForm(all.length)}
            <svg className="arrow" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M1 7h12m0 0L8 2m5 5l-5 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </div>

        <div className="cards">
          {featured.map((p) => (
            <Link className="plot" key={p.id} href={`/catalog/${p.id}`}>
              <div className="ph" style={{ backgroundImage: `url('${p.photos[0]}')` }}>
                <span className="corner">{STATUS_LABEL[p.status]}</span>
              </div>
              <div className="body">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="meta">
                  <span>
                    <b>{p.area} соток</b>
                    {p.location.split(",").pop()?.trim()}
                  </span>
                  <span>
                    <b>{formatPrice(p.pricePerMonth)}</b>/ месяц
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function plotWordForm(n: number): string {
  const lastTwo = n % 100;
  const last = n % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return "участков";
  if (last === 1) return "участок";
  if (last >= 2 && last <= 4) return "участка";
  return "участков";
}
