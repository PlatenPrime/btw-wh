import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import { ErrorDisplay } from "./error-display";

export function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  // Обробляємо різні типи помилок роутера
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <ErrorDisplay
          error="Сторінку не знайдено"
          title="404 - Сторінку не знайдено"
          description="Запитана сторінка не існує або була переміщена"
          variant="fullscreen"
          onGoHome={() => navigate("/")}
          onGoBack={() => navigate(-1)}
        />
      );
    }

    if (error.status === 401) {
      return (
        <ErrorDisplay
          error="Неавторизований доступ"
          title="401 - Неавторизований доступ"
          description="Для доступу до цієї сторінки необхідно увійти в систему"
          variant="fullscreen"
          onGoHome={() => navigate("/")}
          onGoBack={() => navigate(-1)}
        />
      );
    }

    if (error.status === 403) {
      return (
        <ErrorDisplay
          error="Доступ заборонено"
          title="403 - Доступ заборонено"
          description="У вас немає прав для доступу до цієї сторінки"
          variant="fullscreen"
          onGoHome={() => navigate("/")}
          onGoBack={() => navigate(-1)}
        />
      );
    }

    if (error.status === 500) {
      return (
        <ErrorDisplay
          error="Внутрішня помилка сервера"
          title="500 - Внутрішня помилка сервера"
          description="Сталася помилка на сервері. Спробуйте пізніше"
          variant="fullscreen"
          onRetry={() => window.location.reload()}
          onGoHome={() => navigate("/")}
        />
      );
    }

    // Загальна помилка HTTP
    return (
      <ErrorDisplay
        error={`HTTP ${error.status}: ${error.statusText}`}
        title={`Помилка ${error.status}`}
        description={
          error.data?.message || "Сталася помилка при завантаженні сторінки"
        }
        variant="fullscreen"
        onRetry={() => window.location.reload()}
        onGoHome={() => navigate("/")}
        onGoBack={() => navigate(-1)}
      />
    );
  }

  // Обробляємо JavaScript помилки
  if (error instanceof Error) {
    return (
      <ErrorDisplay
        error={error}
        title="Сталася помилка"
        description="В додатку сталася неочікувана помилка"
        variant="fullscreen"
        onRetry={() => window.location.reload()}
        onGoHome={() => navigate("/")}
        onGoBack={() => navigate(-1)}
      />
    );
  }

  // Невідома помилка
  return (
    <ErrorDisplay
      error="Невідома помилка"
      title="Щось пішло не так"
      description="Сталася невідома помилка в додатку"
      variant="fullscreen"
      onRetry={() => window.location.reload()}
      onGoHome={() => navigate("/")}
      onGoBack={() => navigate(-1)}
    />
  );
}
