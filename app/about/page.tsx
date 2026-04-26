import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { getPageSeo, seoToMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return seoToMetadata(await getPageSeo("about"));
}

const VALUES = [
  {
    num: "01",
    title: "Без дачной рутины",
    body: "Земля готовая, полив настроенный, инструменты под рукой. Вы приезжаете за урожаем и удовольствием — не на работу.",
  },
  {
    num: "02",
    title: "Команда на участке",
    body: "Агрономы консультируют бесплатно, помогают с ошибками и подсказывают сроки. Как личный фермер — но с опытом и вниманием к каждому.",
  },
  {
    num: "03",
    title: "Рядом с городом",
    body: "25 минут от центра Краснодара. Можно приехать на выходной как в парк — отдохнуть, поработать руками и уехать с урожаем.",
  },
];

const STATS = [
  {
    num: "120+",
    title: "Семей участвуют в сезоне",
    body: "От новичков, которые впервые сажают картошку, до опытных дачников, которые ищут свежие идеи.",
  },
  {
    num: "28",
    title: "Участков от 3 до 8 соток",
    body: "Все на одном клубе с полями, теплицами, уютной беседкой и парковкой.",
  },
  {
    num: "6",
    title: "Теплиц и стеклянных домиков",
    body: "Помидоры, огурцы, перец, баклажаны и редкие сорта. Тепло, влажно, в марте уже сажаем.",
  },
];

const TEAM = [
  {
    initials: "ИС",
    name: "Иван Сычёв",
    role: "Главный агроном",
    body: "8 лет опыта в коммерческом земледелии. Отвечает за эксперименты с новыми сортами и обучение участников.",
  },
  {
    initials: "МХ",
    name: "Мария Холодова",
    role: "Агроном по теплицам",
    body: "Внедряет капельный полив, климат-контроль и автоматизацию. Видит каждый куст помидора и помогает ему вырасти.",
  },
  {
    initials: "ПС",
    name: "Пётр Сивцов",
    role: "Агроном по открытому грунту",
    body: "Специалист по картофелю, моркови и озимым культурам. Любит делиться опытом с участниками напрямую.",
  },
  {
    initials: "ВИ",
    name: "Виктория Ильина",
    role: "Менеджер участников",
    body: "Помогает выбрать участок, формат и отвечает на все вопросы. Первое лицо, которое видит клиент на экскурсии.",
  },
];

const GALLERY = [
  "/assets/plots/first-1.jpg",
  "/assets/plots/calm-1.jpg",
  "/assets/plots/start-1.jpg",
  "/assets/plots/third-1.jpg",
  "/assets/plots/big-2.jpg",
];

export default function AboutPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <Caret />
            <span className="current">О проекте</span>
          </nav>
          <h1 className="h-page">
            Почему появились&nbsp;<em>Огороды</em>
          </h1>
          <p className="page-lede">
            Загородный сервис нового формата&nbsp;— без дачной рутины, но&nbsp;со&nbsp;своим
            урожаем.
          </p>
        </div>
      </section>

      <section className="about-hero-section">
        <div className="wrap">
          <div className="layout">
            <Image
              className="hero-img"
              src={asset("/assets/plots/big-1.jpg")}
              alt="Участок"
              width={900}
              height={600}
              priority
            />
            <div className="hero-info">
              <span className="about-tag">Идея проекта</span>
              <h2>Своя земля без&nbsp;дачной рутины</h2>
              <p className="hero-lede">
                В&nbsp;2020&nbsp;году мы&nbsp;услышали, что городские люди хотят
                выращивать овощи, но&nbsp;без дачной рутины. И&nbsp;создали формат, где
                участки готовые, команда рядом, а&nbsp;вы&nbsp;просто приезжаете отдохнуть
                и&nbsp;собрать свой урожай.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="values-block">
        <div className="wrap">
          <h2>Три принципа, на&nbsp;которых всё держится</h2>
          <div className="values-grid">
            {VALUES.map((v) => (
              <div className="value-card" key={v.num}>
                <span className="num">{v.num}</span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-block">
        <div className="wrap">
          <div className="layout">
            <div className="text">
              <h2>Клуб в&nbsp;цифрах</h2>
              <p>
                Шесть лет работы, своя инфраструктура и&nbsp;десятки семей, которые
                возвращаются каждый сезон.
              </p>
              <div className="stats-list">
                {STATS.map((s) => (
                  <div className="stat-item" key={s.num}>
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-text">
                      <strong>{s.title}</strong>
                      <p>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Image
              className="stats-image"
              src={asset("/assets/plots/family-2.jpg")}
              alt="Семья на участке"
              width={900}
              height={600}
            />
          </div>
        </div>
      </section>

      <section className="team-block">
        <div className="wrap">
          <h2>Команда, которая делает сезон</h2>
          <p className="lede">
            Пять агрономов, один менеджер и&nbsp;парк из&nbsp;шести теплиц&nbsp;— чтобы
            участники просто приезжали и&nbsp;наслаждались результатом.
          </p>

          <div className="team-grid">
            {TEAM.map((m) => (
              <div className="team-card" key={m.name}>
                <div className="avatar">{m.initials}</div>
                <div className="info">
                  <h3>{m.name}</h3>
                  <span className="role">{m.role}</span>
                  <p>{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-block">
        <div className="wrap">
          <h2>Как выглядит пространство</h2>
          <div className="gallery-grid">
            {GALLERY.map((src, i) => (
              <Image
                key={src}
                src={asset(src)}
                alt={`Пространство клуба — ${i + 1}`}
                width={600}
                height={420}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="wrap">
          <div className="layout">
            <h2>Лучше познакомиться с&nbsp;проектом вживую</h2>
            <p>
              Приезжайте на&nbsp;экскурсию, посмотрите участки, поговорите
              с&nbsp;командой и&nbsp;другими участниками&nbsp;— почувствуйте, что это
              не&nbsp;дача, а&nbsp;выходные с&nbsp;урожаем.
            </p>
            <Link href="/contacts" className="btn-light" style={{ display: "inline-block" }}>
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
