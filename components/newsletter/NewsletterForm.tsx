"use client";

import { useState } from "react";

type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function NewsletterForm({ source }: { source: "blog" | "news" }) {
  const [state, setState] = useState<FormState>({ kind: "idle" });
  const [email, setEmail] = useState("");

  async function handleSubmit() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState({ kind: "error", message: "Введите корректный email." });
      return;
    }
    setState({ kind: "submitting" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState({ kind: "success" });
    } catch (err) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "Ошибка отправки",
      });
    }
  }

  if (state.kind === "success") {
    return (
      <p style={{ color: "var(--primary)", margin: "16px 0" }}>
        Спасибо! Подписка оформлена.
      </p>
    );
  }

  return (
    <>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          void handleSubmit();
        }}
      >
        <label htmlFor={`nl-${source}`} style={{ position: "absolute", left: -9999 }}>
          Email
        </label>
        <input
          id={`nl-${source}`}
          type="email"
          placeholder="Ваш email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={state.kind === "submitting"}>
          {state.kind === "submitting" ? "Отправляем…" : "Подписаться"}
        </button>
      </form>
      <div className="nl-note">
        Нажимая кнопку, вы&nbsp;соглашаетесь с&nbsp;политикой конфиденциальности.
      </div>
      {state.kind === "error" && (
        <p style={{ color: "var(--accent)", marginTop: 8 }}>{state.message}</p>
      )}
    </>
  );
}
