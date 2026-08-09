# Промпт: `skugrTitle` в ответе `skus-sales`

Самодостаточное ТЗ для бэкенд-агента. После реализации обновить каноническую API-документацию (см. чеклист в конце). Фронтенд уже читает `skugrTitle` из ответа для шапки drill-down страницы статистики по товарам группы.

## Контекст

Эндпоинт уже есть:

### `GET /api/sku-sales-reports/skugr/:skugrId/skus-sales`

Он загружает документ `Skugr` по `skugrId` (иначе 404) и отдаёт итоги продаж по каждому SKU группы + блок `all`.

На фронте в шапке таблицы нужен **title товарной группы** (`Skugr.title`). Сейчас в `all.title` приходит подпись итога (`"Усього"`) — это правильно для строки «всего» в таблице, но **не подходит** как имя группы.

Прокидывать название через query string с предыдущего экрана **нельзя** (хрупко, кириллица в hash-URL, риск `title=undefined`).

## Задача

В JSON-ответ `GET /api/sku-sales-reports/skugr/:skugrId/skus-sales` добавить **обязательное top-level поле** `skugrTitle`.

### Контракт ответа 200 (после изменения)

```ts
{
  message: string;
  skugrTitle: string; // Skugr.title загруженной группы
  data: Array<{
    skuId: string;
    title: string;      // Sku.title
    productId: string;
    imageUrl?: string | null;
    salesPcs: number;
    salesUah: number;
  }>;
  all: {
    title: string;      // оставить "Усього" (или текущую подпись итога) — НЕ подменять именем группы
    salesPcs: number;
    salesUah: number;
  };
}
```

### Правила

1. `skugrTitle` = `skugr.title` из уже загруженного документа `Skugr` (новый запрос в БД не нужен).
2. `all.title` **не менять семантику**: оставить `"Усього"` (или то значение, что сейчас используется для строки итога). Имя группы только в `skugrTitle`.
3. Auth, path/query, 400/401/403/404, агрегация продаж, пустая группа (`data: []`) — **без изменений поведения**, кроме появления поля `skugrTitle` в 200-ответах.
4. Для пустой группы (`skus` пуст) при `200` всё равно вернуть `skugrTitle` (группа найдена).
5. Обновить Zod/response schema (если есть), unit/integration тесты эндпоинта: assert на наличие и значение `skugrTitle`.

## Документация (обязательно)

1. [`docs/backend/api/sku-sales-reports.md`](../api/sku-sales-reports.md) — в описании `GET /skugr/:skugrId/skus-sales` добавить `skugrTitle` в shape ответа.
2. При необходимости кратко упомянуть в [`docs/backend/modules/sku-sales-reports.md`](../modules/sku-sales-reports.md).

## Чеклист приёмки

- [ ] `200` содержит `skugrTitle` = title найденной Skugr
- [ ] `all.title` по-прежнему подпись итога (`"Усього"`), не имя группы
- [ ] `404` если Skugr не найден — без изменений
- [ ] Пустая группа: `data: []`, `skugrTitle` заполнен, `all` с нулями
- [ ] Тесты обновлены
- [ ] API-док обновлён
