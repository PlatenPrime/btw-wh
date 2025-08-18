# Руководство по интеграции компонентов обработки ошибок

## Обзор

Мы создали комплексную систему для обработки ошибок в вашем React + Vite + React Router приложении. Теперь вместо стандартных сообщений об ошибках пользователи будут видеть красивые, информативные интерфейсы с возможностью восстановления.

## Что было создано

### 1. Основные компоненты

- **ErrorBoundary** - перехватывает JavaScript ошибки
- **ErrorDisplay** - универсальный компонент для отображения ошибок
- **QueryErrorDisplay** - для ошибок React Query
- **FormErrorDisplay** - для ошибок в формах
- **FieldErrorDisplay** - для ошибок валидации полей

### 2. Хуки

- **useErrorHandler** - для удобной обработки ошибок в компонентах

### 3. Роутер

- **RouteErrorBoundary** - для обработки ошибок роутера

## Интеграция

### Шаг 1: Обновление роутера

Ваш роутер уже обновлен с `errorElement` для всех маршрутов. Теперь при возникновении ошибок в роутах пользователи увидят красивые страницы ошибок.

### Шаг 2: Обновление форм

Замените стандартные отображения ошибок в формах на новые компоненты:

```tsx
// Было:
{
  errors.title && (
    <span className="text-sm text-red-600">{errors.title.message}</span>
  );
}

// Стало:
{
  errors.title && <FieldErrorDisplay error={errors.title.message} />;
}

// Для корневых ошибок формы:
{
  errors.root && (
    <FormErrorDisplay error={errors.root.message} variant="compact" />
  );
}
```

### Шаг 3: Обновление API компонентов

Для компонентов, использующих React Query, добавьте обработку ошибок:

```tsx
import { QueryErrorDisplay } from "@/components/error-components";

function MyComponent() {
  const { data, error, isLoading, refetch } = useMyQuery();

  if (error) {
    return (
      <QueryErrorDisplay
        error={error}
        variant="compact"
        onRetry={() => refetch()}
      />
    );
  }

  // ... остальной код
}
```

### Шаг 4: Добавление ErrorBoundary

Для критических компонентов добавьте ErrorBoundary:

```tsx
import { ErrorBoundary } from "@/components/error-components";

<ErrorBoundary
  onError={(error, errorInfo) => {
    // Логирование в внешнюю систему
    logError(error, errorInfo);
  }}
>
  <CriticalComponent />
</ErrorBoundary>;
```

## Примеры использования

### В компоненте с API запросами

```tsx
import { useErrorHandler } from "@/components/error-components";

function DataComponent() {
  const { errorState, handleError, retry } = useErrorHandler();
  const { data, error, refetch } = useDataQuery();

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error, handleError]);

  if (errorState.hasError) {
    return (
      <ErrorDisplay
        error={errorState.error}
        onRetry={retry}
        variant="default"
      />
    );
  }

  return <div>{/* ваш контент */}</div>;
}
```

### В формах

```tsx
import {
  FormErrorDisplay,
  FieldErrorDisplay,
} from "@/components/error-components";

function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} />
      {errors.title && <FieldErrorDisplay error={errors.title.message} />}

      {errors.root && (
        <FormErrorDisplay error={errors.root.message} variant="compact" />
      )}
    </form>
  );
}
```

## Преимущества новой системы

1. **Лучший UX** - пользователи видят понятные сообщения об ошибках
2. **Возможность восстановления** - кнопки "Повторить", "Назад", "На главную"
3. **Автоматическое определение типа ошибки** - разные иконки и цвета для разных типов
4. **Адаптивный дизайн** - работает на всех устройствах
5. **Поддержка тем** - автоматически адаптируется к светлой/темной теме
6. **Три варианта отображения** - compact, default, fullscreen

## Тестирование

Для тестирования компонентов используйте `ErrorComponentsExample`:

```tsx
import { ErrorComponentsExample } from "@/components/error-components";

// В вашем роутере или компоненте
<Route path="/error-examples" element={<ErrorComponentsExample />} />;
```

## Мониторинг ошибок

В development режиме все ошибки автоматически логируются в консоль. Для продакшена используйте `onError` callback для интеграции с внешними системами мониторинга (Sentry, LogRocket и т.д.).

## Поддержка

Все компоненты полностью типизированы с TypeScript и следуют принципам доступности (ARIA). Они также совместимы с существующей системой тем вашего приложения.
