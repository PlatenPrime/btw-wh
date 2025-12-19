import * as SecureStore from 'expo-secure-store';
import type { User } from '@/modules/auth/api/types';

/**
 * Схема типов для всех ключей secure store
 * Добавляй сюда новые ключи при необходимости
 */
type SecureStoreSchema = {
  auth_token: string;
  auth_user: User;
};

/**
 * Тип для всех допустимых ключей secure store
 */
type StorageKey = keyof SecureStoreSchema;

/**
 * Получить значение из secure store с автоматической десериализацией
 *
 * @template K - ключ из схемы secure store
 * @param key - ключ для получения данных
 * @returns значение типа, соответствующего ключу, или null
 */
export const getItem = async <K extends StorageKey>(
  key: K,
): Promise<SecureStoreSchema[K] | null> => {
  try {
    const item = await SecureStore.getItemAsync(key);

    if (item === null) {
      return null;
    }

    // Пытаемся распарсить JSON, если не получается - возвращаем как строку
    try {
      return JSON.parse(item) as SecureStoreSchema[K];
    } catch {
      // Если это не JSON (например, простая строка), возвращаем как есть
      return item as SecureStoreSchema[K];
    }
  } catch (error) {
    console.error(`Ошибка чтения из secure store (${key}):`, error);
    return null;
  }
};

/**
 * Сохранить значение в secure store с автоматической сериализацией
 *
 * @template K - ключ из схемы secure store
 * @param key - ключ для сохранения данных
 * @param value - значение для сохранения
 */
export const setItem = async <K extends StorageKey>(
  key: K,
  value: SecureStoreSchema[K],
): Promise<void> => {
  try {
    // Если значение - строка, сохраняем как есть, иначе JSON.stringify
    const serialized =
      typeof value === "string" ? value : JSON.stringify(value);
    await SecureStore.setItemAsync(key, serialized);
  } catch (error) {
    console.error(`Ошибка записи в secure store (${key}):`, error);
  }
};

/**
 * Удалить значение из secure store
 *
 * @template K - ключ из схемы secure store
 * @param key - ключ для удаления
 */
export const removeItem = async <K extends StorageKey>(key: K): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`Ошибка удаления из secure store (${key}):`, error);
  }
};

/**
 * Очистить весь secure store (удалить все ключи из схемы)
 */
export const clear = async (): Promise<void> => {
  try {
    const keys: StorageKey[] = ['auth_token', 'auth_user'];
    await Promise.all(keys.map(key => SecureStore.deleteItemAsync(key)));
  } catch (error) {
    console.error("Ошибка очистки secure store:", error);
  }
};

