import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Помощь в уходе",
  description:
    "Три формата участия и разовые услуги: огород под ключ, команда помогает, сам себе агроном. Выбирайте, сколько работы делаете вы.",
};

const ARROW = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M1 7h12m0 0L8 2m5 5l-5 5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const FORMATS = [
  {
    badge: "Минимум работы",
    title: "Огород под ключ",
    body: "Вы только наслаждаетесь. Всё сажаем, поливаем, пропалываем и собираем мы. Вы приезжаете смотреть на растения и забираете готовый урожай.",
    price: "от 65 000 ₽",
    featured: true,
  },
  {
    badge: "Полусамостоятельно",
    title: "Команда помогает",
    body: "Команда берёт сложную работу — подготовку земли, посадку, подкормку, сбор. Вы делаете лёгкое: прополку, полив, осмотр. Получаете опыт без перегруза.",
    price: "от 39 000 ₽",
  },
  {
    badge: "Максимум контроля",
    title: "Сам себе агроном",
    body: "Вы полностью отвечаете за участок. Команда только консультирует — подскажет, когда и что делать. Подходит опытным садоводам или тем, кому интересно учиться.",
    price: "от 25 000 ₽",
  },
];

const SERVICE_GROUPS = [
  {
    title: "Разовые услуги",
    items: [
      "Подготовка земли — вспашка",
      "Посадка овощей — 200 ₽/час",
      "Прополка участка — 300 ₽/час",
      "Полив вручную — 200 ₽",
      "Сбор урожая — 150 ₽/час",
    ],
  },
  {
    title: "Регулярные услуги",
    items: [
      "Полный уход — договор на сезон",
      "Консультация агронома — 500 ₽",
      "Видеонаблюдение и уведомления",
      "Подготовка инвентаря к сезону",
    ],
  },
  {
    title: "Мониторинг и советы",
    items: [
      "Еженедельный осмотр растений",
      "Рекомендации по вредителям",
      "Расчёт полива по погоде",
      "Помощь с выбором сортов",
    ],
  },
] as const;

export default function CarePage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <Caret />
            <span className="current">Помощь в уходе</span>
          </nav>
          <h1 className="h-page">
            Помощь в&nbsp;<em>уходе</em>
          </h1>
          <p className="page-lede">
            Выбирайте, сколько работы делаете вы&nbsp;— остальное делает команда.
          </p>
        </div>
      </section>

      <section className="help-hero-section">
        <div className="wrap">
          <div className="layout">
            <Image
              className="hero-img"
              src="/assets/plots/family-1.jpg"
              alt="Семья на участке"
              width={900}
              height={600}
              priority
            />
            <div className="hero-info">
              <span className="help-tag">Гибкий формат</span>
              <h2>Вы&nbsp;сами решаете, сколько нужно помощи</h2>
              <p className="hero-lede">
                Каждый участник выбирает свой уровень участия&nbsp;— от&nbsp;полного
                делегирования до&nbsp;полной самостоятельности. Можно начать
                с&nbsp;одного формата и&nbsp;переходить между ними по&nbsp;мере опыта.
                Менять вариант можно прямо внутри сезона.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="formats-section">
        <div className="wrap">
          <div className="formats-header">
            <h2>Три формата участия</h2>
            <p>
              Выберите подходящий вариант&nbsp;— от&nbsp;полного делегирования
              до&nbsp;полной ответственности.
            </p>
          </div>

          <div className="formats-grid">
            {FORMATS.map((f) => (
              <article
                key={f.title}
                className={`format-card${f.featured ? " featured" : ""}`}
              >
                <span className="badge">{f.badge}</span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
                <div className="price">
                  {f.price} <small>/ сезон</small>
                </div>
                <Link href="/catalog" className="cta-link">
                  Смотреть участки
                  {ARROW}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-block">
        <div className="wrap">
          <h2>Что можно заказать дополнительно</h2>
          <p className="lede">
            Любую услугу можно подключить отдельно&nbsp;— разово или на&nbsp;весь
            сезон.
          </p>

          <div className="grid">
            {SERVICE_GROUPS.map((group) => (
              <div className="service-col" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="help-cta">
        <div className="wrap">
          <div className="layout">
            <h2>
              Приезжайте на&nbsp;просмотр&nbsp;— лучше один раз увидеть клуб
              на&nbsp;месте
            </h2>
            <p>
              Расскажем, какие форматы подходят для вашего опыта, покажем участки
              и&nbsp;познакомим с&nbsp;командой.
            </p>
            <div className="actions">
              <Link className="btn-light" href="/contacts">
                Записаться на&nbsp;просмотр
              </Link>
              <a className="btn-outline" href="tel:+78610000000">
                +7 861 000-00-00
              </a>
            </div>
            <div className="note">Открыто с&nbsp;8:00 до&nbsp;21:00 · Ежедневно</div>
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
