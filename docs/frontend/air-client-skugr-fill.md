# Клиентский refill товарных групп Air

Пока включён `AIR_IDLE_MODE`, сервер не ходит на листинги Air: `POST /api/skugrs/id/:id/fill-skus` отвечает `400` `{ code: "CLIENT_INGEST_REQUIRED" }`. Состав групп обновляется с клиента: first-party HTML листинга → backend парсит и аддитивно заполняет `skus`.

## Каналы

| Канал | JWT | Когда |
|--------|-----|--------|
| SPA на странице конкурента Air + [`extensions/air-capture`](../../extensions/air-capture) | сессия веб-приложения | основной UX |
| Standalone [`extensions/air-skugr-fill`](../../extensions/air-skugr-fill) | JWT в `chrome.storage.local` | refill без открытой SPA |

Оба канала бьют в одни и те же ADMIN-эндпоинты. Расширение `air-capture` **не** хранит JWT: только снимает `document.documentElement.outerHTML`.

## API

- `GET /api/skugrs/client/air/pending` — все группы `konkName=air` с непустым `url`
- `POST /api/skugrs/client/air/id/:id/fill-page` — одна страница HTML

Контракт тел и `stats`: [API Skugrs](../backend/api/skugrs.md). Модуль: [Skugrs](../backend/modules/skugrs.md).

## Поток SPA

1. Страница конкурента Air (`#/sku/konks/:id`, `konk.name === "air"`, роль ≥ ADMIN) грузит очередь pending.
2. По каждой группе: `CAPTURE_REQUEST { url }` → `air-capture` открывает фоновую вкладку листинга → `outerHTML`.
3. SPA делает `POST .../fill-page { sourceUrl, pageUrl, html }`.
4. Если `nextPageUrl` не `null` — следующая страница (jitter 2–4 s). Между группами 10–20 s.
5. `422 PARSE_FAILED` — один retry страницы (jitter 3–6 s). `401`/`403` — стоп всей очереди.

Тот же цикл на карточке Air-группы: «Заповнити товарами» не зовёт серверный `fill-skus`.

Код: `web/src/modules/skugrs/hooks/useAirClientSkugrFill.ts`, `web/src/modules/skugrs/utils/runAirSkugrFillPages.ts`.
