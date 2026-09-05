# BTW Air Capture (Chrome extension)

Мінімальне MV3-розширення для клієнтського захоплення HTML сторінок Airballoons. Обходить WAF: відкриває **first-party** вкладку, знімає `outerHTML` і повертає його у веб-застосунок BTW-WH. Сам застосунок (з JWT) відправляє HTML на backend.

Два сценарії SPA:

- **SKU-зрізи** — `PUT /api/sku-slices/client/air/sku/:skuId` (сторінка товару).
- **Товарні групи** — `POST /api/skugrs/client/air/id/:id/fill-page` (сторінка лістингу категорії). Див. [docs/frontend/air-client-skugr-fill.md](../../docs/frontend/air-client-skugr-fill.md).

Розширення **не має доступу до JWT** і нікуди не шле дані самостійно — тільки повертає HTML на сторінку SPA.

## Встановлення (Load unpacked)

1. Chrome → `chrome://extensions`.
2. Увімкнути **Developer mode** (правий верхній кут).
3. **Load unpacked** → вибрати теку `extensions/air-capture`.
4. Відкрити BTW-WH, зайти на сторінку конкурента **Air** (`#/sku/konks/:id`). У блоках «Дозаповнення Air» і «Оновлення товарних груп Air» має зʼявитися статус «Розширення активне».

Якщо застосунок працює не на `https://btw-wh-s.up.railway.app` чи `localhost` — додайте свій origin у `manifest.json → content_scripts.matches` і перезавантажте розширення.

## Протокол (`protocol.js`)

Повідомлення через `window.postMessage` між SPA і розширенням:

| Напрям | type | payload |
|--------|------|---------|
| SPA → ext | `BTW_AIR_PING` | `{ requestId }` |
| ext → SPA | `BTW_AIR_PONG` | `{ requestId }` |
| SPA → ext | `BTW_AIR_CAPTURE_REQUEST` | `{ requestId, url }` |
| ext → SPA | `BTW_AIR_CAPTURE_RESULT` | `{ requestId, ok, html?, error? }` |

`error.code`: `TAB_OPEN_FAILED` / `LOAD_TIMEOUT` / `READ_FAILED` / `EMPTY_HTML` / `INVALID_REQUEST` / `EXTENSION_UNAVAILABLE`.

Веб-сторона контракту — `web/src/lib/air-capture/`. При зміні типів синхронізувати обидві сторони.

## Потік

**Зрізи**

1. SPA завантажує чергу `GET /api/sku-slices/client/air/pending`.
2. Послідовно по кожному `item`: SPA шле `CAPTURE_REQUEST { url }`, розширення відкриває фонову вкладку, чекає `complete`, знімає `outerHTML`, закриває вкладку, відповідає `CAPTURE_RESULT`.
3. SPA робить `PUT .../client/air/sku/:skuId { sourceUrl, html }`.
4. Після серії SPA інвалідовує кеш зрізів.

**Товарні групи**

1. SPA завантажує чергу `GET /api/skugrs/client/air/pending`.
2. Для кожної групи SPA послідовно захоплює сторінки лістингу (`group.url`, далі `nextPageUrl` з відповіді fill-page).
3. SPA робить `POST .../skugrs/client/air/id/:id/fill-page { sourceUrl, pageUrl, html }`.
4. Після серії SPA інвалідовує кеш `skugrs` / `skusBySkugr`.

Вкладки відкриваються **послідовно** (черга керується у SPA) — без паралельного шторму.
