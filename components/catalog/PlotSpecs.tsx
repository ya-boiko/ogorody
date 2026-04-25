type Spec = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

export const DEFAULT_SPECS: Spec[] = [
  {
    icon: (
      <path
        d="M4 20h16M4 4h16M4 4v16M20 4v16M9 9h6v6H9z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    ),
    label: "Размер",
    value: "Удобно делить между участниками",
  },
  {
    icon: (
      <path
        d="M3 18h18M5 18c0-3 2-5 4-5s2 2 4 2 3-3 5-3 3 2 3 6M7 11c0-1 1-2 2-2M14 8c0-1 1-2 2-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    ),
    label: "Почва",
    value: "Плодородная и подготовленная к сезону",
  },
  {
    icon: (
      <>
        <path
          d="M12 3c-4 5-6 8-6 11a6 6 0 0012 0c0-3-2-6-6-11z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M10 14a3 3 0 002 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    ),
    label: "Полив",
    value: "Капельный полив уже настроен",
  },
  {
    icon: (
      <path
        d="M14 4l6 6-4 4-6-6 4-4zM10 8l-6 6 4 4 6-6M6 18l-2 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    label: "Инструменты",
    value: "Базовый комплект уже включён",
  },
  {
    icon: (
      <>
        <path
          d="M4 10l8-6 8 6v10H4V10z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M10 20v-6h4v6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </>
    ),
    label: "Дополнительно",
    value: "Рядом парковка и можно подключить уход от команды",
  },
];

export function PlotSpecs({ specs = DEFAULT_SPECS }: { specs?: Spec[] }) {
  return (
    <div className="plot-table-wrap">
      <h2>Что уже предусмотрено</h2>
      <div className="plot-specs">
        {specs.map((s) => (
          <div className="spec-row" key={s.label}>
            <div className="spec-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {s.icon}
              </svg>
            </div>
            <div className="spec-label">{s.label}</div>
            <div className="spec-value">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
