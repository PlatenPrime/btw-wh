# BTW Air Capture (Chrome extension)

Мінімальне MV3-розширення для клієнтського дозаповнення Air SKU-зрізів. Обходить WAF Airballoons: відкриває **first-party** вкладку товару, знімає `outerHTML` і повертає його у веб-застосунок BTW-WH. Сам застосунок (з JWT) відправляє HTML на backend через `PUT /api/sku-slices/client/air/sku/:skuId`.

Розширення **не має доступу до JWT** і нікуди не шле дані самостійно — тільки повертає HTML на сторінку SPA.

## Встановлення (Load unpacked)

1. Chrome → `chrome://extensions`.
2. Увімкнути **Developer mode** (правий верхній кут).
3. **Load unpacked** → вибрати теку `extensions/air-capture`.
4. Відкрити BTW-WH, зайти на сторінку конкурента **Air** (`#/sku/konks/:id`). У блоці «Дозаповнення Air» має зʼявитися статус «Розширення активне».

Якщо застосунок працює не на `https://btw-wh.up.railway.app` чи `localhost` — додайте свій origin у `manifest.json → content_scripts.matches` і перезавантажте розширення.

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

1. SPA завантажує чергу `GET /api/sku-slices/client/air/pending`.
2. Послідовно по кожному `item`: SPA шле `CAPTURE_REQUEST { url }`, розширення відкриває фонову вкладку, чекає `complete`, знімає `outerHTML`, закриває вкладку, відповідає `CAPTURE_RESULT`.
3. SPA робить `PUT .../client/air/sku/:skuId { sourceUrl, html }`.
4. Після серії SPA інвалідовує кеш зрізів.

Вкладки відкриваються **послідовно** (черга керується у SPA) — без паралельного шторму.
