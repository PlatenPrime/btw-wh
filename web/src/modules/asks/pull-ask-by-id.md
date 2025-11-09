# Pull Ask By Id (frontend)

## Назначение
- Позволяет исполнителю зафиксировать факт снятия товара по заявке.
- Записывает событие `pull` в историю `Ask.events`, обновляет агрегаты `pullQuant` и `pullBox`, а также привязывает солвера.
- Требует от фронтенда строгого соблюдения схемы данных, иначе бекенд отклонит запрос Zod-валидацией.

## Контроллер `POST /asks/:id/pull`

### Требования к запросу
- `params.id`: строковый ObjectId существующей заявки.
- JSON-тело:
  ```json
  {
    "solverId": "64f7c1db4f1f8b3a2d123456",
    "action": "Подтянул 12 шт. со склада А",
    "pullAskData": {
      "palletData": {
        "_id": "64f7c1db4f1f8b3a2dabcdef0",
        "title": "Паллет А-12"
      },
      "quant": 12,
      "boxes": 0
    }
  }
  ```
- Валидация:
  - `solverId`, `pullAskData.palletData._id` — валидные ObjectId.
  - `action` — непустая строка.
  - `pullAskData.quant` и `pullAskData.boxes` — числа ≥ 0, минимум одно > 0.

### Ответ 200
```json
{
  "_id": "64f7c1db4f1f8b3a2d123abc",
  "artikul": "ART-001",
  "quant": 24,
  "pullQuant": 36,
  "pullBox": 4,
  "events": [
    {
      "eventName": "create",
      "date": "2024-05-26T10:15:00.000Z",
      "userData": { "...": "..." }
    },
    {
      "eventName": "pull",
      "date": "2024-05-27T12:40:00.000Z",
      "userData": {
        "_id": "64f7c1db4f1f8b3a2d123456",
        "fullname": "Иван Иванов",
        "telegram": "@ivanov",
        "photo": "https://..."
      },
      "pullDetails": {
        "palletData": {
          "_id": "64f7c1db4f1f8b3a2dabcdef0",
          "title": "Паллет А-12"
        },
        "quant": 12,
        "boxes": 0
      }
    }
  ],
  "actions": [
    "2024-05-27 15:40 · Иван Иванов · Подтянул 12 шт. со склада А"
  ],
  "solver": "64f7c1db4f1f8b3a2d123456",
  "solverData": { "...": "..." },
  "status": "new",
  "updatedAt": "2024-05-27T12:40:01.123Z",
  "createdAt": "2024-05-26T10:15:00.000Z"
}
```

### Ошибки
- `400` — нарушение схемы (фронту выводить подробности из `errors`).
- `404` — заявка или пользователь-исполнитель не найдены.
- `500` — серверная ошибка (повторить позже).

## Актуальная модель `Ask`

| Поле | Тип | Источник | Описание |
| --- | --- | --- | --- |
| `artikul` | `string` | фронт | Обязателен при создании. |
| `nameukr?`, `quant?`, `com?` | разное | фронт | Доп. сведения о заявке. |
| `asker`, `askerData` | `ObjectId`, `AskUserData` | бек | Заполняется из авторизованного пользователя. |
| `solver?`, `solverData?` | `ObjectId`, `AskUserData` | бек | Проставляется при `pull/complete/reject`. |
| `status` | `"new" \| "completed" \| "rejected"` | бек | Автоматически переключается контроллерами. |
| `actions` | `string[]` | бек | Человекочитаемый лог действий. |
| `pullQuant`, `pullBox` | `number` | бек | Суммарные количества из всех `pull`. |
| `events` | `AskEvent[]` | бек | Хронологический журнал (см. ниже). |
| `createdAt`, `updatedAt` | `Date` | бек | Таймстемпы mongoose. |

### `Ask.events`
- `eventName`: `"create"`, `"pull"`, `"complete"`, `"reject"`.
- `userData`: снимок пользователя на момент события.
- `date`: UTC-время создания события.
- `pullDetails`: только для `eventName === "pull"`, включает:
  - `palletData`: ObjectId + наименование паллеты.
  - `quant`, `boxes`: числовые объёмы, не могут оба быть нулём.
- Валидация бекенда:
  - `pull`-события обязаны содержать `pullDetails`.
  - Для остальных типов `pullDetails` запрещён.

## Поведение остальных контроллеров c учётом `events`

| Контроллер | Метод/путь | Payload фронта | Что делает бек |
| --- | --- | --- | --- |
| `create-ask` | `POST /asks` | `{ artikul, nameukr?, quant?, com?, askerId }` | Создаёт `Ask`, пишет `create`-событие, инициализирует `pullQuant = 0`, `pullBox = 0`. |
| `pull-ask-by-id` | `POST /asks/:id/pull` | см. выше | Добавляет `pull`-событие, инкрементит агрегаты, привязывает солвера, пушит текст в `actions`. |
| `complete-ask-by-id` | `POST /asks/:id/complete` | `{ solverId }` | Добавляет `complete`-событие, меняет `status` -> `completed`, сохраняет солвера. |
| `reject-ask-by-id` | `POST /asks/:id/reject` | `{ solverId }` | Добавляет `reject`-событие, `status` -> `rejected`. |
| `update-ask-actions-by-id` | `POST /asks/:id/actions` | `{ userId, action }` | Добавляет строку в `actions`, `events` не трогает. |

Фронту важно:
- Использовать ObjectId из бекенда (строки, 24 hex-символа).
- Не отправлять pull-запрос с пустым действием или нулевыми значениями.
- Отрисовывать историю событий на UI через `events`, а операционные логи через `actions`.
- Для отчётов по подтягиваниям брать `Ask.pullQuant`/`Ask.pullBox` (готовые агрегаты) или суммировать `events` с `eventName === "pull"`.

## Быстрый чек-лист для UI
- [ ] Перед отправкой pull-формы проверяйте, что выбранная паллета имеет `_id` и название.
- [ ] `quant` и `boxes` валидируйте на клиенте (минимум одно поле > 0).
- [ ] Показывайте пользователю результат с обновлённой лентой событий.
- [ ] Учитывайте, что бек может возвращать дополнительные поля (`actions`, `solverData`) — не выкидывайте их при нормализации ответа.

