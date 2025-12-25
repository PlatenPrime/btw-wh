/**
 * Утилита для создания вариантов стилей на основе tailwind-variants
 * Заменяет tva из @gluestack-ui/utils/nativewind-utils
 */
import { Platform } from "react-native";
import { tv, type VariantProps as TVVariantProps } from "tailwind-variants";

/**
 * Расширенная конфигурация с поддержкой parentVariants
 */
type ExtendedTVConfig = Parameters<typeof tv>[0] & {
  parentVariants?: Record<string, Record<string, string>>;
  parentCompoundVariants?: {
    [key: string]: string | string[] | undefined;
    class?: string;
  }[];
};

/**
 * Расширенные параметры для вызова функции с поддержкой parentVariants
 */
type ExtendedTVParams = {
  parentVariants?: Record<string, string | undefined>;
  [key: string]: any;
};

/**
 * Создает функцию для генерации классов с вариантами
 * API совместим с tva из gluestack-ui с поддержкой parentVariants
 */
export function tva(config: ExtendedTVConfig): any {
  const { parentVariants, parentCompoundVariants, ...tvConfig } = config;
  const tvFn = tv(tvConfig);

  const extendedFn = (params?: ExtendedTVParams) => {
    if (!params?.parentVariants) {
      return tvFn(params);
    }

    // Обработка parentVariants
    const parentClasses: string[] = [];
    const { parentVariants: parentVars, ...restParams } = params;

    // Применяем parentVariants из конфигурации
    if (parentVariants) {
      for (const [key, value] of Object.entries(parentVars)) {
        if (value && parentVariants[key]?.[value]) {
          parentClasses.push(parentVariants[key][value]);
        }
      }
    }

    // Применяем parentCompoundVariants
    if (parentCompoundVariants && parentVars) {
      for (const compound of parentCompoundVariants) {
        const matches = Object.entries(compound).every(([k, v]) => {
          if (k === "class") return true;
          const parentValue = parentVars[k];
          if (!parentValue) return false;
          return Array.isArray(v) ? v.includes(parentValue) : v === parentValue;
        });
        if (matches && compound.class) {
          parentClasses.push(compound.class);
        }
      }
    }

    const baseClass = tvFn(restParams);
    return parentClasses.length > 0
      ? `${baseClass} ${parentClasses.join(" ")}`
      : baseClass;
  };

  // Копируем все свойства из оригинальной функции
  return Object.assign(extendedFn, tvFn);
}

/**
 * Экспорт типа для вариантов (совместимость с gluestack-ui)
 */
export type VariantProps<T extends (...args: any) => any> = TVVariantProps<T>;

/**
 * Проверка, является ли платформа вебом
 * Заменяет isWeb из @gluestack-ui/utils/nativewind-utils
 */
export const isWeb = Platform.OS === "web";
