/**
 * Утилиты для работы с цветовыми токенами
 * 
 * Эти функции позволяют программно работать с Tailwind токенами,
 * получать RGB/RGBA значения и создавать цвета с opacity.
 */

import { config } from '@/components/ui/gluestack-ui-provider/config';
import { getToken, type ColorShade } from '@/constants/theme-tokens';

type Theme = 'light' | 'dark';

/**
 * Получить RGB значения для токена в формате "r g b"
 * 
 * @param token - Tailwind токен, например 'primary-500' или 'background-0'
 * @param theme - Тема ('light' | 'dark')
 * @returns RGB строку в формате "r g b" или undefined, если токен не найден
 * 
 * @example
 * getTokenRgb('primary-500', 'light') // "51 51 51"
 */
export function getTokenRgb(token: string, theme: Theme): string | undefined {
  // Обработка специальных токенов (background-error, background-muted и т.д.)
  if (token.includes('-')) {
    const parts = token.split('-');
    const category = parts[0];
    const shade = parts.slice(1).join('-');
    
    const cssVar = `--color-${category}-${shade}` as keyof typeof config.light;
    
    if (cssVar in config[theme]) {
      return config[theme][cssVar];
    }
  }
  
  return undefined;
}

/**
 * Получить RGB значения из токена с поддержкой семантических путей
 * 
 * @param tokenPath - Путь к токену из ThemeTokens, например 'card.bg.light'
 * @param theme - Тема ('light' | 'dark')
 * @returns RGB строку в формате "r g b" или undefined
 * 
 * @example
 * getTokenRgbFromPath('card.bg', 'light') // "255 255 255"
 */
export function getTokenRgbFromPath(
  tokenPath: string,
  theme: Theme
): string | undefined {
  const token = getToken(tokenPath, theme);
  if (!token) {
    return undefined;
  }
  
  return getTokenRgb(token, theme);
}

/**
 * Преобразовать RGB строку в hex цвет
 * 
 * @param rgb - RGB строка в формате "r g b"
 * @returns Hex цвет в формате "#rrggbb"
 * 
 * @example
 * rgbToHex("255 255 255") // "#ffffff"
 */
export function rgbToHex(rgb: string): string {
  const [r, g, b] = rgb.split(' ').map(Number);
  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Преобразовать RGB строку в rgba цвет
 * 
 * @param rgb - RGB строка в формате "r g b"
 * @param opacity - Прозрачность от 0 до 1
 * @returns RGBA строку в формате "rgba(r, g, b, opacity)"
 * 
 * @example
 * rgbToRgba("255 255 255", 0.5) // "rgba(255, 255, 255, 0.5)"
 */
export function rgbToRgba(rgb: string, opacity: number): string {
  const [r, g, b] = rgb.split(' ').map(Number);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Получить цвет из токена в hex формате
 * 
 * @param tokenPath - Путь к токену из ThemeTokens, например 'card.bg.light'
 * @param theme - Тема ('light' | 'dark')
 * @returns Hex цвет в формате "#rrggbb" или undefined
 * 
 * @example
 * getTokenHex('primary-500', 'light') // "#333333"
 */
export function getTokenHex(
  tokenPath: string | { token: string; theme: Theme },
  theme?: Theme
): string | undefined {
  let rgb: string | undefined;
  
  if (typeof tokenPath === 'string') {
    // Если это путь из ThemeTokens
    if (tokenPath.includes('.')) {
      rgb = getTokenRgbFromPath(tokenPath, theme!);
    } else {
      // Если это прямой токен
      rgb = getTokenRgb(tokenPath, theme!);
    }
  } else {
    rgb = getTokenRgb(tokenPath.token, tokenPath.theme);
  }
  
  if (!rgb) {
    return undefined;
  }
  
  return rgbToHex(rgb);
}

/**
 * Получить цвет из токена с указанной opacity в rgba формате
 * 
 * @param tokenPath - Путь к токену или токен, например 'primary-500' или 'card.bg.light'
 * @param opacity - Прозрачность от 0 до 1
 * @param theme - Тема ('light' | 'dark'), обязательна если tokenPath это путь
 * @returns RGBA строку или undefined
 * 
 * @example
 * getTokenColorWithOpacity('primary-500', 0.15, 'light') // "rgba(51, 51, 51, 0.15)"
 * getTokenColorWithOpacity('card.bg', 0.5, 'dark') // "rgba(18, 18, 18, 0.5)"
 */
export function getTokenColorWithOpacity(
  tokenPath: string,
  opacity: number,
  theme: Theme
): string | undefined {
  let rgb: string | undefined;
  
  // Если это путь из ThemeTokens
  if (tokenPath.includes('.')) {
    rgb = getTokenRgbFromPath(tokenPath, theme);
  } else {
    // Если это прямой токен
    rgb = getTokenRgb(tokenPath, theme);
  }
  
  if (!rgb) {
    return undefined;
  }
  
  return rgbToRgba(rgb, opacity);
}

/**
 * Получить Tailwind класс для использования в className
 * 
 * @param tokenPath - Путь к токену, например 'card.bg.light'
 * @param property - CSS свойство ('bg', 'text', 'border')
 * @param theme - Тема ('light' | 'dark')
 * @returns Tailwind класс, например 'bg-background-0'
 * 
 * @example
 * getTokenClassName('card.bg', 'bg', 'light') // "bg-background-0"
 */
export function getTokenClassName(
  tokenPath: string,
  property: 'bg' | 'text' | 'border',
  theme: Theme
): string | undefined {
  const token = getToken(tokenPath, theme);
  if (!token) {
    return undefined;
  }
  
  return `${property}-${token}`;
}

/**
 * Валидировать формат токена
 * 
 * @param token - Токен для валидации
 * @returns true, если токен имеет правильный формат
 */
export function isValidToken(token: string): boolean {
  // Формат: category-shade или category для специальных
  const tokenPattern = /^[a-z]+(-[a-z0-9]+)*$/;
  return tokenPattern.test(token);
}

/**
 * Получить все доступные оттенки для категории
 * 
 * @param category - Категория цвета, например 'primary'
 * @param theme - Тема
 * @returns Массив доступных оттенков
 */
export function getAvailableShades(
  category: string,
  theme: Theme
): ColorShade[] {
  const shades: ColorShade[] = [];
  const themeConfig = config[theme];
  
  for (const key in themeConfig) {
    if (key.startsWith(`--color-${category}-`)) {
      const shade = key.replace(`--color-${category}-`, '');
      if (['0', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].includes(shade)) {
        shades.push(shade as ColorShade);
      }
    }
  }
  
  return shades.sort((a, b) => {
    const order: ColorShade[] = ['0', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
    return order.indexOf(a) - order.indexOf(b);
  });
}

