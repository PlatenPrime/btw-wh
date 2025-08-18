import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface ErrorState {
  hasError: boolean;
  error: Error | string | null;
  errorType: "network" | "auth" | "validation" | "application" | null;
}

export function useErrorHandler() {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
    errorType: null,
  });
  const navigate = useNavigate();

  const handleError = useCallback((error: Error | string | unknown) => {
    let errorMessage: string;
    let errorType: ErrorState["errorType"] = "application";

    if (typeof error === "string") {
      errorMessage = error;
    } else if (error instanceof Error) {
      errorMessage = error.message;

      // Определяем тип ошибки
      if (error.name.includes("Network") || error.message.includes("network")) {
        errorType = "network";
      } else if (
        error.name.includes("Auth") ||
        error.message.includes("unauthorized")
      ) {
        errorType = "auth";
      } else if (
        error.name.includes("Validation") ||
        error.message.includes("validation")
      ) {
        errorType = "validation";
      }
    } else {
      errorMessage = "Неизвестная ошибка";
    }

    setErrorState({
      hasError: true,
      error: errorMessage,
      errorType,
    });

    // Логируем ошибку в development режиме
    if (import.meta.env.DEV) {
      console.error("Error handled:", error);
    }
  }, []);

  const clearError = useCallback(() => {
    setErrorState({
      hasError: false,
      error: null,
      errorType: null,
    });
  }, []);

  const retry = useCallback(() => {
    clearError();
    // Здесь можно добавить логику повторной попытки
  }, [clearError]);

  const goBack = useCallback(() => {
    clearError();
    navigate(-1);
  }, [clearError, navigate]);

  const goHome = useCallback(() => {
    clearError();
    navigate("/");
  }, [clearError, navigate]);

  const goToLogin = useCallback(() => {
    clearError();
    navigate("/login");
  }, [clearError, navigate]);

  return {
    errorState,
    handleError,
    clearError,
    retry,
    goBack,
    goHome,
    goToLogin,
  };
}
