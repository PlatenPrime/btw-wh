/**
 * 🚨 Типы ошибок авторизации и проверки прав доступа
 */

/**
 * Коды ошибок авторизации (401 Unauthorized)
 */
export type AuthErrorCode =
  | "NO_TOKEN"
  | "INVALID_TOKEN_FORMAT"
  | "TOKEN_EXPIRED"
  | "INVALID_TOKEN"
  | "INVALID_TOKEN_PAYLOAD"
  | "USER_DATA_MISSING"
  | "JWT_SECRET_NOT_CONFIGURED"
  | "AUTH_ERROR";

/**
 * Коды ошибок прав доступа (403 Forbidden)
 */
export type RoleErrorCode =
  | "INVALID_USER_ROLE"
  | "INSUFFICIENT_PERMISSIONS"
  | "NOT_RESOURCE_OWNER"
  | "ROLE_CHECK_ERROR"
  | "RESOURCE_NOT_FOUND"
  | "OWNERSHIP_CHECK_ERROR";

/**
 * Объединенный тип всех кодов ошибок
 */
export type ErrorCode = AuthErrorCode | RoleErrorCode;

/**
 * Структура ответа с ошибкой от API
 */
export interface AuthErrorResponse {
  message: string;
  code: ErrorCode;
  requiredRoles?: string[];
  userRole?: string;
}

/**
 * Человекочитаемые сообщения об ошибках (для UI)
 */
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  // Auth errors (401)
  NO_TOKEN: "Токен відсутній. Будь ласка, увійдіть в систему.",
  INVALID_TOKEN_FORMAT: "Невірний формат токена. Будь ласка, увійдіть знову.",
  TOKEN_EXPIRED: "Ваша сесія закінчилася. Будь ласка, увійдіть знову.",
  INVALID_TOKEN: "Невалідний токен. Будь ласка, увійдіть знову.",
  INVALID_TOKEN_PAYLOAD: "Помилка токена. Будь ласка, увійдіть знову.",
  USER_DATA_MISSING: "Дані користувача відсутні. Спробуйте оновити сторінку.",
  JWT_SECRET_NOT_CONFIGURED: "Помилка конфігурації сервера.",
  AUTH_ERROR: "Помилка авторизації. Будь ласка, спробуйте знову.",

  // Role errors (403)
  INVALID_USER_ROLE: "У вас невалідна роль. Зверніться до адміністратора.",
  INSUFFICIENT_PERMISSIONS:
    "У вас недостатньо прав для виконання цієї операції.",
  NOT_RESOURCE_OWNER: "Ви можете редагувати лише свої ресурси.",
  ROLE_CHECK_ERROR: "Помилка перевірки прав доступу.",
  RESOURCE_NOT_FOUND: "Ресурс не знайдено.",
  OWNERSHIP_CHECK_ERROR: "Помилка перевірки володіння ресурсом.",
};

/**
 * Получает человекочитаемое сообщение об ошибке
 *
 * @param code - Код ошибки
 * @returns Сообщение об ошибке для показа пользователю
 */
export function getErrorMessage(code: ErrorCode): string {
  return ERROR_MESSAGES[code] || "Невідома помилка. Спробуйте ще раз.";
}

/**
 * Проверяет, является ли ошибка ошибкой авторизации (401)
 */
export function isAuthError(code: string): code is AuthErrorCode {
  const authErrors: AuthErrorCode[] = [
    "NO_TOKEN",
    "INVALID_TOKEN_FORMAT",
    "TOKEN_EXPIRED",
    "INVALID_TOKEN",
    "INVALID_TOKEN_PAYLOAD",
    "USER_DATA_MISSING",
    "JWT_SECRET_NOT_CONFIGURED",
    "AUTH_ERROR",
  ];
  return authErrors.includes(code as AuthErrorCode);
}

/**
 * Проверяет, является ли ошибка ошибкой прав доступа (403)
 */
export function isRoleError(code: string): code is RoleErrorCode {
  const roleErrors: RoleErrorCode[] = [
    "INVALID_USER_ROLE",
    "INSUFFICIENT_PERMISSIONS",
    "NOT_RESOURCE_OWNER",
    "ROLE_CHECK_ERROR",
    "RESOURCE_NOT_FOUND",
    "OWNERSHIP_CHECK_ERROR",
  ];
  return roleErrors.includes(code as RoleErrorCode);
}

