# Руководство по разработке мобильного приложения

## Содержание

1. [Технологический стек](#технологический-стек)
2. [Архитектура проекта](#архитектура-проекта)
3. [Паттерны разработки](#паттерны-разработки)
4. [Стилизация и темизация](#стилизация-и-темизация)
5. [Навигация и роутинг](#навигация-и-роутинг)
6. [Работа с данными](#работа-с-данными)
7. [Правила и конвенции](#правила-и-конвенции)

---

## Технологический стек

### Основные технологии

- **Expo** (~54.0.30) - фреймворк для разработки React Native приложений
- **React Native** (0.81.5) - кроссплатформенная разработка
- **TypeScript** (5.9.2) - типизация кода
- **Expo Router** (~6.0.21) - file-based routing для навигации

### Ключевые библиотеки

#### Управление состоянием и данными

- **@tanstack/react-query** (^5.87.4) - управление серверным состоянием, кеширование, синхронизация
- **React Hook Form** (^7.60.0) - управление формами
- **Zod** (^3.25.75) - валидация схем и типизация

#### UI и стилизация

- **NativeWind** (^4.1.23) - Tailwind CSS для React Native
- **@gluestack-ui/core** (^3.0.10) - UI компоненты
- **@expo/vector-icons** (^15.0.3) - иконки

#### Навигация

- **@react-navigation/native** (^7.1.8) - навигация
- **@react-navigation/bottom-tabs** (^7.4.0) - табы

#### Анимации и жесты

- **react-native-reanimated** (~4.1.0) - анимации
- **react-native-gesture-handler** (~2.28.0) - обработка жестов
- **@legendapp/motion** (^2.3.0) - анимации

#### Безопасность и хранение

- **expo-secure-store** (~15.0.8) - безопасное хранение токенов
- **@react-native-async-storage/async-storage** (^2.1.0) - локальное хранилище

---

## Архитектура проекта

### Модульная структура

Проект организован по модульному принципу. Каждый модуль представляет собой функциональную область приложения и содержит:

```
modules/
  {module-name}/
    api/
      hooks/
        queries/      # React Query hooks для запросов
        mutations/    # React Query hooks для мутаций
      services/
        queries/      # Функции для GET запросов
        mutations/    # Функции для POST/PUT/DELETE запросов
      types/
        dto.ts        # TypeScript типы для API
    components/
      actions/        # Header actions (регистрация экшенов хедера + связанные диалоги)
      cards/          # Карточки для отображения данных
      containers/     # Контейнеры с логикой
      dialogs/        # Модальные окна
      elements/       # Переиспользуемые элементы
      fetchers/       # Компоненты для загрузки данных
      forms/          # Формы с валидацией
      lists/          # Списки элементов
      shared/         # Общие компоненты модуля
    constants/        # Константы модуля
```

### Организация файлов

#### Корневые директории

- `app/` - файлы роутинга (Expo Router file-based routing)
- `components/` - общие компоненты приложения
  - `layout/` - компоненты макета (header, sidebar, page-layout)
  - `shared/` - переиспользуемые компоненты
  - `ui/` - базовые UI компоненты (Gluestack UI)
- `modules/` - функциональные модули
- `providers/` - провайдеры контекста (Theme, Auth, Query)
- `constants/` - глобальные константы
- `hooks/` - переиспользуемые хуки

### Принципы разделения ответственности

1. **Модульность** - каждая функциональная область изолирована в своем модуле
2. **Разделение слоев** - четкое разделение между API, бизнес-логикой и представлением
3. **Переиспользование** - общие компоненты выносятся в `components/` или `modules/{module}/components/shared/`
4. **Типизация** - все данные типизированы через TypeScript и Zod схемы

---

## Паттерны разработки

### Fetcher → Container → View

Проект использует трехслойную архитектуру компонентов:

#### 1. Fetcher (Загрузчик данных)

**Назначение**: Загрузка данных, обработка состояний загрузки и ошибок

**Правила**:

- Использует React Query hooks для получения данных
- Обрабатывает состояния: `isLoading`, `error`, `data`
- Показывает скелетоны во время загрузки
- Передает данные в Container компонент
- Может принимать кастомные Container и Skeleton компоненты через props

**Пример**:

```typescript
// modules/arts/components/fetchers/art-fetcher/ArtFetcher.tsx
export function ArtFetcher({
  artikul,
  ContainerComponent = ArtContainer,
  SkeletonComponent = ArtContainerSkeleton,
}: ArtFetcherProps) {
  const { data, isLoading, error } = useOneArtQuery(artikul);

  if (isLoading) return <SkeletonComponent />;
  if (error) return <ErrorView error={error} />;
  if (!data) return <NotFoundView />;

  return <ContainerComponent artData={data} />;
}
```

#### 2. Container (Контейнер с логикой)

**Назначение**: Бизнес-логика, состояние, обработка событий

**Правила**:

- Содержит всю логику компонента (хуки, вычисления, обработчики)
- Управляет локальным состоянием (`useState`, `useEffect`)
- Вызывает мутации и обрабатывает их результаты
- Передает данные и колбэки в View компонент

#### Actions (Header Actions)

**Назначение**: Регистрация действий хедера (`useRegisterHeaderActions`) и связанные с ними диалоги/side-effects, чтобы не смешивать это с контентом экрана.

**Правила**:
- `useRegisterHeaderActions` должен жить только в `modules/*/components/actions/*`.
- Actions-компонент может быть Container/View:
  - `*HeaderActions.tsx` — логика, state, side-effects
  - `*HeaderActionsView.tsx` — только рендер (без хуков)
- На экран/контейнер подключается одним компонентом: `<XxxHeaderActions />`.

**Пример**:

```typescript
// modules/arts/components/containers/art-container/ArtContainer.tsx
export function ArtContainer({ artData }: ArtContainerProps) {
  const [updateLimitDialogOpen, setUpdateLimitDialogOpen] = useState(false);

  return (
    <>
      <ArtHeaderActions artData={artData} />
      <ArtContainerView artData={artData} />
    </>
  );
}
```

#### 3. View (Презентационный компонент)

**Назначение**: Только рендеринг UI, без логики

**КРИТИЧЕСКИ ВАЖНО**: Компоненты с суффиксом `View` должны быть **чистыми презентационными компонентами** без логики.

**Что НЕ должно быть в View компонентах**:

- ❌ Хуки React (`useState`, `useEffect`, `useColorScheme`, `useQuery` и т.д.)
- ❌ Вычисления и бизнес-логика
- ❌ Обращения к API
- ❌ Условная логика (кроме простых условных рендеров)
- ❌ Обработка данных (`.map()`, `.filter()`, `.find()` и т.д.)

**Что ДОЛЖНО быть в View компонентах**:

- ✅ Только рендеринг UI
- ✅ Получение данных через props
- ✅ Вызов колбэков через props
- ✅ Простые условные рендеры (`{condition && <Component />}`)

**Пример**:

```typescript
// modules/arts/components/containers/art-container/ArtContainerView.tsx
export function ArtContainerView({
  artData,
  updateLimitDialogOpen,
  setUpdateLimitDialogOpen,
}: ArtContainerViewProps) {
  return (
    <>
      <ScrollView className="flex-1" contentContainerClassName="p-4 gap-4">
        <ArtDetailCard artData={artData} />
      </ScrollView>
      <UpdateArtLimitDialog
        artData={artData}
        open={updateLimitDialogOpen}
        onOpenChange={setUpdateLimitDialogOpen}
      />
    </>
  );
}
```

**Преимущества такого подхода**:

1. **Тестируемость** - View компоненты легко тестировать, так как они чистые функции
2. **Переиспользование** - View компоненты можно использовать в разных контекстах
3. **Разделение ответственности** - логика отделена от представления
4. **Производительность** - легче оптимизировать и мемоизировать

### Структура API слоя

#### Services (Сервисы)

**Назначение**: Чистые функции для выполнения HTTP запросов

**Правила**:

- Используют `fetch` API
- Получают токен из secure storage
- Обрабатывают ошибки и возвращают типизированные данные
- Поддерживают `AbortSignal` для отмены запросов

**Пример**:

```typescript
// modules/rows/api/services/queries/getRows.ts
export const getRows = async ({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<RowDto[]> => {
  const token = await getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${SERVER_URL}rows`, {
    method: "GET",
    headers,
    signal,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch rows");
  }

  return res.json() as Promise<RowDto[]>;
};
```

#### Hooks (React Query хуки)

**Назначение**: Обертки над React Query для удобного использования в компонентах

**Правила**:

- Используют `useQuery` для GET запросов
- Используют `useMutation` для POST/PUT/DELETE запросов
- Определяют `queryKey` для кеширования
- Настраивают `enabled`, `staleTime` и другие опции
- Передают `signal` в сервисы для поддержки отмены

**Пример**:

```typescript
// modules/rows/api/hooks/queries/useRowsQuery.tsx
export function useRowsQuery() {
  return useQuery<RowDto[]>({
    queryKey: ["rows"],
    queryFn: ({ signal }) => getRows({ signal }),
    enabled: true,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}
```

### Работа с формами

#### React Hook Form + Zod

**Назначение**: Управление формами с валидацией

**Правила**:

1. Создавать Zod схему в отдельном файле `schema.ts`
2. Использовать `zodResolver` для интеграции с React Hook Form
3. Типизировать данные формы через `z.infer<typeof schema>`
4. Использовать `Controller` для кастомных компонентов
5. Обрабатывать ошибки валидации и серверные ошибки

**Пример схемы**:

```typescript
// modules/arts/components/forms/update-art-limit-form/schema.ts
import { z } from "zod";

export const updateArtLimitSchema = z.object({
  limit: z
    .number()
    .min(0, "Ліміт не може бути від'ємним")
    .max(999999, "Ліміт не може перевищувати 999999"),
});

export type UpdateArtLimitFormData = z.infer<typeof updateArtLimitSchema>;
```

**Пример формы**:

```typescript
const form = useForm<UpdateArtLimitFormData>({
  resolver: zodResolver(updateArtLimitSchema),
  mode: "onSubmit",
  reValidateMode: "onChange",
  defaultValues: {
    limit: artData.limit || 0,
  },
});

const onSubmit = async (data: UpdateArtLimitFormData) => {
  try {
    await updateMutation.mutateAsync({ id, data });
    onSuccess();
  } catch (error) {
    form.setError("root", {
      message: error instanceof Error ? error.message : "Помилка",
    });
  }
};
```

---

## Стилизация и темизация

### NativeWind (Tailwind CSS для React Native)

**Конфигурация**: `tailwind.config.js`

**Правила использования стилей**:

- ✅ Используй `gap` для создания промежутков между элементами
- ❌ НЕ используй `space-x` или `space-y` - они не работают корректно в React Native
- Используй `className` для применения стилей
- Комбинируй Tailwind классы с инлайн стилями при необходимости

**Пример**:

```typescript
// ✅ ПРАВИЛЬНО
<View className="flex-row gap-4">
  <Button />
  <Button />
</View>

// ❌ НЕПРАВИЛЬНО
<View className="flex-row space-x-4">
  <Button />
  <Button />
</View>
```

### Работа с темой

#### Цветовая схема

Тема определена в `constants/theme.ts`:

- `Colors.light` - цвета для светлой темы
- `Colors.dark` - цвета для темной темы
- `SemanticColors` - семантические цвета для UI компонентов (card, dialog, error и т.д.)

#### Централизованная система темизации

Для работы с темами в переиспользуемых компонентах используется централизованная система:

##### Хук `useThemeColors`

**Назначение**: Централизованное получение цветов темы для текущей темы (light/dark)

**Расположение**: `hooks/use-theme-colors.ts`

**Использование**:

```typescript
import { useThemeColors } from "@/hooks/use-theme-colors";

function MyComponent() {
  const { card, dialog, text, error } = useThemeColors();

  return (
    <Box
      style={{
        backgroundColor: card.bg,
        borderColor: card.border,
      }}
    >
      <Text style={{ color: text.primary }}>Текст</Text>
    </Box>
  );
}
```

**Доступные цвета**:

- `card.bg`, `card.border` - цвета для карточек
- `dialog.bg`, `dialog.border` - цвета для диалогов
- `error.bg`, `error.border`, `error.text` - цвета для ошибок
- `sidebar.border` - цвет границы sidebar
- `text.primary`, `text.icon` - цвета текста
- `background.primary` - основной цвет фона
- `placeholder` - цвет placeholder текста
- `switch.track`, `switch.thumb` - цвета для Switch
- `static.*` - статические цвета (не зависят от темы)

##### Компонент `Card`

**Назначение**: Базовый компонент карточки с автоматической поддержкой темы

**Расположение**: `components/ui/card/`

**Варианты**:

- `default` - базовая карточка с закругленными углами
- `outlined` - карточка с границей
- `elevated` - карточка с тенью

**Использование**:

```typescript
import { ThemedCard, ThemedText } from "@/components/themed";

// Автоматически применяет тему
<ThemedCard variant="outlined" className="p-4">
  <ThemedText>Содержимое карточки</ThemedText>
</ThemedCard>

// С кастомными стилями
<ThemedCard
  variant="default"
  className="p-2"
  style={{ padding: 16 }} // Переопределяет базовые стили
>
  <ThemedText>Кастомная карточка</ThemedText>
</ThemedCard>
```

**Преимущества**:

- Автоматическое применение цветов темы
- Поддержка вариантов (default, outlined, elevated)
- Возможность кастомизации через `className` и `style`
- Типизированные пропсы

##### Утилиты для работы со стилями

**Расположение**: `utils/theme-styles.ts`

**Функции**:

- `combineThemeStyles(baseStyles, customStyles)` - комбинирует базовые стили темы с кастомными
- `createCardStyles(bgColor, borderColor?, additionalStyles?)` - создает стили для карточки

**Использование**:

```typescript
import { combineThemeStyles, createCardStyles } from "@/utils/theme-styles";
import { useThemeColors } from "@/hooks/use-theme-colors";

function MyComponent() {
  const { card } = useThemeColors();

  // Комбинирование стилей
  const baseStyles = { backgroundColor: card.bg, borderColor: card.border };
  const customStyles = { padding: 16 };
  const combined = combineThemeStyles(baseStyles, customStyles);

  // Или использование готовой функции
  const cardStyles = createCardStyles(card.bg, card.border, { padding: 16 });

  return <Box style={combined}>...</Box>;
}
```

#### Принципы использования темы

##### Для базовых компонентов (Card, Button)

Используй готовые компоненты с поддержкой темы из коробки:

```typescript
// ✅ ПРАВИЛЬНО - автоматическая поддержка темы
import { ThemedCard, ThemedButton } from '@/components/themed';

<ThemedCard variant="outlined" className="p-4">
  <ThemedButton variant="default">Кнопка</ThemedButton>
</ThemedCard>
```

##### Для кастомизации через пропсы

Используй `className` и `style` для дополнительной кастомизации:

```typescript
<Card
  variant="outlined"
  className="p-4 rounded-xl" // Дополнительные Tailwind классы
  style={{ margin: 8 }} // Дополнительные inline стили
>
  ...
</Card>
```

##### Для специфичных случаев

Используй хук `useThemeColors` для получения цветов и применения через `style`:

```typescript
import { useThemeColors } from "@/hooks/use-theme-colors";
import { ThemedBox } from "@/components/themed";

function CustomComponent() {
  const { card, error } = useThemeColors();

  return (
    <ThemedBox
      className="p-2 rounded-lg"
      style={{
        backgroundColor: card.bg,
        borderColor: error.border,
      }}
    >
      ...
    </ThemedBox>
  );
}
```

#### Миграция существующих компонентов

При обновлении существующих компонентов для использования новой системы:

**Было**:

```typescript
import { useTheme } from "@/providers/theme-provider";
import { SemanticColors } from "@/constants/theme";

function PosCardView() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const bgColor =
    theme === "light"
      ? SemanticColors.card.bg.light
      : SemanticColors.card.bg.dark;
  const borderColor =
    theme === "light" ? SemanticColors.card.border.light : undefined;

  return (
    <Box
      className="p-2 rounded-lg border"
      style={{ backgroundColor: bgColor, borderColor: borderColor }}
    >
      ...
    </Box>
  );
}
```

**Стало**:

```typescript
import { ThemedCard } from "@/components/themed";

function PosCardView() {
  return (
    <ThemedCard variant="outlined" className="p-2">
      ...
    </ThemedCard>
  );
}
```

#### Themed компоненты

Используй готовые компоненты для автоматической поддержки темы:

- `ThemedView` - View с поддержкой темы
- `ThemedText` - Text с поддержкой темы
- `Card` - карточка с поддержкой темы

```typescript
import { ThemedView, ThemedText, ThemedCard } from "@/components/themed";

<ThemedView className="flex-1">
  <ThemedCard variant="outlined">
    <ThemedText type="defaultSemiBold">Заголовок</ThemedText>
  </ThemedCard>
</ThemedView>;
```

### Цветовая палитра

Проект использует расширенную цветовую палитру через CSS переменные:

- `primary`, `secondary`, `tertiary` - основные цвета
- `error`, `success`, `warning`, `info` - семантические цвета
- `typography`, `outline`, `background` - системные цвета

Доступ через Tailwind классы: `bg-primary-500`, `text-error-600`, `border-outline-300`

### Импорты

**Правило**: Используй абсолютные импорты от директории `src` (которая в проекте является корнем `mobile/`)

**Формат**: `@/path/to/file`

**Пример**:

```typescript
// ✅ ПРАВИЛЬНО
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { ThemedView } from "@/components/themed/themed-view";
import { SERVER_URL } from "@/constants/server";

// ❌ НЕПРАВИЛЬНО
import { useAuth } from "../../../modules/auth/api/hooks/useAuth";
```

---

## Навигация и роутинг

### Expo Router (File-based Routing)

**Принцип**: Структура файлов в `app/` определяет структуру роутов

**Структура**:

```
app/
  index.tsx              # / (главная страница)
  login.tsx              # /login
  (tabs)/                # Группа табов
    index.tsx            # /(tabs)/
    arts/
      index.tsx          # /(tabs)/arts
      [artikul].tsx      # /(tabs)/arts/:artikul
  modal.tsx              # /modal (модальное окно)
```

### Защита роутов

#### ProtectedRoute компонент

**Назначение**: Защита страниц от неавторизованных пользователей и проверка прав доступа

**Использование**:

```typescript
import { ProtectedRoute } from "@/modules/auth/components/ProtectedRoute";

// Доступно только авторизованным
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

// Доступно только админам и выше (с учетом иерархии)
<ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
  <AdminPanel />
</ProtectedRoute>

// Доступно только PRIME (точное совпадение)
<ProtectedRoute allowedRoles={[RoleType.PRIME]} exactMatch>
  <SuperAdminPanel />
</ProtectedRoute>
```

**Параметры**:

- `allowedRoles?: RoleType[]` - разрешенные роли (по умолчанию - все авторизованные)
- `exactMatch?: boolean` - точное совпадение роли без учета иерархии (по умолчанию - false)

**Иерархия ролей**: `PRIME > ADMIN > USER`

### Навигация программно

```typescript
import { useRouter } from "expo-router";

const router = useRouter();

// Переход на страницу
router.push("/arts/12345");

// Замена текущей страницы
router.replace("/login");

// Назад
router.back();
```

---

## Работа с данными

### TanStack Query паттерны

#### Query Keys (Ключи запросов)

**Правила**:

- Используй массив для ключей: `["resource"]` или `["resource", { id }]`
- Включай все параметры запроса в ключ для правильного кеширования
- Используй консистентную структуру во всем приложении

**Примеры**:

```typescript
// Простой список
queryKey: ["rows"];

// С параметрами
queryKey: ["art", { artikul }];
queryKey: ["row", { rowId }];

// Вложенные ресурсы
queryKey: ["pallet", { palletId }, "poses"];
```

#### Настройка запросов

**Рекомендуемые настройки**:

```typescript
useQuery({
  queryKey: ["resource", { id }],
  queryFn: ({ signal }) => getResource(id, signal),
  enabled: !!id, // Запрос выполняется только если id существует
  staleTime: 5 * 60 * 1000, // 5 минут - данные считаются свежими
  gcTime: 10 * 60 * 1000, // 10 минут - время хранения в кеше
});
```

#### Infinite Queries (Бесконечная прокрутка)

Для списков с пагинацией:

```typescript
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useInfiniteQuery({
    queryKey: ["arts", { search }],
    queryFn: ({ pageParam = 0, signal }) =>
      getArts({ page: pageParam, search, signal }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasNext ? pages.length : undefined,
    initialPageParam: 0,
  });
```

#### Mutations (Мутации)

```typescript
const mutation = useMutation({
  mutationFn: (data: CreateRowData) => createRow(data),
  onSuccess: () => {
    // Инвалидировать связанные запросы
    queryClient.invalidateQueries({ queryKey: ["rows"] });
  },
  onError: (error) => {
    // Обработка ошибок
    console.error("Ошибка создания:", error);
  },
});

// Использование
await mutation.mutateAsync({ title: "Новая строка" });
```

### Обработка ошибок и состояний загрузки

#### Стандартные состояния

```typescript
const { data, isLoading, error, refetch } = useQuery(...);

// Загрузка
if (isLoading) return <SkeletonComponent />;

// Ошибка
if (error) {
  return (
    <ErrorView
      message={error instanceof Error ? error.message : "Ошибка загрузки"}
      onRetry={refetch}
    />
  );
}

// Нет данных
if (!data) return <NotFoundView />;

// Успешная загрузка
return <ContainerComponent data={data} />;
```

#### Обработка ошибок в сервисах

```typescript
if (!res.ok) {
  const message =
    typeof data === "object" && data && "message" in data
      ? (data as { message?: string }).message
      : undefined;
  throw new Error(message || "Failed to fetch resource");
}
```

### Pull-to-Refresh (Обновление потягиванием)

**Правило**: Все компоненты со списками (`FlatList`) и скроллируемым контентом (`ScrollView`) ДОЛЖНЫ поддерживать pull-to-refresh по умолчанию.

**Реализация**:

1. **Fetcher компоненты** должны извлекать `refetch` и `isRefetching` из React Query hooks и передавать их в Container
2. **Container компоненты** должны передавать `refreshing` и `onRefresh` в View компоненты
3. **View компоненты** должны использовать `RefreshControl` с `refetch` для обновления данных

**Пример для FlatList**:

```typescript
// View компонент
import { RefreshControl } from "react-native";
import { ThemedFlatList } from "@/components/themed";

interface MyListViewProps {
  data: Item[];
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function MyListView({
  data,
  refreshing = false,
  onRefresh,
}: MyListViewProps) {
  return (
    <ThemedFlatList
      data={data}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      // ... другие props
    />
  );
}
```

**Пример для ScrollView**:

```typescript
// View компонент
import { RefreshControl } from "react-native";
import { ThemedScrollView } from "@/components/themed";

interface MyContainerViewProps {
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function MyContainerView({
  refreshing = false,
  onRefresh,
}: MyContainerViewProps) {
  return (
    <ThemedScrollView
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      // ... другие props
    />
  );
}
```

**Поток данных**:

```typescript
// Fetcher: извлекает refetch и isRefetching из query hook
const { data, refetch, isRefetching } = useQuery(...);

// Container: получает refreshing и onRefresh, передает в View
<ContainerComponent
  data={data}
  refreshing={isRefetching}
  onRefresh={() => void refetch()}
/>

// View: использует RefreshControl
<FlatList
  refreshControl={
    onRefresh ? (
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    ) : undefined
  }
/>
```

**Особенности для Infinite Queries**:

Для `useInfiniteQuery` функция `refetch()` автоматически сбросит пагинацию и загрузит данные заново с первой страницы:

```typescript
const { data, refetch, isRefetching } = useInfiniteQuery(...);

// refetch() автоматически сбросит пагинацию
<ContainerComponent
  data={flatData}
  refreshing={isRefetching}
  onRefresh={() => void refetch()}
/>
```

---

## Правила и конвенции

### Именование файлов и компонентов

#### Файлы

- **Компоненты**: PascalCase - `ArtContainer.tsx`, `ArtContainerView.tsx`
- **Хуки**: camelCase с префиксом `use` - `useRowsQuery.tsx`, `useAuth.ts`
- **Сервисы**: camelCase - `getRows.ts`, `createRow.ts`
- **Типы**: camelCase - `dto.ts`, `types.ts`
- **Константы**: UPPER_SNAKE_CASE - `SERVER_URL`, `ROLES`

#### Компоненты

- **Container**: `{Resource}Container` - `ArtContainer`, `RowsContainer`
- **View**: `{Resource}ContainerView` - `ArtContainerView`, `RowsContainerView`
- **Fetcher**: `{Resource}Fetcher` - `ArtFetcher`, `RowsFetcher`
- **Card**: `{Resource}Card` или `{Resource}DetailCard` - `ArtDetailCard`, `ArtsGridCard`
- **Form**: `{Action}{Resource}Form` - `UpdateArtLimitForm`, `CreateRowForm`
- **Dialog**: `{Action}{Resource}Dialog` - `UpdateArtLimitDialog`

### Структура модулей

Каждый модуль должен следовать стандартной структуре:

```
modules/{module-name}/
  api/
    hooks/
      queries/
        use{Resource}Query.tsx
        use{Resource}ByIdQuery.tsx
      mutations/
        useCreate{Resource}Mutation.tsx
        useUpdate{Resource}Mutation.tsx
    services/
      queries/
        get{Resource}s.ts
        get{Resource}ById.ts
      mutations/
        create{Resource}.ts
        update{Resource}.ts
    types/
      dto.ts
  components/
    containers/
      {resource}-container/
        {Resource}Container.tsx
        {Resource}ContainerView.tsx
        {Resource}ContainerSkeleton.tsx
    fetchers/
      {resource}-fetcher/
        {Resource}Fetcher.tsx
    # ... другие типы компонентов
```

### Обработка ошибок

1. **В сервисах**: Бросай `Error` с понятным сообщением
2. **В формах**: Используй `form.setError()` для отображения ошибок
3. **В компонентах**: Показывай пользователю понятные сообщения об ошибках
4. **Логирование**: Используй `console.error()` для отладки, но не в production

### Типизация

1. **Все данные API**: Типизируй через TypeScript интерфейсы/типы
2. **Props компонентов**: Всегда определяй интерфейсы для props
3. **Формы**: Используй `z.infer<typeof schema>` для типов данных форм
4. **Функции**: Типизируй параметры и возвращаемые значения

**Пример**:

```typescript
// ✅ ПРАВИЛЬНО
interface ArtContainerProps {
  artData: ArtDto;
}

export function ArtContainer({ artData }: ArtContainerProps) {
  // ...
}

// ❌ НЕПРАВИЛЬНО
export function ArtContainer({ artData }: any) {
  // ...
}
```

### Комментарии и документация

1. **JSDoc для компонентов**: Документируй сложные компоненты и функции
2. **Комментарии для сложной логики**: Объясняй неочевидные решения
3. **Примеры использования**: Добавляй примеры в JSDoc для переиспользуемых компонентов

**Пример**:

```typescript
/**
 * Компонент для защиты роутов от неавторизованных пользователей
 * и проверки прав доступа на основе ролей
 *
 * @example
 * <ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
 *   <AdminPanel />
 * </ProtectedRoute>
 */
export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  // ...
}
```

### Производительность

1. **Мемоизация**: Используй `useMemo` и `useCallback` для тяжелых вычислений и функций
2. **Ленивая загрузка**: Используй `React.lazy` для больших компонентов
3. **Оптимизация списков**: Используй `FlatList` или `VirtualizedList` для длинных списков
4. **Кеширование**: Настраивай `staleTime` и `gcTime` в React Query

### Безопасность

1. **Токены**: Храни токены в `expo-secure-store`, не в `AsyncStorage`
2. **Валидация**: Всегда валидируй пользовательский ввод через Zod
3. **Защита роутов**: Используй `ProtectedRoute` для всех приватных страниц
4. **Проверка прав**: Проверяй права доступа на клиенте и сервере

---

## Полезные ссылки

- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [Gluestack UI Documentation](https://ui.gluestack.io/)

---

## Чеклист для нового модуля

При создании нового модуля убедись, что:

- [ ] Создана структура директорий согласно стандарту
- [ ] Определены типы в `api/types/dto.ts`
- [ ] Созданы сервисы для всех API endpoints
- [ ] Созданы React Query hooks для всех запросов
- [ ] Реализованы Fetcher компоненты
- [ ] Реализованы Container компоненты с логикой
- [ ] Реализованы View компоненты (чистые, без логики)
- [ ] Добавлены Skeleton компоненты для состояний загрузки
- [ ] Реализованы формы с валидацией (если нужны)
- [ ] Добавлена обработка ошибок
- [ ] Все компоненты типизированы
- [ ] Используются абсолютные импорты (`@/`)

---

## Типичные ошибки и их решения

### Ошибка: "Cannot read property 'displayName' of undefined" при использовании компонента Skeleton

**Проблема**: При использовании компонента `Skeleton` из `@/components/ui` возникает ошибка:
```
TypeError: Cannot read property 'displayName' of undefined
```

**Причина**: Компонент `Skeleton` из UI библиотеки не имеет свойства `displayName`, что вызывает проблему с `react-native-css-interop` при попытке обернуть компонент.

**Решение**: **НЕ используй компонент `Skeleton`**. Вместо этого используй компонент `Box` с инлайн стилями и классом `bg-secondary-300` для создания скелетонов.

**Правильный подход**:

```typescript
// ✅ ПРАВИЛЬНО - используй ThemedBox с инлайн стилями
import { ThemedBox } from "@/components/themed";

export function MyCardSkeleton() {
  return (
    <ThemedBox className="p-4 rounded-lg border border-outline-50 bg-background-0">
      <ThemedBox className="gap-2">
        <ThemedBox className="rounded bg-secondary-300" style={{ height: 24, width: "75%" }} />
        <ThemedBox className="gap-1">
          <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: "100%" }} />
          <ThemedBox className="h-px bg-outline-200 my-1" />
          <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: "100%" }} />
        </ThemedBox>
      </ThemedBox>
    </ThemedBox>
  );
}
```

**Неправильный подход**:

```typescript
// ❌ НЕПРАВИЛЬНО - не используй компонент Skeleton
import { ThemedBox } from "@/components/themed";
// ❌ НЕ импортируй Skeleton - его не существует в проекте

export function MyCardSkeleton() {
  return (
    <ThemedBox className="p-4 rounded-lg border border-outline-50 bg-background-0">
      {/* ❌ НЕ используй Skeleton - это вызовет ошибку */}
    </ThemedBox>
  );
}
```

**Примеры правильной реализации**:

Смотри примеры в существующих модулях:
- `mobile/modules/pallets/components/cards/pallet-card/PalletCardSkeleton.tsx`
- `mobile/modules/defs/components/cards/def-card/DefCardSkeleton.tsx`
- `mobile/modules/arts/components/cards/art-detail-card/ArtDetailCardSkeleton.tsx`

**Правила для скелетонов**:

1. ✅ Используй `ThemedBox` компонент с инлайн стилями
2. ✅ Используй класс `bg-secondary-300` для цвета скелетона
3. ✅ Используй класс `rounded` для закругления углов
4. ✅ Задавай размеры через инлайн стили: `style={{ height: 24, width: "75%" }}`
5. ❌ НЕ используй компонент `Skeleton` из `@/components/ui` (его не существует)
6. ❌ НЕ используй Tailwind классы для размеров скелетона (например, `h-6`, `w-3/4`)

**Почему это важно**: Эта ошибка может привести к краху приложения при рендеринге скелетонов во время загрузки данных. Всегда используй `ThemedBox` с инлайн стилями для создания скелетонов.

---

_Последнее обновление: 2025-01-27_
