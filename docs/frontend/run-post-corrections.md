# Фронтенд: ручной post-pass корректировки остатков SKU

Операция через ApiTasks.

1. `POST /api/apitasks` с `{ "kind": "sku-slices.post-corrections.run", "params": { "dateFrom": "YYYY-MM-DD", "dateTo": "YYYY-MM-DD", "apply": false } }` → **202**.
2. Параметры: `dateFrom` / `dateTo` inclusive, максимум **31** календарный день; `apply` опционально, default `false` (dry-run — без записи в SkuSlice).
3. С `apply: true` — запись fake-stock balun/svbum, pack-flip auto-apply, manufacturer rollup.
4. Не ждать минуты на одном HTTP. Страница задач + поллинг.
5. Дубль по тому же ресурсу диапазона → **409**.
6. Старый `POST /api/sku-slices/post-corrections/run` тоже ставит задачу (202) — см. [apitasks](../backend/api/apitasks.md).

UI: кнопка «Коригування залишків» в хедере `/sku/sku-slices` (ADMIN).

См. [apitasks.md](../backend/api/apitasks.md), [apitasks-frontend.md](../backend/api/apitasks-frontend.md), [sku-slices.md](../backend/api/sku-slices.md).
