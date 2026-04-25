"use client";

import { useEffect } from "react";

/**
 * Fallback for errors thrown in the root layout itself.
 * Renders a complete <html>/<body> because the layout failed.
 * Keep styles inline — global CSS may not have loaded.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global-error.tsx]", error);
  }, [error]);

  return (
    <html lang="ru">
      <body
        style={{
          margin: 0,
          padding: "120px 24px",
          fontFamily: "system-ui, sans-serif",
          background: "#F6F4EC",
          color: "#0F2318",
          minHeight: "100vh",
        }}
      >
        <main
          style={{
            maxWidth: 720,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#B8704F",
            }}
          >
            500 · Критическая ошибка
          </span>
          <h1
            style={{
              fontWeight: 500,
              fontSize: 48,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#2D4A3A",
              margin: 0,
            }}
          >
            Сайт недоступен
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, margin: 0, maxWidth: "54ch" }}>
            Не получилось отрисовать страницу. Это редкая ситуация — мы&nbsp;уже
            знаем и&nbsp;разбираемся. Попробуйте обновить через минуту.
          </p>
          {error.digest && (
            <p
              style={{
                fontSize: 13,
                color: "#5A7362",
                fontFamily: "ui-monospace, monospace",
                margin: 0,
              }}
            >
              Код ошибки: {error.digest}
            </p>
          )}
          <div style={{ display: "flex", gap: 14, marginTop: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                background: "#B8704F",
                color: "#fff",
                border: 0,
                padding: "16px 26px",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Перезагрузить страницу
            </button>
            {/* Raw <a> on purpose: layout failed, next/link may not work here */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                background: "#2D4A3A",
                color: "#F6F4EC",
                padding: "16px 26px",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              На главную
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
