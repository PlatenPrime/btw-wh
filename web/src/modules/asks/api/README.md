# Asks API Module

Модуль для работы с API запросами (asks) в системе.

## Сервисы (Services)

### `createAsk(data: CreateAskRequest)`

Создает новый ask.

```typescript
import { createAsk } from "@/modules/asks/api";

const newAsk = await createAsk({
  artikul: "ABC123",
  nameukr: "Назва товару",
  quant: 10,
  com: "Коментар",
  asker: "user_id",
});
```

### `pullAskById(id: string, data: PullAskRequest)`

Фіксує підтягування по запиту та повертає оновлену сутність.

```typescript
import { pullAskById } from "@/modules/asks/api/services/mutations/pullAskById";

const ask = await pullAskById("ask_id", {
  solverId: "solver_id",
  action: "Підтягнув 10 шт. зі складу A",
  pullAskData: {
    palletData: {
      _id: "pallet_id",
      title: "Палета А-1",
    },
    quant: 10,
    boxes: 0,
  },
});
```

### `deleteAskById(id: string)`

Удаляет ask по ID.

```typescript
import { deleteAskById } from "@/modules/asks/api";

await deleteAskById("ask_id");
```

### `getAskById(id: string)`

Получает ask по ID.

```typescript
import { getAskById } from "@/modules/asks/api";

const ask = await getAskById("ask_id");
```

### `getAsksByDate(params: GetAsksByDateParams)`

Получает asks по дате.

```typescript
import { getAsksByDate } from "@/modules/asks/api";

const asks = await getAsksByDate({
  date: "2024-01-15",
});
```

## Хуки (Hooks)

### `useCreateAsk()`

Хук для создания ask с автоматическим обновлением кеша.

```typescript
import { useCreateAsk } from "@/modules/asks/api";

function CreateAskForm() {
  const createAskMutation = useCreateAsk();

  const handleSubmit = (data: CreateAskRequest) => {
    createAskMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* форма */}
    </form>
  );
}
```

### `usePullAskMutation()`

Хук для фіксації підтягувань із автоматичним оновленням кеша.

```typescript
import { usePullAskMutation } from "@/modules/asks/api/hooks/mutations/usePullAskMutation";

function PullAskForm({ askId }: { askId: string }) {
  const pullAskMutation = usePullAskMutation({ askId });

  const handleSubmit = (payload: PullAskRequest) => {
    pullAskMutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* форма */}
    </form>
  );
}
```

### `useDeleteAsk()`

Хук для удаления ask.

```typescript
import { useDeleteAsk } from "@/modules/asks/api";

function DeleteAskButton({ askId }: { askId: string }) {
  const deleteAskMutation = useDeleteAsk();

  const handleDelete = () => {
    deleteAskMutation.mutate(askId);
  };

  return (
    <button onClick={handleDelete} disabled={deleteAskMutation.isPending}>
      Видалити
    </button>
  );
}
```

### `useAskQuery({ id, enabled })`

Хук для получения ask по ID.

```typescript
import { useAskQuery } from "@/modules/asks/api";

function AskDetails({ askId }: { askId: string }) {
  const { data: ask, isLoading, error } = useAskQuery({ id: askId });

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error.message}</div>;
  if (!ask) return <div>Ask не знайдено</div>;

  return (
    <div>
      <h1>{ask.artikul}</h1>
      <p>{ask.nameukr}</p>
      {/* інші деталі */}
    </div>
  );
}
```

### `useAsksByDateQuery({ date, enabled })`

Хук для получения asks по дате.

```typescript
import { useAsksByDateQuery } from "@/modules/asks/api";

function AsksList({ date }: { date: string }) {
  const { data, isLoading, error } = useAsksByDateQuery({
    date,
  });

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error.message}</div>;

  return (
    <div>
      {data?.data.map(ask => (
        <AskItem key={ask._id} ask={ask} />
      ))}

      <div>Всього: {data?.count}</div>
      <div>Дата: {data?.date}</div>
    </div>
  );
}
```

## Типи (Types)

### `AskDto`

Основной тип для ask.

```typescript
interface AskDto {
  _id: string;
  artikul: string;
  nameukr?: string;
  quant?: number;
  com?: string;
  asker: string;
  askerData: AskUserData;
  solver?: string;
  solverData?: AskUserData;
  status: AskStatus;
  pullQuant?: number;
  pullBox?: number;
  pullBoxes?: number;
  events: AskEvent[];
  actions?: string[];
  createdAt: string;
  updatedAt: string;
}
```

### `AskStatus`

Возможные статусы ask.

```typescript
type AskStatus = "new" | "completed" | "rejected" | "fail" | "solved";
```

### `AskUserData`

Данные пользователя в ask.

```typescript
type AskUserData = Pick<User, "_id" | "fullname" | "telegram" | "photo">;
```

### `AskEvent`

Опис подій ask.

```typescript
type AskEventName = "create" | "pull" | "complete" | "reject";

interface AskEventPullDetails {
  palletData: {
    _id: string;
    title: string;
  };
  quant: number;
  boxes: number;
}

interface AskEvent {
  eventName: AskEventName;
  date: string;
  userData: AskUserData;
  pullDetails?: AskEventPullDetails;
}
```

## Особенности

- Все хуки используют React Query для кеширования и управления состоянием
- Автоматическое обновление кеша при мутациях
- Debounce для поиска по дате (300ms)
- Типизация TypeScript для всех функций и параметров
- Поддержка AbortSignal для отмены запросов
- Настраиваемые staleTime для оптимизации производительности

## Структура ответа getAsksByDate

```typescript
interface GetAsksByDateResponse {
  message: string;
  data: AskDto[];
  date: string;
  count: number;
}
```
