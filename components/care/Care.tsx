import Link from "next/link";

export function Care() {
  return (
    <section className="care">
      <div className="wrap">
        <div className="head">
          <div>
            <p className="kicker">Помощь в уходе</p>
            <h2 className="h-section">
              Вы&nbsp;сами решаете, какой нужен <em>уход</em>
            </h2>
          </div>
          <p className="lede">
            База&nbsp;— одна, помощь&nbsp;— в&nbsp;любом объёме. Подключается
            и&nbsp;отключается в&nbsp;любой момент.
          </p>
        </div>

        <div className="cards">
          <div className="care-card">
            <span className="role">Паттерн 01</span>
            <h3>Приезжаю сам</h3>
            <p>Всё делаете своими руками. Команда следит общо.</p>
            <ul>
              <li>Базовый мониторинг включён</li>
              <li>Инструменты и&nbsp;вода</li>
              <li>Советы агронома при&nbsp;вопросах</li>
            </ul>
            <div className="price">
              <b>3&nbsp;000&nbsp;₽</b>
              <span>сотка / мес, только аренда</span>
            </div>
          </div>

          <div className="care-card featured">
            <span className="role">Паттерн 02 · популярно</span>
            <h3>Помогают регулярно</h3>
            <p>
              База плюс подписка на&nbsp;регулярные работы: полив по&nbsp;расписанию,
              еженедельный обход с&nbsp;отчётом, разовые услуги по&nbsp;запросу.
            </p>
            <ul>
              <li>Полив по&nbsp;расписанию</li>
              <li>Еженедельный обход и&nbsp;отчёт</li>
              <li>Разовые выезды со&nbsp;скидкой</li>
            </ul>
            <div className="price">
              <b>+2&nbsp;500&nbsp;₽</b>
              <span>сотка / мес, сверху аренды</span>
            </div>
          </div>

          <div className="care-card">
            <span className="role">Паттерн 03</span>
            <h3>Ведут участок за&nbsp;меня</h3>
            <p>
              Полный цикл: посадка, уход, подкормка, сбор. Вы&nbsp;приезжаете
              за&nbsp;урожаем.
            </p>
            <ul>
              <li>Полный цикл работ</li>
              <li>Еженедельные отчёты и&nbsp;фото</li>
              <li>Сбор и&nbsp;упаковка урожая</li>
            </ul>
            <div className="price">
              <b>+6&nbsp;000&nbsp;₽</b>
              <span>сотка / мес, полное ведение</span>
            </div>
          </div>
        </div>

        <p className="foot-note">
          Цены на&nbsp;разовые услуги и&nbsp;детали&nbsp;—{" "}
          <Link href="/care">на&nbsp;странице «Помощь в&nbsp;уходе»</Link>
        </p>
      </div>
    </section>
  );
}
