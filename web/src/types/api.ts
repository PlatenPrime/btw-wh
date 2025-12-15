/**
 * Базовый интерфейс для ответов API с одной сущностью
 * Используется для операций получения одной записи
 */
export interface EntityResponse<T> {
  exists: boolean;
  message: string;
  data: T | null;
}

/**
 * Базовый интерфейс для ответов API со списком сущностей
 * Используется для операций получения списка записей
 */
export interface ListResponse<T> {
  exists: boolean;
  message: string;
  data: T[];
}

/**
 * Базовый интерфейс для пагинированных ответов API
 */
export interface PaginatedResponse<T> {
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Базовый интерфейс для ответов API с пагинацией (альтернативный формат)
 */
export interface PaginatedResponseAlt<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

/**
 * Базовый интерфейс для ответов API на операции создания/обновления
 */
export interface MutationResponse<T> {
  message: string;
  data: T;
}

/**
 * Базовый интерфейс для ответов API на операции удаления
 */
export interface DeleteResponse<T> {
  message: string;
  data: T;
}

/**
 * Базовый интерфейс для ответов API на bulk операции
 */
export interface BulkResponse<T> {
  message: string;
  result: {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedCount: number;
    upsertedIds?: Record<string, string>;
  };
  processedItems?: T[];
}

/**
 * Базовый интерфейс для ответов API с экспортом файлов
 */
export interface ExportResponse {
  blob: Blob;
  filename: string;
}

/**
 * Базовый интерфейс для ошибок API
 */
export interface ApiError {
  message: string;
  code?: string;
  errors?: Array<{
    path: string[];
    message: string;
  }>;
}
