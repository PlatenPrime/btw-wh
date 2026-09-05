# Клиентский refill товарных групп Air

Пока включён `AIR_IDLE_MODE`, сервер не ходит на листинги Air: `POST /api/skugrs/id/:id/fill-skus` отвечает `400` `{ code: "CLIENT_INGEST_REQUIRED" }`. Состав групп обновляется с клиента: first-party HTML листинга парсится **на клиенте**, на backend уходят уже разобранные карточки, сервер аддитивно заполняет `skus`.

## Каналы

| Канал | JWT | Когда |
|--------|-----|--------|
| SPA на странице конкурента Air + [`extensions/air-capture`](../../extensions/air-capture) | сессия веб-приложения | основной UX |
| Standalone [`extensions/air-skugr-fill`](../../extensions/air-skugr-fill) | JWT в `chrome.storage.local` | refill без открытой SPA |

Оба канала бьют в одни и те же ADMIN-эндпоинты. Расширение `air-capture` **не** хранит JWT: только снимает `document.documentElement.outerHTML`. SPA сама разбирает HTML листинга (`parseAirListingFromHtml`). `air-skugr-fill` парсит live DOM (`parseAirListing.js`).

## API

- `GET /api/skugrs/client/air/pending` — все группы `konkName=air` с непустым `url`
- `POST /api/skugrs/client/air/id/:id/fill-page` — карточки одной страницы (`products`, `nextPageUrl`, `hasListingMarkup`)

Контракт тел и `stats`: [API Skugrs](../backend/api/skugrs.md). Модуль: [Skugrs](../backend/modules/skugrs.md).

## Поток SPA

1. Страница конкурента Air (`#/sku/konks/:id`, `konk.name === "air"`, роль ≥ ADMIN) грузит очередь pending.
2. По каждой группе: `CAPTURE_REQUEST { url }` → `air-capture` открывает фоновую вкладку листинга → `outerHTML`.
3. SPA парсит HTML → `POST .../fill-page { sourceUrl, pageUrl, products, nextPageUrl, hasListingMarkup }`.
4. Если `nextPageUrl` не `null` — следующая страница (jitter 2–4 s). Между группами 10–20 s.
5. Нет сетки листинга или `422 PARSE_FAILED` — один retry страницы (jitter 3–6 s). `401`/`403` — стоп всей очереди.

Тот же цикл на странице одной Air-группы (`#/sku/skugrs/:id`): контейнер «Заповнення групи з клієнта» (роль ≥ ADMIN), не серверный `fill-skus` и не хедер-диалог. Живые `stats` (знайдено / новинки / додано існуючих / вже в групі) и лог страниц.

`nextPageUrl` с клиента берётся только если это та же категория, что и текущая страница (origin + pathname, query совпадает кроме `page`). `link[rel=next]` на OpenCart `index.php?route=...` при SEO-URL группы отбрасывается, дальше пробуется `.pagination li.active + li a`.

Код: `web/src/modules/skugrs/hooks/useAirClientSkugrFill.ts`, `web/src/modules/skugrs/hooks/useAirSkugrSingleFill.ts`, `web/src/modules/skugrs/components/containers/air-skugr-fill-container/`, `web/src/modules/skugrs/utils/runAirSkugrFillPages.ts`, `web/src/modules/skugrs/utils/parse-air-listing/`.
