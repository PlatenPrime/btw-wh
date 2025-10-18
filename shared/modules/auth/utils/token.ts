/**
 * 🎫 Утилиты для работы с JWT токенами
 */

/**
 * Структура payload JWT токена
 */
export interface TokenPayload {
  id: string;
  role: string;
  iat: number; // issued at - время создания
  exp: number; // expires - время истечения
}

/**
 * Декодирует JWT токен без проверки подписи
 *
 * @param token - JWT токен
 * @returns Декодированный payload или null при ошибке
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    // JWT состоит из 3 частей: header.payload.signature
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    // Декодируем payload (вторая часть)
    const payload = parts[1];
    const decodedPayload = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const parsed = JSON.parse(decodedPayload) as TokenPayload;

    return parsed;
  } catch (error) {
    console.error("Ошибка декодирования токена:", error);
    return null;
  }
}

/**
 * Проверяет, истек ли токен
 *
 * @param token - JWT токен
 * @returns true если токен истек или невалиден
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeToken(token);

  if (!payload || !payload.exp) {
    return true;
  }

  // exp в секундах, Date.now() в миллисекундах
  const currentTime = Date.now() / 1000;

  return payload.exp < currentTime;
}

/**
 * Проверяет, истечет ли токен в ближайшее время
 *
 * @param token - JWT токен
 * @param minutesBeforeExpiry - За сколько минут до истечения считать "скоро истекает"
 * @returns true если токен скоро истечет
 */
export function isTokenExpiringSoon(
  token: string,
  minutesBeforeExpiry: number = 5
): boolean {
  const payload = decodeToken(token);

  if (!payload || !payload.exp) {
    return true;
  }

  const currentTime = Date.now() / 1000;
  const expiryTime = payload.exp;
  const timeUntilExpiry = expiryTime - currentTime;
  const minutesUntilExpiry = timeUntilExpiry / 60;

  return minutesUntilExpiry <= minutesBeforeExpiry;
}

/**
 * Получает роль пользователя из токена
 *
 * @param token - JWT токен
 * @returns Роль пользователя или null
 */
export function getRoleFromToken(token: string): string | null {
  const payload = decodeToken(token);
  return payload?.role || null;
}

/**
 * Получает ID пользователя из токена
 *
 * @param token - JWT токен
 * @returns ID пользователя или null
 */
export function getUserIdFromToken(token: string): string | null {
  const payload = decodeToken(token);
  return payload?.id || null;
}

/**
 * Получает время истечения токена
 *
 * @param token - JWT токен
 * @returns Дата истечения или null
 */
export function getTokenExpiry(token: string): Date | null {
  const payload = decodeToken(token);

  if (!payload || !payload.exp) {
    return null;
  }

  // exp в секундах, Date принимает миллисекунды
  return new Date(payload.exp * 1000);
}

/**
 * Форматирует оставшееся время до истечения токена
 *
 * @param token - JWT токен
 * @returns Строка вида "5 хвилин" или "2 години"
 */
export function getTimeUntilExpiry(token: string): string | null {
  const payload = decodeToken(token);

  if (!payload || !payload.exp) {
    return null;
  }

  const currentTime = Date.now() / 1000;
  const expiryTime = payload.exp;
  const secondsLeft = expiryTime - currentTime;

  if (secondsLeft <= 0) {
    return "Закінчився";
  }

  const minutesLeft = Math.floor(secondsLeft / 60);
  const hoursLeft = Math.floor(minutesLeft / 60);
  const daysLeft = Math.floor(hoursLeft / 24);

  if (daysLeft > 0) {
    return `${daysLeft} ${daysLeft === 1 ? "день" : "днів"}`;
  }

  if (hoursLeft > 0) {
    return `${hoursLeft} ${hoursLeft === 1 ? "година" : "годин"}`;
  }

  if (minutesLeft > 0) {
    return `${minutesLeft} ${minutesLeft === 1 ? "хвилина" : "хвилин"}`;
  }

  return "Менше хвилини";
}

/**
 * Валидирует структуру токена
 *
 * @param token - JWT токен
 * @returns true если токен имеет валидную структуру
 */
export function isValidTokenStructure(token: string): boolean {
  const payload = decodeToken(token);

  if (!payload) {
    return false;
  }

  // Проверяем обязательные поля
  return !!(payload.id && payload.role && payload.exp && payload.iat);
}
