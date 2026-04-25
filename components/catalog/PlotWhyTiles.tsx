type WhyTile = {
  /** SVG path-content для tile-icon. */
  icon: React.ReactNode;
  title: string;
  body: string;
};

export const DEFAULT_WHY_TILES: WhyTile[] = [
  {
    icon: (
      <>
        <path
          d="M16 4v4M8 8l2.5 2.5M4 16h4M8 24l2.5-2.5M16 28v-4M24 24l-2.5-2.5M28 16h-4M24 8l-2.5 2.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
    title: "Удобный формат",
    body: "Размер участка подобран так, чтобы делить заботы и не уставать к концу сезона.",
  },
  {
    icon: (
      <path
        d="M16 4C10 12 7 17 7 21a9 9 0 0018 0c0-4-3-9-9-17z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    ),
    title: "Полив уже настроен",
    body: "Капельный полив по расписанию. Не нужно приезжать ради того, чтобы полить грядки.",
  },
  {
    icon: (
      <path
        d="M6 26h20M10 26V12l6-4 6 4v14M13 26v-7h6v7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    title: "Команда рядом",
    body: "Можно подключить уход в любом объёме — агроном заметит и подскажет, что делать.",
  },
];

export function PlotWhyTiles({ tiles = DEFAULT_WHY_TILES }: { tiles?: WhyTile[] }) {
  return (
    <div className="why-tiles">
      {tiles.map((t) => (
        <div className="why-tile" key={t.title}>
          <div className="tile-icon">
            <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
              {t.icon}
            </svg>
          </div>
          <h3>{t.title}</h3>
          <p>{t.body}</p>
        </div>
      ))}
    </div>
  );
}
