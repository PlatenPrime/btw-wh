import {
  ErrorDisplay,
  FieldErrorDisplay,
  FormErrorDisplay,
  QueryErrorDisplay,
  useErrorHandler,
} from "@/components/shared/error-components/index.ts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Приклад використання всіх компонентів для обробки помилок
 * Цей компонент демонструє різні способи відображення помилок
 */
export function ErrorComponentsExample() {
  const { errorState, handleError, retry, goBack, goHome } = useErrorHandler();

  // Приклади різних типів помилок
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

  // Якщо є помилка, показуємо ErrorDisplay
  if (errorState.hasError) {
    return (
      <ErrorDisplay
        error={errorState.error}
        title="Виникла помилка"
        description="Виникла помилка. Виберіть дію для продовження."
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
        <h1 className="mb-2 text-3xl font-bold">
          Приклади компонентів помилок
        </h1>
        <p className="text-muted-foreground">
          Демонстрація різних способів відображення помилок в додатку
        </p>
      </div>

      {/* Кнопки для генерації помилок */}
      <Card>
        <CardHeader>
          <CardTitle>Генерація помилок</CardTitle>
          <CardDescription>
            Натисніть на кнопки, щоб побачити різні типи помилок
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button onClick={handleNetworkError} variant="outline">
            Мережева помилка
          </Button>
          <Button onClick={handleAuthError} variant="outline">
            Помилка авторизації
          </Button>
          <Button onClick={handleValidationError} variant="outline">
            Помилка валідації
          </Button>
          <Button onClick={handleNotFoundError} variant="outline">
            Ресурс не знайдено
          </Button>
        </CardContent>
      </Card>

      {/* Приклади різних варіантів відображення */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* ErrorDisplay - default variant */}
        <Card>
          <CardHeader>
            <CardTitle>ErrorDisplay - Default</CardTitle>
            <CardDescription>
              Картка з повною інформацією про помилку
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ErrorDisplay
              error="Приклад помилки для демонстрації"
              title="Демонстраційна помилка"
              description="Це приклад того, як виглядає ErrorDisplay в режимі default"
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
            <CardDescription>Компактне відображення помилки</CardDescription>
          </CardHeader>
          <CardContent>
            <ErrorDisplay
              error="Компактна помилка"
              variant="compact"
              onRetry={() => console.log("Retry clicked")}
            />
          </CardContent>
        </Card>

        {/* QueryErrorDisplay */}
        <Card>
          <CardHeader>
            <CardTitle>QueryErrorDisplay</CardTitle>
            <CardDescription>Спеціалізований для React Query</CardDescription>
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
            <CardDescription>Для відображення помилок у формах</CardDescription>
          </CardHeader>
          <CardContent>
            <FormErrorDisplay
              error="Помилка валідації форми"
              variant="compact"
              onDismiss={() => console.log("Dismiss clicked")}
            />
          </CardContent>
        </Card>

        {/* FieldErrorDisplay */}
        <Card>
          <CardHeader>
            <CardTitle>FieldErrorDisplay</CardTitle>
            <CardDescription>Для помилок валідації полів</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldErrorDisplay error="Поле обов'язково для заповнення" />
          </CardContent>
        </Card>

        {/* ErrorDisplay - fullscreen variant */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>ErrorDisplay - Fullscreen</CardTitle>
            <CardDescription>
              Повноекранне відображення (в реальному додатку займає весь екран)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 rounded-lg border p-4">
              <ErrorDisplay
                error="Повноекранна помилка"
                title="Критична помилка"
                description="Це приклад повноекранного відображення помилки"
                variant="fullscreen"
                onRetry={() => console.log("Retry clicked")}
                onGoHome={() => console.log("Go home clicked")}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Інформація про компоненти */}
      <Card>
        <CardHeader>
          <CardTitle>Про компоненти</CardTitle>
          <CardDescription>Короткий опис можливостей</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold">Основні можливості:</h4>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Автоматичне визначення типу помилки</li>
                <li>• Три варіанти відображення</li>
                <li>• Вбудовані дії (повторити, назад, додому)</li>
                <li>• Адаптивний дизайн</li>
                <li>• Підтримка тем</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Типи помилок:</h4>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Мережеві помилки</li>
                <li>• Помилки авторизації</li>
                <li>• Помилки валідації</li>
                <li>• Помилки "не знайдено"</li>
                <li>• Загальні помилки додатку</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
