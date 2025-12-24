/**
 * Утилита для создания вариантов стилей на основе tailwind-variants
 * Заменяет tva из @gluestack-ui/utils/nativewind-utils
 */
import { tv, type VariantProps as TVVariantProps } from 'tailwind-variants';

/**
 * Создает функцию для генерации классов с вариантами
 * API совместим с tva из gluestack-ui
 */
export const tva = tv;

/**
 * Экспорт типа для вариантов (совместимость с gluestack-ui)
 */
export type VariantProps<T> = TVVariantProps<T>;

import { Platform } from 'react-native';

/**
 * Проверка, является ли платформа вебом
 * Заменяет isWeb из @gluestack-ui/utils/nativewind-utils
 */
export const isWeb = Platform.OS === 'web';

