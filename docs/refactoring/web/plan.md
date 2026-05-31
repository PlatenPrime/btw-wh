# Web: пошаговый план рефакторинга

Один шаг за итерацию. Статусы: `[ ]` pending · `[x]` done

## Шаг 0 — Документация baseline

- [x] Заполнить [structure.md](./structure.md)
- [x] Создать plan.md (этот файл)
- [x] Дополнить [ARCHITECTURE.md](../../ARCHITECTURE.md)

## Шаг 1 — Cross-module UI → global shared

- [x] `konk-banner/` → `components/shared/konk-banner/`
- [x] `sklad-list-pos/` → `components/shared/sklad-list-pos/`
- [x] Обновить импорты

## Шаг 2 — Удалить заглушки stocks / wh

- [x] Убрать routes из `router.tsx`
- [x] Удалить модули-заглушки

## Шаг 3 — Модуль `sku-analytics` (API)

- [x] Перенести `sku-slices/api/` → `sku-analytics/api/`
- [x] Обновить импорты; удалить `sku-slices`

## Шаг 4 — Merge sku-statistics → sku-analytics

- [x] Fetcher + Container + ContainerView + Skeleton

## Шаг 5 — Merge sku-konk-prod-charts → sku-analytics

- [x] UI, actions, controls, pages; удалить старый модуль

## Шаг 6 — sales

- [x] SalesFetcher; SalesChartContainer + View

## Шаг 7 — stock-comparison

- [x] StockComparisonFetcher; StockChartContainer + View

## Шаг 8 — auth

- [x] api layout; guards → elements; UserDetailsContainer split

## Шаг 9 — skus + skugrs + analogs

- [x] Chart containers + ContainerView; skus `api/types/`

## Шаг 10 — analog-slices

- [x] AnalogSliceFetcher + Container/View

## Шаг 11–23 — Модули

- [x] rows, arts, asks, blocks, constants, defs, dels, kasks, konks, pallet-groups, pallets, poses, prods, variants, zones, skugrs

## Шаг 24 — Global shared cleanup

- [x] `entity-label/` → shared; orphans удалены; `ChartSection` в charts barrel

## Шаг 25 — Финальная ARCHITECTURE.md

- [x] Чеклист code review; модуль `sku-analytics` описан
