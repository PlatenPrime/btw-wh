# Архитектура модулей: Fetchers, Containers и Skeletons

## Обзор

В проекте используется новая архитектура компонентов, которая разделяет ответственность между получением данных, их обработкой и отображением. Эта архитектура состоит из трех основных типов компонентов:

1. **Fetchers** - отвечают за получение данных и управление состояниями загрузки
2. **Containers** - обрабатывают бизнес-логику и передают данные в View компоненты
3. **Skeletons** - отображают состояние загрузки с имитацией структуры контента

## Структура компонентов

### 1. Fetchers

**Назначение**: Fetchers связывают API хуки с контейнерами и управляют состояниями загрузки, ошибок и отсутствия данных.

**Расположение**: `components/fetchers/{entity}-fetcher/`

**Структура**:

```
fetchers/
├── {entity}-fetcher/
│   └── {Entity}Fetcher.tsx
```

**Пример**:

```typescript
export function ArtFetcher({ artikul }: ArtFetcherProps) {
  const { data: artData, isLoading, error } = useOneArtQuery(artikul);

  if (isLoading) return <ArtContainerSkeleton />;

  if (error) return <ErrorDisplay error={error} />;

  if (!artData) return <LoadingNoData />;

  return <ArtContainer artData={artData} />;
}
```

**Ответственность**:

- Вызов соответствующих API хуков
- Обработка состояний: loading, error, no data
- Рендеринг соответствующих компонентов в зависимости от состояния

### 2. Containers

**Назначение**: Containers содержат бизнес-логику и передают обработанные данные в View компоненты.

**Расположение**: `components/containers/{entity}-container/`

**Структура**:

```
containers/
├── {entity}-container/
│   ├── {Entity}Container.tsx
│   ├── {Entity}ContainerSkeleton.tsx
│   ├── {Entity}ContainerView.tsx
│   └── components/ (опционально)
```

**Пример**:

```typescript
export function ArtsContainer({
  data,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  search,
  onSearchChange,
}: ArtsContainerProps) {
  const bottomRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <ArtsContainerView
      data={data}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      search={search}
      onSearchChange={onSearchChange}
      bottomRef={bottomRef}
    />
  );
}
```

**Ответственность**:

- Обработка бизнес-логики (пагинация, поиск, фильтрация)
- Управление состоянием компонента
- Передача данных в View компонент

### 3. Skeletons

**Назначение**: Skeletons отображают состояние загрузки, имитируя структуру реального контента.

**Расположение**: `components/containers/{entity}-container/{Entity}ContainerSkeleton.tsx`

**Принципы**:

- Каждый компонент должен иметь свой скелетон
- Скелетон контейнера содержит скелетоны дочерних компонентов
- Структура скелетона должна соответствовать структуре реального контента

**Пример**:

```typescript
export function ArtsContainerSkeleton() {
  return (
    <main className="grid max-w-screen grid-cols-1 gap-2 p-2 md:gap-4 md:p-4">
      <SearchPanelSkeleton />
      <ArtsGridSkeleton />
      <div className="h-8" />
    </main>
  );
}
```

### 4. View компоненты

**Назначение**: View компоненты отвечают только за отображение данных без бизнес-логики.

**Расположение**: `components/containers/{entity}-container/{Entity}ContainerView.tsx`

**Ответственность**:

- Только отображение данных
- Обработка UI взаимодействий
- Передача событий обратно в Container

## Паттерн использования

### В страницах (Pages)

```typescript
export function Arts() {
  return (
    <SidebarInsetLayout headerText="Артикули">
      <ArtsFetcher />
    </SidebarInsetLayout>
  );
}
```

### Поток данных

```
Page → Fetcher → Container → ContainerView → UI Components
  ↓       ↓         ↓            ↓
API   Loading   Business    Presentation
     States    Logic       Layer
```

## Преимущества архитектуры

1. **Разделение ответственности**: Каждый компонент имеет четко определенную роль
2. **Переиспользование**: Containers и Skeletons можно использовать в разных контекстах
3. **Тестируемость**: Легко тестировать каждый слой отдельно
4. **Консистентность**: Единообразный подход к обработке состояний загрузки
5. **Масштабируемость**: Легко добавлять новые сущности по тому же паттерну

## Примеры реализации

### Arts модуль

- `ArtFetcher` - получение одного артикула
- `ArtsFetcher` - получение списка артикулов с пагинацией
- `ArtContainer` / `ArtsContainer` - обработка данных
- `ArtContainerSkeleton` / `ArtsContainerSkeleton` - состояния загрузки

### Asks модуль

- `AsksFetcher` - получение запросов по дате
- `AsksContainer` - обработка навигации по датам
- `AsksContainerSkeleton` - скелетон с навигацией

## Миграция существующих модулей

При приведении существующих модулей к новой архитектуре:

1. Создать Fetcher компоненты для каждого API хука
2. Рефакторить существующие Container компоненты
3. Создать соответствующие Skeleton компоненты
4. Обновить страницы для использования Fetchers
5. Убедиться, что структура Skeleton соответствует реальному контенту
