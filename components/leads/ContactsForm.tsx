"use client";

import { useState } from "react";
import { LeadSchema } from "@/lib/schemas";

type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function ContactsForm() {
  const [state, setState] = useState<FormState>({ kind: "idle" });
  const [fieldError, setFieldError] = useState<Record<string, string>>({});

  async function handleSubmit(formData: FormData) {
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      ...(email ? { email } : {}),
      ...(message ? { message } : {}),
      source: "contacts" as const,
    };

    const validation = LeadSchema.safeParse(payload);
    if (!validation.success) {
      const errs: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const key = issue.path[0]?.toString() ?? "form";
        errs[key] = humanise(key);
      }
      setFieldError(errs);
      return;
    }
    setFieldError({});
    setState({ kind: "submitting" });
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
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
      <div className="form-card" style={{ textAlign: "center" }}>
        <h2>Заявка отправлена</h2>
        <p className="lede">Мы свяжемся с вами в течение часа.</p>
      </div>
    );
  }

  return (
    <form
      className="form-card"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(new FormData(e.currentTarget));
      }}
    >
      <h2>Записаться на&nbsp;просмотр</h2>
      <p className="lede">
        Расскажите немного о&nbsp;себе&nbsp;— подберём участок и&nbsp;перезвоним
        в&nbsp;течение часа.
      </p>

      <div className="form-grid-2">
        <div className="form-row">
          <label htmlFor="contacts-name">Имя</label>
          <input
            id="contacts-name"
            name="name"
            type="text"
            placeholder="Как к вам обращаться"
            autoComplete="name"
            required
          />
          {fieldError["name"] && <ErrText text={fieldError["name"]} />}
        </div>
        <div className="form-row">
          <label htmlFor="contacts-phone">Телефон</label>
          <input
            id="contacts-phone"
            name="phone"
            type="tel"
            placeholder="+7 (___) ___-__-__"
            autoComplete="tel"
            required
          />
          {fieldError["phone"] && <ErrText text={fieldError["phone"]} />}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="contacts-email">Email</label>
        <input
          id="contacts-email"
          name="email"
          type="email"
          placeholder="hello@example.com"
          autoComplete="email"
        />
        {fieldError["email"] && <ErrText text={fieldError["email"]} />}
      </div>

      <div className="form-row">
        <label htmlFor="contacts-message">Сообщение</label>
        <textarea
          id="contacts-message"
          name="message"
          placeholder="Какой формат интересен, удобная дата, вопросы…"
          rows={4}
        />
        {fieldError["message"] && <ErrText text={fieldError["message"]} />}
      </div>

      <button type="submit" className="submit" disabled={state.kind === "submitting"}>
        {state.kind === "submitting" ? "Отправляем…" : "Отправить заявку"}
      </button>
      <p className="privacy">
        Нажимая «Отправить», вы&nbsp;соглашаетесь с&nbsp;политикой обработки персональных
        данных.
      </p>
      {state.kind === "error" && <ErrText text={`Ошибка: ${state.message}`} />}
    </form>
  );
}

function ErrText({ text }: { text: string }) {
  return <span style={{ color: "var(--accent)", fontSize: 13 }}>{text}</span>;
}

function humanise(field: string): string {
  switch (field) {
    case "name":
      return "Введите имя (минимум 2 символа).";
    case "phone":
      return "Введите телефон.";
    case "email":
      return "Введите корректный email.";
    case "message":
      return "Сообщение слишком длинное.";
    default:
      return "Проверьте поле.";
  }
}
