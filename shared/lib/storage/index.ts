import type { IStorage } from "./types";

export * from "./types";

/**
 * Default storage instance
 * Должен быть инициализирован в web/mobile приложениях
 */
let storageInstance: IStorage | null = null;

/**
 * Инициализировать storage (вызывается в web/mobile)
 */
export const initStorage = (storage: IStorage): void => {
  storageInstance = storage;
};

/**
 * Получить текущий экземпляр storage
 */
export const getStorage = (): IStorage => {
  if (!storageInstance) {
    throw new Error(
      "Storage not initialized. Call initStorage() with your storage implementation."
    );
  }
  return storageInstance;
};

/**
 * Helper функции для работы со storage
 */
export const storage = {
  getItem: async <T = string>(key: string): Promise<T | null> => {
    const store = getStorage();
    const result = await store.getItem<T>(key);
    return result;
  },

  setItem: async <T = string>(key: string, value: T): Promise<void> => {
    const store = getStorage();
    await store.setItem(key, value);
  },

  removeItem: async (key: string): Promise<void> => {
    const store = getStorage();
    await store.removeItem(key);
  },

  clear: async (): Promise<void> => {
    const store = getStorage();
    await store.clear();
  },
};
