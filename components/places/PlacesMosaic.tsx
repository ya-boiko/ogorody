type Place = {
  size: "p-hero" | "p-md" | "p-sm";
  image: string;
  title: string;
  note: string;
  badge?: string;
};

const PLACES: Place[] = [
  { size: "p-hero", image: "/assets/hero.jpg", title: "Шатёр и общая кухня", note: "Открыт круглый год", badge: "Центр клуба" },
  { size: "p-sm", image: "/assets/plots/first-1.jpg", title: "Грядки", note: "3–12 соток" },
  { size: "p-sm", image: "/assets/plots/family-1.jpg", title: "Спуск к речке", note: "5 минут пешком" },
  { size: "p-sm", image: "/assets/plots/third-1.jpg", title: "Сад и деревья", note: "Тень летом" },
  { size: "p-sm", image: "/assets/plots/start-1.jpg", title: "Инструменты", note: "В аренде" },
  { size: "p-md", image: "/assets/plots/big-1.jpg", title: "Площадка и газоны", note: "Безопасно", badge: "Для детей" },
  { size: "p-md", image: "/assets/plots/calm-1.jpg", title: "Парковка", note: "У ворот" },
  { size: "p-md", image: "/assets/plots/first-2.jpg", title: "Тенистые аллеи", note: "Прогулки" },
];

export function PlacesMosaic() {
  return (
    <section className="places">
      <div className="wrap">
        <div className="head">
          <div>
            <p className="kicker on-dark">Клуб и инфраструктура</p>
            <h2 className="h-display on-dark">
              Места, куда&nbsp;хочется <em>возвращаться</em>
            </h2>
          </div>
          <div>
            <p>
              Территория клуба&nbsp;— общий шатёр, речка, детская площадка, парковка
              и&nbsp;склад с&nbsp;инструментом. Вы&nbsp;попадаете в&nbsp;сообщество
              таких&nbsp;же горожан.
            </p>
          </div>
        </div>

        <div className="mosaic">
          {PLACES.map((p) => (
            <div className={`place ${p.size}`} key={`${p.title}-${p.image}`}>
              <div className="ph" style={{ backgroundImage: `url('${p.image}')` }} />
              {p.badge && <span className="badge">{p.badge}</span>}
              <div className="caption">
                <h3>{p.title}</h3>
                <span className="note">{p.note}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="places-foot">
          <p className="note">
            Это ваш выходной&nbsp;— не&nbsp;работа. Мы&nbsp;собрали всё, чтобы приезд
            на&nbsp;участок занимал минимум усилий и&nbsp;давал максимум природы.
          </p>
          <div className="stat">
            <b>14&nbsp;га</b>
            <span>общая территория клуба</span>
          </div>
          <div className="stat">
            <b>25&nbsp;мин</b>
            <span>от центра Краснодара</span>
          </div>
          <div className="stat">
            <b>24/7</b>
            <span>видеонаблюдение</span>
          </div>
        </div>
      </div>
    </section>
  );
}
