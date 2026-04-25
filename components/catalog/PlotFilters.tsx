"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

const STATUS_OPTIONS = [
  { value: "", label: "Статус" },
  { value: "available", label: "Свободные" },
  { value: "booked", label: "Забронированные" },
  { value: "sold", label: "Занятые" },
] as const;

const AREA_OPTIONS = [
  { value: "", label: "Размер" },
  { value: "0-4", label: "До 4 соток" },
  { value: "5-7", label: "5–7 соток" },
  { value: "8+", label: "8+ соток" },
] as const;

const SORT_OPTIONS = [
  { value: "", label: "Сортировка" },
  { value: "price-asc", label: "По цене — возрастание" },
  { value: "price-desc", label: "По цене — убывание" },
  { value: "area-asc", label: "По размеру — возрастание" },
  { value: "area-desc", label: "По размеру — убывание" },
] as const;

export function PlotFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      const qs = next.toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [pathname, params, router],
  );

  return (
    <div className="row">
      <SelectFilter
        ariaLabel="Статус"
        options={STATUS_OPTIONS}
        value={params.get("status") ?? ""}
        onChange={(v) => update("status", v)}
      />
      <SelectFilter
        ariaLabel="Размер"
        options={AREA_OPTIONS}
        value={params.get("area") ?? ""}
        onChange={(v) => update("area", v)}
      />
      <SelectFilter
        ariaLabel="Сортировка"
        options={SORT_OPTIONS}
        value={params.get("sort") ?? ""}
        onChange={(v) => update("sort", v)}
      />
    </div>
  );
}

type SelectOption = { value: string; label: string };

function SelectFilter({
  ariaLabel,
  options,
  value,
  onChange,
}: {
  ariaLabel: string;
  options: readonly SelectOption[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="filter">
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <svg
        className="caret"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.5 4.5L6 8l3.5-3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
