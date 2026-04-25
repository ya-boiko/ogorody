export function Community() {
  return (
    <section className="community">
      <div className="wrap">
        <div className="head">
          <p className="kicker">Сообщество клуба</p>
          <h2 className="h-section">
            Вы&nbsp;попадаете в&nbsp;<em>сообщество огородников</em>
          </h2>
          <p className="lede">
            Чат клуба, встречи в&nbsp;шатре, обмен урожаем и&nbsp;советами.
          </p>
        </div>
        <div className="quilt">
          <div className="com-card">
            <span className="ico">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <h3>Общий чат в мессенджере</h3>
            <p>Спрашиваете совет, делитесь урожаем, договариваетесь встретиться.</p>
          </div>
          <div className="com-card">
            <span className="ico">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
            <h3>Встречи и&nbsp;ужины в&nbsp;шатре</h3>
            <p>
              Открытие сезона, сбор урожая, детские дни. Без обязательных мероприятий.
            </p>
          </div>
          <div className="com-card">
            <span className="ico">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
              </svg>
            </span>
            <h3>Обмен урожаем и&nbsp;рассадой</h3>
            <p>
              У&nbsp;одних&nbsp;— избыток кабачков, у&nbsp;других&nbsp;— редкая рассада.
              Внутренняя «доска» клуба работает весь сезон.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
