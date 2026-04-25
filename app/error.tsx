"use client";

import Link from "next/link";
import { useEffect } from "react";

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
    <section className="page-head">
      <div className="wrap">
        <p className="kicker">500 · Ошибка сервера</p>
        <h1 className="h-page">
          Что-то <em>пошло не так</em>
        </h1>
        <p className="page-lede">
          Сервер не смог обработать запрос. Попробуйте обновить страницу — если ошибка
          повторится, напишите нам, и&nbsp;мы&nbsp;разберёмся.
        </p>
        {error.digest && (
          <p
            style={{
              marginTop: 12,
              fontSize: 13,
              color: "var(--text-muted)",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            Код ошибки: {error.digest}
          </p>
        )}
        <div style={{ display: "flex", gap: 14, marginTop: 24, flexWrap: "wrap" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => reset()}
          >
            Попробовать снова
          </button>
          <Link className="btn btn-dark" href="/">
            На главную
          </Link>
          <Link className="btn btn-ghost" href="/contacts">
            Написать в поддержку
          </Link>
        </div>
      </div>
    </section>
  );
}
