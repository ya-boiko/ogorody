import Link from "next/link";

export function Watch() {
  return (
    <section className="watch">
      <div className="wrap">
        <div className="grid">
          <div className="bubbles">
            <div className="bubble">
              <div className="who">Игорь · агроном</div>
              <p>
                Добрый день! На&nbsp;вашем участке томаты дали первую завязь, капусту
                чуть подъел крестоцветный блошняк. Обработать?
              </p>
              <span className="time">Сегодня, 09:12</span>
            </div>
            <div className="bubble you">
              <div className="who">Вы</div>
              <p>
                Обработайте, пожалуйста. И&nbsp;если рассада ещё есть&nbsp;— подсадите
                зелень.
              </p>
              <span className="time">09:15</span>
            </div>
            <div className="bubble has-img">
              <div
                className="img"
                style={{ backgroundImage: "url('/assets/hero.jpg')" }}
              />
              <div className="who" style={{ padding: "0 10px" }}>
                Игорь · агроном
              </div>
              <p>
                Готово. Завязи здоровые, обработку провели, укроп и&nbsp;петрушку
                подсадили в&nbsp;дальнем ряду.
              </p>
              <span className="time">11:48</span>
            </div>
            <div className="bubble you">
              <div className="who">Вы</div>
              <p>Спасибо! Приедем в&nbsp;субботу с&nbsp;детьми.</p>
              <span className="time">12:02</span>
            </div>
          </div>
          <div className="content">
            <p className="kicker">Мы всегда рядом</p>
            <h2 className="h-section">
              Мы&nbsp;следим за&nbsp;вашим участком, <em>даже когда&nbsp;вас нет</em>
            </h2>
            <p className="lede">
              Агрономы замечают всё сами: появились вредители, пересохла грядка,
              созрел первый урожай. Пишут в&nbsp;мессенджер, показывают фото,
              предлагают решение. Вы&nbsp;выбираете&nbsp;— сделать самим или попросить
              команду.
            </p>
            <ul>
              <li>Еженедельные обходы с&nbsp;фото-отчётом</li>
              <li>Видеонаблюдение 24/7, записи за&nbsp;30&nbsp;дней</li>
              <li>Одна группа в&nbsp;мессенджере: вы&nbsp;и&nbsp;ваш агроном</li>
              <li>Срочный выезд&nbsp;— за&nbsp;несколько часов</li>
            </ul>
            <Link className="btn btn-dark" href="/care">
              Как это работает
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
        </div>
      </div>
    </section>
  );
}
