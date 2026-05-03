import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="error-page">
      <div className="wrap">
        <div className="layout">
          <div className="visual">
            <Image
              src={asset("/assets/plots/start-1.jpg")}
              alt=""
              width={900}
              height={675}
              priority
            />
            <div className="code-badge">404</div>
          </div>
          <div className="info">
            <span className="kicker">Страница не найдена</span>
            <h1>
              Кажется, эта&nbsp;грядка ещё&nbsp;<em>не выросла</em>
            </h1>
            <p className="lede">
              Возможно, ссылка устарела или мы&nbsp;ещё не&nbsp;посадили здесь нужную
              страницу. Не&nbsp;переживайте&nbsp;— на&nbsp;главной всё на&nbsp;своих
              местах.
            </p>
            <div className="actions">
              <Link className="btn btn-dark" href="/">
                Вернуться на главную
                <svg
                  className="arrow"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 7h12m0 0L8 2m5 5l-5 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>
            </div>
            <div className="links">
              <span>Может пригодиться:</span>
              <Link href="/catalog">Каталог участков</Link>
              <Link href="/care">Помощь в уходе</Link>
              <Link href="/about">О проекте</Link>
              <Link href="/contacts">Контакты</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
