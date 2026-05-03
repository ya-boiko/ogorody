"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { asset } from "@/lib/asset";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO(backlog): wire to error reporter (Sentry / Yandex Metrica) once chosen
    console.error("[error.tsx]", error);
  }, [error]);

  return (
    <section className="error-page">
      <div className="wrap">
        <div className="layout">
          <div className="visual">
            <Image
              src={asset("/assets/plots/big-3.jpg")}
              alt=""
              width={900}
              height={675}
              priority
            />
            <div className="code-badge">500</div>
          </div>
          <div className="info">
            <span className="kicker">Что-то сломалось</span>
            <h1>
              Кажется, у&nbsp;нас&nbsp;<em>побило градом</em>
            </h1>
            <p className="lede">
              Сервер временно не&nbsp;отвечает. Наша команда уже разбирается.
              Попробуйте обновить страницу через несколько минут. Если
              не&nbsp;помогло&nbsp;— позвоните нам по&nbsp;номеру{" "}
              <strong>+7&nbsp;861&nbsp;000-00-00</strong>, мы&nbsp;ответим
              на&nbsp;все вопросы.
            </p>
            {error.digest && (
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  fontFamily: "ui-monospace, monospace",
                  margin: 0,
                }}
              >
                Код ошибки: {error.digest}
              </p>
            )}
            <div className="actions">
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => reset()}
              >
                Попробовать снова
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
              </button>
              <Link className="btn btn-ghost" href="/">
                На главную
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
