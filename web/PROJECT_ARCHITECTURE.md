# Архитектура проекта BTW-WH

## Цель документации

Создать единый источник правды о проектных решениях, паттернах и архитектуре, чтобы новые модули использовали существующие наработки без дублирования решений.

## 1. Обзор проекта

### Технологический стек
- **React 19** - UI библиотека
- **TypeScript** - типизация
- **React Query v5** - управление серверным состоянием
- **React Router v7** - роутинг
- **Zod** - валидация схем
- **React Hook Form** - управление формами
- **Tailwind CSS v4** - стилизация
- **Shadcn UI** - UI компоненты на базе Radix UI
- **Axios** - HTTP клиент
- **date-fns** - работа с датами
- **Vitest** - тестирование

### Структура проекта
```
web/
├── src/
│   ├── components/          # Переиспользуемые компоненты
│   │   ├── shared/         # Общие компоненты
│   │   ├── ui/             # UI компоненты (Shadcn)
│   │   └── layout/         # Layout компоненты
│   ├── modules/            # Бизнес-модули
│   │   ├── arts/          # Артикулы
│   │   ├── asks/          # Запросы
│   │   ├── auth/          # Аутентификация
│   │   ├── defs/          # Определения
│   │   ├── pallets/       # Паллеты
│   │   ├── poses/         # Позиции
│   │   └── rows/          # Ряды
│   ├── hooks/             # Переиспользуемые хуки
│   ├── utils/             # Утилиты
│   ├── constants/         # Константы
│   ├── providers/         # React провайдеры
│   └── lib/               # Библиотеки
```

### Принципы разработки
- **Модульность**: каждый модуль - независимая функциональная единица
- **Переиспользование**: максимум переиспользуемых компонентов и утилит
- **Типизация**: строгая типизация всех компонентов и функций
- **Производительность**: lazy loading, code splitting, оптимизация рендеринга
- **Консистентность**: единые паттерны именования и структуры

## 2. Архитектура модулей

### Трехслойная архитектура
```
Page → Fetcher (управление состояниями) → Container (бизнес-логика) → View (презентация)
```

### API слой
```
Services (чистые функции) → Hooks (React Query) → Types (TypeScript)
```

### Паттерны именования
- **Компоненты**: `PascalCase.tsx`
- **Хуки**: `use{Name}`
- **Services**: `camelCase.ts`
- **Папки**: `kebab-case`
- **Типы**: `PascalCase` или `camelCase.ts`

### Существующие модули
- **arts** - управление артикулами
- **asks** - система запросов
- **auth** - аутентификация и авторизация
- **defs** - справочники
- **pallets** - управление паллетами
- **poses** - позиции на складе
- **rows** - ряды склада

> 📖 **Детальная документация**: `src/doc/modules-architecture.md`

## 3. API и управление состоянием

### apiClient
**Файл**: `src/lib/apiClient.tsx`

Централизованный axios клиент с interceptors:
- Автоматическое добавление Bearer токена
- Обработка ошибок 401/403 с редиректами
- Timeout 10 секунд
- Базовый URL из констант

```typescript
// Автоматическая авторизация
apiClient.interceptors.request.use((config) => {
  const token = getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Обработка ошибок авторизации
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Редирект на /unauthorized
    }
    if (error.response?.status === 403) {
      // Редирект на /forbidden
    }
    return Promise.reject(error);
  }
);
```

### React Query паттерны
- **Query хуки**: `use{Entity}Query`, `use{Entities}Query`
- **Mutation хуки**: `use{Action}{Entity}Mutation`
- **Query keys**: иерархические `["entity", param1, param2]`
- **staleTime**: 5 минут для большинства запросов
- **Инвалидация**: связанные кеши в `onSuccess`

### Infinite Query
```typescript
// Пример: src/modules/arts/api/hooks/queries/useArtsInfiniteQuery.tsx
export function useArtsInfiniteQuery({ limit, search, filters, enabled }) {
  return useInfiniteQuery({
    queryKey: ["arts-infinite", { limit, search, ...filters }],
    queryFn: ({ pageParam = 1 }) => getArtsByParams({ page: pageParam, limit, search, filters }),
    getNextPageParam: (result) => result.page + 1 <= result.totalPages ? result.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
```

## 4. Аутентификация и авторизация

### AuthProvider
**Файл**: `src/modules/auth/providers/auth-provider/auth-provider.tsx`

Контекст аутентификации с методами:
- `login()` - вход в систему
- `logout()` - выход из системы
- `register()` - регистрация
- `updateUser()` - обновление профиля
- `user` - данные текущего пользователя
- `isLoading` - состояние загрузки

### Система ролей
**Файл**: `src/constants/roles.ts`

Иерархия ролей: **PRIME (3) > ADMIN (2) > USER (1)**

```typescript
export const RoleType = {
  PRIME: "PRIME",
  ADMIN: "ADMIN", 
  USER: "USER",
} as const;

export function hasRoleAccess(userRole: string, requiredRole: RoleType): boolean {
  const userLevel = ROLE_HIERARCHY[userRole as RoleType] || 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole];
  return userLevel >= requiredLevel;
}
```

### Компоненты защиты
- **ProtectedRoute** - проверка авторизации
- **RoleGuard** - проверка роли
- **PermissionGuard** - проверка разрешений
- **ResourceOwnerGuard** - проверка владельца ресурса

### Утилиты проверки прав
- `hasRoleAccess(userRole, requiredRole)` - проверка доступа по роли
- `hasAnyRole(userRole, allowedRoles)` - проверка на любую из ролей
- `getRoleLevel(role)` - получение числового уровня роли
- `getRoleLabel(role)` - человекочитаемое название роли

## 5. Роутинг и навигация

### React Router v7
**Файл**: `src/router.tsx`

- **HashRouter** для SPA
- **Lazy loading** всех страниц
- **Error boundaries** на уровне роутов
- **Nested routes** для модулей

### Структура роутов
```
/                    # Главная
/login              # Вход
/register           # Регистрация
/unauthorized       # Не авторизован
/forbidden          # Нет прав
/arts/              # Артикулы
  ├── dashboard     # Список артикулов
  ├── update        # Обновление
  ├── utils         # Утилиты
  └── :artikul      # Детали артикула
/wh/                # Склад
  ├── rows          # Ряды
  ├── stocks        # Стоки
  ├── zones         # Зоны
  ├── utils         # Утилиты
  └── pallets/:title # Паллеты
/refiling/          # Пополнение
  ├── asks          # Запросы
  ├── defs          # Определения
  └── path          # Путь
```

### Layout система
```
App.tsx → SidebarProvider → AppSidebar
```

## 6. Переиспользуемые компоненты

### 6.1 Обработка ошибок
**Файл**: `src/components/shared/error-components/README.md`

#### ErrorDisplay
Универсальное отображение ошибок с вариантами:
- `default` - полная карточка с действиями
- `compact` - компактный Alert
- `fullscreen` - полноэкранное отображение

```typescript
<ErrorDisplay
  error={error}
  title="Ошибка загрузки"
  description="Не удалось загрузить данные"
  variant="default"
  onRetry={() => refetch()}
  onGoBack={() => navigate(-1)}
  onGoHome={() => navigate("/")}
/>
```

#### Специализированные компоненты
- **QueryErrorDisplay** - для React Query ошибок
- **FormErrorDisplay** - для ошибок форм
- **FieldErrorDisplay** - для ошибок полей
- **ErrorBoundary** - перехват JS ошибок
- **RouteErrorBoundary** - для роутера

#### useErrorHandler
Хук для управления состоянием ошибок:
```typescript
const { errorState, handleError, retry, goBack, goHome } = useErrorHandler();
```

### 6.2 Действия в Header
**Файл**: `src/components/layout/header-actions/README.md`

#### useRegisterHeaderActions
Регистрация действий в меню хедера страницы:

```typescript
useRegisterHeaderActions([
  {
    id: "create-item",
    label: "Создать элемент",
    icon: Plus,
    iconColor: "emerald",
    variant: "default",
    onClick: () => setDialogOpen(true),
  },
  {
    id: "delete-all",
    label: "Удалить все",
    icon: Trash,
    iconColor: "red",
    variant: "destructive",
    onClick: () => setDeleteDialogOpen(true),
  },
]);
```

**Цвета иконок**: `emerald`, `rose`, `red`, `default`
**Типы действий**: `default`, `destructive`

### 6.3 Действия в карточках
**Файл**: `src/components/shared/card-actions/README.md`

#### CardActionsMenu
Универсальное меню действий с dropdown:
- Решение конфликта Radix Dialog + Dropdown через `setTimeout`
- Группировка действий по `variant`
- Поддержка кастомного trigger

```typescript
<CardActionsMenu
  actions={actions}
  orientation="vertical"
  size="sm"
  trigger={<Button>Действия</Button>}
/>
```

### 6.4 Триггеры действий
**Папка**: `src/components/shared/triggers/`

Набор переиспользуемых кнопок-триггеров:
- `DeleteTrigger` - удаление (красная иконка корзины)
- `EditTrigger` - редактирование
- `CheckTrigger` - подтверждение
- `CancelTrigger` - отмена
- `MoveTrigger` - перемещение
- `ClearTrigger` - очистка
- `AskTrigger` - запрос

### 6.5 Loading states
**Папка**: `src/components/shared/loading-states/`

- **LoadingNoData** - состояние "нет данных"
- **LoadingError** - состояние ошибки
- **Loader** - индикатор загрузки
- **Skeleton** компоненты для всех основных элементов

### 6.6 Другие shared компоненты

#### ArtikulImageLink
**Файл**: `src/components/shared/artikul-image-link/ArtikulImageLink.tsx`
Ссылка на артикул с изображением и fallback

#### UserAvatarName
**Файл**: `src/components/shared/user/UserAvatarName.tsx`
Отображение пользователя с аватаром и именем

#### CalendarDate
**Файл**: `src/components/shared/date/CalendarDate.tsx`
Компонент календаря для выбора даты

#### DateNavigation
**Файл**: `src/components/shared/date-navigation/DateNavigation.tsx`
Навигация по датам с кнопками "предыдущая/следующая"

#### SearchPanel
**Файл**: `src/components/shared/search-components/search-panel/SearchPanel.tsx`
Панель поиска с debounce и скелетоном

#### Container
**Файл**: `src/components/shared/containers/Container.tsx`
Универсальный контейнер с прокруткой

#### DialogActions
**Файл**: `src/components/shared/dialog-actions/DialogActions.tsx`
Кнопки действий для диалогов (Отмена/Подтвердить)

## 7. UI компоненты

### Shadcn UI
**Папка**: `src/components/ui/`

Библиотека компонентов на базе Radix UI:
- **Button** - кнопки с вариантами
- **Input** - поля ввода
- **Card** - карточки
- **Dialog** - модальные окна
- **Dropdown** - выпадающие меню
- **Select** - селекты
- **Skeleton** - скелетоны
- **Progress** - прогресс-бары
- **Badge** - бейджи
- **Alert** - уведомления
- **Tooltip** - подсказки
- **Avatar** - аватары
- **Separator** - разделители
- **Sheet** - боковые панели
- **Sidebar** - боковое меню
- **Switch** - переключатели
- **Textarea** - многострочные поля

**Централизованный экспорт**: `src/components/ui/index.ts`

## 8. Хуки проекта

### useDebounce
**Файл**: `src/hooks/useDebounce.tsx`
Задержка обновления значения (для поиска):

```typescript
const debouncedSearch = useDebounce(search, 500);
```

### useInfiniteScroll
**Файл**: `src/hooks/useInfiniteScroll.ts`
Бесконечная прокрутка для window:

```typescript
const bottomRef = useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  rootMargin: "200px",
});
```

### useContainerInfiniteScroll
**Файл**: `src/hooks/useContainerInfiniteScroll.ts`
Бесконечная прокрутка для контейнера с overflow:

```typescript
const bottomRef = useContainerInfiniteScroll({
  hasNextPage,
  isFetching,
  fetchNextPage,
  containerRef,
});
```

### useMediaQuery
**Файл**: `src/hooks/useMediaQuery.tsx`
Медиа-запросы в JS

### useMobile
**Файл**: `src/hooks/use-mobile.ts`
Определение мобильного устройства

## 9. Утилиты проекта

### localStorage
**Файл**: `src/utils/localStorage.ts`
Обертки для безопасной работы с localStorage:
- `getItem(key)` - получение с типизацией
- `setItem(key, value)` - сохранение
- `removeItem(key)` - удаление

### updateSearchParams
**Файл**: `src/utils/updateSearchParams.ts`
Обновление URL параметров:

```typescript
updateSearchParams(params, { page: "2", search: "query" }, setParams);
```

### Работа с датами
**Файлы**: `src/utils/date.ts`, `src/utils/formatDate.ts`
Утилиты на базе date-fns для форматирования и работы с датами

### getParam
**Файл**: `src/utils/getParam.ts`
Извлечение параметров из URL

## 10. Работа с формами

### React Hook Form + Zod
Паттерн: `schema.ts` → `Form.tsx` → `FormView.tsx`

#### Schema файл
```typescript
// schema.ts
export const createEntitySchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  description: z.string().optional(),
});

export type CreateEntityData = z.infer<typeof createEntitySchema>;
export const createEntityDefaultValues: CreateEntityData = {
  title: "",
  description: "",
};
```

#### Form компонент
```typescript
// Form.tsx
export function CreateEntityForm({ onSuccess, onCancel }) {
  const form = useForm<CreateEntityData>({
    resolver: zodResolver(createEntitySchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: createEntityDefaultValues,
  });

  const mutation = useCreateEntityMutation();

  const onSubmit = async (data: CreateEntityData) => {
    try {
      await mutation.mutateAsync(data);
      onSuccess?.();
      form.reset();
    } catch (error) {
      form.setError("root", { message: "Ошибка создания" });
    }
  };

  return <CreateEntityFormView form={form} onSubmit={onSubmit} onCancel={onCancel} />;
}
```

#### FormView компонент
```typescript
// FormView.tsx
export function CreateEntityFormView({ form, onSubmit, onCancel }) {
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("title")} />
      {errors.title && <span>{errors.title.message}</span>}
      <DialogActions onCancel={onCancel} onSubmit={handleSubmit(onSubmit)} />
    </form>
  );
}
```

## 11. Пагинация и Infinite Scroll

### React Query useInfiniteQuery
```typescript
const {
  data,
  isLoading,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
} = useInfiniteQuery({
  queryKey: ["entities", { search, filters }],
  queryFn: ({ pageParam = 1 }) => getEntities({ page: pageParam, search, filters }),
  getNextPageParam: (result) => result.page + 1 <= result.totalPages ? result.page + 1 : undefined,
  initialPageParam: 1,
  staleTime: 5 * 60 * 1000,
  placeholderData: keepPreviousData,
});
```

### Интеграция с хуками прокрутки
```typescript
// Для window прокрутки
const bottomRef = useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
});

// Для контейнера с overflow
const containerRef = useRef<HTMLDivElement>(null);
const bottomRef = useContainerInfiniteScroll({
  hasNextPage,
  isFetching: isFetchingNextPage,
  fetchNextPage,
  containerRef,
});
```

### Debounce для поиска
```typescript
const [search, setSearch] = useState("");
const debouncedSearch = useDebounce(search, 500);

const { data } = useInfiniteQuery({
  queryKey: ["entities", { search: debouncedSearch }],
  queryFn: ({ pageParam }) => getEntities({ page: pageParam, search: debouncedSearch }),
  // ...
});
```

## 12. Паттерны работы с данными

### Fetcher паттерн
**Назначение**: Управление состояниями загрузки, ошибок и отсутствия данных

```typescript
// Fetcher.tsx
export function EntityFetcher({ id, ContainerComponent, SkeletonComponent }) {
  const { data, isLoading, error } = useEntityQuery({ id });

  if (isLoading) return <SkeletonComponent />;
  if (error) return <ErrorDisplay error={error} />;
  if (!data) return <LoadingNoData />;

  return <ContainerComponent entityData={data} />;
}
```

**Преимущества**:
- Переиспользуемость (один Fetcher для разных UI)
- Типобезопасность
- Единообразная обработка состояний

### Container паттерн
**Назначение**: Бизнес-логика и управление состоянием

```typescript
// Container.tsx
export function EntityContainer({ entityData }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const mutation = useUpdateEntityMutation();

  const handleUpdate = async (data) => {
    await mutation.mutateAsync(data);
    setDialogOpen(false);
  };

  return (
    <EntityContainerView
      entityData={entityData}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      onUpdate={handleUpdate}
    />
  );
}
```

**View компонент**: Только презентация, получает все через props
**Skeleton компонент**: Имитирует структуру реального контента

## 13. Dialogs и модальные окна

### Паттерн Dialog
```
Dialog.tsx (логика) → DialogView.tsx (презентация)
```

### Controlled компоненты
Все диалоги принимают `open` и `onOpenChange`:

```typescript
interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  // другие props
}

export function MyDialog({ open: controlledOpen, onOpenChange, ... }) {
  const [internalOpen, setInternalOpen] = useState(false);
  
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;
  
  // использование open и setOpen
}
```

### Интеграция с действиями
- **CardActionsMenu** - триггеры в карточках
- **HeaderActions** - триггеры в хедере
- **Формы внутри** - для create/update операций

## 14. Константы проекта

### roles.ts
**Файл**: `src/constants/roles.ts`
Роли и утилиты проверки прав:
- `RoleType` - типы ролей
- `ROLE_HIERARCHY` - числовая иерархия
- `hasRoleAccess()` - проверка доступа
- `getRoleLabel()` - человекочитаемые названия

### server.ts
**Файл**: `src/constants/server.ts`
URL сервера и API endpoints

### sklad.ts
**Файл**: `src/constants/sklad.ts`
Константы склада (зоны, типы и т.д.)

### art-image-url.ts
**Файл**: `src/constants/art-image-url.ts`
URL изображений артикулов

## 15. Провайдеры

### AuthProvider
**Файл**: `src/modules/auth/providers/auth-provider/auth-provider.tsx`
Контекст аутентификации с методами login, logout, register, updateUser

### QueryProvider
**Файл**: `src/providers/query-provider.tsx`
React Query клиент с настройками

### ThemeProvider
**Файл**: `src/providers/theme-provider.tsx`
Управление темной/светлой темой (next-themes)

### SidebarProvider
**Файл**: `src/components/ui/sidebar.tsx`
Состояние сайдбара (Shadcn)

### Композиция
**Файл**: `src/providers/providers.tsx`
```typescript
export const Providers = ({ children }) => (
  <AuthProvider>
    <QueryProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryProvider>
  </AuthProvider>
);
```

## 16. Layout система

### SidebarInsetLayout
**Файл**: `src/components/layout/SidebarInsetLayout.tsx`
Основной layout страниц с header и main

### AppSidebar
**Файл**: `src/components/layout/sidebar/AppSideBar.tsx`
Боковое меню навигации с:
- Логотип и переключатель темы
- Навигационные группы
- Профиль пользователя
- Мобильная поддержка

### ProfileSidebarCard
**Файл**: `src/components/layout/sidebar/profile-sidebar-card/ProfileSidebarCard.tsx`
Карточка профиля в сайдбаре

### HeaderActions
**Файл**: `src/components/layout/header-actions/`
Контекст для регистрации действий в header страниц

## 17. Стилизация и CSS

### Tailwind CSS v4
- **Плагин**: `@tailwindcss/vite`
- **Utility-first** подход
- **CSS переменные** для тем в `index.css`
- **Компоненты Shadcn** с customizable variants

### Правила стилизации
- Использовать `gap` вместо `space-x`/`space-y`
- Абсолютные импорты `@/` для всех путей
- Консистентные размеры и отступы
- Responsive design с mobile-first подходом

## 18. Абсолютные импорты

### Конфигурация
- **Alias**: `@/` указывает на `src/`
- **TypeScript**: `tsconfig.json`
- **Vite**: `vite.config.ts`

### Использование
```typescript
// ✅ Правильно
import { Button } from "@/components/ui/button";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";

// ❌ Неправильно
import { Button } from "../../../components/ui/button";
```

## 19. Типизация TypeScript

### Принципы
- **Строгая типизация** всех компонентов и функций
- **DTO типы** точно соответствуют бэкенду
- **Utility types**: Pick, Omit, Partial, Record
- **Export типов** из `index.ts` в папке types

### Пример DTO
```typescript
// src/modules/asks/api/types/dto.ts
export interface AskDto {
  _id: string;
  artikul: string;
  nameukr?: string;
  quant?: number;
  com?: string;
  asker: string;
  askerData: AskUserData;
  status: AskStatus;
  createdAt: string;
  updatedAt: string;
}

export type AskStatus = "new" | "completed" | "rejected" | "fail" | "solved";
```

### Props интерфейсы
```typescript
interface ComponentProps {
  data: EntityDto;
  onUpdate?: (data: UpdateEntityDto) => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}
```

## 20. Тестирование

### Настройка
- **Vitest** для unit-тестов
- **React Testing Library** для компонентов
- **@testing-library/user-event** для взаимодействий
- **Конфигурация**: `vitest.config.ts`

### Структура тестов
```
src/
├── test/
│   ├── setup.ts
│   └── vitest.test.ts
└── __tests__/
    └── components/
        └── Button.test.tsx
```

## 21. Модульные утилиты

Каждый модуль может иметь свои утилиты в папке `utils/`:

### Пример: poses/utils/sortPosesByType.ts
```typescript
export const sortPosesByType = (poses: IPos[], newPosIds: string[] = []): IPos[] => {
  const newPoses: IPos[] = [];
  const oldPoses: IPos[] = [];

  poses.forEach((pos) => {
    if (newPosIds.includes(pos._id)) {
      newPoses.push(pos);
    } else {
      oldPoses.push(pos);
    }
  });

  const sortedNewPoses = sortNewPalletPoses(newPoses, newPosIds);
  const sortedOldPoses = sortOldPalletsPoses(oldPoses);

  return [...sortedNewPoses, ...sortedOldPoses];
};
```

### Типы утилит
- Сортировка данных
- Форматирование
- Валидация
- Трансформация данных
- Фильтрация

## 22. Обработка изображений

### Image компонент
**Файл**: `src/components/shared/image/image.tsx`
- Lazy loading изображений
- Blur placeholder
- Fallback для ошибок

### ImageBlurContainer
**Файл**: `src/components/shared/image/image-blur-container.tsx`
Контейнер с эффектом blur для загрузки

### Оптимизация
- **WebP формат** для современных браузеров
- **Lazy loading** для производительности
- **Skeleton** во время загрузки

## 23. Работа с датами

### Библиотека date-fns
**Файлы**: `src/utils/date.ts`, `src/utils/formatDate.ts`

### Компоненты
- **CalendarDate** - выбор даты
- **DateNavigation** - навигация по датам

### Утилиты
```typescript
import { format, parseISO, addDays, subDays } from 'date-fns';

export const formatDate = (date: string | Date) => {
  return format(typeof date === 'string' ? parseISO(date) : date, 'dd.MM.yyyy');
};
```

## 24. Уведомления

### Sonner
**Файл**: `src/components/ui/sonner.tsx`

### Использование
```typescript
import { toast } from "sonner";

// Успех
toast.success("Операция выполнена успешно");

// Ошибка
toast.error("Произошла ошибка");

// Загрузка
toast.loading("Выполняется операция...");

// Кастомное
toast("Сообщение", {
  description: "Описание",
  action: {
    label: "Действие",
    onClick: () => console.log("Клик"),
  },
});
```

## 25. Best Practices проекта

### Компоненты
- ✅ **Функциональные компоненты**, не классы
- ✅ **Props интерфейсы** явно описаны
- ✅ **Разделение логики** (Container) и презентации (View)
- ✅ **Skeleton** для каждого компонента с данными
- ✅ **Controlled компоненты** для диалогов и форм

### API
- ✅ **Service функции** чистые и переиспользуемые
- ✅ **Hooks инкапсулируют** React Query логику
- ✅ **Типизированные** request/response
- ✅ **Инвалидация связанных** кешей в onSuccess
- ✅ **Error handling** в interceptors

### Формы
- ✅ **Zod схемы** для валидации
- ✅ **React Hook Form** для управления
- ✅ **Обработка ошибок** через `setError`
- ✅ **Disabled состояние** при отправке
- ✅ **Reset формы** после успешной отправки

### Стейт менеджмент
- ✅ **React Query** для серверного состояния
- ✅ **React Context** для глобального клиентского состояния (auth, theme)
- ✅ **useState/useReducer** для локального состояния
- ✅ **Custom hooks** для переиспользуемой логики

### Производительность
- ✅ **Lazy loading** страниц
- ✅ **Code splitting** через dynamic imports
- ✅ **Debounce** для поиска
- ✅ **Infinite scroll** вместо традиционной пагинации
- ✅ **keepPreviousData** для плавных переходов
- ✅ **Skeleton** компоненты для UX

### Типизация
- ✅ **Строгая типизация** всех компонентов
- ✅ **DTO типы** соответствуют бэкенду
- ✅ **Utility types** для переиспользования
- ✅ **Export типов** из index.ts

## 26. Структура нового модуля (Checklist)

При создании нового модуля следуй этой структуре:

```
modules/new-module/
├── api/
│   ├── hooks/
│   │   ├── mutations/
│   │   │   └── use{Action}{Entity}Mutation.tsx
│   │   └── queries/
│   │       └── use{Entity}Query.tsx
│   ├── services/
│   │   ├── mutations/
│   │   │   └── {action}{Entity}.ts
│   │   └── queries/
│   │       └── get{Entity}.ts
│   └── types/
│       ├── dto.ts
│       └── index.ts
├── components/
│   ├── fetchers/
│   │   └── {entity}-fetcher/
│   │       ├── {Entity}Fetcher.tsx
│   │       └── index.ts
│   ├── containers/
│   │   └── {entity}-container/
│   │       ├── {Entity}Container.tsx
│   │       ├── {Entity}ContainerView.tsx
│   │       ├── {Entity}ContainerSkeleton.tsx
│   │       └── index.ts
│   ├── cards/
│   ├── dialogs/
│   ├── forms/
│   └── elements/
├── pages/
│   └── {entity}.tsx
└── utils/ (опционально)
    └── {module-specific-utils}.ts
```

### Пошаговый план создания модуля

1. **Определи DTO типы** в `api/types/dto.ts`
2. **Создай service функции** для API в `api/services/`
3. **Оберни services** в React Query hooks в `api/hooks/`
4. **Создай Fetcher** для управления состояниями в `components/fetchers/`
5. **Реализуй Container, ContainerView, ContainerSkeleton** в `components/containers/`
6. **Добавь forms** с zod валидацией в `components/forms/`
7. **Создай dialogs** для CRUD операций в `components/dialogs/`
8. **Добавь страницу** в `pages/` и зарегистрируй роут в `router.tsx`
9. **Создай cards** для отображения в списках (если нужно)
10. **Добавь elements** для переиспользуемых элементов модуля

### Примеры существующих модулей
- **Простой модуль**: `rows` - CRUD операции, список + детальная страница
- **Средний модуль**: `asks` - CRUD + специфичные действия, фильтрация по датам
- **Сложный модуль**: `poses` - CRUD + bulk операции, множественные фильтры, сложные связи

## 27. Референсы и дополнительная документация

### Основная документация
- **Архитектура модулей**: `src/doc/modules-architecture.md`
- **Архитектура Fetchers/Containers**: `src/modules/README.md`

### API документация модулей
- **API модуля Asks**: `src/modules/asks/api/README.md`
- **API модуля Poses**: `src/modules/poses/api/README-Pos.md`

### Системная документация
- **Auth система**: `src/modules/auth/README.md`
- **Error компоненты**: `src/components/shared/error-components/README.md`
- **Card Actions**: `src/components/shared/card-actions/README.md`
- **Header Actions**: `src/components/layout/header-actions/README.md`

### Конфигурационные файлы
- **TypeScript**: `tsconfig.json`, `tsconfig.app.json`
- **Vite**: `vite.config.ts`
- **ESLint**: `eslint.config.js`
- **Vitest**: `vitest.config.ts`
- **Tailwind**: `tailwind.config.js`

---

## Заключение

Эта документация служит **единым источником правды** для всех разработчиков проекта BTW-WH. При создании новых модулей или компонентов всегда обращайся к этому документу, чтобы использовать существующие наработки и поддерживать консистентность архитектуры.

**Помни**: каждый новый модуль должен быть частью экосистемы, а не изолированным решением. Используй переиспользуемые компоненты, следуй установленным паттернам и документируй специфичные решения модуля.

---

*Последнее обновление: $(date)*
