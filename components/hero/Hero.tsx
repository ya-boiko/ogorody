import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <Image
          src={asset("/assets/hero.jpg")}
          alt="Огороды — поле и закат"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="hero-scrim" aria-hidden="true" />
      <div className="wrap">
        <div className="hero-content">
          <p className="kicker">Краснодарский край · Сезон 2026</p>
          <h1>
            Свой урожай.
            <br />
            Без&nbsp;<em>дачной&nbsp;рутины</em>.
          </h1>
          <p className="lede">
            Берёте готовый участок от&nbsp;3&nbsp;соток. Помощь команды&nbsp;— в&nbsp;любом
            объёме. Приезжаете за&nbsp;урожаем, а&nbsp;не&nbsp;за&nbsp;работой.
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
            <Link className="btn btn-ghost-light" href="/catalog">
              Подобрать участок
            </Link>
          </div>
          <div className="facts">
            <div className="fact">
              <b>3&nbsp;000&nbsp;₽</b>
              <span>за сотку в месяц</span>
            </div>
            <div className="fact">
              <b>25&nbsp;мин</b>
              <span>от центра Краснодара</span>
            </div>
            <div className="fact">
              <b>от&nbsp;3&nbsp;соток</b>
              <span>минимальный участок</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
