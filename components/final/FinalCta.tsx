import Link from "next/link";

export function FinalCta() {
  return (
    <section className="final">
      <div className="wrap">
        <div className="grid">
          <div>
            <h2>
              Лучше один раз&nbsp;— <em>увидеть клуб на&nbsp;месте</em>
            </h2>
            <p>
              Бесплатная экскурсия занимает около часа. Покажем участки, шатёр, речку,
              познакомим с&nbsp;командой.
            </p>
            <div className="ctas">
              <Link className="btn btn-primary" href="/contacts">
                Записаться на просмотр
                <svg className="arrow" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M1 7h12m0 0L8 2m5 5l-5 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>
              <a className="btn btn-ghost" href="tel:+78610000000">
                Позвонить
              </a>
            </div>
          </div>
          <div className="side">
            <div className="item">
              <b>Где</b>
              <span>Краснодарский край, 25&nbsp;мин от&nbsp;центра Краснодара</span>
            </div>
            <div className="item">
              <b>Когда</b>
              <span>Пн–Вс, 09:00–19:00</span>
            </div>
            <div className="item">
              <b>Телефон</b>
              <span>+7 861 000‑00‑00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
