/**
 * Хук для получения Tailwind токенов программно
 * 
 * Позволяет получать цвета из Tailwind токенов для использования
 * в динамических стилях или вычислениях.
 */

import { useTheme } from '@/providers/theme-provider';
import { getToken } from '@/constants/theme-tokens';
import {
  getTokenRgb,
  getTokenRgbFromPath,
  getTokenHex,
  getTokenColorWithOpacity,
  getTokenClassName,
} from '@/utils/color-tokens';

type Theme = 'light' | 'dark';

/**
 * Хук для получения Tailwind токена
 * 
 * @param tokenPath - Путь к токену из ThemeTokens, например 'card.bg.light'
 * @returns Tailwind токен строку или undefined
 * 
 * @example
 * const token = useThemeToken('card.bg'); // 'background-0'
 */
export function useThemeToken(tokenPath: string): string | undefined {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  return getToken(tokenPath, theme);
}

/**
 * Хук для получения RGB значения из токена
 * 
 * @param tokenPath - Путь к токену или токен, например 'card.bg' или 'primary-500'
 * @returns RGB строку в формате "r g b" или undefined
 * 
 * @example
 * const rgb = useThemeTokenRgb('card.bg'); // "255 255 255"
 */
export function useThemeTokenRgb(tokenPath: string): string | undefined {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  if (tokenPath.includes('.')) {
    return getTokenRgbFromPath(tokenPath, theme);
  } else {
    return getTokenRgb(tokenPath, theme);
  }
}

/**
 * Хук для получения hex цвета из токена
 * 
 * @param tokenPath - Путь к токену или токен, например 'card.bg' или 'primary-500'
 * @returns Hex цвет в формате "#rrggbb" или undefined
 * 
 * @example
 * const hex = useThemeTokenHex('primary-500'); // "#333333"
 */
export function useThemeTokenHex(tokenPath: string): string | undefined {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  return getTokenHex(tokenPath, theme);
}

/**
 * Хук для получения цвета из токена с opacity
 * 
 * @param tokenPath - Путь к токену или токен, например 'card.bg' или 'primary-500'
 * @param opacity - Прозрачность от 0 до 1
 * @returns RGBA строку или undefined
 * 
 * @example
 * const color = useThemeTokenWithOpacity('primary-500', 0.15); // "rgba(51, 51, 51, 0.15)"
 */
export function useThemeTokenWithOpacity(
  tokenPath: string,
  opacity: number
): string | undefined {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  return getTokenColorWithOpacity(tokenPath, opacity, theme);
}

/**
 * Хук для получения Tailwind класса из токена
 * 
 * @param tokenPath - Путь к токену, например 'card.bg'
 * @param property - CSS свойство ('bg', 'text', 'border')
 * @returns Tailwind класс, например 'bg-background-0'
 * 
 * @example
 * const className = useThemeTokenClassName('card.bg', 'bg'); // "bg-background-0"
 */
export function useThemeTokenClassName(
  tokenPath: string,
  property: 'bg' | 'text' | 'border'
): string | undefined {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  return getTokenClassName(tokenPath, property, theme);
}

