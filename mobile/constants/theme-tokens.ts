/**
 * Маппинг семантических цветов на Tailwind токены
 * 
 * Этот файл связывает семантические имена цветов с соответствующими Tailwind классами.
 * Используйте эти токены для работы с цветами программно через хуки и утилиты.
 */

/**
 * Доступные оттенки для цветовых токенов
 */
export type ColorShade = 
  | '0' | '50' | '100' | '200' | '300' | '400' 
  | '500' | '600' | '700' | '800' | '900' | '950';

/**
 * Базовые цветовые категории из Tailwind токенов
 */
export type ColorCategory = 
  | 'primary' 
  | 'secondary' 
  | 'tertiary' 
  | 'error' 
  | 'success' 
  | 'warning' 
  | 'info' 
  | 'typography' 
  | 'outline' 
  | 'background';

/**
 * Маппинг семантических цветов на Tailwind токены
 * 
 * Формат: 'category-shade' или 'category' для специальных цветов
 * 
 * Примеры использования:
 * - card.bg -> 'background-0'
 * - error.border -> 'error-500'
 * - text.primary -> 'typography-900' (light) / 'typography-700' (dark)
 */
export const ThemeTokens = {
  // Цвета для карточек
  card: {
    bg: {
      light: 'background-0',
      dark: 'background-0',
    },
    border: {
      light: 'outline-100',
      dark: 'outline-100',
    },
  },

  // Цвета для диалогов
  dialog: {
    bg: {
      light: 'background-0',
      dark: 'background-0',
    },
    border: {
      light: 'outline-200',
      dark: 'outline-200',
    },
  },

  // Цвета для ошибок
  error: {
    border: 'error-500',
    text: 'error-500',
    bg: {
      light: 'error-100',
      dark: 'error-900',
    },
  },

  // Цвета для успеха
  success: {
    border: 'success-500',
    text: 'success-500',
    bg: {
      light: 'success-100',
      dark: 'success-900',
    },
  },

  // Цвета для предупреждений
  warning: {
    border: 'warning-500',
    text: 'warning-500',
    bg: {
      light: 'warning-100',
      dark: 'warning-900',
    },
  },

  // Цвета для информации
  info: {
    border: 'info-500',
    text: 'info-500',
    bg: {
      light: 'info-100',
      dark: 'info-900',
    },
  },

  // Цвета для текста
  text: {
    primary: {
      light: 'typography-900',
      dark: 'typography-700',
    },
    secondary: {
      light: 'typography-600',
      dark: 'typography-400',
    },
    icon: {
      light: 'typography-500',
      dark: 'typography-500',
    },
    tabIconDefault: {
      light: 'typography-500',
      dark: 'typography-500',
    },
    tabIconSelected: {
      light: 'primary-600',
      dark: 'primary-500',
    },
  },

  // Цвета для фона
  background: {
    primary: {
      light: 'background-0',
      dark: 'background-0',
    },
    secondary: {
      light: 'background-50',
      dark: 'background-50',
    },
    muted: {
      light: 'background-muted',
      dark: 'background-muted',
    },
  },

  // Placeholder цвет
  placeholder: {
    light: 'typography-400',
    dark: 'typography-500',
  },

  // Основные цвета действий
  actions: {
    primary: 'primary-500',
    secondary: 'secondary-500',
    info: 'info-500',
    success: 'success-500',
    warning: 'warning-500',
    error: 'error-500',
    destructive: 'error-500',
    disabled: 'typography-400',
  },

  // Цвета для sidebar
  sidebar: {
    border: {
      light: 'outline-200',
      dark: 'outline-300',
    },
  },

  // Цвета для Switch компонента
  switch: {
    track: {
      false: {
        light: 'typography-300',
        dark: 'typography-700',
      },
      true: {
        light: 'primary-500',
        dark: 'primary-500',
      },
    },
    thumb: 'typography-0', // white
  },

  // Цвета для иконок (специфичные цвета из iconColors)
  icon: {
    // Эти цвета не представлены в Tailwind токенах напрямую,
    // используются через SemanticColors.iconColors
    warehouse: 'info-500', // sky-500
    money: 'success-500', // emerald-500 (приблизительно)
    orange: 'warning-500', // orange-500 (приблизительно)
  },

  // Специальные цвета
  special: {
    white: 'typography-0',
    black: 'typography-950',
  },
} as const;

/**
 * Получить Tailwind токен для семантического цвета
 * 
 * @param tokenPath - Путь к токену, например 'card.bg.light' или 'error.border'
 * @param theme - Тема ('light' | 'dark'), требуется для токенов, зависящих от темы
 * @returns Tailwind токен в формате 'category-shade' или undefined, если токен не найден
 * 
 * @example
 * getToken('card.bg', 'light') // 'background-0'
 * getToken('error.border') // 'error-500'
 */
export function getToken(
  tokenPath: string,
  theme?: 'light' | 'dark'
): string | undefined {
  const parts = tokenPath.split('.');
  let current: any = ThemeTokens;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part as keyof typeof current];
    } else {
      return undefined;
    }
  }

  // Если это объект с light/dark, вернем значение для указанной темы
  if (typeof current === 'object' && current !== null && theme) {
    if (theme in current) {
      return current[theme as keyof typeof current];
    }
  }

  // Если это строка, вернем её
  if (typeof current === 'string') {
    return current;
  }

  return undefined;
}

/**
 * Проверить, существует ли токен
 * 
 * @param tokenPath - Путь к токену
 * @param theme - Тема (опционально)
 * @returns true, если токен существует
 */
export function hasToken(
  tokenPath: string,
  theme?: 'light' | 'dark'
): boolean {
  return getToken(tokenPath, theme) !== undefined;
}

