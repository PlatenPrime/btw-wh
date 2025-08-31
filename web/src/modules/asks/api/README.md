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

### `updateAskById(id: string, data: UpdateAskRequest)`

Обновляет существующий ask по ID.

```typescript
import { updateAskById } from "@/modules/asks/api";

const updatedAsk = await updateAskById("ask_id", {
  status: "completed",
  solverData: {
    _id: "solver_id",
    fullname: "Ім'я виконавця",
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

### `useUpdateAsk()`

Хук для обновления ask.

```typescript
import { useUpdateAsk } from "@/modules/asks/api";

function UpdateAskForm({ askId }: { askId: string }) {
  const updateAskMutation = useUpdateAsk();

  const handleSubmit = (data: UpdateAskRequest) => {
    updateAskMutation.mutate({ id: askId, data });
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
  artikul: string;
  nameukr?: string;
  quant?: number;
  com?: string;
  asker: string;
  askerData: AskUserData;
  solver: string;
  solverData?: AskUserData;
  status: AskStatus;
  actions: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### `AskStatus`

Возможные статусы ask.

```typescript
type AskStatus = "new" | "in_progress" | "completed" | "cancelled";
```

### `AskUserData`

Данные пользователя в ask.

```typescript
type AskUserData = Pick<User, "_id" | "fullname" | "telegram" | "photo">;
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
