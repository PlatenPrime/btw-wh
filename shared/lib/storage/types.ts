/**
 * Интерфейс для абстракции работы с storage
 * Поддерживает localStorage (web) и AsyncStorage (mobile)
 */
export interface IStorage {
  /**
   * Получить значение по ключу
   */
  getItem: <T = string>(key: string) => Promise<T | null> | T | null;

  /**
   * Сохранить значение по ключу
   */
  setItem: <T = string>(key: string, value: T) => Promise<void> | void;

  /**
   * Удалить значение по ключу
   */
  removeItem: (key: string) => Promise<void> | void;

  /**
   * Очистить все данные
   */
  clear: () => Promise<void> | void;
}

/**
 * Схема типов для storage keys
 */
export type StorageSchema = {
  auth_token: string;
  auth_user: string; // JSON string
  "vite-ui-theme": "dark" | "light" | "system";
};

export type StorageKey = keyof StorageSchema;
