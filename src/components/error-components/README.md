# Компоненты для обработки ошибок

Этот модуль предоставляет набор компонентов для красивого и удобного отображения ошибок в приложении.

## Компоненты

### ErrorBoundary

Классовый компонент для перехвата JavaScript ошибок в дочерних компонентах.

```tsx
import { ErrorBoundary } from "@/components/error-components";

<ErrorBoundary
  onError={(error, errorInfo) => {
    // Логирование ошибки
    console.error(error, errorInfo);
  }}
>
  <YourComponent />
</ErrorBoundary>;
```

**Пропсы:**

- `children` - дочерние компоненты
- `fallback` - кастомный UI для отображения ошибки
- `onError` - callback для обработки ошибки

### ErrorDisplay

Универсальный компонент для отображения различных типов ошибок.

```tsx
import { ErrorDisplay } from "@/components/error-components";

<ErrorDisplay
  error={error}
  title="Произошла ошибка"
  description="Описание ошибки"
  variant="default" // "default" | "compact" | "fullscreen"
  onRetry={() => retry()}
  onGoBack={() => navigate(-1)}
  onGoHome={() => navigate("/")}
/>;
```

**Пропсы:**

- `error` - объект ошибки или строка
- `title` - заголовок ошибки
- `description` - описание ошибки
- `variant` - вариант отображения
- `onRetry` - функция повторной попытки
- `onGoBack` - функция возврата назад
- `onGoHome` - функция перехода на главную
- `showActions` - показывать ли кнопки действий
- `className` - дополнительные CSS классы

### QueryErrorDisplay

Специализированный компонент для отображения ошибок React Query.

```tsx
import { QueryErrorDisplay } from "@/components/error-components";

<QueryErrorDisplay
  error={queryError}
  variant="compact"
  onRetry={() => refetch()}
/>;
```

### FormErrorDisplay

Компонент для отображения ошибок в формах.

```tsx
import { FormErrorDisplay } from "@/components/error-components";

<FormErrorDisplay
  error={formErrors.root?.message}
  variant="compact"
  onDismiss={() => clearErrors("root")}
/>;
```

**Пропсы:**

- `error` - текст ошибки
- `onDismiss` - функция для скрытия ошибки
- `variant` - "default" | "compact"
- `className` - дополнительные CSS классы

### FieldErrorDisplay

Компонент для отображения ошибок валидации полей.

```tsx
import { FieldErrorDisplay } from "@/components/error-components";

<FieldErrorDisplay error={errors.title?.message} />;
```

## Хуки

### useErrorHandler

Хук для удобной обработки ошибок в компонентах.

```tsx
import { useErrorHandler } from "@/components/error-components";

function MyComponent() {
  const { errorState, handleError, retry, goBack, goHome } = useErrorHandler();

  const handleApiCall = async () => {
    try {
      await apiCall();
    } catch (error) {
      handleError(error);
    }
  };

  if (errorState.hasError) {
    return (
      <ErrorDisplay
        error={errorState.error}
        onRetry={retry}
        onGoBack={goBack}
        onGoHome={goHome}
      />
    );
  }

  return <div>...</div>;
}
```

## Использование в роутере

Для обработки ошибок роутера используйте `RouteErrorBoundary`:

```tsx
import { RouteErrorBoundary } from "@/components/route-error-boundary";

export const router = createHashRouter([
  {
    path: "/",
    Component: App,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        errorElement: <RouteErrorBoundary />,
      },
    ],
  },
]);
```

## Варианты отображения

### default

Карточка с полной информацией об ошибке и действиями.

### compact

Компактное отображение в виде Alert с кнопкой повторной попытки.

### fullscreen

Полноэкранное отображение с центрированным контентом.

## Автоматическое определение типа ошибки

Компоненты автоматически определяют тип ошибки по содержимому сообщения:

- **Сетевые ошибки** - содержат "network", "fetch"
- **Ошибки авторизации** - содержат "unauthorized", "401"
- **Ошибки валидации** - содержат "validation"
- **Ошибки "не найдено"** - содержат "not found", "404"

## Стилизация

Все компоненты используют Tailwind CSS и совместимы с темой приложения. Для кастомизации используйте проп `className` или создавайте собственные варианты через `variant`.

## Логирование

В development режиме все ошибки автоматически логируются в консоль. Для продакшена используйте `onError` callback для интеграции с внешними системами мониторинга.
