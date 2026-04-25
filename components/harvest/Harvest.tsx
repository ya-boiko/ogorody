import Link from "next/link";

const GROUPS = [
  {
    title: "Овощи",
    chips: ["Помидоры", "Огурцы", "Перец", "Картошка", "Лук", "Чеснок", "Капуста", "Кабачки"],
  },
  {
    title: "Зелень и травы",
    chips: ["Укроп", "Петрушка", "Базилик", "Кинза", "Руккола", "Мята", "Салаты", "Щавель"],
  },
  {
    title: "Ягоды и фрукты",
    chips: [
      "Клубника",
      "Малина",
      "Смородина",
      "Крыжовник",
      "Ежевика",
      "Виноград",
      "Арбуз",
      "Дыня",
    ],
  },
  {
    title: "Цветы",
    chips: [
      "Розы",
      "Подсолнухи",
      "Пионы",
      "Лаванда",
      "Георгины",
      "Гортензии",
      "Космея",
      "Тюльпаны",
    ],
    accent: true,
  },
] as const;

export function Harvest() {
  return (
    <section className="harvest">
      <div className="wrap">
        <div className="grid">
          <div className="copy">
            <p className="kicker">Что можно вырастить</p>
            <h2 className="h-section">
              Свой&nbsp;огород&nbsp;— <em>что&nbsp;угодно</em>, от&nbsp;картошки
              до&nbsp;роз
            </h2>
            <p className="lede">
              Участок полностью ваш: овощи, зелень, ягоды, цветы. Агроном подскажет,
              что&nbsp;лучше приживётся.
            </p>
            <Link className="btn btn-ghost" href="/blog">
              Посмотреть сезонный календарь
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

          <div className="crops">
            {GROUPS.map((group) => (
              <div
                className={`crop-group${"accent" in group && group.accent ? " accent" : ""}`}
                key={group.title}
              >
                <h4>{group.title}</h4>
                <div className="chips">
                  {group.chips.map((chip) => (
                    <span className="chip-crop" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
