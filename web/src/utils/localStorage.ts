import type { User } from "@/modules/auth/api/types";

/**
 * Схема типов для всех ключей localStorage
 * Добавляй сюда новые ключи при необходимости
 */
type LocalStorageSchema = {
  auth_token: string;
  auth_user: User;
  "vite-ui-theme": "dark" | "light" | "system";
};

/**
 * Тип для всех допустимых ключей localStorage
 */
type StorageKey = keyof LocalStorageSchema;

/**
 * Проверка доступности localStorage (для SSR)
 */
const isLocalStorageAvailable = (): boolean => {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
};

/**
 * Получить значение из localStorage с автоматической десериализацией
 *
 * @template K - ключ из схемы localStorage
 * @param key - ключ для получения данных
 * @returns значение типа, соответствующего ключу, или null
 */
export const getItem = <K extends StorageKey>(
  key: K,
): LocalStorageSchema[K] | null => {
  if (!isLocalStorageAvailable()) {
    return null;
  }

  try {
    const item = localStorage.getItem(key);

    if (item === null) {
      return null;
    }

    // Пытаемся распарсить JSON, если не получается - возвращаем как строку
    try {
      return JSON.parse(item) as LocalStorageSchema[K];
    } catch {
      // Если это не JSON (например, простая строка), возвращаем как есть
      return item as LocalStorageSchema[K];
    }
  } catch (error) {
    console.error(`Ошибка чтения из localStorage (${key}):`, error);
    return null;
  }
};

/**
 * Сохранить значение в localStorage с автоматической сериализацией
 *
 * @template K - ключ из схемы localStorage
 * @param key - ключ для сохранения данных
 * @param value - значение для сохранения
 */
export const setItem = <K extends StorageKey>(
  key: K,
  value: LocalStorageSchema[K],
): void => {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    // Если значение - строка, сохраняем как есть, иначе JSON.stringify
    const serialized =
      typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Ошибка записи в localStorage (${key}):`, error);
  }
};

/**
 * Удалить значение из localStorage
 *
 * @template K - ключ из схемы localStorage
 * @param key - ключ для удаления
 */
export const removeItem = <K extends StorageKey>(key: K): void => {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Ошибка удаления из localStorage (${key}):`, error);
  }
};

/**
 * Очистить весь localStorage
 */
export const clear = (): void => {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    localStorage.clear();
  } catch (error) {
    console.error("Ошибка очистки localStorage:", error);
  }
};

/**
 * Generic методы для работы с динамическими ключами (не из схемы)
 * Используй только если ключ действительно динамический и не может быть добавлен в схему
 */
export const storage = {
  /**
   * Получить значение с указанием типа вручную
   */
  get: <T>(key: string): T | null => {
    if (!isLocalStorageAvailable()) {
      return null;
    }

    try {
      const item = localStorage.getItem(key);

      if (item === null) {
        return null;
      }

      try {
        return JSON.parse(item) as T;
      } catch {
        return item as T;
      }
    } catch (error) {
      console.error(`Ошибка чтения из localStorage (${key}):`, error);
      return null;
    }
  },

  /**
   * Сохранить значение с указанием типа вручную
   */
  set: <T>(key: string, value: T): void => {
    if (!isLocalStorageAvailable()) {
      return;
    }

    try {
      const serialized =
        typeof value === "string" ? value : JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Ошибка записи в localStorage (${key}):`, error);
    }
  },

  /**
   * Удалить значение по ключу
   */
  remove: (key: string): void => {
    if (!isLocalStorageAvailable()) {
      return;
    }

    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Ошибка удаления из localStorage (${key}):`, error);
    }
  },
};
