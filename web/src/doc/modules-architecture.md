# Архитектура модулей проекта BTW-WH

## Введение

Данный документ описывает структуру, паттерны и соглашения организации модулей в папке `src/modules`. Цель — обеспечить единообразный подход к созданию новых модулей и поддержке существующих.

## Общая структура модуля

Каждый модуль представляет собой законченную функциональную единицу приложения, объединяющую API-слой, UI-компоненты и бизнес-логику для работы с определённой предметной областью (например, `arts`, `asks`, `poses`, `pallets`, `rows`, `defs`).

### Типичная структура модуля

```
modules/
├── {module-name}/
│   ├── api/                    # API слой
│   │   ├── hooks/              # React Query хуки
│   │   │   ├── mutations/      # Хуки для мутаций (создание, обновление, удаление)
│   │   │   └── queries/        # Хуки для запросов (получение данных)
│   │   ├── services/           # Чистые функции для API вызовов
│   │   │   ├── mutations/      # Сервисные функции мутаций
│   │   │   └── queries/        # Сервисные функции запросов
│   │   └── types/              # TypeScript типы
│   │       ├── dto.ts          # Data Transfer Objects
│   │       ├── types.ts        # Дополнительные типы
│   │       └── index.ts        # Экспорт типов
│   ├── components/             # UI компоненты модуля
│   │   ├── cards/              # Карточные компоненты
│   │   ├── containers/         # Контейнеры с логикой
│   │   ├── controls/           # Элементы управления (кнопки, переключатели)
│   │   ├── dialogs/            # Модальные окна
│   │   ├── elements/           # Мелкие переиспользуемые элементы
│   │   ├── fetchers/           # Компоненты для получения данных
│   │   ├── forms/              # Формы с валидацией
│   │   ├── lists/              # Списковые компоненты
│   │   ├── menus/              # Меню действий
│   │   └── shared/             # Общие компоненты модуля
│   ├── pages/                  # Страницы модуля
│   ├── hooks/                  # Кастомные хуки (опционально)
│   ├── utils/                  # Утилиты модуля (опционально)
│   ├── constants/              # Константы модуля (опционально)
│   └── README.md               # Документация модуля (опционально)
```

## Слой API (`api/`)

API слой отвечает за взаимодействие с бэкендом и управление состоянием данных через React Query.

### Структура API слоя

#### 1. Services (`api/services/`)

**Назначение**: Чистые функции для выполнения HTTP-запросов к API.

**Структура**:

```
services/
├── mutations/
│   ├── create{Entity}.ts
│   ├── update{Entity}.ts
│   ├── delete{Entity}.ts
│   └── ...
└── queries/
    ├── get{Entity}ById.ts
    ├── get{Entities}.ts
    └── ...
```

**Пример** (`services/mutations/createAsk.ts`):

```typescript
import { apiClient } from "@/lib/apiClient";
import type { AskDto } from "@/modules/asks/api/types/dto";

export interface CreateAskRequest {
  artikul: string;
  nameukr?: string;
  quant?: string;
  com?: string;
  askerId: string;
}

export const createAsk = async (data: CreateAskRequest): Promise<AskDto> => {
  const res = await apiClient.post<AskDto>("/asks", data);
  return res.data;
};
```

**Паттерны именования**:

- Queries: `get{Entity}ById`, `get{Entities}`, `get{Entities}By{Param}`
- Mutations: `create{Entity}`, `update{Entity}`, `delete{Entity}`, `{action}{Entity}`

**Принципы**:

- Функция всегда возвращает типизированные данные
- Использует `apiClient` из `@/lib/apiClient`
- Экспортирует типы запросов и ответов
- Не содержит логики обработки ошибок (это делает React Query)

#### 2. Hooks (`api/hooks/`)

**Назначение**: React Query хуки для использования в компонентах.

**Структура**:

```
hooks/
├── mutations/
│   ├── use{Action}{Entity}Mutation.tsx
│   └── ...
└── queries/
    ├── use{Entity}Query.tsx
    ├── use{Entities}Query.tsx
    └── ...
```

**Пример Query хука** (`hooks/queries/useAskQuery.tsx`):

```typescript
import { useQuery } from "@tanstack/react-query";
import { getAskById } from "@/modules/asks/api/services/queries/getAskById";

interface UseAskQueryParams {
  id: string;
  enabled?: boolean;
}

export function useAskQuery({ id, enabled = true }: UseAskQueryParams) {
  return useQuery({
    queryKey: ["ask", id],
    queryFn: ({ signal }) => getAskById(id, signal),
    enabled: enabled && !!id,
    staleTime: 1000 * 60 * 5, // 5 минут
  });
}
```

**Пример Mutation хука** (`hooks/mutations/useCreateAskMutation.tsx`):

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAsk,
  type CreateAskRequest,
} from "@/modules/asks/api/services/mutations/createAsk";

export function useCreateAskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAskRequest) => createAsk(data),
    onSuccess: () => {
      // Инвалидация кеша для обновления связанных данных
      queryClient.invalidateQueries({ queryKey: ["asks"] });
      queryClient.invalidateQueries({ queryKey: ["defs", "latest"] });
    },
  });
}
```

**Паттерны именования**:

- Query хуки: `use{Entity}Query`, `use{Entities}Query`, `use{Entities}By{Param}Query`
- Mutation хуки: `use{Action}{Entity}Mutation` (например, `useCreateAskMutation`, `useUpdatePosByIdMutation`)

**Принципы**:

- Хуки всегда используют соответствующие service функции
- Query хуки поддерживают параметр `enabled` для условного выполнения
- Mutation хуки инвалидируют кеш связанных данных в `onSuccess`
- Query keys структурированы иерархически: `["entity", param1, param2]`

#### 3. Types (`api/types/`)

**Назначение**: TypeScript типы для API данных.

**Структура**:

```
types/
├── dto.ts          # Data Transfer Objects (типы ответов API)
├── types.ts        # Дополнительные типы
└── index.ts        # Реэкспорт всех типов
```

**Пример** (`types/dto.ts`):

```typescript
import type { User } from "@/modules/auth/api/types";

export type AskUserData = Pick<User, "_id" | "fullname" | "telegram" | "photo">;
export type AskStatus = "new" | "completed" | "cancelled";
export const validAskStatuses: AskStatus[] = ["new", "completed", "cancelled"];

export interface AskDto {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetAsksByDateResponse {
  message: string;
  data: AskDto[];
  date: string;
  count: number;
  newCount: number;
  completedCount: number;
  rejectedCount: number;
}
```

**Принципы**:

- DTO типы точно соответствуют ответам бэкенда
- Используются TypeScript utility types (`Pick`, `Omit`, `Partial`)
- Экспортируются константы для enum-подобных типов
- Request/Response типы для каждого endpoint

## Слой компонентов (`components/`)

### Архитектурные паттерны

Проект использует трёхслойную архитектуру компонентов:

1. **Fetchers** — получение данных и управление состояниями загрузки
2. **Containers** — обработка бизнес-логики
3. **Views** — чистое отображение (презентационный слой)

### 1. Fetchers (`components/fetchers/`)

**Назначение**: Связывают API хуки с контейнерами, управляют состояниями загрузки, ошибок и отсутствия данных.

**Структура**:

```
fetchers/
├── {entity}-fetcher/
│   ├── {Entity}Fetcher.tsx
│   └── index.ts
└── {entities}-fetcher/
    ├── {Entities}Fetcher.tsx
    └── index.ts
```

**Пример** (`fetchers/ask-fetcher/AskFetcher.tsx`):

```typescript
import { ErrorDisplay } from '@/components/shared/error-components/error-display';
import { LoadingNoData } from '@/components/shared/loading-states/loading-nodata';
import { useAskQuery } from "@/modules/asks/api/hooks/queries/useAskQuery";
import type { AskDto } from "@/modules/asks/api/types/dto";
import type { ComponentType } from "react";

interface AskFetcherProps {
  id: string;
  ContainerComponent: ComponentType<{ askData: AskDto }>;
  SkeletonComponent: ComponentType;
}

export function AskFetcher({
  id,
  ContainerComponent,
  SkeletonComponent,
}: AskFetcherProps) {
  const { data: askData, isLoading, error } = useAskQuery({ id });

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження запиту"
        description="Не вдалося завантажити запит"
      />
    );

  if (!askData)
    return <LoadingNoData description="Немає даних для відображення" />;

  return <ContainerComponent askData={askData.data} />;
}
```

**Принципы**:

- Принимают компоненты через props для гибкости
- Обрабатывают все состояния: `loading`, `error`, `no data`, `success`
- Не содержат бизнес-логики
- Используют типизированные props для данных

**Гибкость архитектуры Fetchers**:

```typescript
// Использование с оригинальными компонентами
<AskFetcher
  id={id}
  ContainerComponent={AskContainer}
  SkeletonComponent={AskContainerSkeleton}
/>

// Использование с кастомными компонентами
<AskFetcher
  id={id}
  ContainerComponent={CustomAskDisplay}
  SkeletonComponent={CustomSkeleton}
/>
```

### 2. Containers (`components/containers/`)

**Назначение**: Содержат бизнес-логику, управляют состоянием, передают данные в View компоненты.

**Структура**:

```
containers/
├── {entity}-container/
│   ├── {Entity}Container.tsx
│   ├── {Entity}ContainerView.tsx
│   ├── {Entity}ContainerSkeleton.tsx
│   ├── components/              # Вложенные компоненты (опционально)
│   └── index.ts
```

**Пример Container** (`containers/ask-container/AskContainer.tsx`):

```typescript
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { useCompleteAskMutation } from "@/modules/asks/api/hooks/mutations/useCompleteAskMutation";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskContainerView } from "@/modules/asks/components/containers/ask-container/AskContainerView";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { SquareCheckBig, Ban, Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface AskContainerProps {
  askData: AskDto;
}

export function AskContainer({ askData }: AskContainerProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Состояния
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);

  // Мутации
  const completeAskMutation = useCompleteAskMutation(askData._id);

  // Обработчики
  const handleCompleteAsk = async () => {
    if (!user) {
      toast.error("Користувач не авторизований");
      return;
    }

    try {
      await completeAskMutation.mutateAsync(user._id);
      toast.success("Запит успішно виконано");
    } catch (error) {
      toast.error("Помилка при виконанні запиту");
    }
  };

  // Регистрация действий в header
  useRegisterHeaderActions([
    {
      id: "complete-ask",
      label: "Виконати запит",
      icon: SquareCheckBig,
      onClick: () => setCompleteDialogOpen(true),
    },
  ]);

  return (
    <AskContainerView
      askData={askData}
      completeDialogOpen={completeDialogOpen}
      setCompleteDialogOpen={setCompleteDialogOpen}
      handleCompleteAsk={handleCompleteAsk}
      completeAskPending={completeAskMutation.isPending}
    />
  );
}
```

**Принципы**:

- Управляют локальным состоянием (useState, useReducer)
- Вызывают мутации
- Обрабатывают события и бизнес-логику
- Передают всё необходимое в View компонент
- Не содержат JSX разметки (кроме рендера View)

**Пример ContainerView** (`containers/ask-container/AskContainerView.tsx`):

```typescript
export function AskContainerView({
  askData,
  completeDialogOpen,
  setCompleteDialogOpen,
  handleCompleteAsk,
  completeAskPending,
}: AskContainerViewProps) {
  return (
    <div className="flex flex-col gap-4">
      <AskDetailsCard askData={askData} />

      <CompleteAskDialog
        open={completeDialogOpen}
        setOpen={setCompleteDialogOpen}
        onConfirm={handleCompleteAsk}
        isPending={completeAskPending}
      />
    </div>
  );
}
```

**Принципы View компонентов**:

- Только презентационная логика
- Получают все данные и обработчики через props
- Содержат JSX разметку
- Могут использовать UI компоненты из `@/components/ui`

**Skeleton компоненты** (`containers/ask-container/AskContainerSkeleton.tsx`):

```typescript
export function AskContainerSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <AskDetailsCardSkeleton />
    </div>
  );
}
```

**Принципы Skeleton компонентов**:

- Имитируют структуру реального контента
- Используют компоненты из `@/components/ui/skeleton`
- Соответствуют разметке View компонента

### 3. Cards (`components/cards/`)

**Назначение**: Карточные компоненты для отображения сущностей в компактном виде.

**Структура**:

```
cards/
├── {entity}-card/
│   ├── {Entity}Card.tsx
│   ├── {Entity}CardView.tsx
│   ├── {Entity}CardSkeleton.tsx
│   ├── components/              # Вложенные компоненты карточки
│   └── index.ts
```

**Принципы**:

- Используют тот же паттерн Container/View/Skeleton
- Компактное представление данных
- Переиспользуемые в списках и гридах

### 4. Dialogs (`components/dialogs/`)

**Назначение**: Модальные окна для взаимодействия с пользователем.

**Структура**:

```
dialogs/
├── create-{entity}-dialog/
│   ├── Create{Entity}Dialog.tsx
│   ├── Create{Entity}DialogView.tsx
│   └── index.ts
├── update-{entity}-dialog/
└── delete-{entity}-dialog/
```

**Принципы**:

- Также следуют паттерну Container/View
- Содержат формы или подтверждения
- Управляются состоянием `open/setOpen` извне

### 5. Forms (`components/forms/`)

**Назначение**: Формы с валидацией для создания/редактирования сущностей.

**Структура**:

```
forms/
├── create-{entity}-form/
│   ├── Create{Entity}Form.tsx
│   ├── Create{Entity}FormView.tsx
│   ├── schema.ts
│   └── index.ts
├── update-{entity}-form/
└── schema.ts                    # Общие схемы модуля
```

**Пример schema** (`forms/create-ask-form/schema.ts`):

```typescript
import { z } from "zod";

export const createAskFormSchema = z.object({
  artikul: z
    .string()
    .min(1, "Артикул є обов'язковим")
    .regex(/^\d{4}-\d{4}$/, "Артикул повинен мати формат ЦЦЦЦ-ЦЦЦЦ"),
  quant: z.string().optional(),
  com: z.string().optional(),
});

export type CreateAskFormData = z.infer<typeof createAskFormSchema>;

export const createAskFormDefaultValues: CreateAskFormData = {
  artikul: "",
  quant: "",
  com: "",
};
```

**Принципы**:

- Используют Zod для валидации
- Экспортируют схему, тип и дефолтные значения
- Используют `react-hook-form` для управления формой
- Форма может быть разделена на Form/FormView

### 6. Lists (`components/lists/`)

**Назначение**: Списковые компоненты для отображения коллекций.

**Структура**:

```
lists/
├── {entities}-list/
│   ├── {Entities}List.tsx
│   ├── {Entities}ListView.tsx
│   ├── {Entities}ListSkeleton.tsx
│   ├── {Entities}ListEmpty.tsx
│   └── index.ts
```

**Принципы**:

- Рендерят массивы данных
- Имеют Empty состояние
- Используют Card компоненты для элементов

### 7. Elements (`components/elements/`)

**Назначение**: Мелкие переиспользуемые элементы специфичные для модуля.

**Примеры**:

- `ArtImage` — изображение артикула
- `ArtLimit` — отображение лимита
- `AskQuant` — количество в заявке

**Принципы**:

- Простые компоненты без сложной логики
- Принимают минимум props
- Переиспользуются в разных частях модуля

### 8. Controls (`components/controls/`)

**Назначение**: Элементы управления (кнопки, переключатели).

**Примеры**:

- Кнопки действий
- Переключатели фильтров
- Элементы управления состоянием

### 9. Menus (`components/menus/`)

**Назначение**: Меню действий, dropdown меню.

**Примеры**:

- `PalletActionsMenu` — меню действий с паллетой
- `RowCardMenu` — меню в карточке ряда

## Страницы (`pages/`)

**Назначение**: Страницы модуля для роутинга.

**Структура**:

```
pages/
├── {entity}.tsx
├── {entities}.tsx
└── ...
```

**Пример** (`pages/ask.tsx`):

```typescript
import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import {
  AskContainer,
  AskContainerSkeleton,
} from "@/modules/asks/components/containers/ask-container";
import { AskFetcher } from "@/modules/asks/components/fetchers/ask-fetcher";
import { useParams } from "react-router";

export function Ask() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <SidebarInsetLayout headerText="Запит">
        <main className="p-2">
          <div className="text-muted-foreground text-center">
            ID запиту не знайдено
          </div>
        </main>
      </SidebarInsetLayout>
    );
  }

  return (
    <SidebarInsetLayout headerText="Запит">
      <main className="p-2">
        <AskFetcher
          id={id}
          ContainerComponent={AskContainer}
          SkeletonComponent={AskContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
```

**Принципы**:

- Страницы используют Fetchers
- Обёрнуты в Layout компоненты
- Получают параметры из роутера
- Минимум логики (только роутинг и layout)

## Поток данных

```
┌─────────┐
│  Page   │
└────┬────┘
     │
     ▼
┌─────────┐
│ Fetcher │ ──► API Hook (Query/Mutation)
└────┬────┘        │
     │             ▼
     │        API Service
     │             │
     │             ▼
     │        Backend
     │
     ├─► Loading ──► Skeleton
     ├─► Error ──► ErrorDisplay
     ├─► NoData ──► LoadingNoData
     │
     ▼
┌───────────┐
│ Container │ ──► Business Logic, State, Mutations
└─────┬─────┘
      │
      ▼
┌─────────────┐
│ ViewContainer│ ──► Presentation Layer (JSX)
└──────┬──────┘
       │
       ├─► Cards
       ├─► Lists
       ├─► Forms
       ├─► Dialogs
       └─► Elements
```

## Паттерны именования

### Компоненты

| Тип             | Паттерн                  | Пример                 |
| --------------- | ------------------------ | ---------------------- |
| Fetcher (один)  | `{Entity}Fetcher`        | `AskFetcher`           |
| Fetcher (много) | `{Entities}Fetcher`      | `AsksFetcher`          |
| Container       | `{Entity}Container`      | `AskContainer`         |
| ContainerView   | `{Entity}ContainerView`  | `AskContainerView`     |
| Skeleton        | `{Entity}Skeleton`       | `AskContainerSkeleton` |
| Card            | `{Entity}Card`           | `AskDetailsCard`       |
| List            | `{Entities}List`         | `AsksList`             |
| Dialog          | `{Action}{Entity}Dialog` | `CreateAskDialog`      |
| Form            | `{Action}{Entity}Form`   | `CreateAskForm`        |
| Element         | `{Entity}{Property}`     | `ArtImage`, `AskQuant` |

### API

| Тип                       | Паттерн                        | Пример                   |
| ------------------------- | ------------------------------ | ------------------------ |
| Query Hook                | `use{Entity}Query`             | `useAskQuery`            |
| Query Hook (список)       | `use{Entities}Query`           | `useAsksQuery`           |
| Query Hook (по параметру) | `use{Entities}By{Param}Query`  | `useAsksByDateQuery`     |
| Mutation Hook             | `use{Action}{Entity}Mutation`  | `useCreateAskMutation`   |
| Query Service             | `get{Entity}`, `get{Entities}` | `getAskById`, `getAsks`  |
| Mutation Service          | `{action}{Entity}`             | `createAsk`, `updateAsk` |

### Файлы и папки

- Папки: `kebab-case` (например, `ask-container`, `create-ask-dialog`)
- Компоненты: `PascalCase.tsx` (например, `AskContainer.tsx`)
- Утилиты: `camelCase.ts` (например, `sortPosesByType.ts`)
- Типы: `camelCase.ts` или `dto.ts`, `types.ts`

## Принципы и лучшие практики

### 1. Разделение ответственности

- **Services** — только HTTP запросы
- **Hooks** — React Query интеграция и управление кешем
- **Fetchers** — управление состояниями загрузки
- **Containers** — бизнес-логика
- **Views** — презентация
- **Pages** — роутинг и layout

### 2. Типизация

- Все компоненты и функции строго типизированы
- Используются TypeScript utility types
- DTO типы соответствуют бэкенду
- Props интерфейсы явно описаны

### 3. Переиспользование

- Общие UI компоненты в `@/components/ui`
- Shared компоненты в `@/components/shared`
- Модульные компоненты в `{module}/components/shared`
- Утилиты в `{module}/utils`

### 4. Консистентность

- Единые паттерны именования
- Единая структура папок
- Единый подход к обработке состояний
- Единый стиль кода

### 5. Масштабируемость

- Модули независимы друг от друга
- Легко добавлять новые модули
- Легко расширять существующие
- Чёткое разделение на слои

### 6. Тестируемость

- Каждый слой тестируется отдельно
- Services — unit тесты
- Hooks — тесты с React Query
- Components — тесты с React Testing Library

## Создание нового модуля

### Шаг 1: Создание структуры

```bash
modules/
└── new-module/
    ├── api/
    │   ├── hooks/
    │   │   ├── mutations/
    │   │   └── queries/
    │   ├── services/
    │   │   ├── mutations/
    │   │   └── queries/
    │   └── types/
    │       └── dto.ts
    ├── components/
    │   ├── fetchers/
    │   ├── containers/
    │   ├── cards/
    │   ├── dialogs/
    │   ├── forms/
    │   └── elements/
    └── pages/
```

### Шаг 2: Определение типов

Создать `api/types/dto.ts` с типами данных

### Шаг 3: Создание Services

Реализовать функции API вызовов в `api/services/`

### Шаг 4: Создание Hooks

Создать React Query хуки в `api/hooks/`

### Шаг 5: Создание Fetchers

Реализовать Fetcher компоненты

### Шаг 6: Создание Containers

Реализовать Container, ContainerView, ContainerSkeleton

### Шаг 7: Создание остальных компонентов

По мере необходимости создавать Cards, Lists, Forms, Dialogs и т.д.

### Шаг 8: Создание Pages

Создать страницы и добавить их в роутер

## Примеры модулей

### Простой модуль (rows)

- CRUD операции
- Список + детальная страница
- Диалоги создания/редактирования/удаления

### Средний модуль (asks)

- CRUD + специфичные действия (complete, reject)
- Фильтрация по датам
- Связь с другими модулями (arts, poses)

### Сложный модуль (poses)

- CRUD + bulk операции
- Множественные фильтры
- Сложные связи (pallet, row, art)
- Утилиты сортировки

## Дополнительные материалы

- **Fetchers, Containers, Skeletons** — см. `web/src/modules/README.md`
- **API Asks** — см. `web/src/modules/asks/api/README.md`
- **API Poses** — см. `web/src/modules/poses/api/README-Pos.md`

## Заключение

Следование данной архитектуре обеспечивает:

- **Консистентность** — единообразный код по всему проекту
- **Масштабируемость** — легко добавлять новые модули
- **Поддерживаемость** — понятная структура для новых разработчиков
- **Тестируемость** — чёткое разделение на слои
- **Переиспользование** — компоненты легко использовать в разных контекстах

При возникновении вопросов или необходимости отклонения от паттернов — обсуди это с командой.
