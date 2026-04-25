const MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
] as const;

/** Format an ISO date (YYYY-MM-DD) as Russian "D месяца YYYY". */
export function formatRuDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return iso;
  const [, y, mm, d] = m;
  const monthIdx = Number(mm) - 1;
  const monthLabel = MONTHS[monthIdx] ?? mm;
  return `${Number(d)} ${monthLabel} ${y}`;
}
