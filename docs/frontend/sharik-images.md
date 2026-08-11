# Картинки sharik через наш API

Клиенты (web / mobile) **не** ходят на `sharik.ua` напрямую. URL строятся на публичный media-proxy бэкенда.

## Источник истины (бэкенд)

- API: [docs/backend/api/media.md](../backend/api/media.md) — `GET /api/media/sharik/:artikul`
- Модуль: [docs/backend/modules/media.md](../backend/modules/media.md)
- Доступ: публично, без JWT — [access-matrix](../backend/api/access-matrix.md) раздел `/api/media`

## Контракт (кратко для клиентов)

| size | URL |
|------|-----|
| prev (small) | `{SERVER_URL}media/sharik/{encodeURIComponent(artikul)}?size=prev` |
| big | `{SERVER_URL}media/sharik/{encodeURIComponent(artikul)}?size=big` |

`SERVER_URL` = `https://btw-wh-s.up.railway.app/api/` (см. `web/src/constants/server.ts`, `mobile/constants/server.ts`).

Эндпоинт **публичный** (без Bearer) — иначе `<img>` / `expo-image` не смогут загрузить картинку.

## Клиентский код

- URL helpers: `getSmallImageUrl` / `getBigImageUrl` в `art-image-url.ts` (web и mobile)
- Компонент: `SharikImage` (`size: "prev" | "big"`)
  - web: `web/src/components/shared/media/sharik-image/`
  - mobile: `mobile/components/shared/sharik-image/` (`cachePolicy="memory-disk"`)

## Кеш

- Браузер / `expo-image`: HTTP `Cache-Control` / `ETag` с бэка + disk cache на mobile
- Сервер: in-memory LRU+TTL — см. [modules/media.md](../backend/modules/media.md)

## Историческое ТЗ

Исходный промпт для сервера (реализован): [docs/prompts/sharik-media-proxy-server.md](../prompts/sharik-media-proxy-server.md)
