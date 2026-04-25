"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

const AREA_OPTIONS = [
  { value: "", label: "Размер" },
  { value: "3", label: "3 сотки" },
  { value: "4", label: "4 сотки" },
  { value: "5", label: "5 соток" },
  { value: "6", label: "6 соток" },
  { value: "8+", label: "8+ соток" },
] as const;

const SORT_OPTIONS = [
  { value: "", label: "Сортировка" },
  { value: "price-asc", label: "По цене — возрастание" },
  { value: "price-desc", label: "По цене — убывание" },
  { value: "area-asc", label: "По размеру — возрастание" },
  { value: "area-desc", label: "По размеру — убывание" },
] as const;

type SelectOption = { value: string; label: string };

type PlotFiltersProps = {
  scenarios: string[];
};

export function PlotFilters({ scenarios }: PlotFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const writeParams = useCallback(
    (next: URLSearchParams) => {
      const qs = next.toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [pathname, router],
  );

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      writeParams(next);
    },
    [params, writeParams],
  );

  // Search input is initialised from the URL once; subsequent typing is
  // debounced and pushed back to the URL. We don't sync URL → state, because
  // the input is the only writer for ?q= on this page.
  const [query, setQuery] = useState(() => params.get("q") ?? "");
  const debounceRef = useRef<number | null>(null);

  const onSearchChange = useCallback(
    (value: string) => {
      setQuery(value);
      if (debounceRef.current !== null) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        const next = new URLSearchParams(params.toString());
        if (value) next.set("q", value);
        else next.delete("q");
        writeParams(next);
      }, 250);
    },
    [params, writeParams],
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current !== null) window.clearTimeout(debounceRef.current);
    };
  }, []);

  const scenarioOptions: SelectOption[] = [
    { value: "", label: "Сценарий" },
    ...scenarios.map((s) => ({ value: s, label: s })),
  ];

  return (
    <div className="row">
      <SelectFilter
        ariaLabel="Сценарий"
        options={scenarioOptions}
        value={params.get("scenario") ?? ""}
        onChange={(v) => update("scenario", v)}
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
      <div className="filter search">
        <svg
          className="magnifier"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          aria-label="Поиск по формату"
          placeholder="Поиск по формату…"
          value={query}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}

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
      <select aria-label={ariaLabel} value={value} onChange={(e) => onChange(e.target.value)}>
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
