"use client";

import { useState } from "react";
import { submitLead } from "@/lib/lead-client";
import { LeadSchema } from "@/lib/schemas";
import type { LeadSource } from "@/lib/types";

type LeadFormProps = {
  source: LeadSource;
  plotId?: number;
  variant?: "inline" | "stacked";
};

type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function LeadForm({ source, plotId, variant = "stacked" }: LeadFormProps) {
  const [state, setState] = useState<FormState>({ kind: "idle" });
  const [fieldError, setFieldError] = useState<Record<string, string>>({});

  async function handleSubmit(formData: FormData) {
    const message = String(formData.get("message") ?? "").trim();
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      ...(message ? { message } : {}),
      source,
      ...(plotId !== undefined ? { plotId } : {}),
    };

    const validation = LeadSchema.safeParse(payload);
    if (!validation.success) {
      const errs: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const key = issue.path[0]?.toString() ?? "form";
        errs[key] = humanizeError(key);
      }
      setFieldError(errs);
      return;
    }
    setFieldError({});
    setState({ kind: "submitting" });

    try {
      await submitLead(validation.data);
      setState({ kind: "success" });
    } catch (err) {
      setState({
        kind: "error",
        message:
          err instanceof Error
            ? `Не удалось отправить заявку: ${err.message}`
            : "Не удалось отправить заявку.",
      });
    }
  }

  if (state.kind === "success") {
    return (
      <div className={`lead-form lead-form-success lead-form-${variant}`}>
        <h3>Заявка отправлена</h3>
        <p>Мы свяжемся с вами в течение рабочего дня.</p>
      </div>
    );
  }

  return (
    <form
      className={`lead-form lead-form-${variant}`}
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(new FormData(e.currentTarget));
      }}
    >
      <div className="lead-form-fields">
        <label className="lead-field">
          <span>Имя</span>
          <input name="name" type="text" autoComplete="name" placeholder="Ваше имя" required />
          {fieldError["name"] && <span className="lead-error">{fieldError["name"]}</span>}
        </label>
        <label className="lead-field">
          <span>Телефон</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+7 ___ ___‑__‑__"
            required
          />
          {fieldError["phone"] && <span className="lead-error">{fieldError["phone"]}</span>}
        </label>
      </div>
      <label className="lead-field">
        <span>Сообщение (необязательно)</span>
        <textarea name="message" rows={3} placeholder="Когда удобно показать участок?" />
        {fieldError["message"] && <span className="lead-error">{fieldError["message"]}</span>}
      </label>
      <div className="lead-form-submit">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={state.kind === "submitting"}
        >
          {state.kind === "submitting" ? "Отправляем…" : "Записаться на просмотр"}
          {state.kind !== "submitting" && (
            <svg
              className="arrow"
              viewBox="0 0 14 14"
              fill="none"
              width="14"
              height="14"
              aria-hidden="true"
            >
              <path
                d="M1 7h12m0 0L8 2m5 5l-5 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
        {state.kind === "error" && <p className="lead-error">{state.message}</p>}
      </div>
    </form>
  );
}

function humanizeError(field: string): string {
  switch (field) {
    case "name":
      return "Введите имя (минимум 2 символа).";
    case "phone":
      return "Введите телефон, например +7 861 000 00 00.";
    case "message":
      return "Сообщение слишком длинное.";
    default:
      return "Проверьте поле.";
  }
}
