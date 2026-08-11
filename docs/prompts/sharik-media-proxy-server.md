# Промпт: публичный image-proxy sharik для web/mobile

> **Статус: реализовано.** Канон документации:
> - [docs/backend/api/media.md](../backend/api/media.md)
> - [docs/backend/modules/media.md](../backend/modules/media.md)
>
> Ниже — историческое ТЗ; для контракта и поведения API смотри канон выше.

Самодостаточное ТЗ для бэкенд-агента в репозитории **btw-wh-server**. После реализации обновить каноническую API-документацию (чеклист в конце). Клиенты (`btw-wh` web + mobile) уже ждут этот контракт.

## Контекст

Картинки артикулов на UI раньше грузились напрямую с `sharik.ua`. Прямой egress часто отдаёт блок/таймаут/HTML вместо JPEG. Для scrape остатков уже есть HTTP-прокси (`SHARIK_HTTP_PROXY_URL` + `HttpsProxyAgent` через `getSharikHttpProxyUrl` / `browserGet`).

Нужен **публичный** эндпоинт, который:

1. Тянет JPEG с sharik через тот же прокси.
2. Отдаёт байты клиенту с корректным `Content-Type`.
3. Кеширует ответы in-memory + отдаёт HTTP cache headers.

Клиенты строят URL так (без Bearer — `<img>` / `expo-image` не умеют слать JWT):

- prev: `GET {API}/media/sharik/{encodeURIComponent(artikul)}?size=prev`
- big: `GET {API}/media/sharik/{encodeURIComponent(artikul)}?size=big`

Пример: `https://btw-wh-s.up.railway.app/api/media/sharik/1302-0065?size=prev`

## Задача

Добавить модуль **`media`** и маршрут:

### `GET /api/media/sharik/:artikul`

| Параметр | Где | Тип | Описание |
|----------|-----|-----|----------|
| `artikul` | path | string | артикул; URL-decode; валидировать |
| `size` | query | `"prev"` \| `"big"` | default `"prev"` |

**Auth:** нет (публичный). Не вешать `checkAuth`.

**Mount** в `src/index.ts`:

```ts
app.use("/api/media", mediaRoute);
```

## Upstream URL

| size | URL |
|------|-----|
| `big` | `https://sharik.ua/images/elements_big/{encodeURIComponent(artikul)}_m1.jpg` |
| `prev` | `https://sharik.ua/images/elements_big_prev/prev_{encodeURIComponent(artikul)}_m1.jpg` |

## Fetch через прокси

Использовать существующий стек:

- `getSharikHttpProxyUrl()` из `src/modules/browser/sharik/utils/getSharikHttpProxyUrl.ts`
- `HttpsProxyAgent` / `resolveBrowserProxyAgents` / паттерн `browserGet` (`proxy: false` + явные `httpAgent`/`httpsAgent`)

Нужен **binary** (`responseType: "arraybuffer"`). Расширить `browserGet` опцией или добавить `browserGetBuffer` рядом в `browser/utils/browserRequest.ts`. Для image-запросов Accept лучше `image/avif,image/webp,image/apng,image/*,*/*;q=0.8` (не HTML-навигационный Accept).

### Критерий успеха upstream

Одновременно:

- HTTP `200`
- `Content-Type` начинается с `image/`
- тело непустое

Иначе — **не** прокидывать HTML/тело sharik клиенту. Ответ API: `404` (нет картинки) или `502` (прокси/upstream ошибка). JSON error shape как в остальных модулях.

## Кеш (обязательно)

1. **In-memory** LRU + TTL (~1h), стиль `getCachedSharikProductRestsMap`:
   - key: `${size}:${artikul}`
   - value: `{ buffer: Buffer, contentType: string, fetchedAt: number, etag: string }`
   - inflight-dedupe параллельных miss на один key
   - разумный max entries (например 500), eviction LRU

2. **HTTP headers** при успехе:
   - `Content-Type` из upstream (обычно `image/jpeg`)
   - `Cache-Control: public, max-age=86400`
   - `ETag` (например `"${size}-${artikul}-${length}-${hashOrFetchedAt}"`)
   - при `If-None-Match` совпадении → `304` без тела

## Валидация / безопасность

- `artikul`: trim, non-empty, max length (например 64), запрет `/`, `\`, `..`, control chars; допустимы буквы/цифры/`-`/`_`/`.` и подобные безопасные символы артикулов проекта
- `size`: только `prev` | `big`, иначе `400`
- не логировать полный `SHARIK_HTTP_PROXY_URL` (пароль)
- не класть секреты в ответы

## Структура модуля

```
src/modules/media/
  router.ts
  controllers/
    get-sharik-art-image/
      getSharikArtImageController.ts
  utils/
    build-sharik-art-image-url/
      buildSharikArtImageUrl.ts
    fetch-sharik-art-image/
      fetchSharikArtImage.ts
    cache/
      getCachedSharikArtImage.ts
      constants.ts
  __tests__/ ...
```

Не смешивать с HTML scrape `product_rests`. Переиспользовать только browser proxy utilities.

## Тесты

- unit: URL builder для `prev`/`big` + encode
- unit: cache hit / miss / inflight dedupe / TTL expiry
- unit: rejection non-image / empty body
- integration smoke: router `200` image, `400` bad size, `404`/`502` на фейковый upstream (mock)

## Чеклист после реализации

- [ ] `GET /api/media/sharik/:artikul?size=prev|big` работает через `SHARIK_HTTP_PROXY_URL`
- [ ] Публичный (без auth)
- [ ] In-memory cache + `Cache-Control` + `ETag`/`304`
- [ ] Документация: `docs/modules/media.md` + запись в `docs/api/` / index
- [ ] `.env.example` уже содержит `SHARIK_HTTP_PROXY_URL` — при необходимости уточнить комментарий, что env используется и для image-proxy
- [ ] Не коммитить user/password прокси
