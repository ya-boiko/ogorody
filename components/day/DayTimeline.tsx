export function DayTimeline() {
  return (
    <section className="day">
      <div className="wrap">
        <div className="head">
          <div>
            <p className="kicker">Ваш выходной</p>
            <h2 className="h-display">
              Приезжаете за&nbsp;урожаем, <em>а&nbsp;не&nbsp;за&nbsp;работой</em>
            </h2>
          </div>
        </div>

        <div className="timeline">
          <div className="node">
            <div className="hour">
              <span className="dot" />
              09:30
            </div>
            <h3>Приехали на&nbsp;участок</h3>
            <p>
              Грядки уже политы и&nbsp;прополоты. Берёте инструменты в&nbsp;шатре&nbsp;—
              или идёте налегке.
            </p>
            <span className="tag-small">Без подготовки</span>
          </div>
          <div className="node">
            <div className="hour">
              <span className="dot" />
              10:30
            </div>
            <h3>Занимаетесь огородом</h3>
            <p>Сажаете, собираете, наблюдаете. Столько, сколько хочется.</p>
            <span className="tag-small">По&nbsp;настроению</span>
          </div>
          <div className="node accent">
            <div className="hour">
              <span className="dot" />
              12:30
            </div>
            <h3>Обед и&nbsp;речка</h3>
            <p>
              Шатёр с&nbsp;мангалом, детская площадка, спуск к&nbsp;воде. Соседи
              по&nbsp;клубу&nbsp;— такие&nbsp;же горожане.
            </p>
            <span className="tag-small">Семейное время</span>
          </div>
          <div className="node">
            <div className="hour">
              <span className="dot" />
              15:00
            </div>
            <h3>Увозите урожай</h3>
            <p>Собранное упакуют, если попросите. Дома&nbsp;через 25&nbsp;минут.</p>
            <span className="tag-small">Домой</span>
          </div>
        </div>
      </div>
    </section>
  );
}
