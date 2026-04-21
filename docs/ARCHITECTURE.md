# Архитектура проекта BTW-WH

## Оглавление

1. [Общая структура проекта](#общая-структура-проекта)
2. [Модульная архитектура](#модульная-архитектура)
3. [Паттерны разработки](#паттерны-разработки)
4. [Организация API слоя](#организация-api-слоя)
5. [Компоненты и их структура](#компоненты-и-их-структура)
6. [Типизация](#типизация)
7. [Оптимизация производительности](#оптимизация-производительности)
8. [Руководство по добавлению нового модуля](#руководство-по-добавлению-нового-модуля)

## Общая структура проекта

Проект использует монорепозиторий с разделением на:
- `web/` - веб-приложение (React + TypeScript + Vite)
- `mobile/` - мобильное приложение (пока не реализовано)

### Структура веб-приложения

```
web/src/
├── components/          # Общие компоненты
│   ├── layout/         # Компоненты макета (sidebar, header)
│   ├── shared/         # Переиспользуемые компоненты
│   │   └── charts/     # Спільні графіки, скелетони, chart-date-range-toolbar (без привʼязки до модуля)
│   └── ui/             # Базовые UI компоненты (shadcn/ui)
├── modules/            # Функциональные модули
├── pages/              # Системные страницы (main, not-found)
├── hooks/              # Глобальные хуки
├── lib/                # Утилиты и конфигурация
├── providers/          # React провайдеры
├── router.tsx          # Конфигурация роутинга
├── types/              # Общие типы
│   ├── api.ts          # Типы для API
│   ├── charts-range.ts # Точки рядів для спільних range-графіків (див. components/shared/charts)
│   └── components/     # Типы для компонентов (dialog, fetcher)
└── utils/              # Глобальные утилиты
```

## Модульная архитектура

Каждый модуль представляет собой самодостаточную функциональную единицу со следующей структурой:

```
modules/{module-name}/
├── api/                # Работа с API
│   ├── hooks/         # React Query хуки
│   │   ├── queries/   # Запросы данных
│   │   └── mutations/ # Изменение данных
│   ├── services/      # Функции для API запросов
│   │   ├── queries/   # Функции запросов
│   │   └── mutations/ # Функции мутаций
│   └── types/         # Типы модуля (DTO, интерфейсы)
├── components/        # UI компоненты модуля
│   ├── actions/       # Header actions (регистрация экшенов хедера + связанные диалоги)
│   ├── cards/         # Карточки отображения данных
│   ├── charts/        # Только визуализация и композиция графиков (без логики загрузки данных)
│   ├── containers/    # Контейнеры (логика + представление)
│   ├── controls/      # Панели фильтров, периодов, переключателей (имя каталога — всегда controls, не control)
│   ├── dialogs/       # Диалоговые окна
│   ├── elements/      # Мелкие переиспользуемые элементы
│   ├── fetchers/      # Компоненты загрузки данных
│   ├── forms/         # Формы
│   └── lists/         # Списки и гриды
├── pages/             # Страницы роутера
├── hooks/             # Модульные хуки
├── utils/             # Утилиты модуля
└── constants/         # Константы модуля
```

**Дополнительные каталоги в `components/`** (только если модуль это оправдывает): `menus/` (контекстные меню действий), `tables/` (таблицы, если не подходит `lists/`), `common/`, `entity-label/`, `shared/` — вспомогательные куски UI; `skeletons/` — исключение для одного скелетона всей области контента (см. `sku-statistics`); в остальных случаях скелетоны **рядом** с компонентом (см. раздел про скелетоны ниже).

### Принципы модульности

1. **Изоляция**: Модуль должен быть максимально независимым
2. **Единообразие**: Все модули следуют одной структуре
3. **Переиспользование**: Общие компоненты выносятся в `components/shared/`
4. **Типизация**: Каждый модуль имеет свои типы в `api/types/`

Небольшие модули (например, только график и фильтры) могут содержать **минимальный** набор папок из списка выше — без дублирования пустых каталогов.

**Графики и контейнеры — жёсткое разделение**

1. **Только `modules/{module}/components/charts/`** (в модулях): всё, что относится к **визуализации графика** этого модуля (секция с графиком, chart-layout, легенда, оси, обёртки библиотеки графиков, презентационные `*ChartView` / секции без запросов к API и без состояния загрузки сценария). Переиспользуемые между модулями презентационные графики и тулбар периода — в **`web/src/components/shared/charts/`**. Здесь **не** размещают контейнеры с хуками данных в стиле `*Container.tsx` для сценария страницы.
2. **Только `components/containers/`**: **вся** контейнерная логика сценария (React Query и прочие хуки, состояние фильтров/периода, подготовка данных для графика). Контейнер и его `*ContainerView` **импортируют** готовые презентационные части из `charts/` и собирают экран; **нельзя** держать в `containers/` дублирующую разметку графика, которая должна жить в `charts/`.
3. **Запрещено** размещать в `containers/` пары вроде `*ChartContainer` / `*ChartView`, если по сути это графический блок: такие view выносятся в `charts/`, а в `containers/` остаётся (или создаётся заново) контейнер сценария с тем же паттерном `*Container` / `*ContainerView`, который только подключает компоненты из `charts/`. Временные отступления от правила в коде не продлеваются новым функционалом — модуль нужно привести к документу.
4. Если для графика **ещё нет** контейнера с логикой загрузки — **создать** отдельный контейнер в `components/containers/` (`*Container` + `*ContainerView`) и **обязательно** добавить к нему согласованный скелетон (`*ContainerSkeleton` в той же папке контейнера, реэкспорт в `index.ts`), по правилам раздела «Скелетоны и состояние ожидания». Fetcher/страница показывают скелетон этого контейнера на время ожидания данных.

## Паттерны разработки

### Container/View паттерн

**Принцип**: Разделение логики и представления на два компонента.

- **Container** (`*Container.tsx`) - содержит логику, хуки, состояние
- **View** (`*ContainerView.tsx`) - содержит только рендеринг

```typescript
// Container - логика
export function ArtsContainer({ data, ... }: ArtsContainerProps) {
  const bottomRef = useInfiniteScroll({ ... });
  const { isPrime } = useRole();
  
  return (
    <>
      <ArtsContainerView data={data} bottomRef={bottomRef} />
      <DeleteDialog ... />
    </>
  );
}

// View - представление
export function ArtsContainerView({ data, bottomRef }: ArtsContainerViewProps) {
  return (
    <main>
      <SearchPanel ... />
      <ArtsGrid arts={data} />
      <div ref={bottomRef} />
    </main>
  );
}
```

**Правило**: Один компонент допустим только если это исключительно компонент отрисовки без логики.

### Fetcher паттерн

**Принцип**: Отдельный компонент для загрузки данных и обработки состояний.

```typescript
interface ArtsFetcherProps {
  ContainerComponent: ComponentType<{ data: ArtDto[]; ... }>;
  SkeletonComponent: ComponentType;
}

// SkeletonComponent — это скелетон контейнера/секции (например ArtsContainerSkeleton),
// а не разовый <Skeleton /> из UI-kit без повторения структуры экрана.
export function ArtsFetcher({ ContainerComponent, SkeletonComponent }: ArtsFetcherProps) {
  const { data, isLoading, error } = useArtsQuery(...);
  
  if (isLoading) return <SkeletonComponent />;
  if (error) return <ErrorDisplay ... />;
  if (!data) return <LoadingNoData ... />;
  
  return <ContainerComponent data={data} ... />;
}
```

**Преимущества**:
- Единая обработка состояний загрузки/ошибок
- Переиспользование логики загрузки
- Легкое тестирование

### Dialog паттерн

**Принцип**: Поддержка controlled/uncontrolled режимов и разделение логики.

```typescript
interface CreateZoneDialogProps {
  open?: boolean;              // Controlled режим
  onOpenChange?: (open: boolean) => void;
}

export function CreateZoneDialog({ open: controlledOpen, onOpenChange }: CreateZoneDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;
  
  const { handleSuccess, handleCancel } = useCreateZoneDialog({
    onOpenChange: handleOpenChange,
  });
  
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <CreateZoneDialogView onSuccess={handleSuccess} onCancel={handleCancel} />
    </Dialog>
  );
}
```

**Паттерн use*Dialog хука**:
```typescript
export function useCreateZoneDialog({ onOpenChange }: UseDialogProps) {
  const handleSuccess = () => {
    onOpenChange?.(false);
  };
  
  const handleCancel = () => {
    onOpenChange?.(false);
  };
  
  return { handleSuccess, handleCancel };
}
```

## Организация API слоя

### Трехуровневая архитектура

1. **Services** (`api/services/`) - чистые функции для API запросов
2. **Hooks** (`api/hooks/`) - React Query хуки, обертки над services
3. **Types** (`api/types/`) - TypeScript типы и DTO

### Services

Чистые функции без побочных эффектов:

```typescript
// api/services/queries/getArtsByParams.ts
export const getArtsByParams = async ({
  page,
  limit,
  search = "",
  signal,
}: GetArtsParams): Promise<ArtsDto> => {
  const query = new URLSearchParams({ ... });
  const res = await apiClient.get<ArtsDto>(`/arts?${query.toString()}`, { signal });
  return res.data;
};
```

### Hooks

React Query хуки, использующие services:

```typescript
// api/hooks/queries/useArtsQuery.tsx
export function useArtsQuery({ page, limit, search, ... }: UseArtsQueryParams) {
  const debouncedSearch = useDebounce(search, 500);
  
  return useQuery<ArtsDto>({
    queryKey: ["arts", { page, limit, search: debouncedSearch }],
    queryFn: ({ signal }) => getArtsByParams({ page, limit, search: debouncedSearch, signal }),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
}
```

### Типы

Используются общие типы из `@/types/api`:
- `EntityResponse<T>` - ответ с одной сущностью
- `PaginatedResponse<T>` - пагинированный ответ
- `MutationResponse<T>` - ответ на мутацию
- `DeleteResponse<T>` - ответ на удаление

## Компоненты и их структура

### Категории компонентов

1. **Cards** - карточки для отображения данных
2. **Actions** - компоненты для регистрации header actions и связанных диалогов/побочных эффектов
3. **Containers** - контейнеры с логикой (Container/View)
4. **Dialogs** - диалоговые окна
5. **Elements** - мелкие переиспользуемые элементы
6. **Fetchers** - компоненты загрузки данных
7. **Forms** - формы с валидацией
8. **Lists** - списки и гриды
9. **Charts** (в модуле) — только визуализация и layout в `modules/.../components/charts/`; загрузка данных и состояние сценария — в `containers/` (см. «Графики и контейнеры»). Общие chart-компоненты — `components/shared/charts/`.
10. **Controls** - панели фильтров, периодов, переключателей (`components/controls/`)
11. **Menus** (опционально) - контекстные меню действий над сущностью
12. **Tables** (опционально) - табличные представления, если доменно уместнее, чем `lists/`

### Скелетоны и состояние ожидания

Правило относится к **значимым UI-блокам**, участвующим в сценарии загрузки: секции страницы, контейнеры, списки и гриды, карточки сущности, тяжёлые формы при первом показе, chart-секции. Атомарные обёртки вроде одной кнопки скелетоном не сопровождаются.

1. **Соседство файлов**: для `Foo.tsx` в папке `foo/` рядом лежит `FooSkeleton.tsx`. В `index.ts` папки реэкспортируются и компонент, и скелетон (как `SkuChartsSection` и `SkuChartsSectionSkeleton` в `skus`).
2. **Составной UI**: если `Foo` собирает дочерние секции с известной вёрсткой, `FooSkeleton` композирует те же дочерние `*Skeleton` или повторяет структуру разметки — не один безликий прямоугольник, если у блока явный каркас.
3. **Где показывать**: в fetcher при `isLoading` / `isPending`; как `fallback` у `React.Suspense`; при любом осмысленном ожидании данных для этого блока — согласованный скелетон вместо пустого экрана или голого спиннера (если для экрана принят skeleton-first подход).
4. **Сопровождение**: изменение вёрстки, отступов, секций `Foo` в том же изменении должно обновлять `FooSkeleton`, иначе состояние загрузки врёт о финальном layout.

### Header Actions паттерн (`components/actions`)

**Задача**: спрятать всю логику регистрации действий хедера (через `useRegisterHeaderActions`) и связанные с ними диалоги/навигацию/тосты так, чтобы страницы и контейнеры не содержали логики хедера.

**Структура**:

```
modules/<module>/components/actions/<kebab>-header-actions/
├── <Pascal>HeaderActions.tsx      # логика + useRegisterHeaderActions
├── <Pascal>HeaderActionsView.tsx  # только рендер диалогов/компонентов
└── index.ts                       # реэкспорт
```

**Правила**:
- `*HeaderActions.tsx` может содержать хуки, состояния, side-effects, React Query и т.д.
- `*HeaderActionsView.tsx` — только рендер (без хуков), получает данные/колбэки через props.
- На странице/в контейнере должен быть максимум один вызов actions-компонента (например: `<DefsHeaderActions />`, `<RowsHeaderActions />`). Вызовы `useRegisterHeaderActions` вне `components/actions` запрещены.

### Именование

- Компоненты: `PascalCase` (например, `ArtsContainer`)
- Файлы: соответствуют имени компонента (например, `ArtsContainer.tsx`)
- Папки: `kebab-case` (например, `arts-container/`)

### Экспорты

Используются `index.ts` файлы для экспортов:

```typescript
// components/containers/arts-container/index.ts
export { ArtsContainer } from "./ArtsContainer";
export { ArtsContainerSkeleton } from "./ArtsContainerSkeleton";
export type { ArtsContainerProps } from "./ArtsContainer";
```

## Типизация

### Общие типы

Расположены в `src/types/api.ts`:
- `EntityResponse<T>` - ответ с одной сущностью
- `PaginatedResponse<T>` - пагинированный ответ
- `MutationResponse<T>` - ответ на мутацию
- `DeleteResponse<T>` - ответ на удаление
- `BulkResponse<T>` - ответ на bulk операции
- `ExportResponse` - ответ с экспортом файла
- `ApiError` - ошибка API

### Типы модулей

Каждый модуль определяет свои типы в `api/types/`:
- DTO (Data Transfer Objects)
- Параметры запросов
- Ответы API

### Типы для компонентов

Базовые типы для компонентов расположены в `src/types/components/`:
- **Dialog типы** (`dialog-types.ts`):
  - `BaseDialogProps`
  - `DialogWithTriggerProps`
  - `DialogWithSuccessProps`
  - `UseDialogReturn`
- **Fetcher типы** (`fetcher-types.ts`):
  - `BaseFetcherProps<TData, TParams>`
  - `InfiniteFetcherProps<TData, TParams>`
  - `CustomFetcherProps<TData, TParams>`

## Оптимизация производительности

### Кэширование данных

Используется React Query с настройками:

```typescript
useQuery({
  queryKey: ["arts", params],
  queryFn: fetchData,
  placeholderData: keepPreviousData,  // Плавные переходы
  staleTime: 5 * 60 * 1000,          // 5 минут
});
```

### Infinite Scroll

Для больших списков используется infinite scroll:

```typescript
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
  queryKey: ["arts", search],
  queryFn: ({ pageParam = 1 }) => getArts({ page: pageParam, limit: 20 }),
  getNextPageParam: (lastPage) => lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
});
```

### Мемоизация

Используйте `useMemo` и `useCallback` для тяжелых вычислений:

```typescript
const filteredData = useMemo(() => {
  return data.filter(item => item.status === 'active');
}, [data]);

const handleClick = useCallback(() => {
  // обработка
}, [dependencies]);
```

### Code Splitting

Все страницы используют lazy loading:

```typescript
const Arts = lazy(() => import("./modules/arts/pages/arts"));
```

### Рекомендации по оптимизации

1. **Виртуализация**: Для списков > 100 элементов используйте `react-window` или `react-virtuoso`
2. **Debounce**: Для поиска используйте debounce (уже реализован в `useDebounce`)
3. **Skeleton**: для значимых блоков UI — отдельный `*Skeleton.tsx` рядом с компонентом и использование его при загрузке (см. [Скелетоны и состояние ожидания](#скелетоны-и-состояние-ожидания))
4. **Error Boundaries**: Используйте Error Boundaries для обработки ошибок

## Руководство по добавлению нового модуля

### Шаг 1: Создание структуры

```bash
modules/new-module/
├── api/
│   ├── hooks/
│   │   ├── queries/
│   │   └── mutations/
│   ├── services/
│   │   ├── queries/
│   │   └── mutations/
│   └── types/
│       └── dto.ts
├── components/
│   ├── actions/
│   ├── cards/
│   ├── charts/
│   ├── containers/
│   ├── controls/
│   ├── dialogs/
│   ├── elements/
│   ├── fetchers/
│   ├── forms/
│   └── lists/
├── pages/
├── hooks/
├── utils/
└── constants/
```

### Шаг 2: Определение типов

```typescript
// api/types/dto.ts
import type { EntityResponse, PaginatedResponse } from "@/types/api";

export interface NewModuleDto {
  _id: string;
  title: string;
  // ...
}

export type NewModuleResponse = EntityResponse<NewModuleDto>;
export interface NewModulesResponse extends PaginatedResponse<NewModuleDto> {}
```

### Шаг 3: Создание Services

```typescript
// api/services/queries/getNewModules.ts
import { apiClient } from "@/lib/apiClient";
import type { NewModulesResponse } from "../types/dto";

export const getNewModules = async (params: GetNewModulesParams): Promise<NewModulesResponse> => {
  const res = await apiClient.get<NewModulesResponse>("/new-modules", { params });
  return res.data;
};
```

### Шаг 4: Создание Hooks

```typescript
// api/hooks/queries/useNewModulesQuery.tsx
import { useQuery } from "@tanstack/react-query";
import { getNewModules } from "../services/queries/getNewModules";
import { keepPreviousData } from "@tanstack/react-query";

export function useNewModulesQuery(params: GetNewModulesParams) {
  return useQuery({
    queryKey: ["new-modules", params],
    queryFn: ({ signal }) => getNewModules({ ...params, signal }),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
}
```

### Шаг 5: Создание Fetcher

```typescript
// components/fetchers/new-modules-fetcher/NewModulesFetcher.tsx
import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useNewModulesQuery } from "../../api/hooks/queries/useNewModulesQuery";

// SkeletonComponent — скелетон того же контейнера/секции, что и ContainerComponent (например NewModulesContainerSkeleton).
export function NewModulesFetcher({ ContainerComponent, SkeletonComponent, params }: NewModulesFetcherProps) {
  const { data, isLoading, error } = useNewModulesQuery(params);
  
  if (isLoading) return <SkeletonComponent />;
  if (error) return <ErrorDisplay error={error} ... />;
  if (!data?.data) return <LoadingNoData ... />;
  
  return <ContainerComponent data={data} />;
}
```

### Шаг 6: Создание Container/View

```typescript
// components/containers/new-modules-container/NewModulesContainer.tsx
export function NewModulesContainer({ data }: NewModulesContainerProps) {
  // Логика
  return <NewModulesContainerView data={data} />;
}

// components/containers/new-modules-container/NewModulesContainerView.tsx
export function NewModulesContainerView({ data }: NewModulesContainerViewProps) {
  // Рендер
  return <div>...</div>;
}
```

### Шаг 7: Создание страницы

```typescript
// pages/new-modules.tsx
import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { NewModulesFetcher } from "../components/fetchers/new-modules-fetcher";

export function NewModules() {
  return (
    <SidebarInsetLayout headerText="Новый модуль">
      <NewModulesFetcher ... />
    </SidebarInsetLayout>
  );
}
```

### Шаг 8: Добавление роута

```typescript
// router.tsx
const NewModules = lazy(() =>
  import("./modules/new-module/pages/new-modules").then((module) => ({
    default: module.NewModules,
  }))
);

// В конфигурации роутера
{
  path: "new-modules",
  element: <NewModules />,
}
```

## Импорты

### Абсолютные пути

Используется алиас `@/` для абсолютных путей от `src/`:

```typescript
import { apiClient } from "@/lib/apiClient";
import { ArtsContainer } from "@/modules/arts/components/containers/arts-container";
```

### Относительные пути

Для импортов внутри модуля используйте относительные пути:

```typescript
// Внутри модуля arts
import { useArtsQuery } from "../api/hooks/queries/useArtsQuery";
```

## Стилизация

### Tailwind CSS

Проект использует Tailwind CSS для стилизации.

### Правила

1. **Не используйте `space-x` или `space-y`** - используйте `gap` в flex/grid
2. **Mobile-first подход** - начинайте с мобильных стилей
3. **Используйте утилиты Tailwind** - избегайте кастомных CSS

### Примеры

```tsx
// ✅ Правильно
<div className="flex gap-2">
  <Button>1</Button>
  <Button>2</Button>
</div>

// ❌ Неправильно
<div className="flex space-x-2">
  <Button>1</Button>
  <Button>2</Button>
</div>
```

## Тестирование

### Структура тестов

Тесты располагаются рядом с тестируемым кодом или в `__tests__/` папках.

### Инструменты

- **Vitest** - для unit тестов
- **React Testing Library** - для тестирования компонентов

## Линтинг и форматирование

### ESLint

Конфигурация в `eslint.config.js`.

### Prettier

Используется для форматирования кода с плагином для Tailwind CSS.

## Заключение

Эта документация описывает основные принципы и паттерны проекта. При добавлении нового функционала следуйте этим принципам для поддержания консистентности кодовой базы.

