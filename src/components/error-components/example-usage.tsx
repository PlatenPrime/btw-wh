import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ErrorDisplay,
  FieldErrorDisplay,
  FormErrorDisplay,
  QueryErrorDisplay,
  useErrorHandler,
} from "./index";

/**
 * Пример использования всех компонентов для обработки ошибок
 * Этот компонент демонстрирует различные способы отображения ошибок
 */
export function ErrorComponentsExample() {
  const { errorState, handleError, retry, goBack, goHome } = useErrorHandler();

  // Примеры различных типов ошибок
  const networkError = new Error("Failed to fetch data from server");
  const authError = new Error("Unauthorized access to resource");
  const validationError = new Error("Invalid input data");
  const notFoundError = new Error("Resource not found");

  const handleNetworkError = () => {
    handleError(networkError);
  };

  const handleAuthError = () => {
    handleError(authError);
  };

  const handleValidationError = () => {
    handleError(validationError);
  };

  const handleNotFoundError = () => {
    handleError(notFoundError);
  };

  // Если есть ошибка, показываем ErrorDisplay
  if (errorState.hasError) {
    return (
      <ErrorDisplay
        error={errorState.error}
        title="Произошла ошибка"
        description="В приложении произошла ошибка. Выберите действие для продолжения."
        variant="fullscreen"
        onRetry={retry}
        onGoBack={goBack}
        onGoHome={goHome}
      />
    );
  }

  return (
    <div className="container mx-auto space-y-8 p-6">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">Примеры компонентов ошибок</h1>
        <p className="text-muted-foreground">
          Демонстрация различных способов отображения ошибок в приложении
        </p>
      </div>

      {/* Кнопки для генерации ошибок */}
      <Card>
        <CardHeader>
          <CardTitle>Генерация ошибок</CardTitle>
          <CardDescription>
            Нажмите на кнопки, чтобы увидеть различные типы ошибок
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button onClick={handleNetworkError} variant="outline">
            Сетевая ошибка
          </Button>
          <Button onClick={handleAuthError} variant="outline">
            Ошибка авторизации
          </Button>
          <Button onClick={handleValidationError} variant="outline">
            Ошибка валидации
          </Button>
          <Button onClick={handleNotFoundError} variant="outline">
            Ресурс не найден
          </Button>
        </CardContent>
      </Card>

      {/* Примеры различных вариантов отображения */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* ErrorDisplay - default variant */}
        <Card>
          <CardHeader>
            <CardTitle>ErrorDisplay - Default</CardTitle>
            <CardDescription>
              Карточка с полной информацией об ошибке
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ErrorDisplay
              error="Пример ошибки для демонстрации"
              title="Демонстрационная ошибка"
              description="Это пример того, как выглядит ErrorDisplay в режиме default"
              variant="default"
              onRetry={() => console.log("Retry clicked")}
              onGoBack={() => console.log("Go back clicked")}
              onGoHome={() => console.log("Go home clicked")}
            />
          </CardContent>
        </Card>

        {/* ErrorDisplay - compact variant */}
        <Card>
          <CardHeader>
            <CardTitle>ErrorDisplay - Compact</CardTitle>
            <CardDescription>Компактное отображение ошибки</CardDescription>
          </CardHeader>
          <CardContent>
            <ErrorDisplay
              error="Компактная ошибка"
              variant="compact"
              onRetry={() => console.log("Retry clicked")}
            />
          </CardContent>
        </Card>

        {/* QueryErrorDisplay */}
        <Card>
          <CardHeader>
            <CardTitle>QueryErrorDisplay</CardTitle>
            <CardDescription>
              Специализированный для React Query
            </CardDescription>
          </CardHeader>
          <CardContent>
            <QueryErrorDisplay
              error={networkError}
              variant="compact"
              onRetry={() => console.log("Refetch clicked")}
            />
          </CardContent>
        </Card>

        {/* FormErrorDisplay */}
        <Card>
          <CardHeader>
            <CardTitle>FormErrorDisplay</CardTitle>
            <CardDescription>Для отображения ошибок в формах</CardDescription>
          </CardHeader>
          <CardContent>
            <FormErrorDisplay
              error="Ошибка валидации формы"
              variant="compact"
              onDismiss={() => console.log("Dismiss clicked")}
            />
          </CardContent>
        </Card>

        {/* FieldErrorDisplay */}
        <Card>
          <CardHeader>
            <CardTitle>FieldErrorDisplay</CardTitle>
            <CardDescription>Для ошибок валидации полей</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldErrorDisplay error="Поле обязательно для заполнения" />
          </CardContent>
        </Card>

        {/* ErrorDisplay - fullscreen variant */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>ErrorDisplay - Fullscreen</CardTitle>
            <CardDescription>
              Полноэкранное отображение (в реальном приложении занимает весь
              экран)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 rounded-lg border p-4">
              <ErrorDisplay
                error="Полноэкранная ошибка"
                title="Критическая ошибка"
                description="Это пример полноэкранного отображения ошибки"
                variant="fullscreen"
                onRetry={() => console.log("Retry clicked")}
                onGoHome={() => console.log("Go home clicked")}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Информация о компонентах */}
      <Card>
        <CardHeader>
          <CardTitle>О компонентах</CardTitle>
          <CardDescription>Краткое описание возможностей</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold">Основные возможности:</h4>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Автоматическое определение типа ошибки</li>
                <li>• Три варианта отображения</li>
                <li>• Встроенные действия (повторить, назад, домой)</li>
                <li>• Адаптивный дизайн</li>
                <li>• Поддержка тем</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Типы ошибок:</h4>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Сетевые ошибки</li>
                <li>• Ошибки авторизации</li>
                <li>• Ошибки валидации</li>
                <li>• Ошибки "не найдено"</li>
                <li>• Общие ошибки приложения</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
