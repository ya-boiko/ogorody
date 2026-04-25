# Огороды — site

Next.js (App Router) реализация прототипа из `../design/`.

## Стек

- Node 22 LTS, pnpm
- Next.js 16 (App Router, Turbopack), React 19, TypeScript strict
- Zod — валидация форм и контента
- Vitest + Testing Library — юнит и компонент-тесты
- Playwright — E2E

## Локальный запуск

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Тесты и проверки

```bash
pnpm typecheck
pnpm lint
pnpm test         # юнит + компонент (~30 тестов)
pnpm test:e2e     # Playwright (Chromium)
pnpm format:check
```

## Сборка

```bash
pnpm build
pnpm start
```

## Структура

```
app/
├─ layout.tsx                      # html lang=ru, шрифты, глобальный CSS, Nav + Footer
├─ page.tsx                        # /
├─ catalog/
│  ├─ page.tsx                     # /catalog
│  └─ [id]/page.tsx                # /catalog/<id>
├─ contacts/page.tsx               # /contacts
├─ api/leads/route.ts              # POST /api/leads (stub)
├─ sitemap.ts, robots.ts           # SEO
├─ not-found.tsx                   # 404
└─ styles/                         # глобальные CSS из дизайн-системы

components/
├─ nav, footer                     # шапка/подвал
├─ hero, pillars, day, places,     # секции лэндинга
│  care, watch, community,
│  harvest, plots-preview, final
├─ catalog/                        # PlotCard, PlotFilters (client),
│                                  # PlotGallery (client)
└─ leads/LeadForm.tsx              # форма заявки (client)

content/plots/*.json               # mock-данные участков (6 шт)
lib/                               # типы, Zod-схемы, plot loader, leads stub
public/assets/                     # лого, hero, фото участков
public/fonts/                      # Manrope WOFF2 (cyrillic, 4 веса)
tests/                             # unit / components / e2e
```

## Статус фазы 1

Реализовано:
- Лэндинг (10 секций, перенесён 1-в-1 из прототипа)
- Каталог + страница участка (с галереей, фильтрами, статической генерацией)
- Контакты + форма заявки
- API-route `/api/leads` (stub: логирует payload и возвращает 200)
- SEO: per-page metadata, sitemap, robots, 404

Отложено в backlog (см. `../docs/superpowers/specs/2026-04-25-react-migration-phase-1-design.md`):
- Доставка лидов (email / Telegram / CRM)
- Хостинг (Vercel vs российский VPS)
- Страницы `/care`, `/about`, блог, новости — фаза 2/3
- Аналитика (Яндекс.Метрика, GA), Sentry, мониторинг
