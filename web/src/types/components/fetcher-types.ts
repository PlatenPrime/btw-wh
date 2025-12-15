import type { ComponentType } from "react";

/**
 * Базовый интерфейс для всех Fetcher компонентов
 * @template TData - тип данных, которые передаются в ContainerComponent
 * @template TParams - тип параметров для запроса (опционально)
 */
export interface BaseFetcherProps<TData, TParams = void> {
  /** Компонент-контейнер, который получает загруженные данные */
  ContainerComponent: ComponentType<{ data: TData }>;
  /** Компонент-скелетон для состояния загрузки */
  SkeletonComponent: ComponentType;
  /** Дополнительные параметры для запроса (опционально) */
  params?: TParams;
}

/**
 * Интерфейс для Fetcher компонентов с infinite scroll
 * @template TData - тип данных в списке
 * @template TParams - тип параметров для запроса (опционально)
 */
export interface InfiniteFetcherProps<TData, TParams = void> {
  /** Компонент-контейнер с поддержкой infinite scroll */
  ContainerComponent: ComponentType<{
    data: TData[];
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
    search?: string;
    onSearchChange?: React.Dispatch<React.SetStateAction<string>>;
  }>;
  /** Компонент-скелетон для состояния загрузки */
  SkeletonComponent: ComponentType;
  /** Параметры для запроса */
  params?: TParams;
  /** Начальное значение поиска */
  initialSearch?: string;
  /** Лимит элементов на странице */
  limit?: number;
}

/**
 * Интерфейс для Fetcher компонентов с кастомной обработкой ошибок
 */
export interface FetcherErrorConfig {
  /** Заголовок ошибки */
  title: string;
  /** Описание ошибки */
  description: string;
  /** Кастомный компонент для отображения ошибки */
  errorComponent?: ComponentType<{
    error: Error;
    title: string;
    description: string;
  }>;
}

/**
 * Интерфейс для Fetcher компонентов с кастомной обработкой пустого состояния
 */
export interface FetcherEmptyConfig {
  /** Описание пустого состояния */
  description: string;
  /** Кастомный компонент для отображения пустого состояния */
  emptyComponent?: ComponentType<{ description: string }>;
}

/**
 * Полный интерфейс для Fetcher компонентов с кастомизацией
 * @template TData - тип данных
 * @template TParams - тип параметров
 */
export interface CustomFetcherProps<TData, TParams = void>
  extends BaseFetcherProps<TData, TParams> {
  /** Конфигурация обработки ошибок */
  errorConfig?: FetcherErrorConfig;
  /** Конфигурация пустого состояния */
  emptyConfig?: FetcherEmptyConfig;
  /** Дополнительные пропсы для ContainerComponent */
  containerProps?: Record<string, unknown>;
}

