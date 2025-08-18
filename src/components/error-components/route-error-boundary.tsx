import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import { ErrorDisplay } from "./error-display";

export function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  // Обрабатываем различные типы ошибок роутера
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <ErrorDisplay
          error="Страница не найдена"
          title="404 - Страница не найдена"
          description="Запрашиваемая страница не существует или была перемещена"
          variant="fullscreen"
          onGoHome={() => navigate("/")}
          onGoBack={() => navigate(-1)}
        />
      );
    }

    if (error.status === 401) {
      return (
        <ErrorDisplay
          error="Неавторизованный доступ"
          title="401 - Неавторизованный доступ"
          description="Для доступа к этой странице необходимо войти в систему"
          variant="fullscreen"
          onGoHome={() => navigate("/")}
          onGoBack={() => navigate(-1)}
        />
      );
    }

    if (error.status === 403) {
      return (
        <ErrorDisplay
          error="Доступ запрещен"
          title="403 - Доступ запрещен"
          description="У вас нет прав для доступа к этой странице"
          variant="fullscreen"
          onGoHome={() => navigate("/")}
          onGoBack={() => navigate(-1)}
        />
      );
    }

    if (error.status === 500) {
      return (
        <ErrorDisplay
          error="Внутренняя ошибка сервера"
          title="500 - Внутренняя ошибка сервера"
          description="Произошла ошибка на сервере. Попробуйте позже"
          variant="fullscreen"
          onRetry={() => window.location.reload()}
          onGoHome={() => navigate("/")}
        />
      );
    }

    // Общая ошибка HTTP
    return (
      <ErrorDisplay
        error={`HTTP ${error.status}: ${error.statusText}`}
        title={`Ошибка ${error.status}`}
        description={
          error.data?.message || "Произошла ошибка при загрузке страницы"
        }
        variant="fullscreen"
        onRetry={() => window.location.reload()}
        onGoHome={() => navigate("/")}
        onGoBack={() => navigate(-1)}
      />
    );
  }

  // Обрабатываем JavaScript ошибки
  if (error instanceof Error) {
    return (
      <ErrorDisplay
        error={error}
        title="Произошла ошибка"
        description="В приложении произошла неожиданная ошибка"
        variant="fullscreen"
        onRetry={() => window.location.reload()}
        onGoHome={() => navigate("/")}
        onGoBack={() => navigate(-1)}
      />
    );
  }

  // Неизвестная ошибка
  return (
    <ErrorDisplay
      error="Неизвестная ошибка"
      title="Что-то пошло не так"
      description="Произошла неизвестная ошибка в приложении"
      variant="fullscreen"
      onRetry={() => window.location.reload()}
      onGoHome={() => navigate("/")}
      onGoBack={() => navigate(-1)}
    />
  );
}
