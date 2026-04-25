"use client";

import { useState } from "react";
import { submitLead } from "@/lib/lead-client";
import { LeadSchema } from "@/lib/schemas";

type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const VALID_CARE_FORMATS = ["self", "supported", "managed"] as const;

export function PlotInlineForm({ plotId }: { plotId: number }) {
  const [state, setState] = useState<FormState>({ kind: "idle" });
  const [fieldError, setFieldError] = useState<Record<string, string>>({});

  async function handleSubmit(formData: FormData) {
    const careFormatRaw = String(formData.get("careFormat") ?? "");
    const careFormat = VALID_CARE_FORMATS.includes(
      careFormatRaw as (typeof VALID_CARE_FORMATS)[number],
    )
      ? (careFormatRaw as (typeof VALID_CARE_FORMATS)[number])
      : undefined;

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      source: "plot" as const,
      plotId,
      ...(careFormat ? { careFormat } : {}),
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
      await submitLead(validation.data);
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
      <div className="form" style={{ textAlign: "center" }}>
        <p style={{ color: "var(--bg)", fontSize: 18, padding: "32px 0" }}>
          Заявка отправлена. Перезвоним в течение часа.
        </p>
      </div>
    );
  }

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(new FormData(e.currentTarget));
      }}
    >
      <div className="field-row">
        <div>
          <label htmlFor="plot-form-name">Имя</label>
          <input
            id="plot-form-name"
            name="name"
            type="text"
            placeholder="Ваше имя"
            autoComplete="name"
            required
          />
          {fieldError["name"] && <ErrText text={fieldError["name"]} />}
        </div>
        <div>
          <label htmlFor="plot-form-phone">Телефон</label>
          <input
            id="plot-form-phone"
            name="phone"
            type="tel"
            placeholder="+7 ___ ___‑__‑__"
            autoComplete="tel"
            required
          />
          {fieldError["phone"] && <ErrText text={fieldError["phone"]} />}
        </div>
      </div>
      <div>
        <label htmlFor="plot-form-care">Формат ухода</label>
        <select id="plot-form-care" name="careFormat" defaultValue="">
          <option value="">Выберите формат</option>
          <option value="self">Самостоятельно</option>
          <option value="supported">С подстраховкой</option>
          <option value="managed">С уходом от команды</option>
        </select>
      </div>
      <div className="submit-wrap">
        <button type="submit" disabled={state.kind === "submitting"}>
          {state.kind === "submitting" ? "Отправляем…" : "Записаться на просмотр"}
        </button>
        {state.kind === "error" && (
          <p style={{ color: "var(--accent)", marginTop: 8 }}>
            Не удалось отправить: {state.message}
          </p>
        )}
      </div>
    </form>
  );
}

function ErrText({ text }: { text: string }) {
  return <span style={{ color: "var(--accent)", fontSize: 12 }}>{text}</span>;
}

function humanise(field: string): string {
  switch (field) {
    case "name":
      return "Введите имя (минимум 2 символа).";
    case "phone":
      return "Введите телефон.";
    default:
      return "Проверьте поле.";
  }
}
