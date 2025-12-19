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
 * Декодирует base64 строку (полифилл для React Native)
 */
function base64Decode(str: string): string {
  // Заменяем символы для корректного декодирования
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  
  // Добавляем padding если нужно
  const padding = base64.length % 4;
  const paddedBase64 = padding ? base64 + '='.repeat(4 - padding) : base64;
  
  // Декодируем используя доступные функции
  try {
    // Для веб-версии используем atob
    if (typeof atob !== 'undefined') {
      return atob(paddedBase64);
    }
    // Для React Native используем простую реализацию base64 декодирования
    // Используем встроенную функцию из expo или полифилл
    // В большинстве случаев atob доступен через глобальный объект
    if (typeof global !== 'undefined' && (global as any).atob) {
      return (global as any).atob(paddedBase64);
    }
    // Если ничего не доступно, используем полифилл
    return atobPolyfill(paddedBase64);
  } catch (error) {
    console.error('Ошибка декодирования base64:', error);
    throw error;
  }
}

/**
 * Простой полифилл для atob (если недоступен)
 */
function atobPolyfill(base64: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let str = '';
  let i = 0;
  
  base64 = base64.replace(/[^A-Za-z0-9\+\/\=]/g, '');
  
  while (i < base64.length) {
    const enc1 = chars.indexOf(base64.charAt(i++));
    const enc2 = chars.indexOf(base64.charAt(i++));
    const enc3 = chars.indexOf(base64.charAt(i++));
    const enc4 = chars.indexOf(base64.charAt(i++));
    
    const chr1 = (enc1 << 2) | (enc2 >> 4);
    const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    const chr3 = ((enc3 & 3) << 6) | enc4;
    
    str += String.fromCharCode(chr1);
    
    if (enc3 !== 64) {
      str += String.fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      str += String.fromCharCode(chr3);
    }
  }
  
  return str;
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
    const decodedPayload = base64Decode(payload);
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
  minutesBeforeExpiry: number = 5,
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

