# Web: текущее и целевое состояние структуры

Документ фиксирует baseline рефакторинга. Обновляется по мере выполнения шагов из [plan.md](./plan.md).

## Глобальный уровень `web/src/`

### Current

| Область | Состояние |
|---------|-----------|
| `components/layout/` | App shell: sidebar, header-actions, `SidebarInsetLayout` (flat + подпапки) |
| `components/shared/layout/` | Page primitives: `Page`, `PageHeader`, `PageSection` — не описано в ARCHITECTURE |
| `components/shared/` | 28+ групп; ~50% без `index.ts`; смешаны flat-файлы и folder-per-component |
| `components/ui/` | shadcn; неполный barrel (`index.ts`) |
| `pages/` | Системные страницы; naming mix (`artsUpdate.tsx` vs `analog-slices.tsx`) |
| `hooks/` | 6 flat-хуков; mix kebab/camel, `.ts`/`.tsx` |
| Cross-module UI | `KonkBanner` в `modules/analogs/common/`, `SkladListPos` в `modules/poses/shared/` |

### Target

| Область | Правило |
|---------|---------|
| `components/layout/` | Только app shell + barrel |
| `components/shared/layout/` | Контентная обёртка страниц (зафиксировано в ARCHITECTURE) |
| `components/shared/` | Весь cross-module UI; kebab-папки; PascalCase файлы; `index.ts` для активных групп |
| `components/ui/` | Полный barrel или явное правило direct-import |
| `pages/` | Только system pages; kebab-case |
| Cross-module UI | **Только** `@/components/shared/` — импорты между модулями запрещены |

## Модули — матрица (на старт рефакторинга)

| Группа | Модули | Главные проблемы |
|--------|--------|------------------|
| Эталон (~14) | arts, asks, blocks, constants, defs, dels, konks, pallet-groups, pallets, poses, prods, rows, variants, zones | thin containers без View; page-level query; nested `components/` |
| Minor (8) | analogs, auth, kasks, analog-slices, sales, stock-comparison, skus, skugrs | non-standard folders; api layout; charts без ContainerView |
| Major → merge | sku-slices, sku-statistics, sku-konk-prod-charts | page = fat container; нет fetchers |
| Заглушки | stocks, wh | пустой layout — **убрать из router/sidebar** |

### Target module skeleton

```
modules/{name}/
├── api/hooks/{queries,mutations}/ + services/{queries,mutations}/ + types/
├── components/{actions,cards,charts,containers,controls,dialogs,elements,fetchers,forms,lists,...}
├── pages/          # kebab-case; только layout + fetcher + actions
├── hooks/
├── utils/
└── constants/
```

### Жёсткие правила target

1. Страница **не вызывает** `useQuery` — только Fetcher → Container
2. Container **всегда** имеет `*ContainerView` (+ `*ContainerSkeleton` при loading)
3. Chart view — только в `charts/`; логика сценария — в `containers/`
4. `useRegisterHeaderActions` — только в `components/actions/`
5. Cross-module UI — только `@/components/shared/`
6. Module `common/` / `shared/` — **не** для компонентов с импортами из других модулей

## Модуль `sku-analytics` (целевой merge)

Объединяет бывшие `sku-slices`, `sku-statistics`, `sku-konk-prod-charts`.

```
sku-analytics/
├── api/                    # queries + services + types/
├── components/
│   ├── actions/
│   ├── charts/
│   ├── containers/         # Container + ContainerView + Skeleton
│   ├── controls/
│   ├── fetchers/
│   └── tables/             # при необходимости
├── hooks/
├── pages/
│   ├── sku-statistics.tsx
│   ├── sku-konk-prod-sales.tsx
│   └── sku-konk-prod-stock.tsx
└── types/                  # UI-типы (metric, row)
```

## Reference module

Эталон: **`rows`** — Container/View, fetchers, actions, без page-level queries. Аналитика SKU: **`sku-analytics`** (merge sku-slices, sku-statistics, sku-konk-prod-charts).

## Критерий «готово»

- Все активные модули в router соответствуют target skeleton
- Нет `useQuery` в `modules/*/pages/` (кроме документированных исключений)
- Нет cross-module imports `@/modules/X/...` из `@/modules/Y/...`
- Этот документ и ARCHITECTURE.md описывают фактическое состояние
