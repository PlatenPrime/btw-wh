# Рефакторинг web — BTW-WH

Живой документ. Шаги выполняются по одному. Статус: `[ ]` — ожидает, `[x]` — выполнен.

---

## Принципы и правила

Эти правила являются основанием для каждого шага. Нарушения против них — то, что мы исправляем.

### 1. Container / View — обязательное разделение

- **Container** (`*Container.tsx`) — содержит логику: хуки, состояния, запросы, side-effects, регистрацию header actions.
- **View** (`*ContainerView.tsx`) — исключительно рендер. Ни одного `useState`, `useEffect`, `useQuery` и других хуков с логикой. Получает данные и колбэки только через props.
- Один компонент без разделения допустим только если это чисто презентационный атом без какой-либо логики.

### 2. Charts — жёсткое размещение

- **`modules/{module}/components/charts/`** — только визуализация: layout секции, оси, легенды, обёртки recharts, презентационные `*ChartView` без хуков данных.
- **`modules/{module}/components/containers/`** — вся логика загрузки и состояния сценария. Контейнер импортирует готовые views из `charts/` и собирает экран.
- **Запрещено** держать в `containers/` пары `*ChartContainer` / `*ChartView`, где View — это рендер графика. Такие View выносятся в `charts/`.
- Общие межмодульные компоненты графиков — в `web/src/components/shared/charts/`.

### 3. Fetcher — единая точка состояний загрузки

- Отдельный компонент `*Fetcher.tsx` в `components/fetchers/` обрабатывает `isLoading` / `error` / пустые данные.
- В `isLoading` передаётся `<SkeletonComponent />` — это скелетон контейнера, а не абстрактный `<Skeleton />`.
- Страницы и контейнеры не содержат логику загрузки напрямую.

### 4. Скелетоны — рядом с компонентом, не абстрактные

- Для каждого значимого блока (контейнер, список, chart-секция, тяжёлая форма) рядом лежит `*Skeleton.tsx` в той же папке `kebab-name/`.
- `index.ts` папки реэкспортирует и компонент, и скелетон.
- Скелетон повторяет структуру разметки блока, а не один прямоугольник.
- При изменении верстки основного компонента скелетон обновляется в том же коммите.

### 5. Spacing — только gap, никакого space-x / space-y

- **Запрещено**: `space-x-*`, `space-y-*` (Tailwind margin-based spacing).
- **Правильно**: `flex gap-*` или `grid gap-*`.
- Это правило распространяется на все файлы, включая shadcn/ui компоненты и error-components.

### 6. Импорты — без тяжёлых barrel

- **Lucide-react**: использовать `optimizePackageImports` в `vite.config.ts` для автоматической оптимизации barrel-импортов, либо импортировать напрямую из конкретного файла.
- Абсолютные пути от `src/`: всегда `@/`, никогда относительных `../../`.
- Module-level barrel `components/index.ts` с `export *` — удалить; импорты сделать прямыми до папки компонента.

### 7. Module isolation — изоляция и единообразие

- Каждый модуль самодостаточен: `api/hooks`, `api/services`, `api/types`, `components/`, `pages/`.
- Папки в `components/` только из канона: `actions`, `cards`, `charts`, `containers`, `controls`, `dialogs`, `elements`, `fetchers`, `forms`, `lists` (и опциональные: `menus`, `tables`, `common`, `shared`).
- Нестандартные названия папок (`sku-konk-prod-skugr-groups-section`) — запрещены; содержимое переносится в канонические папки.

### 8. Router — декомпозиция

- `router.tsx` > 100 строк подлежит разбивке на доменные файлы `routes/`.
- Все страницы используют `lazy()` — уже есть, поддерживать.

---

## Шаги рефакторинга

### Группа A — Быстрые правки (низкий риск, высокая ценность)

- [x] **A1**: Добавить `lucide-react` в `optimizeDeps.include` в `web/vite.config.ts` (Vite pre-bundling)
  - Файл: [`web/vite.config.ts`](../web/vite.config.ts)
  - Эффект: автоматическая трансформация barrel-импортов lucide на прямые при сборке; ускорение dev cold start и production bundle.

- [x] **A2**: Заменить `space-x-*` / `space-y-*` на `flex gap-*` / `grid gap-*` во всех файлах
  - Затронутые файлы (31 файл):
    - `web/src/components/ui/form.tsx`
    - `web/src/components/ui/input-quant.tsx`
    - `web/src/components/shared/error-components/error-boundary.tsx`
    - `web/src/components/shared/error-components/error-display.tsx`
    - `web/src/components/shared/error-components/query-error-display.tsx`
    - `web/src/components/shared/error-components/example-usage.tsx`
    - `web/src/modules/auth/pages/login.tsx`
    - `web/src/modules/auth/pages/forbidden.tsx`
    - `web/src/modules/auth/pages/unauthorized.tsx`
    - `web/src/modules/auth/components/forms/user-profile-form/UserProfileForm.tsx`
    - `web/src/modules/auth/components/forms/register-form/RegisterForm.tsx`
    - `web/src/modules/zones/components/forms/create-zone-form/CreateZoneFormView.tsx`
    - `web/src/modules/zones/components/forms/update-zone-form/UpdateZoneFormView.tsx`
    - `web/src/modules/zones/components/containers/zones-excel-container/ZonesExcelUploaderView.tsx`
    - `web/src/modules/zones/components/containers/zones-excel-container/ZonesExcelUploaderSkeleton.tsx`
    - `web/src/modules/rows/components/forms/create-row-form/CreateRowFormView.tsx`
    - `web/src/modules/rows/components/forms/update-row-form/UpdateRowFormView.tsx`
    - `web/src/modules/asks/components/forms/create-ask-form/CreateAskFormView.tsx`
    - `web/src/modules/asks/components/forms/ask-pos-edit-form/AskPosEditFormView.tsx`
    - `web/src/modules/asks/components/lists/asks-list/AsksListEmpty.tsx`
    - `web/src/modules/poses/components/forms/create-pos-form/CreatePosFormView.tsx`
    - `web/src/modules/poses/components/forms/update-pos-form/UpdatePosFormView.tsx`
    - `web/src/modules/poses/components/containers/pos-container/PosContainerView.tsx`
    - `web/src/modules/poses/components/containers/pos-container/PosContainerSkeleton.tsx`
    - `web/src/modules/defs/components/cards/def-card/components/DefCardQuants.tsx`
    - `web/src/modules/defs/components/containers/calculation-status-container/CalculationStatusSkeleton.tsx`
    - `web/src/modules/defs/components/containers/calculation-status-container/components/calculation-init-view/CalculationInitView.tsx`
    - `web/src/modules/defs/components/containers/calculation-status-container/components/calculation-run-view/CalculationRunView.tsx`
    - `web/src/modules/arts/components/containers/arts-excel-container/ArtsExcelUploaderView.tsx`
    - `web/src/modules/arts/components/containers/arts-excel-container/ArtsExcelUploaderSkeleton.tsx`
    - `web/src/pages/not-found.tsx`

---

### Группа B — Архитектура графиков

> Принцип: View графика живёт в `charts/`, контейнер с логикой загрузки — в `containers/`.

- [ ] **B1**: `skugrs` — перенести `SkugrChartsSection` из `containers/` в `charts/`
  - Сейчас: `modules/skugrs/components/containers/skugr-charts-section/SkugrChartsSection.tsx` + `SkugrChartsSectionView.tsx`
  - Нужно: папку `skugr-charts-section/` переместить в `modules/skugrs/components/charts/`
  - Создать (или обновить) контейнер-оболочку в `containers/`, который импортирует из `charts/`
  - Проверить и обновить скелетон

- [ ] **B2**: `sales` — выделить `SalesChartView` в `charts/`
  - Сейчас: `modules/sales/components/containers/sales-chart-container/SalesChartView.tsx` + `SalesChartContainer.tsx` + `SalesChartSkeleton.tsx`
  - Нужно: `SalesChartView.tsx` → `modules/sales/components/charts/sales-chart/SalesChartView.tsx`
  - `SalesChartContainer.tsx` остаётся в `containers/`, импортирует View из `charts/`
  - Скелетон остаётся рядом с контейнером

- [ ] **B3**: `analogs` — выделить chart-views в `charts/`
  - Сейчас: `modules/analogs/components/containers/analog-slices-chart-container/` и `analog-sales-chart-container/`
  - Нужно: chart-View компоненты → `modules/analogs/components/charts/`
  - Контейнеры остаются, импортируют Views из `charts/`

- [ ] **B4**: `stock-comparison` — выделить `StockChartView` в `charts/`
  - Сейчас: `modules/stock-comparison/components/containers/stock-chart-container/StockChartView.tsx` + `StockChartContainer.tsx` + `StockChartSkeleton.tsx`
  - Нужно: `StockChartView.tsx` → `modules/stock-comparison/components/charts/stock-chart/StockChartView.tsx`
  - Контейнер и скелетон остаются в `containers/`

- [ ] **B5**: `skus` — аудит и финальная проверка chart-структуры (эталон)
  - `modules/skus/components/charts/sku-charts-section/` уже существует — проверить что структура правильная
  - `modules/skus/components/containers/sku-slices-chart-container/` и `sku-sales-chart-container/` — проверить, вынесены ли Views в `charts/` или нет; если нет — вынести по аналогии с B2-B4

---

### Группа C — Компонентная архитектура

- [ ] **C1**: Удалить module-level barrel файлы `components/index.ts`
  - `web/src/modules/asks/components/index.ts` — удалить; обновить все импорты на прямые пути до папки компонента
  - `web/src/modules/pallets/components/index.ts` — удалить; обновить импорты
  - `web/src/modules/auth/components/index.ts` — удалить; обновить импорты
  - Проверить через поиск `from "@/modules/asks/components"`, `from "@/modules/pallets/components"`, `from "@/modules/auth/components"` (без подпапки)

- [ ] **C2**: Аудит Container/View — найти компоненты смешивающие логику и рендер
  - Пройтись по всем `*ContainerView.tsx`: убедиться, что нет `useState`, `useQuery`, `useEffect` с логикой
  - Пройтись по всем `*Container.tsx`: убедиться, что не содержат JSX-разметку напрямую без `*ContainerView`
  - Особое внимание: `modules/auth/components/forms/` — некоторые формы объединяют RHF + разметку в одном файле без `*FormView`

- [ ] **C3**: Аудит скелетонов — создать недостающие
  - Найти контейнеры без парного `*Skeleton.tsx` в той же папке
  - Найти fetcher'ы, которые передают `<SkeletonComponent />` как `undefined` или голый `<Skeleton />`
  - Приоритет: chart-контейнеры (B1-B4), excel-загрузчики, form-контейнеры при первом открытии

---

### Группа D — Инфраструктура

- [ ] **D1**: Разбить `router.tsx` (~740 строк) на доменные файлы
  - Создать `web/src/routes/` с файлами по доменам:
    - `routes/warehouse.routes.tsx` (zones, rows, pallets, pallet-groups, blocks, poses)
    - `routes/catalog.routes.tsx` (arts, skus, skugrs, variants, prods, analogs, analog-slices)
    - `routes/orders.routes.tsx` (asks, kasks, dels, konks, constants, defs)
    - `routes/analytics.routes.tsx` (sales, stocks, stock-comparison, sku-slices, sku-statistics, sku-konk-prod-charts)
    - `routes/admin.routes.tsx` (auth/users)
  - `router.tsx` импортирует и композирует доменные массивы маршрутов

- [ ] **D2**: `sku-konk-prod-charts` — выровнять структуру модуля
  - Нестандартная папка: `modules/sku-konk-prod-charts/components/sku-konk-prod-skugr-groups-section/`
  - Содержимое `SkuKonkProdSkugrGroupsTable.tsx` перенести в `components/tables/` или `components/lists/`
  - Папку `sku-konk-prod-skugr-groups-section/` удалить

---

## Прогресс

| Шаг | Статус | Дата |
|-----|--------|------|
| A1 | [x] | 2026-05-25 |
| A2 | [x] | 2026-05-25 |
| B1 | [ ] | — |
| B2 | [ ] | — |
| B3 | [ ] | — |
| B4 | [ ] | — |
| B5 | [ ] | — |
| C1 | [ ] | — |
| C2 | [ ] | — |
| C3 | [ ] | — |
| D1 | [ ] | — |
| D2 | [ ] | — |
