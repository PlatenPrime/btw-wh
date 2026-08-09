# Промпт: JSON-итоги продаж по SKU товарной группы (drill-down статистики)

Самодостаточное ТЗ для бэкенд-агента. После реализации обновить каноническую API-документацию (см. чеклист в конце). Фронтенд ждёт этот эндпоинт для 3-го уровня drill-down на странице статистики SKU.

## Контекст продукта

На веб-странице «Статистика по виробникам» уже есть:

1. **Производители** — `GET /api/sku-chart-reports/konk-prod/manufacturers-pie`
2. **Товарные группы** производителя — `GET /api/sku-sales-reports/konk-prod/skugr-groups-sales`

Нужен **3-й уровень**: список **товаров (SKU)** выбранной товарной группы (`Skugr`) с итогами продаж/выручки за период, в том же shape, что у `skugr-groups-sales` (массив строк + `all`).

Excel share-таблицы на фронте клиентский (`exportSalesShareTableToXlsx`) — **новый Excel-эндпоинт не нужен**.

## Что уже есть и чего не хватает

| Нужно UI | Есть? | Комментарий |
|----------|-------|-------------|
| Итоги по производителям | да | `manufacturers-pie` |
| Итоги по Skugr пары konk+prod | да | `konk-prod/skugr-groups-sales` |
| Итоги по каждому SKU внутри одной Skugr за период | **нет** | Этот промпт |
| Дневные суммы по группе | да, но другое | `skugr/:skugrId/daily-summary` — по дням, не по SKU |
| Excel по группе | да, но другое | `sku-excel-reports/skugr/:skugrId/sales` — другой формат файла, не JSON для таблицы |

Нельзя заменять нужный контракт N+1 вызовами `sku/:skuId/range`.

## Задача

Добавить эндпоинт в модуль **`sku-sales-reports`**.

### `GET /api/sku-sales-reports/skugr/:skugrId/skus-sales`

**Auth:** `checkAuth` + `checkRoles(ADMIN)` — как у остальных маршрутов модуля.

**Path:**

| Параметр | Тип | Описание |
|----------|-----|----------|
| `skugrId` | ObjectId string | `_id` документа `Skugr` |

**Query:**

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `dateFrom` | `YYYY-MM-DD` | да | начало периода |
| `dateTo` | `YYYY-MM-DD` | да | конец периода; `dateFrom` ≤ `dateTo` |

Отдельные query `konk` / `prod` **не требуются**: состав SKU берётся из `skugr.skus`, группа уже привязана к конкуренту/производителю.

**Scope данных:**

- Загрузить `Skugr` по `skugrId`.
- Если группы нет → **404**.
- Список SKU = документы из `skugr.skus` (как в `daily-summary` / excel по skugr).
- За период `[dateFrom, dateTo]` для **каждого** SKU посчитать сумму продаж (шт) и выручки (грн).
- Нормализация срезов `-1` и учёт `Konk.recountDays` — **те же правила**, что у `GET /konk-prod/skugr-groups-sales` и shared-модуля `sku-reporting` (см. `docs/backend/modules/sku-reporting.md`, `docs/backend/modules/slices.md`).
- Не изобретать новую математику продаж: переиспользовать утилиты `sku-reporting` (загрузка Skugr+SKU, агрегация по срезам).

**Сортировка на сервере не обязательна** — фронт сортирует по выбранной метрике (`salesUah` | `salesPcs`). Можно вернуть в любом стабильном порядке.

**Ответ 200:**

```ts
{
  message: string;
  data: Array<{
    skuId: string;      // ObjectId SKU
    title: string;      // отображаемое имя (Sku.title)
    productId: string;  // Sku.productId — для подписи/ссылки на фронте
    salesPcs: number;   // сумма продаж, шт за период
    salesUah: number;   // сумма выручки за период
  }>;
  all: {
    title: string;      // например title группы или "Усього"
    salesPcs: number;   // сумма data[].salesPcs
    salesUah: number;   // сумма data[].salesUah
  };
}
```

Контракт **зеркалит** `GET /api/sku-sales-reports/konk-prod/skugr-groups-sales`, только элемент списка — SKU, а не Skugr.

**Ошибки:**

| Код | Когда |
|-----|--------|
| 400 | невалидный `skugrId`, битые/отсутствующие даты, `dateFrom` > `dateTo` |
| 401/403 | нет auth / роль ниже ADMIN |
| 404 | Skugr не найден |

**Пустая группа / нулевые продажи:**

- Группа есть, но `skus` пуст → `200`, `data: []`, `all` с нулями (title группы допустим).
- SKU есть, но за период продажи 0 → включать строки с `salesPcs: 0`, `salesUah: 0` (как ожидаемо для таблицы долей; фронт сам отфильтрует pie при необходимости).

## Реализация (ориентиры)

1. Модуль HTTP: `sku-sales-reports` (роутер + controller + schema Zod для path/query).
2. Доменная логика: только через `sku-reporting`, без дублирования пайплайнов срезов.
3. По аналогии с контроллером/утилитой `skugr-groups-sales` и `skugr/:skugrId/daily-summary`.
4. Порядок маршрутов в Express: зарегистрировать `GET /skugr/:skugrId/skus-sales` так, чтобы не конфликтовал с `GET /skugr/:skugrId/daily-summary` (оба с параметром — ок, разные суффиксы).
5. Тесты: happy-path (несколько SKU, ненулевые суммы, корректный `all`); 404; 400 на даты; пустой `skus`.

## Документация (обязательно обновить после кода)

1. [`docs/backend/api/sku-sales-reports.md`](../api/sku-sales-reports.md) — описать новый эндпоинт.
2. [`docs/backend/modules/sku-sales-reports.md`](../modules/sku-sales-reports.md) — кратко упомянуть в назначении.
3. [`docs/backend/api/access-matrix.md`](../api/access-matrix.md) — строка в разделе `/api/sku-sales-reports`:

   `| GET | `/skugr/:skugrId/skus-sales` | JWT | ≥ ADMIN |`

4. При необходимости — строка в [`docs/backend/api/sku-api-migration.md`](../api/sku-api-migration.md) только если добавляете legacy-алиас (по умолчанию **не** добавлять; это новый маршрут только в `sku-sales-reports`).

## Критерии готовности

- [ ] Эндпоинт отвечает `200` с shape выше для существующей Skugr и валидного периода.
- [ ] Суммы `salesPcs` / `salesUah` согласованы с логикой `skugr-groups-sales` для тех же SKU/периода (агрегат группы ≈ `all`, допускаются мелкие округления если их уже нет в домене).
- [ ] 404 / 400 / ADMIN как в таблице ошибок.
- [ ] Нет нового Excel-роута.
- [ ] Обновлены `sku-sales-reports.md` (api + module) и `access-matrix.md`.
- [ ] Есть тесты на controller/util.

## Вне скоупа

- Фронтенд (роуты drill-down, клики, клиентский Excel).
- Изменения `manufacturers-pie` и `skugr-groups-sales`.
- Пагинация списка SKU (на первом этапе отдаём полный список группы за период).
- Query-фильтры `konk` / `prod` / `sortBy`.
